'use client';

import { Transaction } from '@/features/transactions/transactions.types';
import { Pencil, Trash2, ArrowDownRight, ArrowUpRight, ReceiptText } from 'lucide-react';

export default function TransactionsTable({
  transactions,
  onEdit,
  onDelete,
}: {
  transactions: Transaction[];
  onEdit: (txn: Transaction) => void;
  onDelete: (id: string) => void;
}) {
  function handleDelete(id: string) {
    const confirmed = window.confirm(
      'Are you sure you want to delete this transaction?'
    );
    if (confirmed) {
      onDelete(id);
    }
  }

  return (
    <div className="w-full overflow-x-auto rounded-xl border border-gray-200 shadow-sm bg-white">
      <table className="w-full text-sm text-left text-gray-500 whitespace-nowrap">
        <thead className="bg-gray-50/50 text-gray-700 uppercase font-semibold text-xs tracking-wider border-b border-gray-200">
          <tr>
            <th className="px-6 py-4 rounded-tl-xl">Date</th>
            <th className="px-6 py-4">Description</th>
            <th className="px-6 py-4">Category</th>
            <th className="px-6 py-4 text-right">Amount</th>
            <th className="px-6 py-4 text-center rounded-tr-xl">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {transactions.length > 0 ? (
            transactions.map((txn, index) => (
              <tr
                key={`${txn.id}-${index}`}
                className="bg-white hover:bg-gray-50 transition-colors duration-200 group"
              >
                <td className="px-6 py-4 font-medium text-gray-900">{txn.date}</td>
                <td className="px-6 py-4">
                  <div className="font-semibold text-gray-900">{txn.description}</div>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-medium bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-700/10">
                    {txn.category}
                  </span>
                </td>
                <td className="px-6 py-4 text-right font-semibold">
                  <div className={`flex justify-end items-center gap-1 ${txn.type === 'expense' ? 'text-rose-600' : 'text-emerald-600'}`}>
                    {txn.type === 'expense' ? <ArrowDownRight className="w-4 h-4 opacity-75" /> : <ArrowUpRight className="w-4 h-4 opacity-75" />}
                    ₹{txn.amount.toLocaleString()}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex justify-center items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <button
                      onClick={() => onEdit(txn)}
                      className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                      title="Edit transaction"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(txn.id)}
                      className="p-1.5 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors"
                      title="Delete transaction"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={5}
                className="px-6 py-16 text-center text-gray-500"
              >
                <div className="flex flex-col items-center justify-center space-y-3">
                  <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mb-2">
                    <ReceiptText className="w-6 h-6 text-gray-400" />
                  </div>
                  <p className="text-base text-gray-900 font-semibold">No transactions found</p>
                  <p className="text-sm text-gray-500 max-w-sm">Get started by adding a new expense or income using the button above.</p>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
