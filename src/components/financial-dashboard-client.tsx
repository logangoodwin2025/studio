
"use client";

import { useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
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
import { formatISO } from "date-fns";


interface FinancialDashboardClientProps {
  stats: FinancialStatsType;
  chartData: FinancialRecord[];
  initialPeriod: Period;
  initialDateRange?: DateRange;
}

export function FinancialDashboardClient({ 
  stats, 
  chartData, 
  initialPeriod, 
  initialDateRange 
}: FinancialDashboardClientProps) {
  const router = useRouter();
  const pathname = usePathname();
  
  const handlePeriodChange = (newPeriod: Period) => {
    const params = new URLSearchParams();
    params.set('period', newPeriod);
    router.push(`${pathname}?${params.toString()}`);
  }

  const handleDateRangeChange = (newDateRange: DateRange | undefined) => {
    if (newDateRange?.from) {
      const params = new URLSearchParams();
      params.set('period', 'CUSTOM');
      params.set('from', formatISO(newDateRange.from));
      if (newDateRange.to) {
        params.set('to', formatISO(newDateRange.to));
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
          dateRange={initialDateRange}
          onDateRangeChange={handleDateRangeChange}
        />
      </DashboardHeader>
      <main className="flex-1 space-y-6 p-4 sm:px-6 lg:px-8">
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
      </main>
    </>
  );
}
