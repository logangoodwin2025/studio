import { AreaChart, BadgePercent, DollarSign, Target, TrendingUp, Wallet } from "lucide-react";
import { StatCard } from "@/components/stat-card";

export function FinancialStats() {
    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            <StatCard title="Monthly Revenue" value="$670,000" change="+12.5%" icon={DollarSign} iconBgColor="bg-green-100 dark:bg-green-900" />
            <StatCard title="Gross Profit Margin" value="38.8%" change="+2.1%" icon={TrendingUp} iconBgColor="bg-blue-100 dark:bg-blue-900" />
            <StatCard title="EBITDA" value="$285,000" change="+8.7%" icon={AreaChart} iconBgColor="bg-purple-100 dark:bg-purple-900" />
            <StatCard title="Cash Flow" value="$195,000" change="-3.2%" icon={Wallet} iconBgColor="bg-orange-100 dark:bg-orange-900" />
            <StatCard title="Customer LTV" value="$45,200" change="+15.3%" icon={BadgePercent} iconBgColor="bg-teal-100 dark:bg-teal-900" />
            <StatCard title="Customer CAC" value="$2,850" change="-5.8%" icon={Target} iconBgColor="bg-pink-100 dark:bg-pink-900" />
        </div>
    )
}
