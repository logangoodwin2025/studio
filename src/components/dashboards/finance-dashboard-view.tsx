
"use client";

import type { FinancialRecord } from "@/context/financial-data-context";
import type { FinancialStats as FinancialStatsType } from "@/lib/financial-aggregator";
import { FinancialStats } from "@/components/financial-stats";
import { RevenueProfitTrend } from "@/components/revenue-profit-trend";
import { ExpenseBreakdown } from "@/components/expense-breakdown";
import { ProfitabilityAnalysis } from "@/components/profitability-analysis";
import { WeeklyCashFlow } from "@/components/weekly-cash-flow";
import { KeyRatios } from "@/components/key-ratios";
import { AccountsTable } from "@/components/accounts-table";

interface FinanceDashboardViewProps {
  stats: FinancialStatsType;
  chartData: FinancialRecord[];
}

export function FinanceDashboardView({ stats, chartData }: FinanceDashboardViewProps) {
  return (
    <div className="space-y-6">
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
    </div>
  );
}
