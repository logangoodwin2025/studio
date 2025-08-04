
"use client";

import { useUserRole } from "@/hooks/use-user-role";
import { AccessDenied } from "@/components/access-denied";
import { ReportsDataTable } from "@/components/reports-data-table";
import { Suspense } from "react";

// In a real app, you might have different report configurations per role.
// For this prototype, we'll show the same report table to anyone with access.

function ReportsPageContent() {
  const { role, isLoaded } = useUserRole();

  if (!isLoaded) {
    return null; // or a loading spinner
  }

  // Example of role-based access to the reports page itself
  const canViewReports =
    role && ["Finance Team", "Sales & Marketing", "Operations Team", "CEO/Executive", "Company Admin"].includes(role);

  if (!canViewReports) {
    return <AccessDenied />;
  }

  return <ReportsDataTable />;
}


export default function ReportsPage() {
  return (
    <Suspense>
        <ReportsPageContent />
    </Suspense>
  )
}
