'use client';

import { useState } from 'react';
import PageHeader from '@/components/PageHeader';
import Card from '@/components/Card';
import Modal from '@/components/ui/Modal';
import AddBudgetForm from '@/components/budgets/AddBudgetForm';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import * as Icons from 'lucide-react';
import { useBudgets, Budget } from '@/features/budgets/useBudgets';
import { useTransactions } from '@/features/transactions/useTransactions';

export default function BudgetsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBudget, setEditingBudget] = useState<Budget | null>(null);
  
  const { budgets, addBudget, updateBudget, deleteBudget } = useBudgets();
  const { transactions } = useTransactions();

  const handleSaveBudget = async (data: { name: string; allocated: number; icon: string }) => {
    if (editingBudget) {
      await updateBudget({ ...data, id: editingBudget.id });
    } else {
      await addBudget(data);
    }
    closeModal();
  };

  const handleDeleteBudget = async (id: string) => {
    if (confirm('Are you sure you want to delete this budget?')) {
      await deleteBudget(id);
    }
  };

  const openCreateModal = () => {
    setEditingBudget(null);
    setIsModalOpen(true);
  };

  const openEditModal = (budget: Budget) => {
    setEditingBudget(budget);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingBudget(null);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-7xl mx-auto">
      <PageHeader
        title="Budgets"
        subtitle="Monitor and control your monthly spending limits"
        action={
          <button 
            onClick={openCreateModal}
            className="w-full sm:w-auto inline-flex justify-center items-center gap-2 rounded-xl bg-black px-5 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-gray-800 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black transition-all active:scale-[0.98]"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden xs:inline sm:inline">Create Budget</span>
          </button>
        }
      />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {budgets.map((budget) => {
          const spent = transactions
            .filter(t => t.type === 'expense' && t.category.toLowerCase() === budget.name.toLowerCase())
            .reduce((sum, t) => sum + t.amount, 0);

          const percentage = Math.min(100, Math.round((spent / budget.allocated) * 100));
          const remaining = budget.allocated - spent;
          
          let ProgressColor = 'bg-emerald-500';
          let BadgeColor = 'bg-emerald-50 text-emerald-700 ring-emerald-600/20';
          let StatusText = 'On track';
          
          if (percentage >= 100) {
            ProgressColor = 'bg-rose-500';
            BadgeColor = 'bg-rose-50 text-rose-700 ring-rose-600/20';
            StatusText = 'Over budget';
          } else if (percentage >= 80) {
            ProgressColor = 'bg-amber-500';
            BadgeColor = 'bg-amber-50 text-amber-700 ring-amber-600/20';
            StatusText = 'Nearing limit';
          } else {
            ProgressColor = 'bg-blue-500';
            BadgeColor = 'bg-blue-50 text-blue-700 ring-blue-600/20';
          }

          const IconComponent = (Icons as any)[budget.icon] || Icons.HelpCircle;

          return (
            <Card key={budget.id}>
              {/* Card Header w/ Edit Controls */}
              <div className="flex items-center justify-between mb-6 group">
                <div className="flex items-center gap-3">
                  <div className={`p-2.5 rounded-xl ${BadgeColor} ring-1 ring-inset`}>
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-gray-900 dark:text-white transition-colors">{budget.name}</h3>
                </div>
                
                <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={() => openEditModal(budget)}
                    className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                    title="Edit budget"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => handleDeleteBudget(budget.id)}
                    className="p-1.5 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors"
                    title="Delete budget"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                
                {/* Fallback badge for mobile without hover */}
                <span className={`lg:hidden inline-flex items-center rounded-full px-2 py-1 text-[10px] font-bold uppercase tracking-wider ${BadgeColor} ring-1 ring-inset group-hover:hidden`}>
                  {StatusText}
                </span>
                <span className={`hidden lg:inline-flex group-hover:hidden items-center rounded-full px-2 py-1 text-[10px] font-bold uppercase tracking-wider ${BadgeColor} ring-1 ring-inset`}>
                  {StatusText}
                </span>
              </div>

              {/* Amount Details */}
              <div className="mb-2 flex items-end justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1 transition-colors">Spent</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight transition-colors">₹{spent.toLocaleString()}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1 transition-colors">Budget</p>
                  <p className="text-base font-semibold text-gray-400">₹{budget.allocated.toLocaleString()}</p>
                </div>
              </div>

              {/* Progress Bar Container */}
              <div className="relative w-full h-2.5 bg-gray-100 rounded-full overflow-hidden mb-4">
                <div
                  className={`absolute top-0 left-0 h-full rounded-full transition-all duration-1000 ease-out ${ProgressColor}`}
                  style={{ width: `${percentage}%` }}
                />
              </div>

              {/* Footer Status */}
              <div className="flex justify-between items-center text-sm font-medium">
                <span className="text-gray-500 dark:text-gray-400 transition-colors">{percentage}% used</span>
                <span className={remaining <= 0 ? 'text-rose-600 font-bold' : 'text-gray-900 dark:text-white font-semibold transition-colors'}>
                  {remaining > 0 ? `₹${remaining.toLocaleString()} left` : `₹${Math.abs(remaining).toLocaleString()} over`}
                </span>
              </div>
            </Card>
          );
        })}
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <AddBudgetForm initialData={editingBudget ?? undefined} onSubmit={handleSaveBudget} />
      </Modal>
    </div>
  );
}
