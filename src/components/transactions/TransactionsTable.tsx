'use client';

import { Transaction } from '@/features/transactions/transactions.types';

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
    <div style={{ width: '100%', overflowX: 'auto' }}>
      <table
        style={{
          width: '100%',
          borderCollapse: 'collapse',
          display: 'table',
        }}
      >
        <thead style={{ display: 'table-header-group' }}>
          <tr style={{ display: 'table-row' }}>
            <th style={{ padding: 12, textAlign: 'left' }}>Date</th>
            <th style={{ padding: 12, textAlign: 'left' }}>Description</th>
            <th style={{ padding: 12, textAlign: 'left' }}>Category</th>
            <th style={{ padding: 12, textAlign: 'right' }}>Amount</th>
            <th style={{ padding: 12, textAlign: 'right' }}>Actions</th>
          </tr>
        </thead>

        <tbody style={{ display: 'table-row-group' }}>
          {transactions.length > 0 ? (
            transactions.map((txn, index) => (
              <tr
                key={`${txn.id}-${index}`}
                style={{
                  display: 'table-row',
                  borderTop: '1px solid #e5e7eb',
                }}
              >
                <td style={{ padding: 12 }}>{txn.date}</td>
                <td style={{ padding: 12 }}>{txn.description}</td>
                <td style={{ padding: 12 }}>{txn.category}</td>
                <td style={{ padding: 12, textAlign: 'right' }}>
                  {txn.type === 'expense' ? '-' : '+'}₹ {txn.amount}
                </td>
                <td style={{ padding: 12, textAlign: 'right' }}>
                  <button
                    onClick={() => onEdit(txn)}
                    style={{ marginRight: 8 }}
                  >
                    Edit
                  </button>
                  <button onClick={() => handleDelete(txn.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr style={{ display: 'table-row' }}>
              <td
                colSpan={5}
                style={{
                  padding: 16,
                  textAlign: 'center',
                  color: '#6b7280',
                }}
              >
                No transactions yet
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
