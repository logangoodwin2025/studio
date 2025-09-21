

"use client";

import * as React from "react";
import { useUserRole } from "@/hooks/use-user-role";
import { DashboardHeader } from "@/components/dashboard-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap, CheckCircle, RefreshCw, ArrowRight, ExternalLink } from "lucide-react";
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
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { Stepper, StepperItem, StepperIndicator, StepperNumber, StepperContent } from "@/components/ui/stepper";


const initialIntegrations = [
    { id: "qbo", name: "QuickBooks Online", category: "Accounting", status: "Not Connected", logo: "/logos/quickbooks.svg", description: "Sync invoices, payments, and customers." },
    { id: "sage", name: "Sage", category: "Accounting", status: "Not Connected", logo: "/logos/sage.svg", description: "Automate your accounting processes." },
    { id: "stripe", name: "Stripe", category: "Payments", status: "Not Connected", logo: "/logos/stripe.svg", description: "Track payments and subscriptions." },
    { id: "hubspot", name: "HubSpot", category: "CRM", status: "Not Connected", logo: "/logos/hubspot.svg", description: "Sync contacts, deals, and companies." },
    { id: "ga4", name: "Google Analytics 4", category: "Analytics", status: "Not Connected", logo: "/logos/ga4.svg", description: "Import web traffic and conversion data." },
    { id: "fb", name: "Facebook Lead Ads", category: "Leads", status: "Not Connected", logo: "/logos/facebook.svg", description: "Capture leads directly from Facebook." },
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
    "Paused": "outline",
}

const steps = [
    { id: "permissions", title: "Permissions" },
    { id: "authorize", title: "Authorize" },
    { id: "mapping", title: "Field Mapping" },
    { id: "enable", title: "Test & Enable" },
]

function CompanyAdminIntegrationsView() {
    const { toast } = useToast();
    const [integrations, setIntegrations] = React.useState<Integration[]>(initialIntegrations);
    const [selectedIntegration, setSelectedIntegration] = React.useState<Integration | null>(null);
    const [isManageOpen, setManageOpen] = React.useState(false);
    const [isConnectOpen, setConnectOpen] = React.useState(false);
    const [activeStep, setActiveStep] = React.useState(0);

    const handleConnectClick = (integration: Integration) => {
        setSelectedIntegration(integration);
        setActiveStep(0);
        setConnectOpen(true);
    };

    const handleNextStep = () => {
        setActiveStep(prev => prev + 1);
    }

    const handleFinishConnection = () => {
        if (!selectedIntegration) return;

        setIntegrations(prev => prev.map(int => int.id === selectedIntegration.id ? { ...int, status: "Connected", lastSynced: new Date() } : int));
        toast({
            title: "Connection Successful!",
            description: `Successfully connected to ${selectedIntegration.name}.`,
        });
        setConnectOpen(false);
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
                {integrations.map(integration => (
                    <Card key={integration.id}>
                        <CardHeader className="flex flex-row items-start justify-between">
                            <img src={integration.logo} alt={integration.name} className="h-10 w-10" />
                            <Badge variant={statusVariantMap[integration.status]}>{integration.status}</Badge>
                        </CardHeader>
                        <CardContent>
                            <h3 className="font-semibold font-headline text-lg">{integration.name}</h3>
                            <p className="text-sm text-muted-foreground mt-1">{integration.description}</p>
                        </CardContent>
                        <CardFooter>
                            {integration.status === "Not Connected" ? (
                                <Button className="w-full" onClick={() => handleConnectClick(integration)}>Connect</Button>
                            ) : (
                                <Button variant="outline" className="w-full" onClick={() => { setSelectedIntegration(integration); setManageOpen(true)}}>Manage</Button>
                            )}
                        </CardFooter>
                    </Card>
                ))}
            </div>

            {/* Manage Dialog */}
            <Dialog open={isManageOpen} onOpenChange={setManageOpen}>
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
            </Dialog>

            {/* Connect Dialog */}
            <Dialog open={isConnectOpen} onOpenChange={setConnectOpen}>
                <DialogContent className="max-w-3xl">
                    <DialogHeader>
                        <DialogTitle>Connect to {selectedIntegration?.name}</DialogTitle>
                        <DialogDescription>Follow the steps to securely connect your account.</DialogDescription>
                    </DialogHeader>
                    <div className="py-6">
                        <Stepper activeStep={activeStep} steps={steps} className="w-full" />
                         <div className="mt-8">
                            {activeStep === 0 && (
                                <div>
                                    <h3 className="font-semibold text-lg">What PinnSight will access:</h3>
                                    <ul className="mt-4 space-y-3 text-muted-foreground list-disc list-inside">
                                        <li><span className="font-semibold text-foreground">Read-only access</span> to Invoices, Customers, and Payments.</li>
                                        <li>We <span className="font-semibold text-foreground">never</span> store your login credentials.</li>
                                        <li>You can disconnect your account at any time.</li>
                                    </ul>
                                </div>
                            )}
                            {activeStep === 1 && (
                                <div className="text-center">
                                    <h3 className="font-semibold text-lg">You will be redirected to {selectedIntegration?.name}</h3>
                                    <p className="text-muted-foreground mt-2">Sign in to your {selectedIntegration?.name} account to authorize the connection securely.</p>
                                </div>
                            )}
                            {activeStep === 2 && (
                                <div>
                                    <h3 className="font-semibold text-lg">Field Mapping</h3>
                                    <p className="text-muted-foreground mt-2 mb-4">Default mappings are pre-filled. You can customize them later.</p>
                                    <div className="border rounded-lg p-4 space-y-3">
                                        <div className="flex items-center justify-between"><p>Invoice ID</p><ArrowRight className="h-4 w-4 text-muted-foreground" /><p>CanonicalInvoice.ID</p></div>
                                        <Separator/>
                                        <div className="flex items-center justify-between"><p>Customer.Name</p><ArrowRight className="h-4 w-4 text-muted-foreground" /><p>CanonicalParty.Name</p></div>
                                        <Separator/>
                                        <div className="flex items-center justify-between"><p>Payment.Amount</p><ArrowRight className="h-4 w-4 text-muted-foreground" /><p>CanonicalTransaction.Amount</p></div>
                                    </div>
                                </div>
                            )}
                             {activeStep === 3 && (
                                <div className="text-center">
                                    <h3 className="font-semibold text-lg">Test & Enable</h3>
                                    <p className="text-muted-foreground mt-2">Let's test the connection to ensure everything is working correctly.</p>
                                    <Button className="mt-6" onClick={() => toast({ title: "Test Successful!", description: "Fetched 1 sample invoice from QuickBooks."})}>
                                        Test Connection
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                    <DialogFooter>
                        {activeStep < steps.length - 1 ? (
                            <Button onClick={handleNextStep}>
                                {activeStep === 1 ? "Continue to " + selectedIntegration?.name : "Next"}
                                <ArrowRight className="h-4 w-4 ml-2"/>
                            </Button>
                        ) : (
                            <Button onClick={handleFinishConnection}>
                                <CheckCircle className="h-4 w-4 mr-2"/>
                                Finish & Enable
                            </Button>
                        )}
                    </DialogFooter>
                </DialogContent>
            </Dialog>
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
