
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
import { Loading } from "../loading";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "../ui/card";
import { Target } from "lucide-react";

function CeoDashboardViewContent() {
  const { data: allData } = useFinancialData();
  const [isLoading, setIsLoading] = useState(true);

  const [stats, setStats] = useState<any>(null);
  const [chartData, setChartData] = useState<FinancialRecord[]>([]);

  const searchParams = useSearchParams();
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


   if (isLoading || !stats) {
    return <LoadingSkeleton />;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold font-headline">Financial Health</h2>
      <FinancialStats stats={stats} />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        <div className="lg:col-span-3">
            <RevenueProfitTrend data={chartData} />
        </div>
        <div className="lg:col-span-2">
            <ExpenseBreakdown data={chartData} />
        </div>
      </div>
       <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
                <CardTitle className="font-headline">Competitive Position</CardTitle>
                <CardDescription>Market share and NPS vs. industry benchmarks.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="h-48 flex items-center justify-center text-muted-foreground">
                   (Chart placeholder: Market Share vs. Competitors)
                </div>
            </CardContent>
          </Card>
           <Card>
            <CardHeader>
                <CardTitle className="font-headline">Executive Summary</CardTitle>
                <CardDescription>AI-generated insights and scenario planner.</CardDescription>
            </CardHeader>
            <CardContent>
                 <div className="h-48 flex items-center justify-center text-muted-foreground">
                   (AI insights placeholder)
                </div>
            </CardContent>
          </Card>
      </div>

      <h2 className="text-xl font-bold font-headline pt-4">Membership Trends</h2>
      <MembershipMetrics />
      
      <h2 className="text-xl font-bold font-headline pt-4">Sales & Marketing</h2>
      <SalesMarketingMetrics />

      <h2 className="text-xl font-bold font-headline pt-4">Operational Efficiency</h2>
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
