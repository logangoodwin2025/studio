import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { SalesMarketingMetrics } from "./sales-marketing-metrics";

export function SalesMarketingDashboardView() {
    return (
      <Card>
        <CardHeader>
            <CardTitle className="font-headline">Sales & Marketing Metrics</CardTitle>
        </CardHeader>
        <CardContent>
            <SalesMarketingMetrics />
        </CardContent>
      </Card>
    );
}
