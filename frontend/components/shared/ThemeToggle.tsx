// frontend/components/shared/ThemeToggle.tsx
'use client';

import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { Sun, Moon } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const isDark = theme === 'dark';

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="w-12 h-12 p-0 rounded-2xl backdrop-blur-sm border border-saffron/20 hover:border-saffron/40 hover:shadow-lg hover:shadow-saffron/10 transition-all duration-300 group"
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
    >
      {/* Animated Sun/Moon Container */}
      <div className="relative w-6 h-6">
        {/* Sun */}
        <Sun
          className={cn(
            'w-6 h-6 absolute inset-0 transition-all duration-500 ease-in-out',
            isDark
              ? 'opacity-0 scale-75 rotate-180 -translate-y-1'
              : 'opacity-100 scale-100 rotate-0 translate-y-0 text-gold shadow-lg drop-shadow-lg'
          )}
        />
        
        {/* Moon */}
        <Moon
          className={cn(
            'w-6 h-6 absolute inset-0 transition-all duration-500 ease-in-out',
            isDark
              ? 'opacity-100 scale-100 rotate-0 translate-y-0 text-velvet shadow-lg drop-shadow-lg'
              : 'opacity-0 scale-75 -rotate-180 translate-y-1'
          )}
        />
      </div>

      {/* Glow Effect on Hover */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-saffron/20 to-gold/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />
    </Button>
  );
}
