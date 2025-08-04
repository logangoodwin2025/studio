
"use client";

import Link from "next/link";
import { useState } from "react";
import type { Period } from "@/lib/types";
import type { DateRange } from "react-day-picker";
import { DashboardHeader } from "@/components/dashboard-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatCard } from "../stat-card";
import { UserPlus, Users, MessageSquareWarning, Clock, BarChart2, LineChart as LineChartIcon, Database, ExternalLink } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { tenants, supportTickets, userList } from "@/lib/mock-data";
import { Badge } from "../ui/badge";
import { PeriodPicker } from "../period-picker";
import { BarChart, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Bar } from "recharts";


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

const newSignupsData = [
    { date: "Jan", signups: 5 }, { date: "Feb", signups: 8 }, { date: "Mar", signups: 12 },
    { date: "Apr", signups: 10 }, { date: "May", signups: 15 }, { date: "Jun", signups: 18 },
];

const supportTicketsData = [
    { priority: "Low", open: 10, resolved: 30 },
    { priority: "Medium", open: 8, resolved: 25 },
    { priority: "High", open: 5, resolved: 15 },
];


const recentSignups = tenants.slice(0, 3);
const activeUsers = userList.slice(0, 5);
const openTickets = supportTickets.filter(t => t.status === 'Open').slice(0, 5);

export function PlatformManagerDashboardView() {
  const [tenantActivityPeriod, setTenantActivityPeriod] = useState<Period>('M');
  const [tenantActivityDateRange, setTenantActivityDateRange] = useState<DateRange | undefined>(undefined);
  const [supportTicketsPeriod, setSupportTicketsPeriod] = useState<Period>('M');
  const [supportTicketsDateRange, setSupportTicketsDateRange] = useState<DateRange | undefined>(undefined);
  const [resourcePeriod, setResourcePeriod] = useState<Period>('M');
  const [resourceDateRange, setResourceDateRange] = useState<DateRange | undefined>(undefined);
  const [apiCallsPeriod, setApiCallsPeriod] = useState<Period>('M');
  const [apiCallsDateRange, setApiCallsDateRange] = useState<DateRange | undefined>(undefined);

  return (
    <>
      <DashboardHeader 
        title="Platform Manager Dashboard" 
        description="Manage tenant accounts and monitor platform activity."
      />
      <main className="flex-1 p-4 sm:px-6 lg:px-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Dialog>
                <DialogTrigger asChild>
                    <div className="cursor-pointer"><StatCard icon={UserPlus} title="New Signups" value="12" change="in last 7 days" /></div>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>Recent Signups</DialogTitle>
                        <DialogDescription>The most recent tenants to join the platform.</DialogDescription>
                    </DialogHeader>
                    <Table>
                        <TableHeader>
                            <TableRow><TableHead>Company</TableHead><TableHead>Plan</TableHead><TableHead>Status</TableHead></TableRow>
                        </TableHeader>
                        <TableBody>
                            {recentSignups.map(tenant => (
                                <TableRow key={tenant.id}>
                                    <TableCell>{tenant.name}</TableCell>
                                    <TableCell><Badge variant="secondary">{tenant.plan}</Badge></TableCell>
                                    <TableCell><Badge variant={tenant.status === 'Active' ? 'secondary' : 'destructive'}>{tenant.status}</Badge></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </DialogContent>
            </Dialog>
            <Dialog>
                 <DialogTrigger asChild>
                    <div className="cursor-pointer"><StatCard icon={Users} title="Active Users" value="1,402" change="across 88 tenants" /></div>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>Recently Active Users</DialogTitle>
                        <DialogDescription>Users who have recently logged in or performed an action.</DialogDescription>
                    </DialogHeader>
                    <Table>
                         <TableHeader>
                            <TableRow><TableHead>Name</TableHead><TableHead>Email</TableHead><TableHead>Role</TableHead></TableRow>
                        </TableHeader>
                        <TableBody>
                            {activeUsers.map(user => (
                                <TableRow key={user.id}>
                                    <TableCell>{user.name}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.role}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </DialogContent>
            </Dialog>
            <Dialog>
                <DialogTrigger asChild>
                    <div className="cursor-pointer"><StatCard icon={MessageSquareWarning} title="Open Support Tickets" value="23" change="8 high priority" /></div>
                </DialogTrigger>
                 <DialogContent className="max-w-3xl">
                    <DialogHeader>
                        <DialogTitle className="flex items-center justify-between">
                            <span>Open Support Tickets</span>
                            <Button asChild variant="outline" size="sm">
                                <Link href="/admin/support-tickets">View All Tickets <ExternalLink className="h-4 w-4 ml-2" /></Link>
                            </Button>
                        </DialogTitle>
                        <DialogDescription>A list of currently open support tickets.</DialogDescription>
                    </DialogHeader>
                    <Table>
                        <TableHeader>
                            <TableRow><TableHead>Ticket ID</TableHead><TableHead>Subject</TableHead><TableHead>Priority</TableHead><TableHead>Tenant</TableHead></TableRow>
                        </TableHeader>
                        <TableBody>
                            {openTickets.map(ticket => (
                                <TableRow key={ticket.id}>
                                    <TableCell>{ticket.id}</TableCell>
                                    <TableCell>{ticket.subject}</TableCell>
                                    <TableCell><Badge variant={ticket.priority === 'High' ? 'destructive' : 'secondary'}>{ticket.priority}</Badge></TableCell>
                                    <TableCell>{ticket.tenant}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </DialogContent>
            </Dialog>
            <StatCard icon={Clock} title="Avg. Resolution Time" value="2.1h" change="last 30 days" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            <Card className="xl:col-span-2">
                <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                    <div>
                        <CardTitle className="font-headline">Tenant Activity</CardTitle>
                        <CardDescription>New signups trend over the selected period.</CardDescription>
                    </div>
                    <PeriodPicker 
                        period={tenantActivityPeriod} onPeriodChange={setTenantActivityPeriod} 
                        dateRange={tenantActivityDateRange} onDateRangeChange={setTenantActivityDateRange} 
                    />
                </CardHeader>
                <CardContent>
                    <div className="h-60">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={newSignupsData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="date" fontSize={12} />
                                <YAxis fontSize={12} />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="signups" stroke="hsl(var(--primary))" strokeWidth={2} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>
             <Card>
                <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                     <div>
                        <CardTitle className="font-headline">Support Tickets</CardTitle>
                        <CardDescription>Open vs. Resolved by priority.</CardDescription>
                    </div>
                     <PeriodPicker 
                        period={supportTicketsPeriod} onPeriodChange={setSupportTicketsPeriod} 
                        dateRange={supportTicketsDateRange} onDateRangeChange={setSupportTicketsDateRange} 
                    />
                </CardHeader>
                <CardContent>
                     <div className="h-60">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={supportTicketsData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="priority" fontSize={12} />
                                <YAxis fontSize={12} />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="open" fill="hsl(var(--chart-3))" name="Open" radius={[4,4,0,0]}/>
                                <Bar dataKey="resolved" fill="hsl(var(--chart-2))" name="Resolved" radius={[4,4,0,0]}/>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>
        </div>
         <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            <div className="xl:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                    <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                        <div>
                            <CardTitle className="font-headline">Resource Utilization</CardTitle>
                            <CardDescription>Storage usage per tenant.</CardDescription>
                        </div>
                        <PeriodPicker
                            period={resourcePeriod} onPeriodChange={setResourcePeriod}
                            dateRange={resourceDateRange} onDateRangeChange={setResourceDateRange}
                        />
                    </CardHeader>
                    <CardContent>
                        <div className="h-60 flex items-center justify-center text-muted-foreground bg-secondary/30 rounded-lg">
                            <Database className="h-16 w-16" />
                            (Gauge Chart Placeholder)
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                        <div>
                            <CardTitle className="font-headline">API Calls</CardTitle>
                            <CardDescription>Peak usage times.</CardDescription>
                        </div>
                        <PeriodPicker
                            period={apiCallsPeriod} onPeriodChange={setApiCallsPeriod}
                            dateRange={apiCallsDateRange} onDateRangeChange={setApiCallsDateRange}
                        />
                    </CardHeader>
                    <CardContent>
                        <div className="h-60">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={newSignupsData.map(d => ({ ...d, calls: d.signups * 1000 * (Math.random() + 0.5) }))}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                    <XAxis dataKey="date" fontSize={12} />
                                    <YAxis fontSize={12} tickFormatter={(val) => `${val/1000}k`} />
                                    <Tooltip />
                                    <Legend />
                                    <Line type="monotone" dataKey="calls" name="API Calls" stroke="hsl(var(--chart-5))" strokeWidth={2} />
                                </LineChart>
                            </ResponsiveContainer>
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
