
"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
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
import type { FinancialRecord } from "@/context/financial-data-context";
import type { FinancialStats as FinancialStatsType } from "@/lib/financial-aggregator";
import type { Period } from "@/app/[company]/financial-dashboard/page";
import { formatISO, parseISO } from "date-fns";


interface FinancialDashboardClientProps {
  stats: FinancialStatsType;
  chartData: FinancialRecord[];
  initialPeriod: Period;
  initialDateRange?: { from: string, to?: string };
}

export function FinancialDashboardClient({ 
  stats: initialStats,
  chartData: initialChartData, 
  initialPeriod, 
  initialDateRange 
}: FinancialDashboardClientProps) {
  const router = useRouter();
  const pathname = usePathname();
  
  // Re-hydrate chart data with Date objects on the client
  const chartData = initialChartData.map(d => ({ ...d, period: new Date(d.period) }));

  // Re-hydrate date range on the client
  const [dateRange, setDateRange] = useState<DateRange | undefined>(() => {
    if (initialDateRange?.from) {
      return {
        from: parseISO(initialDateRange.from),
        to: initialDateRange.to ? parseISO(initialDateRange.to) : undefined,
      };
    }
    return undefined;
  });

  useEffect(() => {
    if (initialDateRange?.from) {
      setDateRange({
        from: parseISO(initialDateRange.from),
        to: initialDateRange.to ? parseISO(initialDateRange.to) : undefined,
      });
    } else {
      setDateRange(undefined);
    }
  }, [initialDateRange]);

  const handlePeriodChange = (newPeriod: Period) => {
    const params = new URLSearchParams();
    params.set('period', newPeriod);
    router.push(`${pathname}?${params.toString()}`);
  }

  const handleDateRangeChange = (newDateRange: DateRange | undefined) => {
    if (newDateRange?.from) {
      const params = new URLSearchParams();
      params.set('period', 'CUSTOM');
      params.set('from', formatISO(newDateRange.from, { representation: 'date' }));
      if (newDateRange.to) {
        params.set('to', formatISO(newDateRange.to, { representation: 'date' }));
      }
      router.push(`${pathname}?${params.toString()}`);
    }
  }

  return (
    <>
      <DashboardHeader 
        title="Financial Dashboard"
        description="Comprehensive financial metrics and performance indicators"
      >
        <PeriodPicker 
          period={initialPeriod} 
          onPeriodChange={handlePeriodChange}
          dateRange={dateRange}
          onDateRangeChange={handleDateRangeChange}
        />
      </DashboardHeader>
      <main className="flex-1 space-y-6 p-4 sm:px-6 lg:px-8">
        <FinancialStats stats={initialStats} />
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
      </main>
    </>
  );
}
