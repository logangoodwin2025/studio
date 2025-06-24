import { DashboardHeader } from "@/components/dashboard-header";
import { FinancialMetrics } from "@/components/financial-metrics";

export default function FinancePage() {
  return (
    <>
      <DashboardHeader title="Finance Dashboard" />
      <main className="flex-1 space-y-6 p-4 sm:px-6 lg:px-8">
        <FinancialMetrics />
      </main>
    </>
  );
}
