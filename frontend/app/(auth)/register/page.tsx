// frontend/app/(auth)/register/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Users, User, Briefcase, Mail, Phone, Lock } from 'lucide-react';

export default function RegisterPage() {
  const [role, setRole] = useState('customer');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
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
    <div className="min-h-screen bg-gradient-to-br from-pearl to-white flex items-center justify-center p-8">
      <Card className="w-full max-w-md backdrop-blur-xl bg-white/70 border-0 shadow-2xl">
        <CardHeader className="text-center">
          <div className="w-20 h-20 bg-gradient-to-r from-saffron to-gold rounded-2xl mx-auto mb-6 flex items-center justify-center">
            <Users className="w-10 h-10 text-white" />
          </div>
          <CardTitle className="text-3xl font-playfair text-velvet">
            Join UtSav
          </CardTitle>
          <CardDescription className="text-gray-600">
            Create your account to get started
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Role Selector */}
            <div>
              <Label className="text-sm font-jakarta font-medium mb-2 flex items-center gap-2">
                {role === 'customer' ? <User className="w-4 h-4" /> : <Briefcase className="w-4 h-4" />}
                Account Type
              </Label>
              <Select value={role} onValueChange={setRole}>
                <SelectTrigger className="font-jakarta">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="customer">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Customer (Event Organizer)
                    </div>
                  </SelectItem>
                  <SelectItem value="vendor">
                    <div className="flex items-center gap-2">
                      <Briefcase className="w-4 h-4" />
                      Vendor (Event Manager)
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Name */}
            <div>
              <Label className="text-sm font-jakarta font-medium mb-2 flex items-center gap-2">
                <Users className="w-4 h-4" />
                Full Name
              </Label>
              <Input name="name" required placeholder="John Doe" />
            </div>

            {/* Email */}
            <div>
              <Label className="text-sm font-jakarta font-medium mb-2 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email
              </Label>
              <Input name="email" type="email" required placeholder="john@example.com" />
            </div>

            {/* Phone (optional) */}
            <div>
              <Label className="text-sm font-jakarta font-medium mb-2 flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Phone
              </Label>
              <Input name="phone" type="tel" placeholder="+91 98765 43210" />
            </div>

            {/* Password */}
            <div>
              <Label className="text-sm font-jakarta font-medium mb-2 flex items-center gap-2">
                <Lock className="w-4 h-4" />
                Password
              </Label>
              <Input name="password" type="password" required minLength={6} placeholder="••••••••" />
            </div>

            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-saffron to-gold hover:from-saffron/90 text-white font-jakarta"
              disabled={isLoading}
            >
              {isLoading ? 'Creating...' : 'Create Account'}
            </Button>
          </form>

          <div className="text-center text-sm pt-4 border-t">
            <span className="text-gray-600">Already have an account? </span>
            <Link href="/login" className="text-saffron hover:text-saffron/80 font-medium">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
