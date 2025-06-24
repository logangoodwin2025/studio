import { DashboardCharts } from "@/components/dashboard-charts";
import { DashboardHeader } from "@/components/dashboard-header";
import { FinancialMetrics } from "@/components/financial-metrics";
import { MembershipMetrics } from "@/components/membership-metrics";
import { OperationalMetrics } from "@/components/operational-metrics";
import { SalesMarketingMetrics } from "@/components/sales-marketing-metrics";

export default function DashboardPage() {
  return (
    <>
      <DashboardHeader title="CEO/Executive Dashboard" />
      <main className="flex-1 space-y-6 p-4 sm:px-6 lg:px-8">
        <DashboardCharts />
        <FinancialMetrics />
        <MembershipMetrics />
        <SalesMarketingMetrics />
        <OperationalMetrics />
      </main>
    </>
  );
}
