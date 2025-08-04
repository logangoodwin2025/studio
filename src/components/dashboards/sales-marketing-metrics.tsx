
import { CircleDollarSign, Crosshair, Database, GitCompareArrows, Lightbulb, Target } from "lucide-react";
import { StatCard } from "@/components/stat-card";
import type { FinancialStats } from "@/lib/financial-aggregator";

interface SalesMarketingMetricsProps {
    stats: FinancialStats;
}

// In a real app, this data would be fetched and not derived from financial stats.
// We are simulating it for the prototype.
const getSimulatedSalesData = (stats: FinancialStats) => {
    return {
        leadGeneration: { value: "1,200", change: "+15%" },
        conversionRate: { value: "5.2%", change: "+0.8%" },
        pipelineValue: { value: "$1.5M", change: stats.revenue.change },
        avgRevenue: { value: "$1,200", change: stats.customerLtv.change },
        marketingRoi: { value: "4.5x", change: "+0.5x" },
        cpl: { value: stats.customerCac.value, change: stats.customerCac.change },
    }
}


export function SalesMarketingMetrics({ stats }: SalesMarketingMetricsProps) {
    const data = getSimulatedSalesData(stats);
    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <StatCard title="Lead Generation" value={data.leadGeneration.value} change={data.leadGeneration.change} icon={Lightbulb} />
            <StatCard title="Conversion Rates" value={data.conversionRate.value} change={data.conversionRate.change} icon={GitCompareArrows} />
            <StatCard title="Sales Pipeline Value" value={data.pipelineValue.value} change={data.pipelineValue.change} icon={Database} />
            <StatCard title="Average Revenue per Client" value={data.avgRevenue.value} change={data.avgRevenue.change} icon={CircleDollarSign} />
            <StatCard title="Marketing ROI" value={data.marketingRoi.value} change={data.marketingRoi.change} icon={Target} />
            <StatCard title="Cost Per Lead (CPL)" value={data.cpl.value} change={data.cpl.change} icon={Crosshair} />
        </div>
    )
}
