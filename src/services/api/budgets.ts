import { Budget } from '@/features/budgets/useBudgets';

const API_BASE = 'http://localhost:4000/api/budgets';

export async function fetchBudgets(): Promise<Budget[]> {
  const res = await fetch(API_BASE);
  if (!res.ok) throw new Error('Failed to fetch budgets');
  return res.json();
}

export async function createBudget(data: Omit<Budget, 'id'>): Promise<Budget> {
  const res = await fetch(API_BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to create budget');
  return res.json();
}

export async function updateBudgetApi(id: string, data: Budget): Promise<Budget> {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to update budget');
  return res.json();
}

export async function deleteBudgetApi(id: string): Promise<void> {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete budget');
}
