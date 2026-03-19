'use client';

import Link from 'next/link';

const NAV_ITEMS = [
  { name: 'Dashboard', href: '/' },
  { name: 'Transactions', href: '/transactions' },
  { name: 'Budgets', href: '/budgets' },
  { name: 'Goals', href: '/goals' },
];

export default function Sidebar() {
  return (
    <aside className="w-60 border-r border-gray-200 p-4">
      <h2 className="text-lg font-semibold">FinTrack</h2>

      <nav className="mt-6 space-y-2 text-sm">
        {NAV_ITEMS.map(item => (
          <Link
            key={item.name}
            href={item.href}
            className="block rounded px-2 py-1 hover:bg-gray-100"
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
