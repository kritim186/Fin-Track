'use client';

import { useState } from 'react';
import { Transaction } from '@/features/transactions/transactions.types';
import { IndianRupee, Type, Tag, Calendar, LogInIcon, LogOutIcon } from 'lucide-react';

type FormState = {
  date: string;
  description: string;
  category: string;
  amount: string;
  type: 'income' | 'expense';
};

type FormErrors = Partial<Record<keyof FormState, string>>;

export default function AddTransactionForm({
  initialData,
  onSubmit,
}: {
  initialData?: Transaction;
  onSubmit: (txn: Transaction) => void;
}) {
  const [form, setForm] = useState<FormState>({
    date: initialData?.date || '',
    description: initialData?.description || '',
    category: initialData?.category || '',
    amount: initialData ? String(initialData.amount) : '',
    type: initialData?.type || 'expense',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  function validate(): boolean {
    const newErrors: FormErrors = {};

    if (!form.date) newErrors.date = 'Date is required';
    if (!form.description.trim())
      newErrors.description = 'Description is required';
    if (!form.category.trim()) newErrors.category = 'Category is required';

    const amountValue = Number(form.amount);
    if (!form.amount) newErrors.amount = 'Amount is required';
    else if (isNaN(amountValue) || amountValue <= 0)
      newErrors.amount = 'Amount must be greater than 0';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    onSubmit({
      id: initialData?.id ?? Date.now().toString(36) + Math.random().toString(36).substring(2, 9),
      date: form.date,
      description: form.description,
      category: form.category,
      amount: Number(form.amount),
      type: form.type,
    });

    setIsSubmitting(false);
  }

  function updateField<K extends keyof FormState>(
    key: K,
    value: FormState[K]
  ) {
    setForm(prev => ({ ...prev, [key]: value }));
    setErrors(prev => ({ ...prev, [key]: undefined }));
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="border-b border-gray-100 pb-4">
        <h3 className="text-xl font-bold text-gray-900 tracking-tight">
          {initialData ? 'Edit Transaction' : 'Add New Transaction'}
        </h3>
        <p className="mt-1.5 text-sm text-gray-500 font-medium">
          {initialData ? 'Update your transaction details below.' : 'Fill in the details for your new transaction.'}
        </p>
      </div>

      <div className="space-y-5">
        {/* Type Selection Tabs */}
        <div className="flex rounded-lg p-1 bg-gray-100/80 ring-1 ring-inset ring-gray-200/50 mb-6">
          <button
            type="button"
            onClick={() => updateField('type', 'expense')}
            className={`flex-1 flex justify-center items-center gap-2 py-2.5 text-sm font-semibold rounded-md transition-all duration-200 ${
              form.type === 'expense'
                ? 'bg-white text-rose-600 shadow-sm ring-1 ring-gray-200'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <LogOutIcon className="w-4 h-4" /> Expense
          </button>
          <button
            type="button"
            onClick={() => updateField('type', 'income')}
            className={`flex-1 flex justify-center items-center gap-2 py-2.5 text-sm font-semibold rounded-md transition-all duration-200 ${
              form.type === 'income'
                ? 'bg-white text-emerald-600 shadow-sm ring-1 ring-gray-200'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <LogInIcon className="w-4 h-4" /> Income
          </button>
        </div>

        {/* Date and Amount Row */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-gray-700 flex items-center gap-1.5"><Calendar className="w-4 h-4 text-gray-400" /> Date</label>
            <input
              type="date"
              className="w-full rounded-lg border border-gray-300 py-2.5 px-3.5 text-sm text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
              value={form.date}
              onChange={e => updateField('date', e.target.value)}
            />
            {errors.date && <p className="text-xs text-rose-600 font-medium">{errors.date}</p>}
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-gray-700 flex items-center gap-1.5"><IndianRupee className="w-4 h-4 text-gray-400" /> Amount</label>
            <div className="relative flex items-center">
              <span className="pointer-events-none absolute left-3.5 text-gray-500 font-medium pb-[1px]">₹</span>
              <input
                type="number"
                placeholder="0.00"
                className="w-full rounded-lg border border-gray-300 py-2.5 pl-8 pr-3.5 text-sm text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
                value={form.amount}
                onChange={e => updateField('amount', e.target.value)}
              />
            </div>
            {errors.amount && <p className="text-xs text-rose-600 font-medium">{errors.amount}</p>}
          </div>
        </div>

        {/* Description */}
        <div className="space-y-1.5">
          <label className="text-sm font-semibold text-gray-700 flex items-center gap-1.5"><Type className="w-4 h-4 text-gray-400" /> Description</label>
          <input
            placeholder="e.g. Weekly Groceries"
            className="w-full rounded-lg border border-gray-300 py-2.5 px-3.5 text-sm text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
            value={form.description}
            onChange={e => updateField('description', e.target.value)}
          />
          {errors.description && <p className="text-xs text-rose-600 font-medium">{errors.description}</p>}
        </div>

        {/* Category */}
        <div className="space-y-1.5">
          <label className="text-sm font-semibold text-gray-700 flex items-center gap-1.5"><Tag className="w-4 h-4 text-gray-400" /> Category</label>
          <input
            placeholder="e.g. Food, Utilities, Salary"
            className="w-full rounded-lg border border-gray-300 py-2.5 px-3.5 text-sm text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors mb-2"
            value={form.category}
            onChange={e => updateField('category', e.target.value)}
          />
          {errors.category && <p className="text-xs text-rose-600 font-medium">{errors.category}</p>}
        </div>
      </div>

      <div className="pt-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full flex justify-center py-3 px-4 rounded-xl shadow-sm text-sm font-bold text-white transition-all active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black ${
            isSubmitting
              ? 'bg-gray-400 cursor-not-allowed hidden'
              : 'bg-black hover:bg-gray-900 hover:shadow-md'
          }`}
        >
          {isSubmitting
            ? 'Saving...'
            : initialData
            ? 'Update Transaction'
            : 'Save Transaction'}
        </button>
      </div>
    </form>
  );
}
