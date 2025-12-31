// frontend/app/(auth)/login/page.tsx
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Login } from 'lucide-react';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pearl to-white flex items-center justify-center p-8">
      <Card className="w-full max-w-md backdrop-blur-xl bg-white/70 border-0 shadow-2xl">
        <CardHeader className="text-center">
          <div className="w-20 h-20 bg-gradient-to-r from-saffron to-gold rounded-2xl mx-auto mb-6 flex items-center justify-center">
            <Login className="w-10 h-10 text-white" />
          </div>
          <CardTitle className="text-3xl font-playfair text-velvet">
            Welcome Back
          </CardTitle>
          <CardDescription className="text-gray-600">
            Sign in to your UtSav account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form className="space-y-4">
            <div>
              <label className="text-sm font-jakarta font-medium mb-2 block">Email</label>
              <Input placeholder="your@email.com" />
            </div>
            <div>
              <label className="text-sm font-jakarta font-medium mb-2 block">Password</label>
              <Input type="password" placeholder="••••••••" />
            </div>
            <Button className="w-full bg-gradient-to-r from-saffron to-gold hover:from-saffron/90 text-white font-jakarta">
              Sign In
            </Button>
          </form>
          <div className="text-center text-sm">
            <span className="text-gray-600">Don&apos;t have an account? </span>
            <Link href="/register" className="text-saffron hover:text-saffron/80 font-medium">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
