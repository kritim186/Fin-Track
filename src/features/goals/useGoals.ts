'use client';

import { useState, useEffect } from 'react';

export type Goal = {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
  icon: string;
};

const LOCAL_STORAGE_KEY = 'fintrack_goals';

const DEFAULT_GOALS: Goal[] = [
  { id: '1', name: 'Emergency Fund', targetAmount: 100000, currentAmount: 45000, deadline: '2026-12-31', icon: 'ShieldCheck' },
  { id: '2', name: 'New Car Down Payment', targetAmount: 500000, currentAmount: 125000, deadline: '2027-06-01', icon: 'Car' },
  { id: '3', name: 'MacBook Pro', targetAmount: 200000, currentAmount: 180000, deadline: '2026-05-15', icon: 'Laptop' },
];

export function useGoals() {
  const [goals, setGoals] = useState<Goal[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) {
      setGoals(JSON.parse(stored));
    } else {
      setGoals(DEFAULT_GOALS);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(DEFAULT_GOALS));
    }
  }, []);

  const addGoal = (goal: Omit<Goal, 'id'>) => {
    const newGoal: Goal = { ...goal, id: Date.now().toString(36) + Math.random().toString(36).substring(2, 9) };
    const updated = [...goals, newGoal];
    setGoals(updated);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
  };

  const updateGoal = (updatedGoal: Goal) => {
    const updated = goals.map(g => g.id === updatedGoal.id ? updatedGoal : g);
    setGoals(updated);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
  };

  const deleteGoal = (id: string) => {
    const updated = goals.filter(g => g.id !== id);
    setGoals(updated);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
  };

  return { goals, addGoal, updateGoal, deleteGoal };
}
