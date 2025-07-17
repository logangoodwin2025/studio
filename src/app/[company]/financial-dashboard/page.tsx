
"use client";

import { useState } from "react";
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
  const [period, setPeriod] = useState<Period>('M');
  
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: startOfMonth(subMonths(new Date(), 1)),
    to: new Date(),
  });

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
        <FinancialStats period={period} dateRange={dateRange} />
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
