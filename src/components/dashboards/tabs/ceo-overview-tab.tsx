
"use client";

import type { FinancialRecord } from "@/context/financial-data-context";
import type { FinancialStats } from "@/lib/financial-aggregator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FinancialStats as FinancialStatsCards } from "@/components/financial-stats";
import { MembershipMetrics } from "../membership-metrics";
import { SalesMarketingMetrics } from "../sales-marketing-metrics";
import { OperationalMetrics } from "../operational-metrics";
import { InfoTooltip } from "@/components/info-tooltip";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const competitiveData = [
    { name: 'Srisys', share: 25, nps: 45, color: 'hsl(var(--chart-1))' },
    { name: 'Competitor A', share: 20, nps: 40, color: 'hsl(var(--chart-2))' },
    { name: 'Competitor B', share: 18, nps: 35, color: 'hsl(var(--chart-3))' },
    { name: 'Other', share: 37, nps: 30, color: 'hsl(var(--chart-4))' },
]

interface CeoOverviewTabProps {
  stats: FinancialStats;
  visibleKpis: string[];
}

export function CeoOverviewTab({ stats, visibleKpis }: CeoOverviewTabProps) {
  const isWidgetVisible = (id: string) => visibleKpis.includes(id);
  const showSection = (prefix: string) => visibleKpis.some(kpi => kpi.startsWith(prefix));

  return (
    <div className="space-y-6">
      {showSection('fin_') && (
        <>
          <h2 className="text-xl font-bold font-headline flex items-center">
            Financial Health
            <InfoTooltip>
              An overview of the company's key financial performance indicators for the selected period.
            </InfoTooltip>
          </h2>
          <FinancialStatsCards stats={stats} visibleKpis={visibleKpis} />
        </>
      )}

      {showSection('mem_') && (
        <>
          <h2 className="text-xl font-bold font-headline pt-4 flex items-center">
            Membership Trends
            <InfoTooltip>
              Key metrics related to customer growth, churn, and satisfaction.
            </InfoTooltip>
          </h2>
          <MembershipMetrics stats={stats} visibleKpis={visibleKpis} />
        </>
      )}

      {showSection('sal_') && (
        <>
          <h2 className="text-xl font-bold font-headline pt-4 flex items-center">
            Sales & Marketing
            <InfoTooltip>
                Performance indicators for your sales funnel and marketing campaign effectiveness.
            </InfoTooltip>
          </h2>
          <SalesMarketingMetrics stats={stats} visibleKpis={visibleKpis} />
        </>
      )}

      {showSection('ops_') && (
        <>
          <h2 className="text-xl font-bold font-headline pt-4 flex items-center">
            Operational Efficiency
            <InfoTooltip>
              Metrics that measure the efficiency of your company's core operations.
            </InfoTooltip>
          </h2>
          <OperationalMetrics stats={stats} visibleKpis={visibleKpis} />
        </>
      )}

      {showSection('comp_') && (
        <>
          <h2 className="text-xl font-bold font-headline pt-4 flex items-center">
            Industry & Competitive Insights
            <InfoTooltip>
              Compares your company's market share and Net Promoter Score (NPS) against industry benchmarks.
            </InfoTooltip>
          </h2>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-4">
              {isWidgetVisible('comp_market_share') && (
                  <Card>
                      <CardHeader>
                          <CardTitle className="font-headline text-base">Market Share Growth</CardTitle>
                      </CardHeader>
                      <CardContent>
                          <div className="h-40">
                              <ResponsiveContainer width="100%" height="100%">
                                  <BarChart data={competitiveData} layout="vertical" margin={{ left: 10}}>
                                      <XAxis type="number" hide />
                                      <YAxis dataKey="name" type="category" hide />
                                      <Tooltip 
                                          formatter={(value) => `${value}%`}
                                           contentStyle={{
                                            backgroundColor: "hsl(var(--card))",
                                            borderColor: "hsl(var(--border))",
                                            borderRadius: "var(--radius)"
                                          }}
                                      />
                                      <Bar dataKey="share" background={{ fill: 'hsl(var(--secondary))' }} barSize={16}>
                                        {competitiveData.map((entry) => <Bar key={entry.name} dataKey="share" fill={entry.color} />)}
                                      </Bar>
                                  </BarChart>
                              </ResponsiveContainer>
                          </div>
                      </CardContent>
                  </Card>
              )}
              {isWidgetVisible('comp_pricing_trends') && (
                   <Card>
                      <CardHeader>
                          <CardTitle className="font-headline text-base">Industry Pricing Trends</CardTitle>
                      </CardHeader>
                      <CardContent>
                           <div className="h-40 flex items-center justify-center text-muted-foreground bg-secondary/30 rounded-lg">
                              (Pricing Line Chart)
                          </div>
                      </CardContent>
                  </Card>
              )}
               {isWidgetVisible('comp_benchmarking') && (
                   <Card>
                      <CardHeader>
                          <CardTitle className="font-headline text-base">NPS Benchmarking</CardTitle>
                      </CardHeader>
                      <CardContent>
                           <div className="h-40">
                               <ResponsiveContainer width="100%" height="100%">
                                  <BarChart data={competitiveData} margin={{ left: -20}}>
                                      <XAxis dataKey="name" fontSize={12} />
                                      <YAxis />
                                      <Tooltip
                                           contentStyle={{
                                            backgroundColor: "hsl(var(--card))",
                                            borderColor: "hsl(var(--border))",
                                            borderRadius: "var(--radius)"
                                          }}
                                      />
                                      <Bar dataKey="nps" barSize={32}>
                                         {competitiveData.map((entry) => <Bar key={entry.name} dataKey="nps" fill={entry.color} />)}
                                      </Bar>
                                  </BarChart>
                              </ResponsiveContainer>
                          </div>
                      </CardContent>
                  </Card>
              )}
               {isWidgetVisible('comp_scenario_planner') && (
                   <Card>
                      <CardHeader>
                          <CardTitle className="font-headline text-base">Scenario Planner</CardTitle>
                      </CardHeader>
                      <CardContent>
                           <div className="h-40 flex items-center justify-center text-muted-foreground bg-secondary/30 rounded-lg">
                             (AI Planner Tool)
                          </div>
                      </CardContent>
                  </Card>
              )}
          </div>
        </>
      )}

      {visibleKpis.length === 0 && (
          <div className="flex flex-col items-center justify-center text-center p-12 border-2 border-dashed rounded-lg">
            <h3 className="text-xl font-semibold">No Widgets Selected</h3>
            <p className="text-muted-foreground mt-2">
                Click the '+' button in the header to configure your overview.
            </p>
        </div>
      )}
    </div>
  );
}
