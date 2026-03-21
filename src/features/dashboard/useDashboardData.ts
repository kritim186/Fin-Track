'use client';

import { useTransactions } from '@/features/transactions/useTransactions';

export function useDashboardData() {
  const { transactions } = useTransactions();

  const now = new Date();
  const currentMonthStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;

  let totalIncome = 0;
  let totalExpense = 0;
  let incomeThisMonth = 0;
  let expenseThisMonth = 0;

  const categorySpending: Record<string, number> = {};
  const monthlyFlow: Record<string, { income: number; expense: number }> = {};

  transactions.forEach(t => {
    const isThisMonth = t.date.startsWith(currentMonthStr);
    const monthKey = t.date.substring(0, 7); // e.g., '2026-03'

    if (!monthlyFlow[monthKey]) {
      monthlyFlow[monthKey] = { income: 0, expense: 0 };
    }

    if (t.type === 'income') {
      totalIncome += t.amount;
      monthlyFlow[monthKey].income += t.amount;
      if (isThisMonth) incomeThisMonth += t.amount;
    } else {
      totalExpense += t.amount;
      monthlyFlow[monthKey].expense += t.amount;
      if (isThisMonth) expenseThisMonth += t.amount;

      // Group category spending
      categorySpending[t.category] = (categorySpending[t.category] || 0) + t.amount;
    }
  });

  const netWorth = totalIncome - totalExpense;

  const spendingBreakdown = Object.keys(categorySpending)
    .map(name => ({ name, value: categorySpending[name] }))
    .sort((a, b) => b.value - a.value); // sort largest to smallest

  const cashFlowKeys = Object.keys(monthlyFlow).sort(); // chronological
  const cashFlow = cashFlowKeys.map(month => {
    // Attempt parsing 'YYYY-MM' robustly
    const [year, m] = month.split('-');
    const dateObj = new Date(Number(year), Number(m) - 1, 1);
    const monthName = dateObj.toLocaleDateString('en-US', { month: 'short' });
    
    return {
      month: monthName,
      income: monthlyFlow[month].income,
      expense: monthlyFlow[month].expense,
    };
  });

  // Safe fallbacks for empty states
  const resolvedCashFlow = cashFlow.length > 0 ? cashFlow : [
    { month: 'Jan', income: 0, expense: 0 },
    { month: 'Feb', income: 0, expense: 0 },
    { month: 'Mar', income: 0, expense: 0 },
  ];
  
  const resolvedBreakdown = spendingBreakdown.length > 0 ? spendingBreakdown : [
    { name: 'No Expenses Yet', value: 1 }
  ];

  return {
    summary: {
      netWorth,
      incomeThisMonth,
      expenseThisMonth,
    },
    cashFlow: resolvedCashFlow,
    spendingBreakdown: resolvedBreakdown,
  };
}
