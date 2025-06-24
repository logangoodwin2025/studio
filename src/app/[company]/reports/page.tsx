import { ReportsDataTable } from "@/components/reports-data-table";
import { reportData } from "@/lib/mock-data";

export default function ReportsPage() {
  // In a real app, you would fetch this data from an API
  const reports = reportData;
  return <ReportsDataTable reports={reports} />;
}
