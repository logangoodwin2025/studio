
"use client";

import type { FinancialRecord } from "@/context/financial-data-context";
import type { FinancialStats } from "@/lib/financial-aggregator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FinancialStats as FinancialStatsCards } from "@/components/financial-stats";
import { RevenueProfitTrend } from "@/components/revenue-profit-trend";
import { ExpenseBreakdown } from "@/components/expense-breakdown";
import { MembershipMetrics } from "../membership-metrics";
import { SalesMarketingMetrics } from "../sales-marketing-metrics";
import { OperationalMetrics } from "../operational-metrics";
import { InfoTooltip } from "@/components/info-tooltip";

interface CeoOverviewTabProps {
  stats: FinancialStats;
  chartData: FinancialRecord[];
}

export function CeoOverviewTab({ stats, chartData }: CeoOverviewTabProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold font-headline flex items-center">
        Financial Health
        <InfoTooltip>
          An overview of the company's key financial performance indicators for the selected period.
        </InfoTooltip>
      </h2>
      <FinancialStatsCards stats={stats} />
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
                <CardTitle className="font-headline flex items-center">
                  Competitive Position
                  <InfoTooltip>
                    Compares your company's market share and Net Promoter Score (NPS) against industry benchmarks.
                  </InfoTooltip>
                </CardTitle>
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
                <CardTitle className="font-headline flex items-center">
                  Scenario Planner
                   <InfoTooltip>
                    AI-powered tool to model potential outcomes based on different business decisions.
                  </InfoTooltip>
                </CardTitle>
                <CardDescription>Model potential business scenarios.</CardDescription>
            </CardHeader>
            <CardContent>
                 <div className="h-48 flex items-center justify-center text-muted-foreground">
                   (AI scenario planner placeholder)
                </div>
            </CardContent>
          </Card>
      </div>

      <h2 className="text-xl font-bold font-headline pt-4 flex items-center">
        Membership Trends
        <InfoTooltip>
          Key metrics related to customer growth, churn, and satisfaction.
        </InfoTooltip>
      </h2>
      <MembershipMetrics stats={stats} />
      
      <h2 className="text-xl font-bold font-headline pt-4 flex items-center">
        Sales & Marketing
        <InfoTooltip>
            Performance indicators for your sales funnel and marketing campaign effectiveness.
        </InfoTooltip>
      </h2>
      <SalesMarketingMetrics stats={stats} />

      <h2 className="text-xl font-bold font-headline pt-4 flex items-center">
        Operational Efficiency
        <InfoTooltip>
          Metrics that measure the efficiency of your company's core operations.
        </InfoTooltip>
      </h2>
      <OperationalMetrics stats={stats} />
    </div>
  );
}
