import { Activity, BadgeDollarSign, CheckCircle, Clock, UserCog } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatCard } from "@/components/stat-card";

export function OperationalMetrics() {
    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <StatCard title="Utilization Rate" value="85%" change="+5%" icon={Activity} />
            <StatCard title="Project Completion Rate" value="98%" icon={CheckCircle} />
            <StatCard title="Service Delivery Time" value="48h" change="-4h" icon={Clock} />
            <StatCard title="Revenue Per Employee" value="$120k" icon={BadgeDollarSign} />
            <StatCard title="Employee Utilization Rate" value="92%" icon={UserCog} />
        </div>
    )
}
