
import { SalesMarketingMetrics } from "./sales-marketing-metrics";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "../ui/card";
import type { FinancialStats } from "@/lib/financial-aggregator";
import { InfoTooltip } from "../info-tooltip";

interface SalesMarketingDashboardViewProps {
  stats: FinancialStats;
}

export function SalesMarketingDashboardView({ stats }: SalesMarketingDashboardViewProps) {
    return (
      <div className="space-y-6">
        <SalesMarketingMetrics stats={stats} />
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline flex items-center">
                        Lead Pipeline
                        <InfoTooltip>A visual representation of the sales funnel, from lead to conversion.</InfoTooltip>
                    </CardTitle>
                    <CardDescription>Lead volume by source and conversion trends.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="h-60 flex items-center justify-center text-muted-foreground">
                        (Chart placeholder: Lead Funnel)
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline flex items-center">
                        Campaign Performance
                        <InfoTooltip>Measures the return on investment (ROI) for each marketing campaign.</InfoTooltip>
                    </CardTitle>
                    <CardDescription>Marketing ROI by campaign.</CardDescription>
                </CardHeader>
                 <CardContent>
                    <div className="h-60 flex items-center justify-center text-muted-foreground">
                        (Chart placeholder: Campaign ROI)
                    </div>
                </CardContent>
            </Card>
        </div>
      </div>
    );
}
