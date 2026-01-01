// frontend/components/shared/ThemeToggle.tsx
'use client';

import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { Sun, Moon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const isDark = theme === 'dark';

  const handleToggle = () => {
    setTheme(isDark ? 'light' : 'dark');
    setRotation(prev => prev + 360);
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleToggle}
      style={{ transform: `rotate(${rotation}deg)` }}
      className="w-12 h-12 p-0 rounded-2xl backdrop-blur-sm border border-saffron/20 hover:border-saffron/40 hover:shadow-lg hover:shadow-saffron/10 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group"
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
    >
      {/* Animated Sun/Moon Container */}
      <div className="relative w-6 h-6">
        {/* Sun */}
        <Sun
          className={cn(
            'w-6 h-6 absolute inset-0 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]',
            isDark
              ? 'opacity-0 scale-0 rotate-180'
              : 'opacity-100 scale-100 rotate-0 text-gold shadow-lg drop-shadow-lg'
          )}
        />

        {/* Moon */}
        <Moon
          className={cn(
            'w-6 h-6 absolute inset-0 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]',
            isDark
              ? 'opacity-100 scale-100 rotate-0 text-velvet shadow-lg drop-shadow-lg'
              : 'opacity-0 scale-0 -rotate-180'
          )}
        />
      </div>

      {/* Glow Effect on Hover */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-saffron/20 to-gold/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />
    </Button>
  );
}
