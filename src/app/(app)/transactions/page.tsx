'use client';

import { useState, useEffect } from 'react';
import PageHeader from '@/components/PageHeader';
import Card from '@/components/Card';
import Modal from '@/components/ui/Modal';
import TransactionsTable from '@/components/transactions/TransactionsTable';
import AddTransactionForm from '@/components/transactions/AddTransactionForm';
import { useTransactions } from '@/features/transactions/useTransactions';
import { Transaction } from '@/features/transactions/transactions.types';
import { Plus } from 'lucide-react';

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
    <div className="space-y-6 animate-in fade-in duration-500 max-w-7xl mx-auto">
      <PageHeader
        title="Transactions"
        subtitle="Track all your income and expenses"
        action={
          <button
            onClick={() => {
              setEditingTxn(null);
              setIsOpen(true);
            }}
            className="inline-flex items-center gap-2 rounded-lg bg-black px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black transition-all active:scale-95"
          >
            <Plus className="w-4 h-4" />
            Add Transaction
          </button>
        }
      />

      {/* Loading */}
      {loading && (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="rounded-xl border border-rose-200 bg-rose-50 p-6 shadow-sm">
          <h3 className="text-sm font-semibold text-rose-800">Error loading transactions</h3>
          <div className="mt-2 text-sm text-rose-700">
            <p>{error}</p>
          </div>
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
