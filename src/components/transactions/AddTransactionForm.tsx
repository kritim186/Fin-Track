'use client';

import { useState } from 'react';
import { Transaction } from '@/features/transactions/transactions.types';

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
      id: initialData?.id ?? crypto.randomUUID(),
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
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="text-lg font-semibold">
        {initialData ? 'Edit Transaction' : 'Add Transaction'}
      </h3>

      {/* Date */}
      <div>
        <input
          type="date"
          className="w-full rounded border p-2"
          value={form.date}
          onChange={e => updateField('date', e.target.value)}
        />
        {errors.date && (
          <p className="mt-1 text-xs text-red-600">{errors.date}</p>
        )}
      </div>

      {/* Description */}
      <div>
        <input
          placeholder="Description"
          className="w-full rounded border p-2"
          value={form.description}
          onChange={e => updateField('description', e.target.value)}
        />
        {errors.description && (
          <p className="mt-1 text-xs text-red-600">{errors.description}</p>
        )}
      </div>

      {/* Category */}
      <div>
        <input
          placeholder="Category"
          className="w-full rounded border p-2"
          value={form.category}
          onChange={e => updateField('category', e.target.value)}
        />
        {errors.category && (
          <p className="mt-1 text-xs text-red-600">{errors.category}</p>
        )}
      </div>

      {/* Amount */}
      <div>
        <input
          type="number"
          placeholder="Amount"
          className="w-full rounded border p-2"
          value={form.amount}
          onChange={e => updateField('amount', e.target.value)}
        />
        {errors.amount && (
          <p className="mt-1 text-xs text-red-600">{errors.amount}</p>
        )}
      </div>

      {/* Type */}
      <select
        className="w-full rounded border p-2"
        value={form.type}
        onChange={e =>
          updateField('type', e.target.value as 'income' | 'expense')
        }
      >
        <option value="expense">Expense</option>
        <option value="income">Income</option>
      </select>

      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full rounded py-2 text-white ${
          isSubmitting
            ? 'cursor-not-allowed bg-gray-400'
            : 'bg-black hover:bg-gray-800'
        }`}
      >
        {isSubmitting
          ? 'Saving...'
          : initialData
          ? 'Update'
          : 'Save'}
      </button>
    </form>
  );
}
