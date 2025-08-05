

"use client";

import { Suspense } from "react";
import { useUserRole } from "@/hooks/use-user-role";
import { AccessDenied } from "@/components/access-denied";
import { Loading } from "@/components/loading";
import { SuperAdminDashboardView } from "@/components/dashboards/super-admin-dashboard-view";
import { PlatformManagerDashboardView } from "@/components/dashboards/platform-manager-dashboard-view";
import { CompanyAdminDashboardView } from "@/components/dashboards/company-admin-dashboard-view";
import { redirect, useParams, useSearchParams } from "next/navigation";

const REQUIRED_ROLES = ["Platform Super Admin", "Platform Manager", "Company Admin"];

function AdminDashboardPageContent() {
    const { role, isLoaded } = useUserRole();
    const params = useParams();
    const searchParams = useSearchParams();

    if (!isLoaded) {
        return <Loading />;
    }
    
    if (!role || !REQUIRED_ROLES.includes(role)) {
        return <AccessDenied />;
    }

    // A Company Admin should not be on this page, they should be on their company-specific page
    if (role === "Company Admin") {
        const companySlug = params.company || 'srisys';
        const newSearchParams = new URLSearchParams(searchParams.toString());
        redirect(`/${companySlug}/users?${newSearchParams.toString()}`);
    }

    const renderDashboardByRole = () => {
        switch (role) {
            case "Platform Super Admin":
                return <SuperAdminDashboardView />;
            case "Platform Manager":
                return <PlatformManagerDashboardView />;
            default:
                return <AccessDenied />;
        }
    }

    return (
       <>
        {renderDashboardByRole()}
       </>
    );
}

export default function AdminDashboardPage() {
    return (
        <Suspense>
            <AdminDashboardPageContent />
        </Suspense>
    )
}
