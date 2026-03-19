import { Transaction } from './transactions.types';

export const transactionsMock: Transaction[] = [
  {
    id: '1',
    date: '2026-01-10',
    description: 'Salary',
    category: 'Income',
    amount: 50000,
    type: 'income',
  },
  {
    id: '2',
    date: '2026-01-12',
    description: 'Groceries',
    category: 'Food',
    amount: 2500,
    type: 'expense',
  },
  {
    id: '3',
    date: '2026-01-15',
    description: 'Rent',
    category: 'Housing',
    amount: 18000,
    type: 'expense',
  },
];
