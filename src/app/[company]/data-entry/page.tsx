
"use client";

import { useUserRole } from "@/hooks/use-user-role";
import { FinanceForm } from "@/components/data-entry/finance-form";
import { SalesForm } from "@/components/data-entry/sales-form";
import { OperationsForm } from "@/components/data-entry/operations-form";
import { MembershipForm } from "@/components/data-entry/membership-form";
import { DashboardHeader } from "@/components/dashboard-header";
import { AccessDenied } from "@/components/access-denied";
import { Suspense } from "react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSearchParams, useParams } from "next/navigation";

// This is a router page. Based on the user role, it will redirect
// to the appropriate data entry page.

function DataEntryRedirectPage() {
    const { role, isLoaded } = useUserRole();
    const router = useRouter();
    const searchParams = useSearchParams();
    const params = useParams();
    const companySlug = params.company;

    useEffect(() => {
        if (isLoaded && role) {
            const query = searchParams.toString();
            let path = "";

            switch (role) {
                case "Finance Team":
                case "Company Admin":
                    path = `/${companySlug}/data-entry/finance?${query}`;
                    break;
                case "Sales & Marketing":
                    path = `/${companySlug}/data-entry/sales?${query}`;
                    break;
                case "Operations Team":
                    path = `/${companySlug}/data-entry/operations?${query}`;
                    break;
                default:
                    // Redirect to a safe page if no data entry is available
                    path = `/${companySlug}/my-dashboard?${query}`;
                    break;
            }
            router.replace(path);
        }
    }, [isLoaded, role, router, companySlug, searchParams]);

    return (
        <>
            <DashboardHeader title="Loading Data Entry..." />
            <main className="flex-1 p-4 sm:px-6 lg:px-8">
                <p>Please wait...</p>
            </main>
        </>
    );
}

export default function DataEntryPage() {
    return (
        <Suspense>
            <DataEntryRedirectPage />
        </Suspense>
    )
}
