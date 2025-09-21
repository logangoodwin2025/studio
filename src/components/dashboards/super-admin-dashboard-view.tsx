
import Link from "next/link";
import { DashboardHeader } from "@/components/dashboard-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Info, XCircle, Shield, BarChart, Server, GanttChartSquare, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import { StatCard } from "../stat-card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Switch } from "../ui/switch";

const systemAlerts = [
    {
      icon: XCircle,
      iconColor: "text-red-500",
      title: "Integration Failed: QuickBooks",
      description: "Tenant: Acme Inc. - Could not sync invoices.",
      time: "5m ago"
    },
    {
      icon: AlertTriangle,
      iconColor: "text-orange-500",
      title: "High Login Attempts",
      description: "User: user@synergy.com - 15 failed attempts in 1 hour.",
      time: "45m ago"
    },
    {
      icon: Info,
      iconColor: "text-blue-500",
      title: "Database Maintenance",
      description: "Scheduled for 2 AM tonight. Expect brief downtime.",
      time: "2h ago"
    }
];


export function SuperAdminDashboardView() {
  return (
    <>
      <DashboardHeader 
        title="Super Admin Dashboard" 
        description="Platform-wide oversight and management."
      >
         <div className="flex items-center gap-2">
            <Button asChild>
                <Link href="/admin/audit-logs">View Audit Logs</Link>
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="icon">
                  <Settings className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle>Platform Settings</DialogTitle>
                    <DialogDescription>
                        Global configurations for the PinnSight platform.
                    </DialogDescription>
                </DialogHeader>
                <div className="py-4 space-y-6">
                   <div className="space-y-4">
                      <h4 className="font-semibold">Maintenance Mode</h4>
                      <div className="flex items-center space-x-2">
                        <Switch id="maintenance-mode" />
                        <Label htmlFor="maintenance-mode">Enable Maintenance Mode</Label>
                      </div>
                      <p className="text-sm text-muted-foreground">This will take the platform offline for all tenants except for administrators.</p>
                   </div>
                   <div className="space-y-4">
                      <h4 className="font-semibold">API Rate Limits</h4>
                      <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="rate-limit" className="text-right">
                              Requests/min
                          </Label>
                          <Input id="rate-limit" defaultValue="100" className="col-span-3" />
                      </div>
                       <p className="text-sm text-muted-foreground">Set the default number of API requests allowed per minute for tenants.</p>
                   </div>
                </div>
                 <DialogFooter>
                    <Button type="submit">Save Changes</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
        </div>
      </DashboardHeader>
      <main className="flex-1 p-4 sm:px-6 lg:px-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard icon={GanttChartSquare} title="Active Companies" value="88" change="+5 this month" />
            <StatCard icon={BarChart} title="Platform MRR" value="$125,430" change="+2.1%" />
            <StatCard icon={Server} title="System Uptime" value="99.98%" change="30 days" />
            <StatCard icon={Shield} title="API Latency" value="85ms" change="avg" />
        </div>
        <div className="grid grid-cols-1">
             <Card>
                <CardHeader>
                    <CardTitle className="font-headline">System Alerts</CardTitle>
                    <CardDescription>Critical platform notifications and events.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {systemAlerts.map((alert, index) => (
                        <div key={index} className="flex items-start gap-4">
                            <alert.icon className={cn("h-6 w-6 flex-shrink-0", alert.iconColor)} />
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
      </main>
    </>
  );
}
