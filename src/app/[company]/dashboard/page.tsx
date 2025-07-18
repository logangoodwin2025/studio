import { DashboardHeader } from "@/components/dashboard-header";
import { FinanceDashboardView } from "@/components/dashboards/finance-dashboard-view";

export default function DashboardPage() {
  return (
    <>
      <DashboardHeader
        title="Finance Dashboard"
        description="Key financial metrics and performance indicators."
      />
      <main className="flex-1 p-4 sm:px-6 lg:px-8 space-y-6">
        <FinanceDashboardView />
      </main>
    </>
  );
}
