

"use client";

import * as React from "react";
import { useUserRole } from "@/hooks/use-user-role";
import { DashboardHeader } from "@/components/dashboard-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap, CheckCircle, RefreshCw, AlertTriangle, ExternalLink, History, PlayCircle, ChevronsUpDown } from "lucide-react";
import { Loading } from "@/components/loading";
import { PlatformIntegrationsSettings } from "@/components/platform-integrations-settings";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { formatDistanceToNow } from "date-fns";


const initialIntegrations = [
    { id: "qbo", name: "QuickBooks Online", category: "Accounting", status: "Connected", logo: "/logos/quickbooks.svg", lastSynced: new Date(Date.now() - 1000 * 60 * 5) },
    { id: "sage", name: "Sage", category: "Accounting", status: "Not Connected", logo: "/logos/sage.svg" },
    { id: "stripe", name: "Stripe", category: "Payments", status: "Connected", logo: "/logos/stripe.svg", lastSynced: new Date(Date.now() - 1000 * 60 * 30) },
    { id: "hubspot", name: "HubSpot", category: "CRM", status: "Error", logo: "/logos/hubspot.svg", lastSynced: new Date(Date.now() - 1000 * 60 * 60 * 24) },
    { id: "ga4", name: "Google Analytics 4", category: "Analytics", status: "Connected", logo: "/logos/ga4.svg", lastSynced: new Date(Date.now() - 1000 * 60 * 60 * 2) },
    { id: "fb", name: "Facebook Lead Ads", category: "Leads", status: "Not Connected", logo: "/logos/facebook.svg" },
];

const syncHistory = [
    { id: 'sync_1', status: 'Success', description: 'Synced 157 invoices.', timestamp: new Date(Date.now() - 1000 * 60 * 5) },
    { id: 'sync_2', status: 'Success', description: 'Synced 156 invoices.', timestamp: new Date(Date.now() - 1000 * 60 * 65) },
    { id: 'sync_3', status: 'Failed', description: 'API connection timed out.', timestamp: new Date(Date.now() - 1000 * 60 * 125) },
    { id: 'sync_4', status: 'Success', description: 'Synced 149 invoices.', timestamp: new Date(Date.now() - 1000 * 60 * 185) },
];


type Integration = typeof initialIntegrations[0] & { lastSynced?: Date };

const statusVariantMap: Record<string, "secondary" | "destructive" | "outline"> = {
    "Connected": "secondary",
    "Error": "destructive",
    "Not Connected": "outline",
}

function CompanyAdminIntegrationsView() {
    const { toast } = useToast();
    const [integrations, setIntegrations] = React.useState<Integration[]>(initialIntegrations);
    const [selectedIntegration, setSelectedIntegration] = React.useState<Integration | null>(null);
    const [nameFilter, setNameFilter] = React.useState("");
    const [categoryFilter, setCategoryFilter] = React.useState("all");
    const [statusFilter, setStatusFilter] = React.useState("all");

    const handleConnect = (integrationId: string) => {
        // Simulate a successful connection after a delay
        setTimeout(() => {
            setIntegrations(prev => prev.map(int => int.id === integrationId ? { ...int, status: "Connected", lastSynced: new Date() } : int));
            toast({
                title: "Connection Successful!",
                description: `Successfully connected to ${integrations.find(i => i.id === integrationId)?.name}.`,
            });
        }, 1000);
    };

    const handleDisconnect = (integrationId: string) => {
         setIntegrations(prev => prev.map(int => int.id === integrationId ? { ...int, status: "Not Connected", lastSynced: undefined } : int));
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
        const connectedIntegrations = integrations.filter(int => int.status === "Connected");
        connectedIntegrations.forEach(int => {
             toast({
                title: `Sync Initiated for ${int.name}`,
                description: `Data synchronization has started.`
            })
        })
    }

    const uniqueCategories = [...new Set(initialIntegrations.map(int => int.category))];

    const filteredIntegrations = React.useMemo(() => {
        return integrations.filter(int => {
            const nameMatch = nameFilter ? int.name.toLowerCase().includes(nameFilter.toLowerCase()) : true;
            const categoryMatch = categoryFilter !== 'all' ? int.category === categoryFilter : true;
            const statusMatch = statusFilter !== 'all' ? int.status === statusFilter : true;
            return nameMatch && categoryMatch && statusMatch;
        });
    }, [integrations, nameFilter, categoryFilter, statusFilter]);

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
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Manage Connections</CardTitle>
                    <CardDescription>View, connect, and manage your third-party integrations.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col sm:flex-row gap-4 mb-6">
                        <Input 
                            placeholder="Filter by name..." 
                            value={nameFilter} 
                            onChange={(e) => setNameFilter(e.target.value)}
                            className="w-full sm:max-w-xs"
                        />
                        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                            <SelectTrigger className="w-full sm:w-[180px]">
                                <SelectValue placeholder="Filter by category" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Categories</SelectItem>
                                {uniqueCategories.map(cat => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}
                            </SelectContent>
                        </Select>
                        <Select value={statusFilter} onValueChange={setStatusFilter}>
                            <SelectTrigger className="w-full sm:w-[180px]">
                                <SelectValue placeholder="Filter by status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Statuses</SelectItem>
                                <SelectItem value="Connected">Connected</SelectItem>
                                <SelectItem value="Not Connected">Not Connected</SelectItem>
                                <SelectItem value="Error">Error</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="border rounded-lg">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>App</TableHead>
                                    <TableHead>Category</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Last Synced</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredIntegrations.map((integration) => (
                                    <TableRow key={integration.id}>
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                <img src={integration.logo} alt={integration.name} className="h-8 w-8" />
                                                <span className="font-medium">{integration.name}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>{integration.category}</TableCell>
                                        <TableCell>
                                            <Badge variant={statusVariantMap[integration.status]}>
                                                {integration.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-muted-foreground text-xs">
                                            {integration.lastSynced ? formatDistanceToNow(integration.lastSynced, { addSuffix: true }) : '—'}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            {integration.status === 'Connected' || integration.status === 'Error' ? (
                                                <Dialog>
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger asChild><Button variant="ghost" size="icon"><ChevronsUpDown className="h-4 w-4"/></Button></DropdownMenuTrigger>
                                                        <DropdownMenuContent>
                                                             <DialogTrigger asChild>
                                                                <DropdownMenuItem onClick={() => setSelectedIntegration(integration)}>Manage</DropdownMenuItem>
                                                             </DialogTrigger>
                                                            <DropdownMenuItem onClick={() => handleSyncNow(integration.id)}>Sync Now</DropdownMenuItem>
                                                            <AlertDialog>
                                                                <AlertDialogTrigger asChild><DropdownMenuItem onSelect={(e) => e.preventDefault()}>Disconnect</DropdownMenuItem></AlertDialogTrigger>
                                                                <AlertDialogContent>
                                                                    <AlertDialogHeader>
                                                                        <AlertDialogTitle>Are you sure you want to disconnect?</AlertDialogTitle>
                                                                        <AlertDialogDescription>Disconnecting from {integration.name} will stop data synchronization.</AlertDialogDescription>
                                                                    </AlertDialogHeader>
                                                                    <AlertDialogFooter>
                                                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                                        <AlertDialogAction onClick={() => handleDisconnect(integration.id)}>Disconnect</AlertDialogAction>
                                                                    </AlertDialogFooter>
                                                                </AlertDialogContent>
                                                            </AlertDialog>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </Dialog>
                                            ) : (
                                                <Dialog>
                                                    <DialogTrigger asChild>
                                                         <Button variant="outline" size="sm" onClick={() => setSelectedIntegration(integration)}>Connect</Button>
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
                                                            <DialogClose asChild><Button type="button" variant="outline">Cancel</Button></DialogClose>
                                                            <DialogClose asChild><Button type="button" onClick={() => handleConnect(selectedIntegration!.id)}>Continue to {selectedIntegration?.name}<ExternalLink className="h-4 w-4 ml-2"/></Button></DialogClose>
                                                        </DialogFooter>
                                                    </DialogContent>
                                                </Dialog>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Manage {selectedIntegration?.name}</DialogTitle>
                    <DialogDescription>Review sync history and manage your connection.</DialogDescription>
                </DialogHeader>
                <div className="py-4 space-y-6">
                    <div className="border rounded-lg">
                        <Table>
                            <TableHeader><TableRow><TableHead>Timestamp</TableHead><TableHead>Status</TableHead><TableHead>Details</TableHead></TableRow></TableHeader>
                            <TableBody>
                                {syncHistory.map(sync => (
                                    <TableRow key={sync.id}>
                                        <TableCell className="text-xs">{formatDistanceToNow(sync.timestamp, { addSuffix: true })}</TableCell>
                                        <TableCell><Badge variant={sync.status === 'Success' ? 'secondary' : 'destructive'}>{sync.status}</Badge></TableCell>
                                        <TableCell className="text-xs">{sync.description}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </DialogContent>
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
