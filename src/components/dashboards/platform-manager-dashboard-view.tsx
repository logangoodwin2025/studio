
import { DashboardHeader } from "@/components/dashboard-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function PlatformManagerDashboardView() {
  return (
    <>
      <DashboardHeader 
        title="Platform Manager Dashboard" 
        description="Manage tenant accounts and monitor platform activity."
      />
      <main className="flex-1 p-4 sm:px-6 lg:px-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
                <CardHeader>
                    <CardTitle>New Signups</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-2xl font-bold">12</p>
                    <p className="text-xs text-muted-foreground">in the last 7 days</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Active Users</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-2xl font-bold">1,402</p>
                    <p className="text-xs text-muted-foreground">across 88 tenants</p>
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle>Open Support Tickets</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-2xl font-bold">23</p>
                    <p className="text-xs text-muted-foreground">8 high priority</p>
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle>Avg. Resolution Time</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-2xl font-bold">2.1h</p>
                    <p className="text-xs text-muted-foreground">over last 30 days</p>
                </CardContent>
            </Card>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Tenant Onboarding</CardTitle>
                    <CardDescription>Create a new tenant account.</CardDescription>
                </CardHeader>
                <CardContent>
                    {/* Placeholder for onboarding form */}
                    <p className="text-muted-foreground">(Onboarding form goes here)</p>
                    <Button className="mt-4">Add New Tenant</Button>
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Alerts</CardTitle>
                    <CardDescription>Important tenant notifications.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ul className="list-disc list-inside text-sm space-y-2">
                        <li><span className="font-semibold">QuantumLeap Corp.</span> is nearing its storage limit.</li>
                        <li><span className="font-semibold">Synergy Solutions</span> has low API usage this month.</li>
                    </ul>
                </CardContent>
            </Card>
        </div>
      </main>
    </>
  );
}
