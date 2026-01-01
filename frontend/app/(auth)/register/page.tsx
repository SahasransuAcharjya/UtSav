// frontend/app/(auth)/register/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Users, User, Store, Mail, Phone, Lock } from 'lucide-react';

export default function RegisterPage() {
  const [role, setRole] = useState('customer');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      password: formData.get('password'),
      role,
      phone: formData.get('phone'),
    };

    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (res.ok) {
        // Store token and redirect
        localStorage.setItem('token', result.token);
        // Redirect based on role
        window.location.href = role === 'customer'
          ? '/customer/onboarding'
          : '/vendor/dashboard';
      } else {
        alert(result.message || 'Registration failed');
      }
    } catch (error) {
      alert('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pearl via-white to-pearl/80 dark:from-black dark:via-neutral-950 dark:to-black transition-colors duration-300 flex items-center justify-center p-8">
      <Card className="w-full max-w-md backdrop-blur-xl bg-white/70 dark:bg-neutral-950/70 border-0 shadow-2xl dark:border-white/10">
        <CardHeader className="text-center">
          <div className="w-20 h-20 bg-gradient-to-r from-saffron to-gold rounded-2xl mx-auto mb-6 flex items-center justify-center">
            <Users className="w-10 h-10 text-white" />
          </div>
          <CardTitle className="text-3xl font-playfair text-velvet dark:text-white">
            Join UtSav
          </CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-400">
            Create your account to get started
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Role Selector */}
            <div>
              <Label className="text-sm font-jakarta font-medium mb-2 flex items-center gap-2 text-gray-700 dark:text-gray-300">
                {role === 'customer' ? <User className="w-4 h-4 text-saffron" /> : <Store className="w-4 h-4 text-saffron" />}
                Account Type
              </Label>
              <div className="grid grid-cols-2 gap-4">
                <div
                  onClick={() => setRole('customer')}
                  className={`cursor-pointer p-4 rounded-2xl border-2 transition-all duration-300 flex flex-col items-center gap-3 ${role === 'customer'
                    ? 'bg-saffron/10 border-saffron'
                    : 'bg-white/50 dark:bg-neutral-900/50 border-gray-200 dark:border-white/10 hover:border-saffron/50'
                    }`}
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${role === 'customer' ? 'bg-saffron text-white' : 'bg-gray-100 dark:bg-white/10 text-gray-500 dark:text-gray-400'
                    }`}>
                    <User className="w-6 h-6" />
                  </div>
                  <div className="text-center">
                    <div className={`font-bold ${role === 'customer' ? 'text-saffron' : 'text-gray-700 dark:text-gray-300'}`}>Customer</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Event Organizer</div>
                  </div>
                </div>

                <div
                  onClick={() => setRole('vendor')}
                  className={`cursor-pointer p-4 rounded-2xl border-2 transition-all duration-300 flex flex-col items-center gap-3 ${role === 'vendor'
                    ? 'bg-saffron/10 border-saffron'
                    : 'bg-white/50 dark:bg-neutral-900/50 border-gray-200 dark:border-white/10 hover:border-saffron/50'
                    }`}
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${role === 'vendor' ? 'bg-saffron text-white' : 'bg-gray-100 dark:bg-white/10 text-gray-500 dark:text-gray-400'
                    }`}>
                    <Store className="w-6 h-6" />
                  </div>
                  <div className="text-center">
                    <div className={`font-bold ${role === 'vendor' ? 'text-saffron' : 'text-gray-700 dark:text-gray-300'}`}>Vendor</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Event Manager</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Name */}
            <div>
              <Label className="text-sm font-jakarta font-medium mb-2 flex items-center gap-2 text-gray-700 dark:text-gray-300">
                <Users className="w-4 h-4 text-saffron" />
                Full Name
              </Label>
              <Input name="name" required placeholder="John Doe" className="h-12 rounded-2xl bg-white/50 dark:bg-neutral-900/50 border-gray-200 dark:border-white/10" />
            </div>

            {/* Email */}
            <div>
              <Label className="text-sm font-jakarta font-medium mb-2 flex items-center gap-2 text-gray-700 dark:text-gray-300">
                <Mail className="w-4 h-4 text-saffron" />
                Email
              </Label>
              <Input name="email" type="email" required placeholder="john@example.com" className="h-12 rounded-2xl bg-white/50 dark:bg-neutral-900/50 border-gray-200 dark:border-white/10" />
            </div>

            {/* Phone (optional) */}
            <div>
              <Label className="text-sm font-jakarta font-medium mb-2 flex items-center gap-2 text-gray-700 dark:text-gray-300">
                <Phone className="w-4 h-4 text-saffron" />
                Phone
              </Label>
              <Input name="phone" type="tel" placeholder="+91 98765 43210" className="h-12 rounded-2xl bg-white/50 dark:bg-neutral-900/50 border-gray-200 dark:border-white/10" />
            </div>

            {/* Password */}
            <div>
              <Label className="text-sm font-jakarta font-medium mb-2 flex items-center gap-2 text-gray-700 dark:text-gray-300">
                <Lock className="w-4 h-4 text-saffron" />
                Password
              </Label>
              <Input name="password" type="password" required minLength={6} placeholder="••••••••" className="h-12 rounded-2xl bg-white/50 dark:bg-neutral-900/50 border-gray-200 dark:border-white/10" />
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-saffron to-gold hover:from-saffron/90 text-white font-jakarta"
              disabled={isLoading}
            >
              {isLoading ? 'Creating...' : 'Create Account'}
            </Button>
          </form>

          <div className="text-center text-sm pt-4 border-t border-gray-200 dark:border-white/10">
            <span className="text-gray-600 dark:text-gray-400">Already have an account? </span>
            <Link href="/login" className="text-saffron hover:text-saffron/80 font-medium">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
