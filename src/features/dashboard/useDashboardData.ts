import { dashboardMockData } from './dashboard.mock';

export function useDashboardData() {
  // Later: replace this with API call
  return {
    summary: dashboardMockData.summary,
    cashFlow: dashboardMockData.cashFlow,
    spendingBreakdown: dashboardMockData.spendingBreakdown,
  };
}
