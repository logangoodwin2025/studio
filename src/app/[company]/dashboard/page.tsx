
"use client";

import { Suspense, useMemo, useCallback, useState, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { DateRange } from "react-day-picker";
import { formatISO, parseISO } from "date-fns";

import { DashboardHeader } from "@/components/dashboard-header";
import { FinanceDashboardView } from "@/components/dashboards/finance-dashboard-view";
import { PeriodPicker } from "@/components/period-picker";
import { Skeleton } from "@/components/ui/skeleton";
import type { Period } from "@/lib/types";
import { useFinancialData } from "@/context/financial-data-context";
import { getStatsForPeriod, getChartDataForPeriod } from "@/lib/financial-aggregator";
import type { FinancialRecord } from "@/context/financial-data-context";

function DashboardPageContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { data: allData } = useFinancialData();
  const [isLoading, setIsLoading] = useState(true);

  const [stats, setStats] = useState<any>(null);
  const [chartData, setChartData] = useState<FinancialRecord[]>([]);

  const period = (searchParams.get('period') as Period) || 'D';
  
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
    setIsLoading(true);
    if (allData.length > 0) {
      const newStats = getStatsForPeriod(allData, period, dateRange);
      const newChartData = getChartDataForPeriod(allData, period, dateRange);
      setStats(newStats);
      setChartData(newChartData);
      setIsLoading(false);
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

  if (isLoading || !stats) {
    return <LoadingSkeleton />;
  }

  return (
    <>
      <DashboardHeader
        title="Finance Dashboard"
        description="Key financial metrics and performance indicators."
      >
        <PeriodPicker 
          period={period} 
          onPeriodChange={handlePeriodChange}
          dateRange={dateRange}
          onDateRangeChange={handleDateRangeChange}
        />
      </DashboardHeader>
      <main className="flex-1 p-4 sm:px-6 lg:px-8 space-y-6">
        <FinanceDashboardView stats={stats} chartData={chartData} />
      </main>
    </>
  );
}

export default function DashboardPage() {
    return (
        <Suspense fallback={<LoadingSkeleton />}>
            <DashboardPageContent />
        </Suspense>
    )
}

function LoadingSkeleton() {
  return (
    <>
      <DashboardHeader 
        title="Finance Dashboard"
        description="Key financial metrics and performance indicators."
      >
        <div className="flex items-center gap-2 bg-card p-1 rounded-lg border h-[44px] w-[420px]">
          <Skeleton className="h-9 w-full" />
        </div>
      </DashboardHeader>
      <main className="flex-1 p-4 sm:px-6 lg:px-8 space-y-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
            {[...Array(7)].map((_, i) => <Skeleton key={i} className="h-[98px] rounded-lg" />)}
        </div>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
            <Skeleton className="lg:col-span-3 h-[282px] rounded-lg" />
            <Skeleton className="lg:col-span-2 h-[282px] rounded-lg" />
        </div>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="grid grid-cols-1 gap-6 lg:col-span-2">
                <Skeleton className="h-[262px] rounded-lg" />
                <Skeleton className="h-[262px] rounded-lg" />
            </div>
            <div className="grid grid-cols-1 gap-6 lg:col-span-1">
                <Skeleton className="h-[212px] rounded-lg" />
                <Skeleton className="h-[218px] rounded-lg" />
                <Skeleton className="h-[218px] rounded-lg" />
            </div>
        </div>
      </main>
    </>
  )
}
