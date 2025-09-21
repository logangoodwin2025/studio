
"use client";

import { DashboardHeader } from "@/components/dashboard-header";
import { CompanyAdminSettings } from "@/components/company-admin-settings";

export default function CompanySettingsPage() {

    return (
        <>
            <DashboardHeader
                title="Company Settings"
                description="Manage your company's subscription, branding, and other settings."
            />
            <main className="flex-1 p-4 sm:px-6 lg:px-8 space-y-6 max-w-4xl mx-auto">
                <CompanyAdminSettings />
            </main>
        </>
    )
}
