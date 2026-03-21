'use client';

import { useEffect, useState } from 'react';

export type Budget = {
  id: string;
  name: string;
  allocated: number;
  icon: string;
};

const API_BASE = 'http://localhost:4000/api/budgets';
const LOCAL_STORAGE_KEY = 'fintrack_budgets';

// Default initial budgets if empty
const DEFAULT_BUDGETS: Budget[] = [
  { id: '1', name: 'Groceries', allocated: 25000, icon: 'ShoppingCart' },
  { id: '2', name: 'Entertainment', allocated: 8000, icon: 'Film' },
  { id: '3', name: 'Housing', allocated: 40000, icon: 'Home' },
];

export function useBudgets() {
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Try to load from API, fallback to localStorage
    const loadBudgets = async () => {
      try {
        const res = await fetch(API_BASE);
        if (res.ok) {
          const data = await res.json();
          setBudgets(data);
          return;
        }
      } catch (err) {}

      // Fallback
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) {
        setBudgets(JSON.parse(stored));
      } else {
        setBudgets(DEFAULT_BUDGETS);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(DEFAULT_BUDGETS));
      }
      setLoading(false);
    };

    loadBudgets();
  }, []);

  const addBudget = async (budget: Omit<Budget, 'id'>) => {
    const newBudget: Budget = { ...budget, id: Date.now().toString(36) + Math.random().toString(36).substring(2, 9) };
    
    // Optimistic UI update
    const updated = [...budgets, newBudget];
    setBudgets(updated);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));

    // Try API
    try {
      await fetch(API_BASE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newBudget),
      });
    } catch (e) {
      // Ignore API failure if using local storage
    }
  };

  const updateBudget = async (updatedBudget: Budget) => {
    const updated = budgets.map(b => b.id === updatedBudget.id ? updatedBudget : b);
    setBudgets(updated);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));

    // Try API
    try {
      await fetch(`${API_BASE}/${updatedBudget.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedBudget),
      });
    } catch (e) {
      // Ignore API failure if using local storage
    }
  };

  const deleteBudget = async (id: string) => {
    const updated = budgets.filter(b => b.id !== id);
    setBudgets(updated);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));

    try {
      await fetch(`${API_BASE}/${id}`, {
        method: 'DELETE',
      });
    } catch (e) {
      // Ignore
    }
  };

  return { budgets, loading, addBudget, updateBudget, deleteBudget };
}
