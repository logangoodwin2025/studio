

"use client";

import * as React from "react";
import { useUserRole } from "@/hooks/use-user-role";
import { DashboardHeader } from "@/components/dashboard-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap, CheckCircle, RefreshCw, ArrowRight, ChevronsUpDown, MoreHorizontal, Download } from "lucide-react";
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
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuCheckboxItem } from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { Stepper, StepperItem } from "@/components/ui/stepper";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";


const initialIntegrations = [
    { id: "qbo", name: "QuickBooks Online", category: "Accounting", status: "Connected", logo: "/logos/quickbooks.svg", description: "Sync invoices, payments, and customers.", lastSynced: new Date(Date.now() - 1000 * 60 * 5) },
    { id: "sage", name: "Sage", category: "Accounting", status: "Not Connected", logo: "/logos/sage.svg", description: "Automate your accounting processes." },
    { id: "stripe", name: "Stripe", category: "Payments", status: "Connected", logo: "/logos/stripe.svg", description: "Track payments and subscriptions.", lastSynced: new Date(Date.now() - 1000 * 60 * 65) },
    { id: "hubspot", name: "HubSpot", category: "CRM", status: "Not Connected", logo: "/logos/hubspot.svg", description: "Sync contacts, deals, and companies." },
    { id: "ga4", name: "Google Analytics 4", category: "Analytics", status: "Error", logo: "/logos/ga4.svg", description: "Import web traffic and conversion data.", lastSynced: new Date(Date.now() - 1000 * 60 * 125) },
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

    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})


    const handleConnectClick = (integration: Integration) => {
        setSelectedIntegration(integration);
        setActiveStep(0);
        setConnectOpen(true);
    };
    
    const handleManageClick = (integration: Integration) => {
        setSelectedIntegration(integration);
        setManageOpen(true);
    }

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
    
    const columns: ColumnDef<Integration>[] = [
        {
            accessorKey: "name",
            header: "App",
            cell: ({ row }) => (
                <div className="flex items-center gap-3">
                    <img src={row.original.logo} alt={row.original.name} className="h-8 w-8" />
                    <span className="font-semibold">{row.original.name}</span>
                </div>
            )
        },
        {
            accessorKey: "category",
            header: ({ column }) => (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Category
                    <ChevronsUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
        },
        {
            accessorKey: "status",
            header: ({ column }) => (
                 <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Status
                    <ChevronsUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
            cell: ({ row }) => <Badge variant={statusVariantMap[row.original.status]}>{row.original.status}</Badge>
        },
        {
            accessorKey: "lastSynced",
            header: ({ column }) => (
                 <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Last Synced
                    <ChevronsUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
            cell: ({ row }) => row.original.lastSynced ? formatDistanceToNow(row.original.lastSynced, { addSuffix: true }) : 'N/A'
        },
        {
            id: "actions",
            cell: ({ row }) => {
                const integration = row.original;
                return (
                     <div className="flex items-center gap-2 justify-end">
                        {integration.status === 'Connected' && <Button size="sm" variant="outline" onClick={() => toast({ title: `Syncing ${integration.name}...`})}><RefreshCw className="h-4 w-4"/></Button>}
                        {integration.status === 'Not Connected' && <Button size="sm" onClick={() => handleConnectClick(integration)}>Connect</Button>}
                        {integration.status !== 'Not Connected' && (
                             <DropdownMenu>
                                <DropdownMenuTrigger asChild><Button variant="ghost" size="icon" className="h-8 w-8"><MoreHorizontal className="h-4 w-4"/></Button></DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuItem onClick={() => handleManageClick(integration)}>Manage Connection</DropdownMenuItem>
                                    <DropdownMenuItem>View Sync History</DropdownMenuItem>
                                    <DropdownMenuItem>Edit Field Mappings</DropdownMenuItem>
                                    <Separator />
                                    <DropdownMenuItem className="text-destructive">Disconnect</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        )}
                    </div>
                )
            }
        }
    ]

     const table = useReactTable({
        data: integrations,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
        },
    });

    const categories = Array.from(new Set(initialIntegrations.map(i => i.category)));
    const statuses = Array.from(new Set(initialIntegrations.map(i => i.status)));


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
                <CardContent className="p-4">
                    <div className="flex flex-wrap items-center gap-4">
                        <Input
                            placeholder="Filter integrations..."
                            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
                            onChange={(event) => table.getColumn("name")?.setFilterValue(event.target.value)}
                            className="max-w-sm"
                        />
                        <Select onValueChange={(value) => table.getColumn("category")?.setFilterValue(value === 'all' ? undefined : value)}>
                            <SelectTrigger className="w-full sm:w-[180px]">
                                <SelectValue placeholder="Filter by category" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Categories</SelectItem>
                                {categories.map(cat => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}
                            </SelectContent>
                        </Select>
                        <Select onValueChange={(value) => table.getColumn("status")?.setFilterValue(value === 'all' ? undefined : value)}>
                            <SelectTrigger className="w-full sm:w-[180px]">
                                <SelectValue placeholder="Filter by status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Statuses</SelectItem>
                                {Object.keys(statusVariantMap).map(status => <SelectItem key={status} value={status}>{status}</SelectItem>)}
                            </SelectContent>
                        </Select>
                         <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="ml-auto">
                                Columns <ChevronsUpDown className="ml-2 h-4 w-4" />
                            </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                            {table
                                .getAllColumns()
                                .filter((column) => column.getCanHide())
                                .map((column) => {
                                return (
                                    <DropdownMenuCheckboxItem
                                    key={column.id}
                                    className="capitalize"
                                    checked={column.getIsVisible()}
                                    onCheckedChange={(value) =>
                                        column.toggleVisibility(!!value)
                                    }
                                    >
                                    {column.id}
                                    </DropdownMenuCheckboxItem>
                                )
                                })}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                    <div className="rounded-md border mt-4">
                        <Table>
                            <TableHeader>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                            )}
                                    </TableHead>
                                    )
                                })}
                                </TableRow>
                            ))}
                            </TableHeader>
                            <TableBody>
                            {table.getRowModel().rows?.length ? (
                                table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id}>
                                        {flexRender(
                                        cell.column.columnDef.cell,
                                        cell.getContext()
                                        )}
                                    </TableCell>
                                    ))}
                                </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                                </TableRow>
                            )}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>

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
                         <div className="flex justify-end gap-2">
                            <Button variant="destructive">Disconnect</Button>
                            <Button variant="outline">Pause Syncing</Button>
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

    

    