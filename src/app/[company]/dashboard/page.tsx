import { DollarSign, Users, TrendingUp, BarChart } from "lucide-react";
import { DashboardHeader } from "@/components/dashboard-header";
import { StatCard } from "@/components/stat-card";
import { DashboardCharts } from "@/components/dashboard-charts";

export default function DashboardPage() {
  return (
    <>
      <DashboardHeader title="Dashboard" />
      <main className="flex-1 space-y-6 p-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <StatCard title="Total Revenue" value="$45,231.89" change="+20.1%" icon={DollarSign} />
          <StatCard title="Subscriptions" value="+2350" change="+180.1%" icon={Users} />
          <StatCard title="Sales" value="+12,234" change="+19%" icon={TrendingUp} />
          <StatCard title="Active Now" value="+573" change="+201 since last hour" icon={BarChart} />
        </div>
        <DashboardCharts />
      </main>
    </>
  );
}
