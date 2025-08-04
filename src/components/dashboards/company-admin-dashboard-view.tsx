

"use client";

import { DashboardHeader } from "@/components/dashboard-header";
import { UsersDataTable } from "../users-data-table";
import { userList } from "@/lib/mock-data";
import { CompanyAdminSettings } from "../company-admin-settings";
import { StatCard } from "../stat-card";
import { BadgeDollarSign, Users, PieChart, CalendarCheck2, BarChart2, UserPlus, Download } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../ui/card";
import { Button } from "../ui/button";

export function CompanyAdminDashboardView() {
  return (
    <>
      <DashboardHeader 
        title="Company Admin Dashboard" 
        description="Manage your company's users, settings, and subscription."
      />
      <main className="flex-1 p-4 sm:px-6 lg:px-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard icon={BadgeDollarSign} title="Total Revenue (YTD)" value="$4.8M" change="+12.5%" />
            <StatCard icon={Users} title="Active Members" value="1,402" change="+32 this month" />
            <StatCard icon={PieChart} title="Team Utilization" value="88%" change="-2%" />
            <StatCard icon={CalendarCheck2} title="Next Billing Date" value="Aug 1, 2025" change="in 21 days" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
                <UsersDataTable initialUsers={userList} />
            </div>
            <div className="space-y-6">
                 <Card>
                    <CardHeader>
                        <CardTitle className="font-headline">Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col space-y-2">
                        <Button variant="outline"><UserPlus className="mr-2 h-4 w-4" /> Add User</Button>
                        <Button variant="outline"><Download className="mr-2 h-4 w-4" /> Export Company Data</Button>
                    </CardContent>
                </Card>
                 <CompanyAdminSettings />
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">User Logins</CardTitle>
                    <CardDescription>Team login activity by day and time.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="h-48 flex items-center justify-center text-muted-foreground bg-secondary/30 rounded-lg">
                        <BarChart2 className="h-16 w-16" />
                        (Heatmap Chart Placeholder)
                    </div>
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Data Entry Compliance</CardTitle>
                    <CardDescription>Percentage of departments meeting data entry deadlines.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="h-48 flex items-center justify-center text-muted-foreground bg-secondary/30 rounded-lg">
                        <PieChart className="h-16 w-16" />
                        (Pie Chart Placeholder)
                    </div>
                </CardContent>
            </Card>
        </div>
        
      </main>
    </>
  );
}
