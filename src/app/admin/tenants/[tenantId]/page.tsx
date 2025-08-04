
"use client";

import { notFound, useParams } from "next/navigation";
import { tenants } from "@/lib/mock-data";
import { DashboardHeader } from "@/components/dashboard-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Clock, DollarSign, Activity, FileText, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function TenantDetailsPage() {
    const params = useParams();
    const tenantId = params.tenantId as string;

    const tenant = tenants.find(t => t.id === tenantId);

    if (!tenant) {
        notFound();
    }

    return (
        <>
            <DashboardHeader 
                title={tenant.name} 
                description={`Details and management for ${tenant.name}.`} 
            />
            <main className="flex-1 p-4 sm:px-6 lg:px-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">Subscription Plan</CardTitle>
                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{tenant.plan}</div>
                            <Badge variant={tenant.status === 'Active' ? 'secondary' : 'destructive'} className="mt-1">{tenant.status}</Badge>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{tenant.users}</div>
                            <p className="text-xs text-muted-foreground">users currently active</p>
                        </CardContent>
                    </Card>
                     <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">Last Activity</CardTitle>
                            <Clock className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{tenant.lastActive}</div>
                            <p className="text-xs text-muted-foreground">last interaction recorded</p>
                        </CardContent>
                    </Card>
                     <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">API Usage</CardTitle>
                            <Activity className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">1.2M</div>
                            <p className="text-xs text-muted-foreground">requests this month</p>
                        </CardContent>
                    </Card>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                         <Card>
                            <CardHeader>
                                <CardTitle>Users</CardTitle>
                                <CardDescription>Users associated with {tenant.name}.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">(User data table placeholder)</p>
                            </CardContent>
                        </Card>
                    </div>
                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Actions</CardTitle>
                            </CardHeader>
                            <CardContent className="flex flex-col space-y-2">
                                <Button>Change Plan</Button>
                                <Button variant="outline">Reset Admin Password</Button>
                                <Button variant="destructive">Suspend Tenant</Button>
                            </CardContent>
                        </Card>
                         <Card>
                            <CardHeader>
                                <CardTitle>Recent Activity</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">(Activity feed placeholder)</p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </main>
        </>
    );
}
