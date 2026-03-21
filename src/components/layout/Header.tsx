'use client';

import { Bell, LogOut } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { signOut, useSession } from 'next-auth/react';

export default function Header() {
  const { data: session } = useSession();

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-gray-200/60 dark:border-white/5 bg-white/80 dark:bg-slate-950/80 px-6 md:px-8 backdrop-blur-md transition-colors">
      <div className="flex items-center gap-4">
        {/* Placeholder for Breadcrumbs or Search */}
      </div>

      <div className="flex items-center gap-5">
        <ThemeToggle />
        
        <button className="relative text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full border border-white dark:border-slate-900"></span>
        </button>
        <div className="flex items-center gap-3 pl-5 border-l border-gray-200 dark:border-white/10">
          <div className="hidden sm:flex flex-col text-right">
            <span className="text-sm font-semibold text-gray-900 dark:text-white leading-tight transition-colors">
              {session?.user?.name || 'Guest'}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400 font-medium tracking-wide transition-colors">
              {session?.user?.email || 'Not logged in'}
            </span>
          </div>
          <div className="group relative">
            <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-gray-800 to-black dark:from-indigo-500 dark:to-blue-500 ring-2 ring-white dark:ring-slate-900 shadow-md flex items-center justify-center text-white font-bold text-sm cursor-pointer hover:scale-105 transition-transform">
              {session?.user?.name?.[0] || 'G'}
            </div>
            
            {/* Interactive Logout Dropdown */}
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-900 rounded-xl shadow-lg ring-1 ring-black/5 dark:ring-white/10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all transform origin-top-right z-50">
              <div className="p-1.5">
                <button
                  onClick={() => signOut()}
                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Sign out securely
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
