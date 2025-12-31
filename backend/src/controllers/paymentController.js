// backend/src/controllers/paymentController.js
import Razorpay from 'razorpay';
import crypto from 'crypto';
import Payment from '../models/Payment.js';
import { NODE_ENV } from '../config/env.js';

// You will need RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in env for real use
const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_key',
  key_secret: process.env.RAZORPAY_KEY_SECRET || 'rzp_test_secret',
});

// POST /api/payments/create-order
export const createOrder = async (req, res) => {
  try {
    const { amount, currency = 'INR', eventId, milestoneId } = req.body;

    const options = {
      amount: Math.round(amount * 100), // Razorpay works in paise
      currency,
      receipt: `utsav_${eventId}_${Date.now()}`,
    };

    const order = await razorpayInstance.orders.create(options);

    const payment = await Payment.create({
      event: eventId,
      milestone: milestoneId || null,
      amount,
      currency,
      razorpayOrderId: order.id,
      status: 'created', // created | paid | failed
    });

    return res.status(201).json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      paymentId: payment._id,
      env: NODE_ENV,
    });
  } catch (err) {
    console.error('Create order error:', err);
    return res.status(500).json({ message: 'Payment initialization failed' });
  }
};

// POST /api/payments/verify
export const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      paymentId,
    } = req.body;

    const body = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET || 'rzp_test_secret')
      .update(body.toString())
      .digest('hex');

    const isValid = expectedSignature === razorpay_signature;

    if (!isValid) {
      return res.status(400).json({ message: 'Invalid payment signature' });
    }

    const payment = await Payment.findByIdAndUpdate(
      paymentId,
      {
        status: 'paid',
        razorpayPaymentId: razorpay_payment_id,
        razorpaySignature: razorpay_signature,
      },
      { new: true }
    );

    return res.json({ success: true, payment });
  } catch (err) {
    console.error('Verify payment error:', err);
    return res.status(500).json({ message: 'Payment verification failed' });
  }
};
