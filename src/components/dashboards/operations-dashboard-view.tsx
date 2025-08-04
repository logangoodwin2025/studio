
import { OperationalMetrics } from "./operational-metrics";

export function OperationsDashboardView() {
    return (
      <div className="space-y-6">
        <OperationalMetrics />
        {/* Other operations-specific charts and tables would go here */}
      </div>
    );
}
