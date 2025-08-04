
"use client";

import { Suspense } from "react";
import { useUserRole } from "@/hooks/use-user-role";
import { AccessDenied } from "@/components/access-denied";
import { DashboardHeader } from "@/components/dashboard-header";
import { OperationsDashboardView } from "@/components/dashboards/operations-dashboard-view";

const REQUIRED_ROLES = ["Operations Team", "Company Admin", "CEO/Executive"];

function OperationsDashboardPageContent() {
    const { role, isLoaded } = useUserRole();

    if (!isLoaded) {
        return null;
    }
    
    if (!role || !REQUIRED_ROLES.includes(role)) {
        return <AccessDenied />;
    }

    return (
        <>
            <DashboardHeader
                title="Operations Dashboard"
                description="Key metrics for operational efficiency and performance."
            />
            <main className="flex-1 space-y-6 p-4 sm:px-6 lg:px-8">
                <OperationsDashboardView />
            </main>
        </>
    );
}


export default function OperationsDashboardPage() {
    return (
        <Suspense>
            <OperationsDashboardPageContent />
        </Suspense>
    )
}
