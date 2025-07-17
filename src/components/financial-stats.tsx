import { AreaChart, BadgePercent, DollarSign, Target, TrendingUp, Wallet, Receipt } from "lucide-react";
import { StatCard } from "@/components/stat-card";

export function FinancialStats() {
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
            <StatCard title="Revenue" value="$670k" change="+12.5%" icon={DollarSign} />
            <StatCard title="Gross Margin" value="38.8%" change="+2.1%" icon={TrendingUp} />
            <StatCard title="Net Margin" value="24.3%" change="+1.8%" icon={TrendingUp} />
            <StatCard title="EBITDA" value="$285k" change="+8.7%" icon={AreaChart} />
            <StatCard title="Cash Flow" value="$195k" change="-3.2%" icon={Wallet} />
            <StatCard title="Customer LTV" value="$45.2k" change="+15.3%" icon={BadgePercent} />
            <StatCard title="Customer CAC" value="$2.85k" change="-5.8%" icon={Target} />
        </div>
    )
}
