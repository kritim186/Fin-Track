'use client';

import { useState } from 'react';
import PageHeader from '@/components/PageHeader';
import Card from '@/components/Card';
import Modal from '@/components/ui/Modal';
import AddGoalForm from '@/components/goals/AddGoalForm';
import { Plus, Pencil, Trash2, CalendarDays } from 'lucide-react';
import * as Icons from 'lucide-react';
import { useGoals, Goal } from '@/features/goals/useGoals';

export default function GoalsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingGoal, setEditingGoal] = useState<Goal | null>(null);
  
  const { goals, addGoal, updateGoal, deleteGoal } = useGoals();

  const handleSaveGoal = (data: { name: string; targetAmount: number; currentAmount: number; deadline: string; icon: string }) => {
    if (editingGoal) {
      updateGoal({ ...data, id: editingGoal.id });
    } else {
      addGoal(data);
    }
    closeModal();
  };

  const handleDeleteGoal = (id: string) => {
    if (confirm('Are you sure you want to completely delete this savings goal?')) {
      deleteGoal(id);
    }
  };

  const openCreateModal = () => {
    setEditingGoal(null);
    setIsModalOpen(true);
  };

  const openEditModal = (goal: Goal) => {
    setEditingGoal(goal);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingGoal(null);
  };

  // Helper formatting relative deadline
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-7xl mx-auto">
      <PageHeader
        title="Goals"
        subtitle="Track your progress towards major financial milestones"
        action={
          <button 
            onClick={openCreateModal}
            className="w-full sm:w-auto inline-flex justify-center items-center gap-2 rounded-xl bg-black px-5 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-gray-800 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black transition-all active:scale-[0.98]"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden xs:inline sm:inline">New Goal</span>
          </button>
        }
      />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {goals.map((goal) => {
          const percentage = Math.min(100, Math.round((goal.currentAmount / goal.targetAmount) * 100));
          const isCompleted = percentage >= 100;
          
          const IconComponent = (Icons as any)[goal.icon] || Icons.HelpCircle;

          // Unique Goal Layout: Blue/Indigo based design indicating saving rather than negative/positive thresholds
          return (
            <Card key={goal.id}>
              {/* Card Header w/ Edit Controls */}
              <div className="flex items-start justify-between mb-8 group">
                <div className="flex items-center gap-4">
                  <div className={`p-4 rounded-2xl ${isCompleted ? 'bg-emerald-500 text-white shadow-emerald-500/20 shadow-lg' : 'bg-gradient-to-tr from-indigo-500 to-blue-500 text-white shadow-blue-500/20 shadow-lg'}`}>
                    <IconComponent className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white tracking-tight transition-colors">{goal.name}</h3>
                    <div className="flex items-center gap-1.5 mt-0.5 text-sm font-medium text-gray-500">
                      <CalendarDays className="w-4 h-4 text-gray-400" />
                      Target: {formatDate(goal.deadline)}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={() => openEditModal(goal)}
                    className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => handleDeleteGoal(goal.id)}
                    className="p-1.5 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Amount Progress */}
              <div className="mb-3 flex items-end justify-between">
                <div>
                  <p className="text-3xl font-black text-gray-900 dark:text-white tracking-tight transition-colors">
                    ₹{goal.currentAmount.toLocaleString()}
                  </p>
                </div>
                <div className="text-right pb-1">
                  <p className="text-base font-bold text-gray-400">/ ₹{goal.targetAmount.toLocaleString()}</p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="relative w-full h-3.5 bg-gray-100 rounded-full overflow-hidden mb-3">
                <div
                  className={`absolute top-0 left-0 h-full rounded-full transition-all duration-1000 ease-out ${isCompleted ? 'bg-emerald-500' : 'bg-gradient-to-r from-indigo-500 to-blue-500'}`}
                  style={{ width: `${percentage}%` }}
                />
              </div>

              {/* Footer text */}
              <div className="flex justify-between items-center text-sm font-bold">
                <span className={isCompleted ? 'text-emerald-600' : 'text-blue-600'}>
                  {percentage}% {isCompleted ? 'Achieved!' : 'Saved'}
                </span>
                <span className="text-gray-500">
                  {isCompleted ? '🎉' : `₹${(goal.targetAmount - goal.currentAmount).toLocaleString()} needed`}
                </span>
              </div>
            </Card>
          );
        })}

        {goals.length === 0 && (
          <div className="col-span-full py-16 text-center bg-gray-50 border border-gray-100 rounded-2xl border-dashed">
            <Icons.Target className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-gray-900 dark:text-white transition-colors">No active goals</h3>
            <p className="text-gray-500 dark:text-gray-400 mt-1 max-w-sm mx-auto transition-colors">It's a great time to start saving. Create your first financial goal above!</p>
          </div>
        )}
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <AddGoalForm initialData={editingGoal ?? undefined} onSubmit={handleSaveGoal} />
      </Modal>
    </div>
  );
}
