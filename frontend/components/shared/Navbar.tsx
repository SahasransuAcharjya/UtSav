// frontend/components/shared/Navbar.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, User, LogOut, Sparkles } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { useAuth } from '@/hooks/useAuth';  // ✅ NEW HOOK
import { cn } from '@/lib/utils';

export default function Navbar() {
  const { isAuthenticated, user, logout, isLoading } = useAuth();  // ✅ SINGLE HOOK
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const userRole = user?.role;
  const userName = user?.name;

  const handleLogout = () => {
    logout();  // ✅ HOOK HANDLES CLEANUP
    setIsMobileMenuOpen(false);
  };

  // Loading state
  if (isLoading) {
    return (
      <nav className="backdrop-blur-xl bg-white/80 dark:bg-black/80 border-b border-saffron/20 sticky top-0 z-50 h-16">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-full">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-saffron via-gold to-emerald rounded-2xl animate-pulse" />
            <div className="h-8 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          </div>
          <div className="h-10 w-10 bg-gray-200 dark:bg-gray-700 rounded-2xl animate-pulse" />
        </div>
      </nav>
    );
  }

  return (
    <nav className="backdrop-blur-xl bg-white/80 dark:bg-black/80 border-b border-saffron/20 dark:border-velvet/20 sticky top-0 z-50 supports-[backdrop-filter:blur(20px)]:bg-white/60 dark:supports-[backdrop-filter:blur(20px)]:bg-black/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 bg-gradient-to-br from-saffron via-gold to-emerald rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-300 hover:shadow-xl">
              <Sparkles className="w-7 h-7 text-white drop-shadow-md" />
            </div>
            <div>
              <h1 className="text-2xl font-playfair font-bold bg-gradient-to-r from-velvet via-saffron to-emerald bg-clip-text text-transparent tracking-tight">
                UtSav
              </h1>
              <p className="text-xs font-jakarta text-gray-500 dark:text-gray-400 tracking-wide uppercase">
                Event Management
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="font-jakarta text-lg text-gray-700 dark:text-gray-300 hover:text-saffron dark:hover:text-gold font-medium transition-all duration-200 hover:underline underline-offset-4"
            >
              Home
            </Link>

            {isAuthenticated && user ? (
              <>
                {userRole === 'customer' && (
                  <>
                    <Link
                      href="/customer/dashboard"
                      className="font-jakarta text-lg text-gray-700 dark:text-gray-300 hover:text-emerald dark:hover:text-emerald font-medium transition-all duration-200 hover:underline underline-offset-4"
                    >
                      Dashboard
                    </Link>
                    <Link
                      href="/customer/onboarding"
                      className="font-jakarta text-lg text-gray-700 dark:text-gray-300 hover:text-saffron dark:hover:text-gold font-medium transition-all duration-200 hover:underline underline-offset-4"
                    >
                      New Event
                    </Link>
                  </>
                )}
                {userRole === 'vendor' && (
                  <>
                    <Link
                      href="/vendor/dashboard"
                      className="font-jakarta text-lg text-gray-700 dark:text-gray-300 hover:text-saffron dark:hover:text-gold font-medium transition-all duration-200 hover:underline underline-offset-4"
                    >
                      Requisitions
                    </Link>
                    <Link
                      href="/vendor/payments"
                      className="font-jakarta text-lg text-gray-700 dark:text-gray-300 hover:text-emerald dark:hover:text-emerald font-medium transition-all duration-200 hover:underline underline-offset-4"
                    >
                      Payments
                    </Link>
                  </>
                )}
              </>
            ) : (
              <>
                <Link
                  href="/register"
                  className="font-jakarta text-lg text-gray-700 dark:text-gray-300 hover:text-emerald dark:hover:text-emerald font-medium transition-all duration-200 hover:underline underline-offset-4"
                >
                  For Customers
                </Link>
                <Link
                  href="/register"
                  className="font-jakarta text-lg text-gray-700 dark:text-gray-300 hover:text-saffron dark:hover:text-gold font-medium transition-all duration-200 hover:underline underline-offset-4"
                >
                  For Vendors
                </Link>
              </>
            )}
          </div>

          {/* Right Side: Auth + Theme + Mobile */}
          <div className="flex items-center gap-3 lg:gap-4">
            {/* Theme Toggle */}
            <ThemeToggle />

            {isAuthenticated && user ? (
              <>
                {/* User Role Badge */}
                {/* Profile Avatar */}
                <div className="flex items-center gap-2 p-2 rounded-2xl hover:bg-saffron/10 dark:hover:bg-saffron/20 transition-all duration-200 cursor-pointer group border border-transparent hover:border-saffron/30">
                  <div className="w-9 h-9 bg-gradient-to-br from-gray-200 dark:from-gray-700 to-gray-300 rounded-full flex items-center justify-center overflow-hidden group-hover:bg-gradient-to-br group-hover:from-saffron group-hover:to-gold transition-all duration-300">
                    <User className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-white" />
                  </div>
                  <span className="font-jakarta font-semibold text-sm lg:text-base text-gray-700 dark:text-gray-300 hidden lg:block truncate max-w-24 group-hover:text-saffron transition-colors">
                    {userName?.split(' ')[0] || 'User'}
                  </span>
                </div>

                {/* Logout */}
                <Button
                  onClick={handleLogout}
                  variant="ghost"
                  size="sm"
                  className="flex items-center gap-2 font-jakarta hover:bg-red-50 dark:hover:bg-red-950/50 hover:text-red-600 dark:hover:text-red-400 border border-gray-200 dark:border-gray-700 font-medium px-4 py-2 rounded-xl transition-all duration-200 hover:shadow-md"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden lg:block">Logout</span>
                </Button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button
                    variant="outline"
                    size="sm"
                    className="font-jakarta border-2 border-velvet/30 dark:border-velvet/50 hover:bg-velvet hover:text-white hover:border-velvet font-medium px-6 py-2 rounded-xl shadow-sm transition-all duration-300"
                  >
                    Sign In
                  </Button>
                </Link>
                <Link href="/register">
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-saffron to-gold hover:from-saffron/90 text-white font-jakarta font-semibold px-6 py-2 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    Get Started
                  </Button>
                </Link>
              </>
            )}

            {/* Mobile Menu */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden w-11 h-11 p-0 rounded-2xl hover:bg-saffron/10 dark:hover:bg-saffron/20 border border-transparent hover:border-saffron/30 transition-all duration-200 shadow-sm"
                >
                  <Menu className="w-6 h-6" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-80 p-0 border-l-saffron/20 dark:border-gold/30 bg-white/95 dark:bg-black/95 backdrop-blur-xl font-jakarta"
              >
                {/* Mobile Header */}
                <div className="p-6 border-b border-gray-200 dark:border-gray-800 flex items-center gap-3 sticky top-0 bg-inherit backdrop-blur-sm z-10">
                  <div className="w-11 h-11 bg-gradient-to-br from-saffron to-gold rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-playfair font-bold text-velvet dark:text-gray-100">UtSav</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Event Management</p>
                  </div>
                </div>

                {/* Mobile Navigation */}
                <nav className="flex-1 p-6 space-y-2 overflow-y-auto">
                  <Link
                    href="/"
                    className="flex items-center gap-3 py-4 px-4 rounded-2xl hover:bg-saffron/10 dark:hover:bg-saffron/20 transition-all duration-200 text-lg font-medium border-l-4 border-transparent hover:border-saffron"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    🏠 Home
                  </Link>

                  {isAuthenticated && user ? (
                    <>
                      {userRole === 'customer' && (
                        <>
                          <Link
                            href="/customer/dashboard"
                            className="flex items-center gap-3 py-4 px-4 bg-emerald/10 dark:bg-emerald/20 border-l-4 border-emerald rounded-2xl font-semibold text-emerald transition-all duration-200 text-lg"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            📊 Dashboard
                          </Link>
                          <Link
                            href="/customer/onboarding"
                            className="flex items-center gap-3 py-4 px-4 rounded-2xl hover:bg-saffron/10 dark:hover:bg-saffron/20 border-l-4 border-transparent hover:border-saffron transition-all duration-200 text-lg font-medium"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            ✨ New Event
                          </Link>
                        </>
                      )}
                      {userRole === 'vendor' && (
                        <>
                          <Link
                            href="/vendor/dashboard"
                            className="flex items-center gap-3 py-4 px-4 bg-saffron/10 dark:bg-saffron/20 border-l-4 border-saffron rounded-2xl font-semibold text-saffron transition-all duration-200 text-lg"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            📋 Requisitions
                          </Link>
                          <Link
                            href="/vendor/payments"
                            className="flex items-center gap-3 py-4 px-4 rounded-2xl hover:bg-emerald/10 dark:hover:bg-emerald/20 border-l-4 border-transparent hover:border-emerald transition-all duration-200 text-lg font-medium"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            💰 Payments
                          </Link>
                        </>
                      )}

                      <Button
                        onClick={handleLogout}
                        className="w-full mt-6 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-0"
                      >
                        <LogOut className="w-5 h-5 mr-2" />
                        Logout Account
                      </Button>
                    </>
                  ) : (
                    <>
                      <Link
                        href="/login"
                        className="flex items-center gap-3 py-4 px-4 rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-800 border-l-4 border-transparent hover:border-blue-500 transition-all duration-200 text-lg font-medium"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        🔑 Sign In
                      </Link>
                      <Link
                        href="/register"
                        className="flex items-center gap-3 py-4 px-4 bg-gradient-to-r from-saffron to-gold text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl border-l-4 border-saffron transition-all duration-300 text-lg"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        🚀 Get Started
                      </Link>
                    </>
                  )}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
