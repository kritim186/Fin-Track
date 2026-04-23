'use client';

import { useEffect, useState } from 'react';
import { fetchBudgets as fetchBudgetsApi, createBudget as createBudgetApi, updateBudgetApi, deleteBudgetApi } from '@/services/api/budgets';

export type Budget = {
  id: string;
  name: string;
  allocated: number;
  icon: string;
};

const LOCAL_STORAGE_KEY = 'fintrack_budgets';
const DEFAULT_BUDGETS: Budget[] = [];

export function useBudgets() {
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function loadBudgets() {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchBudgetsApi();
      setBudgets(data);
      setLoading(false);
      return;
    } catch (err) {
      // Backend not reached, gracefully fall back
    }

    // Graceful fallback to LocalStorage
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) {
      setBudgets(JSON.parse(stored));
    } else {
      setBudgets(DEFAULT_BUDGETS);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(DEFAULT_BUDGETS));
    }
    setLoading(false);
  }

  useEffect(() => {
    loadBudgets();
  }, []);

  const addBudget = async (budget: Omit<Budget, 'id'>) => {
    const newId = Date.now().toString(36) + Math.random().toString(36).substring(2, 9);
    const newBudget = { ...budget, id: newId };
    
    const updated = [...budgets, newBudget];
    setBudgets(updated);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));

    try {
      await createBudgetApi(budget);
    } catch (err) {}
  };

  const updateBudget = async (updatedBudget: Budget) => {
    const updated = budgets.map(b => b.id === updatedBudget.id ? updatedBudget : b);
    setBudgets(updated);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));

    try {
      await updateBudgetApi(updatedBudget.id, updatedBudget);
    } catch (err) {}
  };

  const deleteBudget = async (id: string) => {
    const updated = budgets.filter(b => b.id !== id);
    setBudgets(updated);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));

    try {
      await deleteBudgetApi(id);
    } catch (err) {}
  };

  return { budgets, loading, error, addBudget, updateBudget, deleteBudget, refetch: loadBudgets };
}
