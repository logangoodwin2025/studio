
import Link from "next/link";
import { DashboardHeader } from "@/components/dashboard-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatCard } from "../stat-card";
import { UserPlus, Users, MessageSquareWarning, Clock } from "lucide-react";

const alerts = [
    { text: "QuantumLeap Corp. is nearing its storage limit.", color: "text-orange-500" },
    { text: "Synergy Solutions has low API usage this month.", color: "text-blue-500" },
    { text: "Support ticket #T-1234 has been escalated.", color: "text-red-500" },
]

export function PlatformManagerDashboardView() {
  return (
    <>
      <DashboardHeader 
        title="Platform Manager Dashboard" 
        description="Manage tenant accounts and monitor platform activity."
      />
      <main className="flex-1 p-4 sm:px-6 lg:px-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard icon={UserPlus} title="New Signups" value="12" change="in last 7 days" />
            <StatCard icon={Users} title="Active Users" value="1,402" change="across 88 tenants" />
            <StatCard icon={MessageSquareWarning} title="Open Support Tickets" value="23" change="8 high priority" />
            <StatCard icon={Clock} title="Avg. Resolution Time" value="2.1h" change="last 30 days" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Tenant Onboarding</CardTitle>
                    <CardDescription>Create a new tenant account.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground pb-4">Use the tenant management page to add, view, and manage all tenants.</p>
                    <Button asChild>
                        <Link href="/admin/tenants">Manage Tenants</Link>
                    </Button>
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Alerts</CardTitle>
                    <CardDescription>Important tenant notifications.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-3">
                        {alerts.map((alert, index) => (
                             <li key={index} className="flex items-start gap-3">
                                <div className="mt-1 h-2 w-2 rounded-full" style={{ backgroundColor: `var(--chart-${index + 2})` }} />
                                <span className="text-sm">{alert.text}</span>
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>
        </div>
      </main>
    </>
  );
}
