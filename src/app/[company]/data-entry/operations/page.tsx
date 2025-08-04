
import { DashboardHeader } from "@/components/dashboard-header";
import { OperationsForm } from "@/components/data-entry/operations-form";

export default function OperationsDataEntryPage() {
  return (
    <>
      <DashboardHeader
        title="Operations Data Entry"
        description="Input operational metrics and KPIs for a specific period"
      />
      <main className="flex-1 p-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
            <OperationsForm />
        </div>
      </main>
    </>
  );
}
