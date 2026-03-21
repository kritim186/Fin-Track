'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, ReceiptText, Wallet, Target, Activity } from 'lucide-react';

const NAV_ITEMS = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Transactions', href: '/transactions', icon: ReceiptText },
  { name: 'Budgets', href: '/budgets', icon: Wallet },
  { name: 'Goals', href: '/goals', icon: Target },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r border-gray-200/60 dark:border-white/5 bg-white dark:bg-slate-950 flex flex-col shadow-[1px_0_4px_rgba(0,0,0,0.02)] z-10 transition-colors">
      <div className="flex h-16 items-center px-6 border-b border-gray-100/80 dark:border-white/5 transition-colors">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="flex items-center justify-center w-8 h-8 bg-black dark:bg-white rounded-lg shadow-sm group-hover:scale-105 transition-transform">
            <Activity className="w-4 h-4 text-white dark:text-black" />
          </div>
          <span className="text-lg font-bold tracking-tight text-gray-900 dark:text-white transition-colors">FinTrack</span>
        </Link>
      </div>

      <nav className="flex-1 space-y-1.5 px-3 py-6">
        {NAV_ITEMS.map(item => {
          const isActive = pathname === item.href || (pathname.startsWith(item.href) && item.href !== '/');
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-black dark:bg-white text-white dark:text-black shadow-md shadow-black/10'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-900 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <item.icon className={`w-5 h-5 transition-colors ${isActive ? 'text-white dark:text-black' : 'text-gray-400 dark:text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-300'}`} />
              {item.name}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
