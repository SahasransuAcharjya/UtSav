// frontend/app/(auth)/login/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';
import { Loader2, Mail, Lock, User, Store } from 'lucide-react';
import { LoginRequest } from '@/types/user';
import { apiClient } from '@/lib/api';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('customer'); // Default role
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const loginData: LoginRequest = { email, password };
      // Note: We might want to send role to backend if it supports it, 
      // but for now we use it for redirection as requested.
      const response = await apiClient.post<{ token: string; user: any }>('/auth/login', loginData);

      login(response.token);

      // Redirect based on selected role
      if (role === 'customer') {
        router.push('/customer/dashboard');
      } else {
        router.push('/vendor/dashboard');
      }
    } catch (err: any) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pearl via-white to-pearl/80 dark:from-black dark:via-neutral-950 dark:to-black transition-colors duration-300 flex items-center justify-center p-8">
      <Card className="w-full max-w-md backdrop-blur-xl bg-white/70 dark:bg-neutral-950/70 border-0 shadow-2xl dark:border-white/10">
        <CardHeader className="text-center">
          <CardTitle className="text-4xl font-playfair font-bold text-velvet dark:text-white mb-2">
            Welcome Back
          </CardTitle>
          <p className="text-gray-600 dark:text-gray-400 font-jakarta">Sign in to your UtSav account</p>
        </CardHeader>
        <CardContent className="space-y-6">
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-2xl text-red-700 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Role Selection */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div
                onClick={() => setRole('customer')}
                className={`cursor-pointer p-4 rounded-2xl border-2 transition-all duration-300 flex flex-col items-center gap-3 ${role === 'customer'
                  ? 'bg-saffron/10 border-saffron'
                  : 'bg-white/50 dark:bg-neutral-900/50 border-gray-200 dark:border-white/10 hover:border-saffron/50'
                  }`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${role === 'customer' ? 'bg-saffron text-white' : 'bg-gray-100 dark:bg-white/10 text-gray-500 dark:text-gray-400'
                  }`}>
                  <User className="w-5 h-5" />
                </div>
                <div className="text-center">
                  <div className={`font-bold text-sm ${role === 'customer' ? 'text-saffron' : 'text-gray-700 dark:text-gray-300'}`}>Customer</div>
                </div>
              </div>

              <div
                onClick={() => setRole('vendor')}
                className={`cursor-pointer p-4 rounded-2xl border-2 transition-all duration-300 flex flex-col items-center gap-3 ${role === 'vendor'
                  ? 'bg-saffron/10 border-saffron'
                  : 'bg-white/50 dark:bg-neutral-900/50 border-gray-200 dark:border-white/10 hover:border-saffron/50'
                  }`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${role === 'vendor' ? 'bg-saffron text-white' : 'bg-gray-100 dark:bg-white/10 text-gray-500 dark:text-gray-400'
                  }`}>
                  <Store className="w-5 h-5" />
                </div>
                <div className="text-center">
                  <div className={`font-bold text-sm ${role === 'vendor' ? 'text-saffron' : 'text-gray-700 dark:text-gray-300'}`}>Vendor</div>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                <Mail className="w-4 h-4 text-saffron" />
                Email
              </label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="h-12 rounded-2xl bg-white/50 dark:bg-neutral-900/50 border-gray-200 dark:border-white/10 focus:border-saffron dark:focus:border-saffron"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                <Lock className="w-4 h-4 text-saffron" />
                Password
              </label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="h-12 rounded-2xl bg-white/50 dark:bg-neutral-900/50 border-gray-200 dark:border-white/10 focus:border-saffron dark:focus:border-saffron"
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full h-14 bg-gradient-to-r from-saffron to-gold hover:from-saffron/90 text-white font-bold text-lg rounded-2xl shadow-xl"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Signing In...
                </>
              ) : (
                'Sign In'
              )}
            </Button>
          </form>

          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Don't have an account?{' '}
              <Link href="/register" className="font-semibold text-saffron hover:text-gold transition-colors">
                Sign up here
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
