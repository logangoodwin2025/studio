
"use client";

import type { FinancialRecord } from "@/context/financial-data-context";
import type { FinancialStats } from "@/lib/financial-aggregator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FinancialStats as FinancialStatsCards } from "@/components/financial-stats";
import { RevenueProfitTrend } from "@/components/revenue-profit-trend";
import { ExpenseBreakdown } from "@/components/expense-breakdown";
import { MembershipMetrics } from "./membership-metrics";
import { SalesMarketingMetrics } from "./sales-marketing-metrics";
import { OperationalMetrics } from "./operational-metrics";

interface CeoDashboardViewProps {
  stats: FinancialStats;
  chartData: FinancialRecord[];
}

export function CeoDashboardView({ stats, chartData }: CeoDashboardViewProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold font-headline">Financial Health</h2>
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
      <MembershipMetrics stats={stats} />
      
      <h2 className="text-xl font-bold font-headline pt-4">Sales & Marketing</h2>
      <SalesMarketingMetrics stats={stats} />

      <h2 className="text-xl font-bold font-headline pt-4">Operational Efficiency</h2>
      <OperationalMetrics stats={stats} />
    </div>
  );
}
