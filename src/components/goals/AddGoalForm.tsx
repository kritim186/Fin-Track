'use client';

import { useState, useEffect } from 'react';
import * as Icons from 'lucide-react';

type AddGoalFormProps = {
  initialData?: { id: string; name: string; targetAmount: number; currentAmount: number; deadline: string; icon: string };
  onSubmit: (data: { name: string; targetAmount: number; currentAmount: number; deadline: string; icon: string }) => void;
};

const ALLOWED_ICONS = [
  'Target', 'ShieldCheck', 'Car', 'Laptop', 'Palmtree', 'Home', 'GraduationCap', 'Wallet', 'Coins', 'PiggyBank'
];

export default function AddGoalForm({ initialData, onSubmit }: AddGoalFormProps) {
  const [name, setName] = useState(initialData?.name || '');
  const [targetAmount, setTargetAmount] = useState(initialData ? String(initialData.targetAmount) : '');
  const [currentAmount, setCurrentAmount] = useState(initialData ? String(initialData.currentAmount) : '');
  const [deadline, setDeadline] = useState(initialData?.deadline || '');
  const [icon, setIcon] = useState(initialData?.icon || 'Target');
  const [error, setError] = useState('');

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setTargetAmount(String(initialData.targetAmount));
      setCurrentAmount(String(initialData.currentAmount));
      setDeadline(initialData.deadline);
      setIcon(initialData.icon);
    } else {
      setName('');
      setTargetAmount('');
      setCurrentAmount('');
      setDeadline('');
      setIcon('Target');
    }
    setError('');
  }, [initialData]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !deadline) {
      setError('Please provide a goal name and target deadline');
      return;
    }
    const targetNum = Number(targetAmount);
    const currentNum = Number(currentAmount) || 0;
    
    if (!targetAmount || isNaN(targetNum) || targetNum <= 0) {
      setError('Please enter a valid target amount greater than 0');
      return;
    }

    if (currentNum < 0 || currentNum > targetNum) {
      setError('Current amount must be between 0 and your target amount');
      return;
    }

    onSubmit({ name: name.trim(), targetAmount: targetNum, currentAmount: currentNum, deadline, icon });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="border-b border-gray-100 pb-4">
        <h3 className="text-xl font-bold text-gray-900 tracking-tight">
          {initialData ? 'Edit Savings Goal' : 'Create New Goal'}
        </h3>
        <p className="mt-1.5 text-sm text-gray-500 font-medium">
          Set up a target to save money towards a specific milestone.
        </p>
      </div>

      {error && (
        <div className="rounded-lg bg-rose-50 p-3 text-sm text-rose-700 font-medium border border-rose-200">
          {error}
        </div>
      )}

      <div className="space-y-4">
        <div className="space-y-1.5">
          <label className="text-sm font-semibold text-gray-700">Goal Name</label>
          <input
            type="text"
            placeholder="e.g., Vacation to Hawaii"
            value={name}
            onChange={(e) => { setName(e.target.value); setError(''); }}
            className="w-full rounded-lg border border-gray-300 py-2.5 px-3.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-gray-700">Target Amount (₹)</label>
            <div className="relative flex items-center">
              <span className="pointer-events-none absolute left-3.5 text-gray-500 font-medium pb-[1px]">₹</span>
              <input
                type="number"
                placeholder="50,000"
                value={targetAmount}
                onChange={(e) => { setTargetAmount(e.target.value); setError(''); }}
                className="w-full rounded-lg border border-gray-300 py-2.5 pl-8 pr-3.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-gray-700">Current Saved (₹)</label>
            <div className="relative flex items-center">
              <span className="pointer-events-none absolute left-3.5 text-gray-500 font-medium pb-[1px]">₹</span>
              <input
                type="number"
                placeholder="0"
                value={currentAmount}
                onChange={(e) => { setCurrentAmount(e.target.value); setError(''); }}
                className="w-full rounded-lg border border-gray-300 py-2.5 pl-8 pr-3.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-semibold text-gray-700">Target Deadline</label>
          <input
            type="date"
            value={deadline}
            onChange={(e) => { setDeadline(e.target.value); setError(''); }}
            className="w-full rounded-lg border border-gray-300 py-2.5 px-3.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700">Choose Icon</label>
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
                      ? 'bg-blue-50 border-blue-500 ring-2 ring-blue-500/20 text-blue-600 shadow-sm' 
                      : 'bg-gray-50 border-transparent text-gray-500 hover:bg-gray-100 hover:text-gray-900'
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
          className="w-full flex justify-center py-3 px-4 rounded-xl shadow-sm text-sm font-bold text-white bg-black hover:bg-gray-900 transition-all active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
        >
          {initialData ? 'Save Changes' : 'Create Goal'}
        </button>
      </div>
    </form>
  );
}
