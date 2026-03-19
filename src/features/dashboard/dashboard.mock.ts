export const dashboardMockData = {
  summary: {
    netWorth: 0,
    incomeThisMonth: 0,
    expenseThisMonth: 0,
  },

  cashFlow: [
    { month: 'Jan', income: 50000, expense: 42000 },
    { month: 'Feb', income: 52000, expense: 40000 },
    { month: 'Mar', income: 51000, expense: 45000 },
    { month: 'Apr', income: 54000, expense: 43000 },
  ],

  spendingBreakdown: [
    { name: 'Rent', value: 20000 },
    { name: 'Food', value: 12000 },
    { name: 'Transport', value: 5000 },
    { name: 'Entertainment', value: 3000 },
  ],
};
