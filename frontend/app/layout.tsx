// frontend/app/layout.tsx - COMPLETE FILE
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from 'next-themes';  // ← ADD
import Navbar from '@/components/shared/Navbar';  // ← ADD
import './globals.css';
import { cn } from '@/lib/utils';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'UtSav - Event Management Platform',
  description: 'Celebrate with confidence.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>  {/* ← ADD suppressHydrationWarning */}
      <body className={cn(
        'min-h-screen bg-background font-jakarta antialiased',
        inter.className
      )}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>  {/* ← WRAP EVERYTHING */}
          <Navbar />  {/* ← ADD NAVBAR */}
          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
