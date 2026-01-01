// frontend/app/(vendor)/payments/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DollarSign, CheckCircle, Clock, AlertCircle } from 'lucide-react';

interface VendorPayment {
  id: string;
  event: string;
  milestone: string;
  amount: number;
  status: 'paid' | 'pending' | 'overdue';
  date: string;
}

export default function VendorPayments() {
  const [payments, setPayments] = useState<VendorPayment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const token = localStorage.getItem('token');
      // Mock endpoint - implement in backend later
      const res = await fetch('http://localhost:5000/api/payments/vendor', {
        headers: {
          'Authorization': `Bearer ${token || ''}`,
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

  const mockPayments: VendorPayment[] = [
    {
      id: '1',
      event: 'Wedding - Delhi',
      milestone: 'Advance Payment',
      amount: 25000,
      status: 'paid',
      date: '2025-12-28',
    },
    {
      id: '2',
      event: 'Corporate Event',
      milestone: 'Resources',
      amount: 15000,
      status: 'pending',
      date: '2025-12-30',
    },
    {
      id: '3',
      event: 'Birthday Party',
      milestone: 'Final GST',
      amount: 10000,
      status: 'overdue',
      date: '2025-12-25',
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid': return <CheckCircle className="w-5 h-5 text-emerald" />;
      case 'pending': return <Clock className="w-5 h-5 text-saffron" />;
      case 'overdue': return <AlertCircle className="w-5 h-5 text-red-500" />;
      default: return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pearl via-white to-pearl/80 dark:from-black dark:via-neutral-950 dark:to-black transition-colors duration-300 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-4xl font-playfair text-velvet dark:text-white font-bold mb-2">
              Payments & Milestones
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 font-jakarta">
              Track advance, resources, and final payments
            </p>
          </div>
          <div className="text-3xl font-bold text-emerald">
            ₹{mockPayments.reduce((sum, p) => sum + p.amount, 0).toLocaleString()}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Payments */}
          <Card className="backdrop-blur-xl bg-white/70 dark:bg-neutral-950/70 border-0 shadow-xl dark:border-white/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-velvet dark:text-white">
                <DollarSign className="w-6 h-6" />
                Recent Payments
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockPayments.slice(0, 3).map((payment) => (
                <div key={payment.id} className="flex items-center justify-between p-4 bg-white/50 dark:bg-neutral-900/50 rounded-xl">
                  <div className="flex items-center gap-4">
                    {getStatusIcon(payment.status)}
                    <div>
                      <div className="font-semibold text-velvet dark:text-white">{payment.milestone}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">{payment.event}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-emerald">₹{payment.amount.toLocaleString()}</div>
                    <Badge className={`mt-1 ${payment.status === 'paid' ? 'bg-emerald' : payment.status === 'overdue' ? 'bg-red-500' : 'bg-saffron'}`}>
                      {payment.status.toUpperCase()}
                    </Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Payment Stats */}
          <Card className="backdrop-blur-xl bg-white/70 dark:bg-neutral-950/70 border-0 shadow-xl dark:border-white/10">
            <CardHeader>
              <CardTitle className="text-velvet dark:text-white">Payment Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-emerald mb-1">₹85,000</div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 font-jakarta">Total Received</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-saffron mb-1">₹15,000</div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 font-jakarta">Pending</p>
                </div>
              </div>
              <Button className="w-full bg-gradient-to-r from-emerald to-saffron hover:from-emerald/90 text-white font-jakarta">
                Request Next Milestone
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
