import { DashboardHeader } from "@/components/dashboard-header";
import { ReportsDataTable } from "@/components/reports-data-table";
import { reportData } from "@/lib/mock-data";

export default function ReportsPage() {
  // In a real app, you would fetch this data from an API
  const reports = reportData;
  return (
    <>
      <DashboardHeader 
        title="Financial Reports"
        description="Generate and download financial reports for specific time periods."
      />
      <ReportsDataTable reports={reports} />
    </>
  );
}
