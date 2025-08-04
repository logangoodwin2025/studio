
"use client";

import { Suspense } from "react";
import { useUserRole } from "@/hooks/use-user-role";
import { AccessDenied } from "@/components/access-denied";
import { DashboardHeader } from "@/components/dashboard-header";
import { SalesMarketingDashboardView } from "@/components/dashboards/sales-marketing-dashboard-view";

const REQUIRED_ROLES = ["Sales & Marketing", "Company Admin", "CEO/Executive"];

function SalesMarketingDashboardPageContent() {
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
                title="Sales & Marketing Dashboard"
                description="Key metrics for leads, conversions, and marketing performance."
            />
            <main className="flex-1 space-y-6 p-4 sm:px-6 lg:px-8">
                <SalesMarketingDashboardView />
            </main>
        </>
    );
}

export default function SalesMarketingDashboardPage() {
    return (
        <Suspense>
            <SalesMarketingDashboardPageContent />
        </Suspense>
    )
}
