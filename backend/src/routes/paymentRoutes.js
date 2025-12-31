// backend/src/routes/paymentRoutes.js
import express from 'express';
import { createOrder, verifyPayment } from '../controllers/paymentController.js';
import { auth } from '../middleware/auth.js';
import { requireRole } from '../middleware/roleCheck.js';

const router = express.Router();

// Customer: create Razorpay order (advance/milestone)
router.post('/order', auth, requireRole(['customer']), createOrder);

// Customer: verify payment after Razorpay callback
router.post('/verify', auth, requireRole(['customer']), verifyPayment);

export default router;
