
"use client";

import * as React from "react";
import { useUserRole } from "@/hooks/use-user-role";
import { DashboardHeader } from "@/components/dashboard-header";
import { Loading } from "@/components/loading";
import { PlatformIntegrationsSettings } from "@/components/platform-integrations-settings";
import { CompanyAdminIntegrationsView } from "@/components/company-admin-integrations-view";


export default function IntegrationsPage() {
    const { role, isLoaded } = useUserRole();

    if (!isLoaded) {
        return <Loading />
    }

    const isPlatformAdmin = role === 'Platform Super Admin' || role === 'Platform Manager';

    return (
        <>
            <main className="flex-1">
               {isPlatformAdmin ? (
                    <>
                         <DashboardHeader
                            title="Integrations Hub"
                            description="Manage platform-level integration settings."
                        />
                        <div className="p-4 sm:px-6 lg:px-8 mt-6">
                            <PlatformIntegrationsSettings />
                        </div>
                    </>
               ) : <CompanyAdminIntegrationsView />}
            </main>
        </>
    );
}
