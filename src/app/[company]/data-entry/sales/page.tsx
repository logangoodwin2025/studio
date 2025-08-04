
import { DashboardHeader } from "@/components/dashboard-header";
import { SalesForm } from "@/components/data-entry/sales-form";

export default function SalesDataEntryPage() {
  return (
    <>
      <DashboardHeader
        title="Sales & Marketing Data Entry"
        description="Input sales and marketing metrics for a specific period"
      />
      <main className="flex-1 p-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
            <SalesForm />
        </div>
      </main>
    </>
  );
}
