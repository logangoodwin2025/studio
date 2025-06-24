import { DashboardHeader } from "@/components/dashboard-header";
import { SalesMarketingMetrics } from "@/components/sales-marketing-metrics";

export default function SalesMarketingPage() {
  return (
    <>
      <DashboardHeader title="Sales & Marketing Dashboard" />
      <main className="flex-1 space-y-6 p-4 sm:px-6 lg:px-8">
        <SalesMarketingMetrics />
      </main>
    </>
  );
}
