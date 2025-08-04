
import { DashboardHeader } from "@/components/dashboard-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Badge } from "../ui/badge";

const dummyTenants = [
    { name: "TechCorp Solutions", plan: "Enterprise", users: 25, lastActive: "2 hours ago", status: "Active" },
    { name: "Innovate Inc.", plan: "Paid", users: 10, lastActive: "1 day ago", status: "Active" },
    { name: "Synergy Labs", plan: "Trial", users: 5, lastActive: "3 days ago", status: "Provisioning" },
    { name: "QuantumLeap", plan: "Paid", users: 15, lastActive: "5 hours ago", status: "Active" },
    { name: "DataWeavers", plan: "Free", users: 2, lastActive: "1 week ago", status: "Suspended" },
];


export function SuperAdminDashboardView() {
  return (
    <>
      <DashboardHeader 
        title="Super Admin Dashboard" 
        description="Platform-wide oversight and management."
      />
      <main className="flex-1 p-4 sm:px-6 lg:px-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
                <CardHeader>
                    <CardTitle>Active Companies</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-2xl font-bold">88</p>
                    <p className="text-xs text-muted-foreground">+5 this month</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Platform MRR</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-2xl font-bold">$125,430</p>
                    <p className="text-xs text-muted-foreground">+2.1% from last month</p>
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle>System Uptime</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-2xl font-bold text-green-600">99.98%</p>
                    <p className="text-xs text-muted-foreground">in the last 30 days</p>
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle>API Latency</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-2xl font-bold">85ms</p>
                    <p className="text-xs text-muted-foreground">average response time</p>
                </CardContent>
            </Card>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline">Tenant Management</CardTitle>
                        <CardDescription>View, suspend, or delete tenant accounts.</CardDescription>
                    </CardHeader>
                    <CardContent>
                       <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Company</TableHead>
                                <TableHead>Plan</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Users</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {dummyTenants.map(tenant => (
                                <TableRow key={tenant.name}>
                                    <TableCell className="font-medium">{tenant.name}</TableCell>
                                    <TableCell>{tenant.plan}</TableCell>
                                    <TableCell>
                                        <Badge variant={tenant.status === 'Active' ? 'secondary' : 'destructive'}>{tenant.status}</Badge>
                                    </TableCell>
                                    <TableCell className="text-right">{tenant.users}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                       </Table>
                    </CardContent>
                </Card>
            </div>
            <div className="space-y-6">
                 <Card>
                    <CardHeader>
                        <CardTitle className="font-headline">System Alerts</CardTitle>
                        <CardDescription>Critical platform notifications.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                       <p className="text-sm">Failed integration: QuickBooks for Acme Inc.</p>
                       <p className="text-sm">High login attempts for user@synergy.com</p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle className="font-headline">Platform Settings</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col space-y-4">
                        <Button variant="outline">Toggle Maintenance Mode</Button>
                        <Button variant="outline">Manage API Rate Limits</Button>
                        <Button>View Audit Logs</Button>
                    </CardContent>
                </Card>
            </div>
        </div>
      </main>
    </>
  );
}
