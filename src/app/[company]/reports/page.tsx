
"use client";

import { useUserRole } from "@/hooks/use-user-role";
import { AccessDenied } from "@/components/access-denied";
import { ReportsDataTable } from "@/components/reports-data-table";
import { Suspense } from "react";
import { DashboardHeader } from "@/components/dashboard-header";

function ReportsPageContent() {
  const { role, isLoaded } = useUserRole();

  if (!isLoaded) {
    return null; // or a loading spinner
  }

  const canViewReports =
    role && ["Finance Team", "Sales & Marketing", "Operations Team", "CEO/Executive", "Company Admin"].includes(role);

  if (!canViewReports) {
    return <AccessDenied />;
  }

  return (
    <>
      <DashboardHeader
        title="Reports"
        description="Generate and download financial reports for sharing and documentation."
      />
      <main className="flex-1 p-4 sm:px-6 lg:px-8 space-y-6">
        <ReportsDataTable />
      </main>
    </>
  );
}


export default function ReportsPage() {
  return (
    <Suspense>
        <ReportsPageContent />
    </Suspense>
  )
}
