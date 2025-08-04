
"use client";

import { Suspense, useCallback, useMemo, useState, useEffect } from "react";
import { useUserRole } from "@/hooks/use-user-role";
import { AccessDenied } from "@/components/access-denied";
import { DashboardHeader } from "@/components/dashboard-header";
import { CeoDashboardView } from "@/components/dashboards/ceo-dashboard-view";
import { PeriodPicker } from "@/components/period-picker";
import type { Period } from "@/lib/types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { DateRange } from "react-day-picker";
import { formatISO, parseISO } from "date-fns";
import { Loading } from "@/components/loading";
import { useFinancialData } from "@/context/financial-data-context";
import { getChartDataForPeriod, getStatsForPeriod } from "@/lib/financial-aggregator";
import type { FinancialRecord } from "@/context/financial-data-context";
import type { FinancialStats } from "@/lib/financial-aggregator";

const REQUIRED_ROLES = ["CEO/Executive", "Company Admin"];

function DashboardPageContent() {
    const { role, isLoaded } = useUserRole();
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const { data: allData } = useFinancialData();

    const [stats, setStats] = useState<FinancialStats | null>(null);
    const [chartData, setChartData] = useState<FinancialRecord[]>([]);

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
    
    useEffect(() => {
        if (allData.length > 0) {
            const newStats = getStatsForPeriod(allData, period, dateRange);
            const newChartData = getChartDataForPeriod(allData, period, dateRange);
            setStats(newStats);
            setChartData(newChartData);
        }
    }, [allData, period, dateRange]);


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


    if (!isLoaded || !stats) {
        return <Loading />;
    }
    
    if (!role || !REQUIRED_ROLES.includes(role)) {
        return <AccessDenied />;
    }

    return (
        <>
            <DashboardHeader
                title="CEO Dashboard"
                description="Comprehensive metrics and performance indicators for your organization."
            >
                <PeriodPicker 
                    period={period} 
                    onPeriodChange={handlePeriodChange}
                    dateRange={dateRange}
                    onDateRangeChange={handleDateRangeChange}
                />
            </DashboardHeader>
            <main className="flex-1 space-y-6 p-4 sm:px-6 lg:px-8">
                <CeoDashboardView stats={stats} chartData={chartData} />
            </main>
        </>
    );
}

export default function DashboardPage() {
    return (
        <Suspense>
            <DashboardPageContent />
        </Suspense>
    )
}
