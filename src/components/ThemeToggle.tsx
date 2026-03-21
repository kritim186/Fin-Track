'use client';

import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch by waiting for mount
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button className="flex h-10 w-10 items-center justify-center rounded-full bg-transparent hover:bg-gray-100/50 dark:hover:bg-slate-800 transition-colors">
        <Sun className="h-5 w-5 text-gray-400 opacity-50" />
      </button>
    );
  }

  const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="relative flex h-10 w-10 items-center justify-center rounded-full bg-transparent hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors text-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black overflow-hidden"
      aria-label="Toggle theme"
    >
      <span className="sr-only">Toggle theme</span>
      <div className={`relative flex items-center justify-center w-full h-full transition-transform duration-500 ease-in-out ${isDark ? 'rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'}`}>
        <Sun className="absolute h-5 w-5" />
      </div>
      <div className={`absolute flex items-center justify-center w-full h-full transition-transform duration-500 ease-in-out ${isDark ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-0 opacity-0'}`}>
        <Moon className="absolute h-5 w-5" />
      </div>
    </button>
  );
}
