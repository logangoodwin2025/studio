import { CircleDollarSign, Crosshair, Database, GitCompareArrows, Lightbulb, Target } from "lucide-react";
import { StatCard } from "@/components/stat-card";

export function SalesMarketingMetrics() {
    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <StatCard title="Lead Generation" value="1,200" change="+15%" icon={Lightbulb} />
            <StatCard title="Conversion Rates" value="5.2%" change="+0.8%" icon={GitCompareArrows} />
            <StatCard title="Sales Pipeline Value" value="$1.5M" icon={Database} />
            <StatCard title="Average Revenue per Client" value="$1,200" icon={CircleDollarSign} />
            <StatCard title="Marketing ROI" value="4.5x" icon={Target} />
            <StatCard title="Cost Per Lead (CPL)" value="$50" icon={Crosshair} />
        </div>
    )
}
