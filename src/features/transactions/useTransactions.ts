'use client';

import { useEffect, useState } from 'react';
import { Transaction } from './transactions.types';

const API_BASE = 'http://localhost:4000/api/transactions';
const LOCAL_STORAGE_KEY = 'fintrack_transactions';

const DEFAULT_TRANSACTIONS: Transaction[] = [];

export function useTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function fetchTransactions() {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(API_BASE);
      if (res.ok) {
        const data = await res.json();
        setTransactions(data);
        setLoading(false);
        return;
      }
    } catch (err) {
      // Backend not reached, gracefully fall back
    }

    // Graceful fallback to LocalStorage
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) {
      setTransactions(JSON.parse(stored));
    } else {
      setTransactions(DEFAULT_TRANSACTIONS);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(DEFAULT_TRANSACTIONS));
    }
    setLoading(false);
  }

  // CREATE
  async function addTransaction(txn: Transaction) {
    const updated = [txn, ...transactions];
    setTransactions(updated);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));

    try {
      await fetch(API_BASE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(txn),
      });
    } catch (err) {}
  }

  // UPDATE
  async function updateTransaction(txn: Transaction) {
    const updated = transactions.map(t => (t.id === txn.id ? txn : t));
    setTransactions(updated);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));

    try {
      await fetch(`${API_BASE}/${txn.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(txn),
      });
    } catch (err) {}
  }

  // DELETE
  async function removeTransaction(id: string) {
    const updated = transactions.filter(t => t.id !== id);
    setTransactions(updated);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));

    try {
      await fetch(`${API_BASE}/${id}`, {
        method: 'DELETE',
      });
    } catch (err) {}
  }

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
