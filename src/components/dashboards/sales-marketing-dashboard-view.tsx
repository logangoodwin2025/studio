
import { SalesMarketingMetrics } from "./sales-marketing-metrics";

export function SalesMarketingDashboardView() {
    return (
      <div className="space-y-6">
        <SalesMarketingMetrics />
        {/* Other sales-specific charts and tables would go here */}
      </div>
    );
}
