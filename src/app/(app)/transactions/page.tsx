'use client';

import { useState, useEffect } from 'react';
import PageHeader from '@/components/PageHeader';
import Card from '@/components/Card';
import Modal from '@/components/ui/Modal';
import TransactionsTable from '@/components/transactions/TransactionsTable';
import AddTransactionForm from '@/components/transactions/AddTransactionForm';
import { useTransactions } from '@/features/transactions/useTransactions';
import { Transaction } from '@/features/transactions/transactions.types';

export default function TransactionsPage() {
  const {
    transactions,
    addTransaction,
    updateTransaction,
    removeTransaction,
    loading,
    error,
  } = useTransactions();

  const [isOpen, setIsOpen] = useState(false);
  const [editingTxn, setEditingTxn] = useState<Transaction | null>(null);

  // ✅ DEBUG (DO NOT REMOVE YET)
  useEffect(() => {
    console.log('TRANSACTIONS FROM API:', transactions);
  }, [transactions]);

  function closeModal() {
    setIsOpen(false);
    setEditingTxn(null);
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Transactions"
        subtitle="Track all your income and expenses"
        action={
          <button
            onClick={() => {
              setEditingTxn(null);
              setIsOpen(true);
            }}
            className="rounded-md bg-black px-4 py-2 text-sm text-white"
          >
            Add Transaction
          </button>
        }
      />

      {/* Loading */}
      {loading && (
        <div className="text-sm text-gray-500">Loading transactions...</div>
      )}

      {/* Error */}
      {error && (
        <div className="text-sm text-red-600">
          Error loading transactions: {error}
        </div>
      )}

      {/* Table */}
      {!loading && !error && (
        <Card>
          <TransactionsTable
            transactions={transactions}
            onEdit={txn => {
              setEditingTxn(txn);
              setIsOpen(true);
            }}
            onDelete={id => removeTransaction(id)}
          />
        </Card>
      )}

      {/* Modal */}
      <Modal isOpen={isOpen} onClose={closeModal}>
        <AddTransactionForm
          initialData={editingTxn ?? undefined}
          onSubmit={txn => {
            if (editingTxn) {
              updateTransaction(txn);
            } else {
              addTransaction(txn);
            }
            closeModal();
          }}
        />
      </Modal>
    </div>
  );
}
