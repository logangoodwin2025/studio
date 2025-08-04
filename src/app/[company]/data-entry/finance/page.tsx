
import { DashboardHeader } from "@/components/dashboard-header";
import { FinanceForm } from "@/components/data-entry/finance-form";

export default function FinanceDataEntryPage() {
  return (
    <>
      <DashboardHeader
        title="Finance Data Entry"
        description="Input financial metrics and KPIs for a specific period"
      />
      <main className="flex-1 p-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
            <FinanceForm />
        </div>
      </main>
    </>
  );
}
