'use client';

import { useEffect, useState } from 'react';
import { Transaction } from './transactions.types';

const API_BASE = 'http://localhost:4000/api/transactions';

export function useTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // GET all
  async function fetchTransactions() {
    try {
      setLoading(true);
      const res = await fetch(API_BASE);
      if (!res.ok) throw new Error('Failed to fetch transactions');
      const data = await res.json();
      setTransactions(data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }

  // CREATE
  async function addTransaction(txn: Transaction) {
    try {
      const res = await fetch(API_BASE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(txn),
      });
      if (!res.ok) throw new Error('Failed to add transaction');
      const created = await res.json();
      setTransactions(prev => [created, ...prev]);
    } catch (err) {
      setError((err as Error).message);
    }
  }

  // UPDATE
  async function updateTransaction(txn: Transaction) {
    try {
      const res = await fetch(`${API_BASE}/${txn.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(txn),
      });
      if (!res.ok) throw new Error('Failed to update transaction');
      const updated = await res.json();
      setTransactions(prev =>
        prev.map(t => (t.id === updated.id ? updated : t))
      );
    } catch (err) {
      setError((err as Error).message);
    }
  }

  // DELETE
  async function removeTransaction(id: string) {
    try {
      const res = await fetch(`${API_BASE}/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete transaction');
      setTransactions(prev => prev.filter(t => t.id !== id));
    } catch (err) {
      setError((err as Error).message);
    }
  }

  // Initial load
  useEffect(() => {
    fetchTransactions();
  }, []);

  return {
    transactions,
    loading,
    error,
    addTransaction,
    updateTransaction,
    removeTransaction,
    refetch: fetchTransactions,
  };
}
