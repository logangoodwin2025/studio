
"use client";

import { Suspense } from "react";
import { useUserRole } from "@/hooks/use-user-role";
import { AccessDenied } from "@/components/access-denied";
import { DashboardHeader } from "@/components/dashboard-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MembershipMetrics } from "@/components/dashboards/membership-metrics";

const REQUIRED_ROLES = ["Sales & Marketing", "Company Admin", "CEO/Executive"];

function MembershipDashboardPageContent() {
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
                title="Membership Dashboard"
                description="Key metrics for member growth, retention, and satisfaction."
            />
            <main className="flex-1 space-y-6 p-4 sm:px-6 lg:px-8">
               <Card>
                    <CardHeader>
                        <CardTitle className="font-headline">Membership Metrics</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <MembershipMetrics />
                    </CardContent>
                </Card>
            </main>
        </>
    );
}

export default function MembershipDashboardPage() {
    return (
        <Suspense>
            <MembershipDashboardPageContent />
        </Suspense>
    )
}
