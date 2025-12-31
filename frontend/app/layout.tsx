// frontend/app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import { AuthProvider } from '@/hooks/useAuth';  // ← NEW
import Navbar from '@/components/shared/Navbar';
import './globals.css';
import { cn } from '@/lib/utils';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'UtSav - Event Management Platform',
  description: 'Celebrate with confidence. Professional event management marketplace.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(
        'min-h-screen bg-background font-jakarta antialiased',
        inter.className
      )}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AuthProvider>  {/* ← WRAPPED WITH AUTH PROVIDER */}
            <Navbar />
            <main>{children}</main>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
