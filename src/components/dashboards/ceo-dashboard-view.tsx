
"use client";

import { Suspense, useMemo, useCallback, useState, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { DateRange } from "react-day-picker";
import { formatISO, parseISO } from "date-fns";

import { useFinancialData } from "@/context/financial-data-context";
import { getStatsForPeriod, getChartDataForPeriod } from "@/lib/financial-aggregator";
import type { FinancialRecord } from "@/context/financial-data-context";
import type { Period } from "@/lib/types";

import { FinancialStats } from "@/components/financial-stats";
import { RevenueProfitTrend } from "@/components/revenue-profit-trend";
import { ExpenseBreakdown } from "@/components/expense-breakdown";
import { ProfitabilityAnalysis } from "@/components/profitability-analysis";
import { WeeklyCashFlow } from "@/components/weekly-cash-flow";
import { KeyRatios } from "@/components/key-ratios";
import { AccountsTable } from "@/components/accounts-table";
import { Skeleton } from "@/components/ui/skeleton";
import { MembershipMetrics } from "./membership-metrics";
import { SalesMarketingMetrics } from "./sales-marketing-metrics";
import { OperationalMetrics } from "./operational-metrics";

function CeoDashboardViewContent() {
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
    <div className="space-y-6">
      <h2 className="text-xl font-bold font-headline">Financial Metrics</h2>
      <FinancialStats stats={stats} />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        <div className="lg:col-span-3">
            <RevenueProfitTrend data={chartData} />
        </div>
        <div className="lg:col-span-2">
            <ExpenseBreakdown data={chartData} />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="grid grid-cols-1 gap-6 lg:col-span-2">
            <ProfitabilityAnalysis data={chartData} />
            <WeeklyCashFlow data={chartData} />
        </div>
        <div className="grid grid-cols-1 gap-6 lg:col-span-1">
            <KeyRatios />
            <AccountsTable type="Receivable" />
            <AccountsTable type="Payable" />
        </div>
      </div>
      <h2 className="text-xl font-bold font-headline pt-4">Membership Metrics</h2>
      <MembershipMetrics />
      <h2 className="text-xl font-bold font-headline pt-4">Sales & Marketing Metrics</h2>
      <SalesMarketingMetrics />
      <h2 className="text-xl font-bold font-headline pt-4">Operational Metrics</h2>
      <OperationalMetrics />
    </div>
  );
}

export function CeoDashboardView() {
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <CeoDashboardViewContent />
    </Suspense>
  )
}

function LoadingSkeleton() {
  return (
     <div className="space-y-6">
      <div className="flex items-center gap-2 bg-card p-1 rounded-lg border h-[44px] w-[420px]">
          <Skeleton className="h-9 w-full" />
      </div>
       <h2 className="text-xl font-bold font-headline"><Skeleton className="h-7 w-64" /></h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
            {[...Array(7)].map((_, i) => <Skeleton key={i} className="h-[98px] rounded-lg" />)}
        </div>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
            <Skeleton className="lg:col-span-3 h-[282px] rounded-lg" />
            <Skeleton className="lg:col-span-2 h-[282px] rounded-lg" />
        </div>
         <h2 className="text-xl font-bold font-headline pt-4"><Skeleton className="h-7 w-64" /></h2>
         <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-[98px] rounded-lg" />)}
        </div>
    </div>
  )
}
