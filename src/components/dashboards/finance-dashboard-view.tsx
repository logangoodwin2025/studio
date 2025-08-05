
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
  visibleKpis: string[];
}

export function FinanceDashboardView({ stats, chartData, visibleKpis }: FinanceDashboardViewProps) {
  const isWidgetVisible = (id: string) => visibleKpis.includes(id);
  const showFinancialStats = visibleKpis.some(k => k.startsWith('fin_') && k.endsWith('Card'));

  return (
    <div className="space-y-6">
      {showFinancialStats && <FinancialStats stats={stats} visibleKpis={visibleKpis} />}
      
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
          {isWidgetVisible('fin_revenue_profit_trend') && (
            <div className="lg:col-span-3">
                <RevenueProfitTrend data={chartData} />
            </div>
          )}
          {isWidgetVisible('fin_expense_breakdown') && (
            <div className="lg:col-span-2">
                <ExpenseBreakdown data={chartData} />
            </div>
          )}
      </div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="grid grid-cols-1 gap-6 lg:col-span-2">
              {isWidgetVisible('fin_profitability_analysis') && <ProfitabilityAnalysis data={chartData} />}
              {isWidgetVisible('fin_weekly_cash_flow') && <WeeklyCashFlow data={chartData} />}
          </div>
          <div className="grid grid-cols-1 gap-6 lg:col-span-1">
              {isWidgetVisible('fin_key_ratios') && <KeyRatios />}
              {isWidgetVisible('fin_ar_table') && <AccountsTable type="Receivable" />}
              {isWidgetVisible('fin_ap_table') && <AccountsTable type="Payable" />}
          </div>
      </div>
    </div>
  );
}

    