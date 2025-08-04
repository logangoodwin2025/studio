
import { AreaChart, BadgePercent, DollarSign, Target, TrendingUp, Wallet } from "lucide-react";
import { StatCard } from "@/components/stat-card";
import type { FinancialStats as FinancialStatsType } from "@/lib/financial-aggregator";

export function FinancialStats({ stats }: { stats: FinancialStatsType }) {
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
            <StatCard 
                title="Revenue" 
                value={stats.revenue.value} 
                change={stats.revenue.change} 
                icon={DollarSign}
                tooltipText="Total income generated from sales of goods or services."
            />
            <StatCard 
                title="Gross Margin" 
                value={stats.grossMargin.value} 
                change={stats.grossMargin.change} 
                icon={TrendingUp}
                tooltipText="Percentage of revenue left after subtracting the cost of goods sold (COGS)."
            />
            <StatCard 
                title="Net Margin" 
                value={stats.netMargin.value} 
                change={stats.netMargin.change} 
                icon={TrendingUp}
                tooltipText="Percentage of revenue left after all expenses, including taxes and interest, are deducted."
            />
            <StatCard 
                title="EBITDA" 
                value={stats.ebitda.value} 
                change={stats.ebitda.change} 
                icon={AreaChart}
                tooltipText="Earnings Before Interest, Taxes, Depreciation, and Amortization."
            />
            <StatCard 
                title="Cash Flow" 
                value={stats.cashFlow.value} 
                change={stats.cashFlow.change} 
                icon={Wallet}
                tooltipText="Net amount of cash being transferred into and out of the business."
            />
            <StatCard 
                title="Customer LTV" 
                value={stats.customerLtv.value} 
                change={stats.customerLtv.change} 
                icon={BadgePercent}
                tooltipText="Predicted net profit attributed to the entire future relationship with a customer."
            />
            <StatCard 
                title="Customer CAC" 
                value={stats.customerCac.value} 
                change={stats.customerCac.change} 
                icon={Target}
                tooltipText="The cost of acquiring a new customer."
            />
        </div>
    )
}
