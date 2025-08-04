
import { OperationalMetrics } from "./operational-metrics";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "../ui/card";
import type { FinancialStats } from "@/lib/financial-aggregator";
import { InfoTooltip } from "../info-tooltip";

interface OperationsDashboardViewProps {
  stats: FinancialStats;
}

export function OperationsDashboardView({ stats }: OperationsDashboardViewProps) {
    return (
      <div className="space-y-6">
        <OperationalMetrics stats={stats} />
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline flex items-center">
                        Project Health
                        <InfoTooltip>
                            An overview of project status, including on-time completion rates and budget adherence.
                        </InfoTooltip>
                    </CardTitle>
                    <CardDescription>Completion rate and status overview.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="h-60 flex items-center justify-center text-muted-foreground">
                        (Chart placeholder: Project Completion Rate)
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline flex items-center">
                        Service Delivery
                        <InfoTooltip>
                            Tracks Service Level Agreement (SLA) compliance and average delivery times for services.
                        </InfoTooltip>
                    </CardTitle>
                    <CardDescription>SLA compliance and average delivery times.</CardDescription>
                </CardHeader>
                 <CardContent>
                    <div className="h-60 flex items-center justify-center text-muted-foreground">
                        (Chart placeholder: SLA Compliance)
                    </div>
                </CardContent>
            </Card>
        </div>
      </div>
    );
}
