
import Link from "next/link";
import { DashboardHeader } from "@/components/dashboard-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatCard } from "../stat-card";
import { UserPlus, Users, MessageSquareWarning, Clock, AlertTriangle, CheckCircle, Info, BarChart2, LineChart, Database } from "lucide-react";

const alerts = [
    { 
        icon: CheckCircle,
        title: "New Tenant Onboarded",
        description: "QuantumLeap Corp. has completed setup.", 
        time: "1h ago",
        color: "text-green-500" 
    },
    { 
        icon: AlertTriangle,
        title: "High Priority Ticket",
        description: "Support ticket #T-1234 has been escalated.", 
        time: "3h ago",
        color: "text-orange-500" 
    },
    { 
        icon: Info,
        title: "Low API Usage",
        description: "Synergy Solutions has low API usage this month.", 
        time: "1d ago",
        color: "text-blue-500"
    },
];

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
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            <Card className="xl:col-span-2">
                <CardHeader>
                    <CardTitle className="font-headline">Tenant Activity</CardTitle>
                    <CardDescription>New signups trend over the last 30 days.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="h-60 flex items-center justify-center text-muted-foreground bg-secondary/30 rounded-lg">
                        <LineChart className="h-16 w-16" />
                        (Chart Placeholder: New Signups)
                    </div>
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Support Tickets</CardTitle>
                    <CardDescription>Open vs. Resolved by priority.</CardDescription>
                </CardHeader>
                <CardContent>
                     <div className="h-60 flex items-center justify-center text-muted-foreground bg-secondary/30 rounded-lg">
                        <BarChart2 className="h-16 w-16" />
                        (Chart Placeholder: Support Tickets)
                    </div>
                </CardContent>
            </Card>
        </div>
         <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            <div className="xl:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline">Resource Utilization</CardTitle>
                        <CardDescription>Storage usage per tenant.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-60 flex items-center justify-center text-muted-foreground bg-secondary/30 rounded-lg">
                            <Database className="h-16 w-16" />
                            (Gauge Chart Placeholder)
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline">API Calls</CardTitle>
                        <CardDescription>Peak usage times.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-60 flex items-center justify-center text-muted-foreground bg-secondary/30 rounded-lg">
                           <LineChart className="h-16 w-16" />
                           (Line Chart Placeholder)
                        </div>
                    </CardContent>
                </Card>
            </div>
            <div className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline">Tenant Onboarding</CardTitle>
                        <CardDescription>Create and manage new tenant accounts.</CardDescription>
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
                    <CardContent className="space-y-4">
                        {alerts.map((alert, index) => (
                            <div key={index} className="flex items-start gap-4">
                                <alert.icon className={`h-6 w-6 flex-shrink-0 ${alert.color}`} />
                                <div className="flex-grow">
                                    <p className="font-semibold text-sm">{alert.title}</p>
                                    <p className="text-sm text-muted-foreground">{alert.description}</p>
                                    <p className="text-xs text-muted-foreground mt-1">{alert.time}</p>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>
        </div>
      </main>
    </>
  );
}
