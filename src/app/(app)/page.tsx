import PageHeader from '@/components/PageHeader';
import Card from '@/components/Card';
import CashFlowChart from '@/components/charts/CashFlowChart';
import SpendingBreakdownChart from '@/components/charts/SpendingBreakdownChart';
import { useDashboardData } from '@/features/dashboard/useDashboardData';

export default function DashboardPage() {
  const { summary, cashFlow, spendingBreakdown } = useDashboardData();

  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard"
        subtitle="Overview of your financial activity"
      />

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card title="Net Worth">
          <p className="text-xl font-semibold">₹ {summary.netWorth}</p>
        </Card>

        <Card title="This Month’s Income">
          <p className="text-xl font-semibold">₹ {summary.incomeThisMonth}</p>
        </Card>

        <Card title="This Month’s Expenses">
          <p className="text-xl font-semibold">₹ {summary.expenseThisMonth}</p>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card title="Cash Flow">
          <CashFlowChart data={cashFlow} />
        </Card>

        <Card title="Spending Breakdown">
          <SpendingBreakdownChart data={spendingBreakdown} />
        </Card>
      </div>
    </div>
  );
}
