// frontend/components/shared/ProtectedRoute.tsx
'use client';

import { useAuth } from '@/hooks/useAuth';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: ('customer' | 'vendor' | 'admin')[];
}

export default function ProtectedRoute({ 
  children, 
  allowedRoles = [] 
}: ProtectedRouteProps) {
  const { isAuthenticated, isLoading, role } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || isLoading) return;

    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    if (allowedRoles.length > 0 && role && !allowedRoles.includes(role)) {
      const redirectPath = allowedRoles.includes('customer') ? '/customer/dashboard' : 
                          allowedRoles.includes('vendor') ? '/vendor/dashboard' : '/';
      router.push(redirectPath);
    }
  }, [isAuthenticated, isLoading, role, allowedRoles, router, pathname, mounted]);

  if (!mounted || isLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pearl to-white flex items-center justify-center p-8">
        <Card className="backdrop-blur-xl bg-white/70 border-0 shadow-2xl w-full max-w-md">
          <CardContent className="p-12 text-center">
            <Loader2 className="w-12 h-12 animate-spin text-saffron mx-auto mb-6" />
            <h3 className="text-2xl font-playfair font-bold text-velvet mb-2">Loading...</h3>
            <p className="text-gray-600 font-jakarta">Authenticating your session</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return <>{children}</>;
}
