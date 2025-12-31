// frontend/app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
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
    <html lang="en">
      <body className={cn(
        'min-h-screen bg-background font-jakarta antialiased',
        inter.className
      )}>
        {children}
      </body>
    </html>
  );
}
