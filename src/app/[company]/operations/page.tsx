import { DashboardHeader } from "@/components/dashboard-header";
import { MembershipMetrics } from "@/components/membership-metrics";
import { OperationalMetrics } from "@/components/operational-metrics";

export default function OperationsPage() {
  return (
    <>
      <DashboardHeader title="Operations Dashboard" />
      <main className="flex-1 space-y-6 p-4 sm:px-6 lg:px-8">
        <OperationalMetrics />
        <MembershipMetrics />
      </main>
    </>
  );
}
