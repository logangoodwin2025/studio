
import { AreaChart, BadgePercent, DollarSign, Target, TrendingUp, Wallet } from "lucide-react";
import { StatCard } from "@/components/stat-card";
import type { Period } from "@/app/[company]/financial-dashboard/page";
import type { DateRange } from "react-day-picker";
import { useFinancialData } from "@/context/financial-data-context";
import { getStatsForPeriod } from "@/lib/financial-aggregator";


export function FinancialStats({ period, dateRange }: { period: Period, dateRange: DateRange | undefined }) {
    const { data } = useFinancialData();
    const stats = getStatsForPeriod(data, period, dateRange);

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
            <StatCard title="Revenue" value={stats.revenue.value} change={stats.revenue.change} icon={DollarSign} />
            <StatCard title="Gross Margin" value={stats.grossMargin.value} change={stats.grossMargin.change} icon={TrendingUp} />
            <StatCard title="Net Margin" value={stats.netMargin.value} change={stats.netMargin.change} icon={TrendingUp} />
            <StatCard title="EBITDA" value={stats.ebitda.value} change={stats.ebitda.change} icon={AreaChart} />
            <StatCard title="Cash Flow" value={stats.cashFlow.value} change={stats.cashFlow.change} icon={Wallet} />
            <StatCard title="Customer LTV" value={stats.customerLtv.value} change={stats.customerLtv.change} icon={BadgePercent} />
            <StatCard title="Customer CAC" value={stats.customerCac.value} change={stats.customerCac.change} icon={Target} />
        </div>
    )
}
