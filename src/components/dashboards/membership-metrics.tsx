import { HeartHandshake, Smile, Star, UserMinus, UserPlus, UserX, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatCard } from "@/components/stat-card";

export function MembershipMetrics() {
    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <StatCard title="Total Members" value="10,482" change="+250" icon={Users} />
            <StatCard title="New Members Gained" value="312" change="+10%" icon={UserPlus} />
            <StatCard title="Members Lost" value="62" change="-5%" icon={UserMinus} />
            <StatCard title="Retention Rate" value="94%" icon={HeartHandshake} />
            <StatCard title="Churn Rate" value="6%" icon={UserX} />
            <StatCard title="Client Satisfaction (CSAT)" value="92%" change="+2%" icon={Smile} />
            <StatCard title="Net Promoter Score (NPS)" value="65" change="+5" icon={Star} />
        </div>
    )
}
