

"use client";

import * as React from "react";
import { useUserRole } from "@/hooks/use-user-role";
import { DashboardHeader } from "@/components/dashboard-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap, CheckCircle, RefreshCw, AlertTriangle, ExternalLink, History, PlayCircle } from "lucide-react";
import { Loading } from "@/components/loading";
import { PlatformIntegrationsSettings } from "@/components/platform-integrations-settings";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";


const initialIntegrations = [
    { id: "qbo", name: "QuickBooks Online", category: "Accounting", connected: true, logo: "/logos/quickbooks.svg", lastSynced: new Date(Date.now() - 1000 * 60 * 5) },
    { id: "sage", name: "Sage", category: "Accounting", connected: false, logo: "/logos/sage.svg" },
    { id: "stripe", name: "Stripe", category: "Payments", connected: true, logo: "/logos/stripe.svg", lastSynced: new Date(Date.now() - 1000 * 60 * 30) },
    { id: "hubspot", name: "HubSpot", category: "CRM", connected: false, logo: "/logos/hubspot.svg" },
    { id: "ga4", name: "Google Analytics 4", category: "Analytics", connected: true, logo: "/logos/ga4.svg", lastSynced: new Date(Date.now() - 1000 * 60 * 60 * 2) },
    { id: "fb", name: "Facebook Lead Ads", category: "Leads", connected: false, logo: "/logos/facebook.svg" },
];

const syncHistory = [
    { id: 'sync_1', status: 'Success', description: 'Synced 157 invoices.', timestamp: new Date(Date.now() - 1000 * 60 * 5) },
    { id: 'sync_2', status: 'Success', description: 'Synced 156 invoices.', timestamp: new Date(Date.now() - 1000 * 60 * 65) },
    { id: 'sync_3', status: 'Failed', description: 'API connection timed out.', timestamp: new Date(Date.now() - 1000 * 60 * 125) },
    { id: 'sync_4', status: 'Success', description: 'Synced 149 invoices.', timestamp: new Date(Date.now() - 1000 * 60 * 185) },
];


type Integration = typeof initialIntegrations[0] & { lastSynced?: Date };

function CompanyAdminIntegrationsView() {
    const { toast } = useToast();
    const [integrations, setIntegrations] = React.useState<Integration[]>(initialIntegrations);
    const [selectedIntegration, setSelectedIntegration] = React.useState<Integration | null>(null);

    const handleConnect = (integrationId: string) => {
        // Simulate a successful connection after a delay
        setTimeout(() => {
            setIntegrations(prev => prev.map(int => int.id === integrationId ? { ...int, connected: true, lastSynced: new Date() } : int));
            toast({
                title: "Connection Successful!",
                description: `Successfully connected to ${integrations.find(i => i.id === integrationId)?.name}.`,
            });
        }, 1000);
    };

    const handleDisconnect = (integrationId: string) => {
         setIntegrations(prev => prev.map(int => int.id === integrationId ? { ...int, connected: false, lastSynced: undefined } : int));
         toast({
            variant: "destructive",
            title: "Disconnected",
            description: `Successfully disconnected from ${integrations.find(i => i.id === integrationId)?.name}.`,
        });
    }

    const handleSyncNow = (integrationId: string) => {
        toast({
            title: "Sync Initiated",
            description: `Manual data sync for ${integrations.find(i => i.id === integrationId)?.name} has started.`
        })
    }
    
    const handleSyncAll = () => {
        const connectedIntegrations = integrations.filter(int => int.connected);
        connectedIntegrations.forEach(int => {
             toast({
                title: `Sync Initiated for ${int.name}`,
                description: `Data synchronization has started.`
            })
        })
    }

    return (
        <div className="space-y-6">
            <DashboardHeader
                title="Integrations Hub"
                description="Connect your tools to automate data synchronization."
            >
                <Button onClick={handleSyncAll}>
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Sync All Connections
                </Button>
            </DashboardHeader>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {integrations.map((integration) => (
                    <Card key={integration.name} className="flex flex-col">
                        <CardHeader className="flex flex-row items-start justify-between">
                            <div className="flex items-center gap-4">
                                <img src={integration.logo} alt={integration.name} className="h-10 w-10"/>
                                <div>
                                    <CardTitle className="font-headline text-lg">{integration.name}</CardTitle>
                                    <CardDescription>{integration.category}</CardDescription>
                                </div>
                            </div>
                           <div className="flex items-center gap-2">
                                {integration.connected && (
                                    <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => handleSyncNow(integration.id)}>
                                        <RefreshCw className="h-4 w-4" />
                                        <span className="sr-only">Sync Now</span>
                                    </Button>
                                )}
                                {integration.connected && (
                                    <div className="flex items-center gap-1 text-xs text-green-600">
                                        <CheckCircle className="h-3 w-3" />
                                        <span>Connected</span>
                                    </div>
                                )}
                           </div>
                        </CardHeader>
                        <CardContent className="flex-grow">
                             {integration.connected && integration.lastSynced && (
                                <div className="text-xs text-muted-foreground flex items-center gap-2">
                                    <History className="h-3 w-3" />
                                    <span>Last synced {formatDistanceToNow(integration.lastSynced, { addSuffix: true })}</span>
                                </div>
                            )}
                        </CardContent>
                        <CardFooter>
                            {integration.connected ? (
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button variant="outline" className="w-full" onClick={() => setSelectedIntegration(integration)}>Manage</Button>
                                    </DialogTrigger>
                                     <DialogContent className="max-w-2xl">
                                        <DialogHeader>
                                            <DialogTitle>Manage {selectedIntegration?.name}</DialogTitle>
                                            <DialogDescription>
                                                Review sync history and manage your connection.
                                            </DialogDescription>
                                        </DialogHeader>
                                        <div className="py-4 space-y-6">
                                            <div className="flex flex-col sm:flex-row gap-2">
                                                <Button variant="outline" className="w-full justify-center gap-2" onClick={() => handleSyncNow(selectedIntegration!.id)}>
                                                    <RefreshCw className="h-4 w-4"/>
                                                    Sync Now
                                                </Button>
                                                <AlertDialog>
                                                    <AlertDialogTrigger asChild>
                                                        <Button variant="destructive" className="w-full justify-center gap-2">
                                                            <AlertTriangle className="h-4 w-4"/>
                                                            Disconnect
                                                        </Button>
                                                    </AlertDialogTrigger>
                                                    <AlertDialogContent>
                                                        <AlertDialogHeader>
                                                            <AlertDialogTitle>Are you sure you want to disconnect?</AlertDialogTitle>
                                                            <AlertDialogDescription>
                                                                Disconnecting from {selectedIntegration?.name} will stop data synchronization. You can reconnect at any time.
                                                            </AlertDialogDescription>
                                                        </AlertDialogHeader>
                                                        <AlertDialogFooter>
                                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                            <DialogClose asChild>
                                                                <AlertDialogAction onClick={() => handleDisconnect(selectedIntegration!.id)}>Disconnect</AlertDialogAction>
                                                            </DialogClose>
                                                        </AlertDialogFooter>
                                                    </AlertDialogContent>
                                                </AlertDialog>
                                            </div>
                                            <div>
                                                <h3 className="text-sm font-semibold mb-2">Sync History</h3>
                                                <div className="border rounded-lg">
                                                    <Table>
                                                        <TableHeader>
                                                            <TableRow>
                                                                <TableHead>Timestamp</TableHead>
                                                                <TableHead>Status</TableHead>
                                                                <TableHead>Details</TableHead>
                                                            </TableRow>
                                                        </TableHeader>
                                                        <TableBody>
                                                            {syncHistory.map(sync => (
                                                                <TableRow key={sync.id}>
                                                                    <TableCell className="text-xs">{formatDistanceToNow(sync.timestamp, { addSuffix: true })}</TableCell>
                                                                    <TableCell>
                                                                        <Badge variant={sync.status === 'Success' ? 'secondary' : 'destructive'}>
                                                                            {sync.status}
                                                                        </Badge>
                                                                    </TableCell>
                                                                    <TableCell className="text-xs">{sync.description}</TableCell>
                                                                </TableRow>
                                                            ))}
                                                        </TableBody>
                                                    </Table>
                                                </div>
                                            </div>
                                        </div>
                                    </DialogContent>
                                </Dialog>
                            ) : (
                                 <Dialog>
                                    <DialogTrigger asChild>
                                        <Button className="w-full" onClick={() => setSelectedIntegration(integration)}>
                                            <Zap className="h-4 w-4 mr-2" />
                                            Connect
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>Connect to {selectedIntegration?.name}</DialogTitle>
                                            <DialogDescription>
                                                You will be redirected to {selectedIntegration?.name} to securely authorize the connection.
                                            </DialogDescription>
                                        </DialogHeader>
                                        <div className="py-4 space-y-4">
                                            <p className="text-sm text-muted-foreground">By clicking continue, you agree to allow PinnSight to access data from your {selectedIntegration?.name} account. This process is secure and no login credentials are shared with PinnSight.</p>
                                        </div>
                                        <DialogFooter>
                                            <DialogClose asChild>
                                                <Button type="button" variant="outline">Cancel</Button>
                                            </DialogClose>
                                            <DialogClose asChild>
                                                 <Button type="button" onClick={() => handleConnect(selectedIntegration!.id)}>
                                                    Continue to {selectedIntegration?.name}
                                                    <ExternalLink className="h-4 w-4 ml-2"/>
                                                </Button>
                                            </DialogClose>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>
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
        </div>
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
            <main className="flex-1 p-4 sm:px-6 lg:px-8">
               {isPlatformAdmin ? (
                    <>
                         <DashboardHeader
                            title="Integrations Hub"
                            description="Manage platform-level integration settings."
                        />
                        <div className="mt-6">
                            <PlatformIntegrationsSettings />
                        </div>
                    </>
               ) : <CompanyAdminIntegrationsView />}
            </main>
        </>
    );
}
