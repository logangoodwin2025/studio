import { AreaChart, BadgePercent, DollarSign, Target, TrendingUp, Wallet } from "lucide-react";
import { StatCard } from "@/components/stat-card";
import type { Period } from "@/app/[company]/financial-dashboard/page";

const periodData = {
    D: {
        revenue: { value: "$22k", change: "+5.2%" },
        grossMargin: { value: "35.1%", change: "-0.5%" },
        netMargin: { value: "21.8%", change: "-0.2%" },
        ebitda: { value: "$9.4k", change: "+3.1%" },
        cashFlow: { value: "$6.5k", change: "+12.0%" },
        customerLtv: { value: "$45.2k", change: "+0.1%" },
        customerCac: { value: "$2.85k", change: " " },
    },
    W: {
        revenue: { value: "$154k", change: "+8.1%" },
        grossMargin: { value: "37.5%", change: "+1.2%" },
        netMargin: { value: "23.1%", change: "+0.9%" },
        ebitda: { value: "$65k", change: "+6.5%" },
        cashFlow: { value: "$45k", change: "-1.5%" },
        customerLtv: { value: "$45.2k", change: "+0.5%" },
        customerCac: { value: "$2.85k", change: "-0.2%" },
    },
    M: {
        revenue: { value: "$670k", change: "+12.5%" },
        grossMargin: { value: "38.8%", change: "+2.1%" },
        netMargin: { value: "24.3%", change: "+1.8%" },
        ebitda: { value: "$285k", change: "+8.7%" },
        cashFlow: { value: "$195k", change: "-3.2%" },
        customerLtv: { value: "$45.2k", change: "+2.3%" },
        customerCac: { value: "$2.85k", change: "-1.8%" },
    },
    YTD: {
        revenue: { value: "$8.1M", change: "+18.2%" },
        grossMargin: { value: "40.2%", change: "+3.5%" },
        netMargin: { value: "25.5%", change: "+2.5%" },
        ebitda: { value: "$3.4M", change: "+15.9%" },
        cashFlow: { value: "$2.3M", change: "+5.1%" },
        customerLtv: { value: "$45.2k", change: "+15.3%" },
        customerCac: { value: "$2.85k", change: "-5.8%" },
    }
};

export function FinancialStats({ period }: { period: Period }) {
    const data = periodData[period];

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
            <StatCard title="Revenue" value={data.revenue.value} change={data.revenue.change} icon={DollarSign} />
            <StatCard title="Gross Margin" value={data.grossMargin.value} change={data.grossMargin.change} icon={TrendingUp} />
            <StatCard title="Net Margin" value={data.netMargin.value} change={data.netMargin.change} icon={TrendingUp} />
            <StatCard title="EBITDA" value={data.ebitda.value} change={data.ebitda.change} icon={AreaChart} />
            <StatCard title="Cash Flow" value={data.cashFlow.value} change={data.cashFlow.change} icon={Wallet} />
            <StatCard title="Customer LTV" value={data.customerLtv.value} change={data.customerLtv.change} icon={BadgePercent} />
            <StatCard title="Customer CAC" value={data.customerCac.value} change={data.customerCac.change} icon={Target} />
        </div>
    )
}
