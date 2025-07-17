

"use client";

import { useState, useEffect } from "react";
import { DashboardHeader } from "@/components/dashboard-header";
import { FinancialStats } from "@/components/financial-stats";
import { RevenueProfitTrend } from "@/components/revenue-profit-trend";
import { ExpenseBreakdown } from "@/components/expense-breakdown";
import { WeeklyCashFlow } from "@/components/weekly-cash-flow";
import { KeyRatios } from "@/components/key-ratios";
import { AccountsTable } from "@/components/accounts-table";
import { PeriodPicker } from "@/components/period-picker";
import type { DateRange } from "react-day-picker";
import { ProfitabilityAnalysis } from "@/components/profitability-analysis";
import { useFinancialData } from "@/context/financial-data-context";
import { getStatsForPeriod, getChartDataForPeriod } from "@/lib/financial-aggregator";
import type { FinancialRecord } from "@/context/financial-data-context";
import { Skeleton } from "@/components/ui/skeleton";


export type Period = 'D' | 'W' | 'M' | 'YTD' | 'MAX' | 'CUSTOM';

export default function FinancePage() {
  const [period, setPeriod] = useState<Period>('D');
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const [isMounted, setIsMounted] = useState(false);
  
  const { data: allData } = useFinancialData();
  const [chartData, setChartData] = useState<FinancialRecord[]>([]);
  const [stats, setStats] = useState(() => getStatsForPeriod(allData, 'D', undefined));

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      const newStats = getStatsForPeriod(allData, period, dateRange);
      const newChartData = getChartDataForPeriod(allData, period, dateRange);
      setStats(newStats);
      setChartData(newChartData);
    }
  }, [period, dateRange, allData, isMounted]);

  const renderSkeletons = () => (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
        {[...Array(7)].map((_, i) => <Skeleton key={i} className="h-[98px] rounded-lg" />)}
      </div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        <Skeleton className="lg:col-span-3 h-[382px] rounded-lg" />
        <Skeleton className="lg:col-span-2 h-[382px] rounded-lg" />
      </div>
    </>
  )

  return (
    <>
      <DashboardHeader 
        title="Financial Dashboard"
        description="Comprehensive financial metrics and performance indicators"
      >
        <PeriodPicker 
          period={period} 
          onPeriodChange={(p) => {
            setPeriod(p);
            if (p !== 'CUSTOM') {
              setDateRange(undefined);
            }
          }}
          dateRange={dateRange}
          onDateRangeChange={setDateRange}
        />
      </DashboardHeader>
      <main className="flex-1 space-y-6 p-4 sm:px-6 lg:px-8">
        {!isMounted ? renderSkeletons() : (
          <>
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
          </>
        )}
      </main>
    </>
  );
}
