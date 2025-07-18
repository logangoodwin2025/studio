import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { OperationalMetrics } from "./operational-metrics";

export function OperationsDashboardView() {
    return (
      <Card>
        <CardHeader>
            <CardTitle className="font-headline">Operational Metrics</CardTitle>
        </CardHeader>
        <CardContent>
            <OperationalMetrics />
        </CardContent>
      </Card>
    );
}
