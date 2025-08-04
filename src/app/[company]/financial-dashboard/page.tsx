
"use client";

import { Suspense } from "react";
import { useUserRole } from "@/hooks/use-user-role";
import { AccessDenied } from "@/components/access-denied";
import { DashboardHeader } from "@/components/dashboard-header";
import { CeoDashboardView } from "@/components/dashboards/ceo-dashboard-view";

const REQUIRED_ROLES = ["Finance Team", "Company Admin", "CEO/Executive"];

function FinancialDashboardPageContent() {
    const { role, isLoaded } = useUserRole();

    if (!isLoaded) {
        return null; // or a loading skeleton
    }
    
    if (!role || !REQUIRED_ROLES.includes(role)) {
        return <AccessDenied />;
    }

    return (
        <>
            <DashboardHeader
                title="Financial Dashboard"
                description="Comprehensive financial metrics and performance indicators."
            />
            <main className="flex-1 space-y-6 p-4 sm:px-6 lg:px-8">
                <CeoDashboardView />
            </main>
        </>
    );
}


export default function FinancialDashboardPage() {
  return (
    <Suspense>
      <FinancialDashboardPageContent />
    </Suspense>
  )
}
