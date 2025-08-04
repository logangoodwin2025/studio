
"use client";

import { useUserRole } from "@/hooks/use-user-role";
import { AccessDenied } from "@/components/access-denied";
import { ReportsDataTable } from "@/components/reports-data-table";
import { Suspense } from "react";
import { DashboardHeader } from "@/components/dashboard-header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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

  // CEO sees all reports in a tabbed view
  if (role === "CEO/Executive") {
      return (
        <>
            <DashboardHeader
                title="Reports"
                description="Generate and download departmental reports."
            />
            <main className="flex-1 p-4 sm:px-6 lg:px-8 space-y-6">
                <Tabs defaultValue="financials" className="w-full">
                    <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="financials">Financials</TabsTrigger>
                        <TabsTrigger value="membership">Membership</TabsTrigger>
                        <TabsTrigger value="sales">Sales & Marketing</TabsTrigger>
                        <TabsTrigger value="operations">Operations</TabsTrigger>
                    </TabsList>
                    <TabsContent value="financials" className="mt-6">
                        <ReportsDataTable />
                    </TabsContent>
                    <TabsContent value="membership" className="mt-6">
                        <ReportsDataTable />
                    </TabsContent>
                    <TabsContent value="sales" className="mt-6">
                       <ReportsDataTable />
                    </TabsContent>
                    <TabsContent value="operations" className="mt-6">
                        <ReportsDataTable />
                    </TabsContent>
                </Tabs>
            </main>
        </>
      )
  }

  // Other roles see a single reports table
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
