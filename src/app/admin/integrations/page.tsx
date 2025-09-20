
"use client";

import { useUserRole } from "@/hooks/use-user-role";
import { DashboardHeader } from "@/components/dashboard-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap, CheckCircle } from "lucide-react";
import { Loading } from "@/components/loading";
import { PlatformIntegrationsSettings } from "@/components/platform-integrations-settings";

const integrations = [
    { name: "QuickBooks Online", category: "Accounting", connected: true, logo: "/logos/quickbooks.svg" },
    { name: "Sage", category: "Accounting", connected: false, logo: "/logos/sage.svg" },
    { name: "Stripe", category: "Payments", connected: true, logo: "/logos/stripe.svg" },
    { name: "HubSpot", category: "CRM", connected: false, logo: "/logos/hubspot.svg" },
    { name: "Google Analytics 4", category: "Analytics", connected: true, logo: "/logos/ga4.svg" },
    { name: "Facebook Lead Ads", category: "Leads", connected: false, logo: "/logos/facebook.svg" },
];


function CompanyAdminIntegrationsView() {
    return (
        <>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {integrations.map((integration) => (
                    <Card key={integration.name}>
                        <CardHeader className="flex flex-row items-start justify-between">
                            <div className="flex items-center gap-4">
                                    <img src={integration.logo} alt={integration.name} className="h-10 w-10"/>
                                <div>
                                    <CardTitle className="font-headline text-lg">{integration.name}</CardTitle>
                                    <CardDescription>{integration.category}</CardDescription>
                                </div>
                            </div>
                            {integration.connected && (
                                <div className="flex items-center gap-1 text-sm text-green-600">
                                    <CheckCircle className="h-4 w-4" />
                                    <span>Connected</span>
                                </div>
                            )}
                        </CardHeader>
                        <CardFooter>
                            {integration.connected ? (
                                <Button variant="outline" className="w-full">Manage</Button>
                            ) : (
                                <Button className="w-full">
                                    <Zap className="h-4 w-4 mr-2" />
                                    Connect
                                </Button>
                            )}
                        </CardFooter>
                    </Card>
                ))}
            </div>
                <Card className="bg-secondary/50 border-dashed">
                <CardHeader>
                    <CardTitle className="font-headline flex items-center gap-2">
                        <img src="/logos/zapier.svg" alt="Zapier" className="h-6 w-6"/>
                        Powered by Zapier
                    </CardTitle>
                    <CardDescription>
                        We use Zapier to seamlessly connect with thousands of apps. Clicking 'Connect' will guide you through a secure process to authorize PinnSight to sync data from your app. You do not need your own Zapier account.
                    </CardDescription>
                </CardHeader>
            </Card>
        </>
    )
}

export default function IntegrationsPage() {
    const { role, isLoaded } = useUserRole();

    if (!isLoaded) {
        return <Loading />
    }

    const isPlatformAdmin = role === 'Platform Super Admin' || role === 'Platform Manager';

    return (
        <>
            <DashboardHeader
                title="Integrations Hub"
                description={isPlatformAdmin ? "Manage platform-level integration settings." : "Connect your tools to automate data synchronization."}
            />
            <main className="flex-1 p-4 sm:px-6 lg:px-8 space-y-6">
               {isPlatformAdmin ? <PlatformIntegrationsSettings /> : <CompanyAdminIntegrationsView />}
            </main>
        </>
    );
}
