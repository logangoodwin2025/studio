
"use client";

import { Suspense, useCallback, useMemo, useState } from "react";
import { useUserRole } from "@/hooks/use-user-role";
import { AccessDenied } from "@/components/access-denied";
import { DashboardHeader } from "@/components/dashboard-header";
import { MembershipMetrics } from "@/components/dashboards/membership-metrics";
import { PeriodPicker } from "@/components/period-picker";
import type { Period } from "@/lib/types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { DateRange } from "react-day-picker";
import { formatISO, parseISO } from "date-fns";
import { Loading } from "@/components/loading";

const REQUIRED_ROLES = ["Sales & Marketing", "Company Admin", "CEO/Executive"];

function MembershipDashboardPageContent() {
    const { role, isLoaded } = useUserRole();
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    
    const period = (searchParams.get('period') as Period) || 'M';
  
    const dateRange = useMemo(() => {
        const fromParam = searchParams.get('from');
        const toParam = searchParams.get('to');
        if (period === 'CUSTOM' && fromParam) {
        return {
            from: parseISO(fromParam),
            to: toParam ? parseISO(toParam) : undefined
        };
        }
        return undefined;
    }, [period, searchParams]);

    const handlePeriodChange = useCallback((newPeriod: Period) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('period', newPeriod);
        if (newPeriod !== 'CUSTOM') {
        params.delete('from');
        params.delete('to');
        }
        router.push(`${pathname}?${params.toString()}`);
    }, [pathname, router, searchParams]);

    const handleDateRangeChange = useCallback((newDateRange: DateRange | undefined) => {
        const params = new URLSearchParams(searchParams.toString());
        if (newDateRange?.from) {
        params.set('period', 'CUSTOM');
        params.set('from', formatISO(newDateRange.from, { representation: 'date' }));
        if (newDateRange.to) {
            params.set('to', formatISO(newDateRange.to, { representation: 'date' }));
        } else {
            params.delete('to');
        }
        router.push(`${pathname}?${params.toString()}`);
        }
    }, [pathname, router, searchParams]);

    if (!isLoaded) {
        return <Loading />;
    }
    
    if (!role || !REQUIRED_ROLES.includes(role)) {
        return <AccessDenied />;
    }

    return (
        <>
            <DashboardHeader
                title="Membership Dashboard"
                description="Key metrics for member growth, retention, and satisfaction."
            >
                <PeriodPicker 
                    period={period} 
                    onPeriodChange={handlePeriodChange}
                    dateRange={dateRange}
                    onDateRangeChange={handleDateRangeChange}
                />
            </DashboardHeader>
            <main className="flex-1 space-y-6 p-4 sm:px-6 lg:px-8">
               <MembershipMetrics />
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
