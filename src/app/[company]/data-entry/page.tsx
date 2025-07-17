import { DashboardHeader } from "@/components/dashboard-header";
import { DataEntryForm } from "@/components/data-entry-form";
import { Button } from "@/components/ui/button";
import { Download, Upload } from "lucide-react";

export default function DataEntryPage() {
  return (
    <>
      <DashboardHeader
        title="Data Entry"
        description="Input financial metrics and KPIs for a specific period"
      >
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Upload className="mr-2 h-4 w-4" />
            Import CSV
          </Button>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Download Template
          </Button>
        </div>
      </DashboardHeader>
      <main className="flex-1 p-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
            <DataEntryForm />
        </div>
      </main>
    </>
  );
}
