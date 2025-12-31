// frontend/lib/razorpay.ts
declare global {
    interface Window {
      Razorpay: any;
    }
  }
  
  export interface CreateOrderRequest {
    amount: number;
    currency?: 'INR';
    eventId: string;
    milestoneId?: string;
  }
  
  export interface PaymentVerification {
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
    paymentId: string;
  }
  
  class RazorpayClient {
    private isLoaded = false;
  
    async loadScript(): Promise<void> {
      if (this.isLoaded) return;
  
      return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        script.onload = () => {
          this.isLoaded = true;
          resolve();
        };
        script.onerror = () => reject(new Error('Failed to load Razorpay'));
        document.head.appendChild(script);
      });
    }
  
    async createOrder(orderData: CreateOrderRequest): Promise<any> {
      await this.loadScript();
      
      return new Promise((resolve, reject) => {
        const options: any = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_your_key',
          amount: orderData.amount * 100, // paise
          currency: orderData.currency || 'INR',
          name: 'UtSav Payments',
          description: `Payment for ${orderData.eventId}`,
          order_id: '', // Backend provides
          handler: resolve,
          prefill: {
            name: 'Customer',
            email: 'customer@example.com',
          },
          theme: {
            color: '#FF9933', // saffron
          },
          modal: {
            ondismiss: () => reject(new Error('Payment cancelled')),
          },
        };
  
        const rzp = new window.Razorpay(options);
        rzp.open();
      });
    }
  
    async verifyPayment(verificationData: PaymentVerification): Promise<any> {
      const { apiClient } = await import('./api');
      return apiClient.post('/payments/verify', verificationData);
    }
  }
  
  export const razorpay = new RazorpayClient();
  
  export function useRazorpay() {
    return {
      createOrder: razorpay.createOrder,
      verifyPayment: razorpay.verifyPayment,
    };
  }
  