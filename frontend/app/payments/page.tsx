// frontend/app/(customer)/payments/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { DollarSign, CheckCircle, Clock, AlertCircle, CreditCard, ArrowRight } from 'lucide-react';

export default function CustomerPayments() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showRazorpay, setShowRazorpay] = useState(false);

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:5000/api/payments/customer', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      
      if (res.ok) {
        const data = await res.json();
        setPayments(data);
      }
    } catch (error) {
      console.error('Failed to fetch payments:', error);
    } finally {
      setLoading(false);
    }
  };

  // Mock data for demo (replace with real API data)
  const mockPayments = [
    {
      id: '1',
      eventTitle: 'Wedding - Priya & Rahul',
      eventId: 'evt_123',
      totalBudget: 85000,
      paidAmount: 25000,
      remaining: 60000,
      milestones: [
        { title: 'Advance (30%)', amount: 25000, status: 'paid' },
        { title: 'Resources (40%)', amount: 34000, status: 'pending' },
        { title: 'Final GST (30%)', amount: 26000, status: 'pending' },
      ],
    },
  ];

  const handlePayMilestone = async (milestone) => {
    const token = localStorage.getItem('token');
    
    try {
      const res = await fetch('http://localhost:5000/api/payments/order', {
        method: 'POST',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: milestone.amount,
          currency: 'INR',
          eventId: 'evt_123',
          milestoneId: milestone.id || 'milestone_1',
        }),
      });

      const orderData = await res.json();
      
      if (res.ok) {
        // Razorpay Checkout
        const options = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY || 'rzp_test_your_key',
          amount: orderData.amount,
          currency: orderData.currency,
          name: 'UtSav Payments',
          order_id: orderData.orderId,
          description: milestone.title,
          handler: async function (response) {
            // Verify payment
            await verifyPayment(response, orderData.paymentId);
          },
          prefill: {
            name: 'Customer Name',
            email: 'customer@example.com',
          },
          theme: {
            color: '#FF9933',
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      }
    } catch (error) {
      console.error('Payment initiation failed:', error);
    }
  };

  const verifyPayment = async (response, paymentId) => {
    const token = localStorage.getItem('token');
    
    const res = await fetch('http://localhost:5000/api/payments/verify', {
      method: 'POST',
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        razorpay_order_id: response.razorpay_order_id,
        razorpay_payment_id: response.razorpay_payment_id,
        razorpay_signature: response.razorpay_signature,
        paymentId,
      }),
    });

    if (res.ok) {
      alert('Payment successful! 🎉');
      fetchPayments(); // Refresh payments
    } else {
      alert('Payment verification failed');
    }
  };

  const payment = mockPayments[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pearl to-white p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-start justify-between mb-12 gap-8">
          <div>
            <h1 className="text-4xl font-playfair text-velvet font-bold mb-2">
              Payments Dashboard
            </h1>
            <p className="text-xl text-gray-600 font-jakarta">
              Track your event payments and milestones
            </p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-emerald mb-1">
              ₹{payment?.paidAmount?.toLocaleString() || 0}
            </div>
            <p className="text-lg text-gray-600 font-jakarta">Paid so far</p>
          </div>
        </div>

        {/* Main Payment Card */}
        <Card className="backdrop-blur-xl bg-white/70 border-0 shadow-2xl mb-12">
          <CardContent className="p-8">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-8">
              <div>
                <h2 className="text-2xl font-playfair text-velvet font-bold mb-2">
                  {payment?.eventTitle}
                </h2>
                <div className="flex items-center gap-2">
                  <Badge className="bg-saffron text-white">Event ID: {payment?.eventId}</Badge>
                  <Badge className="bg-emerald text-white">
                    Total: ₹{payment?.totalBudget?.toLocaleString()}
                  </Badge>
                </div>
              </div>
              <div className="text-center lg:text-right">
                <div className="text-4xl font-bold text-emerald mb-2">
                  ₹{payment?.remaining?.toLocaleString()}
                </div>
                <p className="text-lg text-gray-600 font-jakarta">Remaining</p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between text-sm mb-2">
                <span>Payment Progress</span>
                <span>
                  {payment ? Math.round((payment.paidAmount / payment.totalBudget) * 100) : 0}%
                </span>
              </div>
              <Progress 
                value={payment ? (payment.paidAmount / payment.totalBudget) * 100 : 0} 
                className="h-3"
              />
            </div>

            {/* Razorpay Script Load */}
            {!window.Razorpay && (
              <script 
                src="https://checkout.razorpay.com/v1/checkout.js"
                async
                dangerouslySetInnerHTML={{ __html: '' }}
              />
            )}
          </CardContent>
        </Card>

        {/* Milestones */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {payment?.milestones.map((milestone, index) => (
            <Card key={index} className="backdrop-blur-xl bg-white/70 border-0 shadow-xl">
              <CardContent className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-3">
                    {milestone.status === 'paid' ? (
                      <CheckCircle className="w-6 h-6 text-emerald" />
                    ) : milestone.status === 'pending' ? (
                      <Clock className="w-6 h-6 text-saffron" />
                    ) : (
                      <AlertCircle className="w-6 h-6 text-red-500" />
                    )}
                    <div>
                      <h3 className="font-semibold text-velvet">{milestone.title}</h3>
                      <p className="text-sm text-gray-600 font-jakarta">Milestone {index + 1} of 3</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-emerald">
                      ₹{milestone.amount.toLocaleString()}
                    </div>
                  </div>
                </div>

                {milestone.status === 'pending' ? (
                  <Button 
                    onClick={() => handlePayMilestone(milestone)}
                    className="w-full bg-gradient-to-r from-emerald to-saffron hover:from-emerald/90 text-white font-jakarta flex items-center gap-2"
                  >
                    <CreditCard className="w-5 h-5" />
                    Pay Now with Razorpay
                  </Button>
                ) : (
                  <Badge className={`w-full justify-center py-3 text-lg font-jakarta ${
                    milestone.status === 'paid' 
                      ? 'bg-emerald text-white' 
                      : 'bg-gray-500 text-white'
                  }`}>
                    {milestone.status === 'paid' ? 'Paid ✅' : 'Pending'}
                  </Badge>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
