'use client';

import PageHeader from '@/components/PageHeader';
import Card from '@/components/Card';
import CashFlowChart from '@/components/charts/CashFlowChart';
import SpendingBreakdownChart from '@/components/charts/SpendingBreakdownChart';
import { useDashboardData } from '@/features/dashboard/useDashboardData';
import { Wallet, TrendingUp, TrendingDown } from 'lucide-react';

export default function DashboardPage() {
  const { summary, cashFlow, spendingBreakdown } = useDashboardData();

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-7xl mx-auto">
      <PageHeader
        title="Dashboard"
        subtitle="Total overview of your financial activity"
      />

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card title="Net Worth">
          <div className="flex items-center gap-4 mt-1">
            <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 ring-1 ring-inset ring-indigo-600/20">
              <Wallet className="w-6 h-6" />
            </div>
            <p className="text-3xl font-black tracking-tight text-gray-900 dark:text-white transition-colors">
              ₹{summary.netWorth.toLocaleString()}
            </p>
          </div>
        </Card>

        <Card title="This Month’s Income">
          <div className="flex items-center gap-4 mt-1">
            <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 ring-1 ring-inset ring-emerald-600/20">
              <TrendingUp className="w-6 h-6" />
            </div>
            <p className="text-3xl font-black tracking-tight text-gray-900 dark:text-white transition-colors">
              ₹{summary.incomeThisMonth.toLocaleString()}
            </p>
          </div>
        </Card>

        <Card title="This Month’s Expenses">
          <div className="flex items-center gap-4 mt-1">
            <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 ring-1 ring-inset ring-rose-600/20">
              <TrendingDown className="w-6 h-6" />
            </div>
            <p className="text-3xl font-black tracking-tight text-gray-900 dark:text-white transition-colors">
              ₹{summary.expenseThisMonth.toLocaleString()}
            </p>
          </div>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card title="Cash Flow Overview">
          <CashFlowChart data={cashFlow} />
        </Card>

        <Card title="Spending Breakdown">
          <SpendingBreakdownChart data={spendingBreakdown} />
        </Card>
      </div>
    </div>
  );
}
