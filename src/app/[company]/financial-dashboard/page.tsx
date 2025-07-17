
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
import { startOfMonth, subMonths } from "date-fns";

export type Period = 'D' | 'W' | 'M' | 'YTD' | 'CUSTOM';

export default function FinancePage() {
  const [period, setPeriod] = useState<Period>('D');
  
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Initialize date range only on the client to avoid hydration mismatch
    setDateRange({
      from: startOfMonth(subMonths(new Date(), 1)),
      to: new Date(),
    });
    setIsMounted(true);
  }, []);


  return (
    <>
      <DashboardHeader 
        title="Financial Dashboard"
        description="Comprehensive financial metrics and performance indicators"
      >
        <PeriodPicker 
          period={period} 
          onPeriodChange={setPeriod}
          dateRange={dateRange}
          onDateRangeChange={setDateRange}
        />
      </DashboardHeader>
      <main className="flex-1 space-y-6 p-4 sm:px-6 lg:px-8">
        {isMounted ? (
            <FinancialStats period={period} dateRange={dateRange} />
        ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
                {/* Skeleton loader to prevent layout shift */}
                {[...Array(7)].map((_, i) => (
                    <div key={i} className="h-[98px] animate-pulse rounded-lg bg-card" />
                ))}
            </div>
        )}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
            <div className="lg:col-span-3">
                <RevenueProfitTrend />
            </div>
            <div className="lg:col-span-2">
                <ExpenseBreakdown />
            </div>
        </div>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
            <div className="lg:col-span-3">
                <WeeklyCashFlow />
            </div>
            <div className="lg:col-span-2">
                <KeyRatios />
            </div>
        </div>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <AccountsTable type="Receivable" />
            <AccountsTable type="Payable" />
        </div>

      </main>
    </>
  );
}
