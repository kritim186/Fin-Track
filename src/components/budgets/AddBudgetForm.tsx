'use client';

import { useState, useEffect } from 'react';
import * as Icons from 'lucide-react';
import { toast } from 'sonner';

type AddBudgetFormProps = {
  initialData?: { id: string; name: string; allocated: number; icon: string };
  onSubmit: (data: { name: string; allocated: number; icon: string }) => void;
};

// Selection of allowed icons for budgets
const ALLOWED_ICONS = [
  'ShoppingCart', 'Film', 'Lightbulb', 'Utensils', 
  'Car', 'Home', 'Plane', 'Coffee', 'Smartphone', 'Gift'
];

export default function AddBudgetForm({ initialData, onSubmit }: AddBudgetFormProps) {
  const [name, setName] = useState(initialData?.name || '');
  const [allocated, setAllocated] = useState(initialData ? String(initialData.allocated) : '');
  const [icon, setIcon] = useState(initialData?.icon || 'ShoppingCart');
  const [error, setError] = useState('');

  // Update internal state if initialData changes (e.g. reopening modal with different budget)
  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setAllocated(String(initialData.allocated));
      setIcon(initialData.icon);
    } else {
      setName('');
      setAllocated('');
      setIcon('ShoppingCart');
    }
    setError('');
  }, [initialData]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) {
      setError('Budget name is required');
      return;
    }
    const amountNum = Number(allocated);
    if (!allocated || isNaN(amountNum) || amountNum <= 0) {
      setError('Please enter a valid amount greater than 0');
      return;
    }

    onSubmit({ name: name.trim(), allocated: amountNum, icon });
    toast.success(initialData ? 'Budget updated successfully!' : 'Budget created successfully!');
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="border-b border-gray-100 dark:border-gray-800 pb-4">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">
          {initialData ? 'Edit Budget' : 'Create New Budget'}
        </h3>
        <p className="mt-1.5 text-sm text-gray-500 dark:text-gray-400 font-medium">
          {initialData ? 'Modify your spending limits for this category.' : 'Set spending limits for a specific category.'}
        </p>
      </div>

      {error && (
        <div className="rounded-lg bg-rose-50 p-3 text-sm text-rose-700 font-medium border border-rose-200">
          {error}
        </div>
      )}

      <div className="space-y-4">
        <div className="space-y-1.5">
          <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Category Name</label>
          <input
            type="text"
            placeholder="e.g., Weekend Travel"
            value={name}
            onChange={(e) => { setName(e.target.value); setError(''); }}
            className="w-full rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white py-2.5 px-3.5 text-sm text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Monthly Limit (₹)</label>
          <div className="relative flex items-center">
            <span className="pointer-events-none absolute left-3.5 text-gray-500 dark:text-gray-400 font-medium pb-[1px]">₹</span>
            <input
              type="number"
              placeholder="0.00"
              value={allocated}
              onChange={(e) => { setAllocated(e.target.value); setError(''); }}
              className="w-full rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white py-2.5 pl-8 pr-3.5 text-sm text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Choose Icon</label>
          <div className="grid grid-cols-5 gap-2">
            {ALLOWED_ICONS.map(iconName => {
              const IconComponent = (Icons as any)[iconName];
              if (!IconComponent) return null;
              
              const isSelected = icon === iconName;
              return (
                <button
                  key={iconName}
                  type="button"
                  onClick={() => setIcon(iconName)}
                  className={`flex items-center justify-center p-3 rounded-xl transition-all ${
                    isSelected 
                      ? 'bg-blue-50 dark:bg-blue-900/30 border-blue-500 dark:border-blue-400 ring-2 ring-blue-500/20 text-blue-600 dark:text-blue-400 shadow-sm' 
                      : 'bg-gray-50 dark:bg-gray-800 border-transparent text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-200'
                  } border`}
                >
                  <IconComponent className="w-5 h-5" />
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="pt-4">
        <button
          type="submit"
          className="w-full flex justify-center py-3 px-4 rounded-xl shadow-sm text-sm font-bold text-white bg-black dark:bg-white dark:text-black hover:bg-gray-900 dark:hover:bg-gray-100 transition-all active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
        >
          {initialData ? 'Save Changes' : 'Create Budget'}
        </button>
      </div>
    </form>
  );
}
