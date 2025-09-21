
"use client";

import * as React from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Zap, CheckCircle, RefreshCw, ArrowRight, XCircle, Clock, ChevronsUpDown, MoreHorizontal, Filter } from "lucide-react";
import { Stepper, StepperItem } from "@/components/ui/stepper";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { DashboardHeader } from "./dashboard-header";
import { Badge } from "./ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
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
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuPortal,
  DropdownMenuSubContent
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { formatDistanceToNow } from 'date-fns';


const initialIntegrations = [
    { id: "qbo", name: "QuickBooks Online", category: "Accounting", status: "Connected", logo: "/logos/quickbooks.svg", description: "Sync invoices, payments, and customers.", lastSynced: new Date(Date.now() - 1000 * 60 * 5) },
    { id: "sage", name: "Sage", category: "Accounting", status: "Not Connected", logo: "/logos/sage.svg", description: "Automate your accounting processes.", lastSynced: null },
    { id: "stripe", name: "Stripe", category: "Payments", status: "Connected", logo: "/logos/stripe.svg", description: "Track payments and subscriptions.", lastSynced: new Date(Date.now() - 1000 * 60 * 65) },
    { id: "hubspot", name: "HubSpot", category: "CRM", status: "Not Connected", logo: "/logos/hubspot.svg", description: "Sync contacts, deals, and companies.", lastSynced: null },
    { id: "ga4", name: "Google Analytics 4", category: "Analytics", status: "Error", logo: "/logos/ga4.svg", description: "Import web traffic and conversion data.", lastSynced: new Date(Date.now() - 1000 * 60 * 125) },
    { id: "fb", name: "Facebook Lead Ads", category: "Leads", status: "Not Connected", logo: "/logos/facebook.svg", description: "Capture leads directly from Facebook.", lastSynced: null },
];

const syncHistory = [
    { id: 'sync_1', integration: 'QuickBooks', status: 'Success', description: 'Synced 157 invoices.', timestamp: new Date(Date.now() - 1000 * 60 * 5) },
    { id: 'sync_2', integration: 'Stripe', status: 'Success', description: 'Synced 42 payments.', timestamp: new Date(Date.now() - 1000 * 60 * 65) },
    { id: 'sync_3', integration: 'Google Analytics 4', status: 'Failed', description: 'API connection timed out.', timestamp: new Date(Date.now() - 1000 * 60 * 125) },
    { id: 'sync_4', integration: 'QuickBooks', status: 'Success', description: 'Synced 149 invoices.', timestamp: new Date(Date.now() - 1000 * 60 * 185) },
    { id: 'sync_5', integration: 'Stripe', status: 'Success', description: 'Synced 38 payments.', timestamp: new Date(Date.now() - 1000 * 60 * 245) },
];


type Integration = typeof initialIntegrations[0];

const statusVariantMap: Record<string, "secondary" | "destructive" | "outline"> = {
    "Connected": "secondary",
    "Error": "destructive",
    "Not Connected": "outline",
    "Paused": "outline",
}

const activityStatusVariantMap: Record<string, "success" | "destructive" | "secondary"> = {
    "Success": "secondary",
    "Failed": "destructive",
}

const activityStatusIconMap: Record<string, React.ElementType> = {
    "Success": CheckCircle,
    "Failed": XCircle,
}

const steps = [
    { id: "permissions", title: "Permissions" },
    { id: "authorize", title: "Authorize" },
    { id: "mapping", title: "Field Mapping" },
    { id: "enable", title: "Test & Enable" },
]

export function CompanyAdminIntegrationsView() {
    const { toast } = useToast();
    const [integrations, setIntegrations] = React.useState<Integration[]>(initialIntegrations);
    const [selectedIntegration, setSelectedIntegration] = React.useState<Integration | null>(null);
    const [isConnectOpen, setConnectOpen] = React.useState(false);
    const [activeStep, setActiveStep] = React.useState(0);
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});

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

    const columns: ColumnDef<Integration>[] = [
        {
            accessorKey: "name",
            header: ({ column }) => <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>App <ChevronsUpDown className="ml-2 h-4 w-4" /></Button>,
            cell: ({ row }) => (
                <div className="flex items-center gap-3">
                    <img src={row.original.logo} alt={row.original.name} className="h-8 w-8" />
                    <span className="font-medium">{row.original.name}</span>
                </div>
            )
        },
        {
            accessorKey: "category",
            header: ({ column }) => <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>Category <ChevronsUpDown className="ml-2 h-4 w-4" /></Button>,
        },
        {
            accessorKey: "status",
            header: ({ column }) => <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>Status <ChevronsUpDown className="ml-2 h-4 w-4" /></Button>,
            cell: ({ row }) => <Badge variant={statusVariantMap[row.original.status]}>{row.original.status}</Badge>
        },
        {
            accessorKey: "lastSynced",
            header: ({ column }) => <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>Last Synced <ChevronsUpDown className="ml-2 h-4 w-4" /></Button>,
            cell: ({ row }) => row.original.lastSynced ? formatDistanceToNow(row.original.lastSynced, { addSuffix: true }) : 'Never'
        },
        {
            id: "actions",
            header: () => <div className="text-right">Actions</div>,
            cell: ({ row }) => {
                const integration = row.original;
                return (
                    <div className="text-right">
                        {integration.status === "Not Connected" ? (
                            <Button size="sm" onClick={() => handleConnectClick(integration)}>Connect</Button>
                        ) : (
                             <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4"/></Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuItem onClick={() => toast({ title: `Syncing ${integration.name}...`})}>Sync Now</DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => handleConnectClick(integration)}>Manage</DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                     <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="text-destructive">Disconnect</DropdownMenuItem>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                            <AlertDialogDescription>
                                                Disconnecting {integration.name} will stop all data synchronization. You can reconnect at any time.
                                            </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                            <AlertDialogAction onClick={() => setIntegrations(prev => prev.map(int => int.id === integration.id ? {...int, status: "Not Connected"} : int))}>
                                                Disconnect
                                            </AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
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


    return (
        <div className="flex-1 flex flex-col">
            <DashboardHeader
                title="Integrations Hub"
                description="Connect your tools to automate data synchronization."
            >
                <div className="flex items-center gap-2">
                    <Button onClick={handleSyncAll}>
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Sync All
                    </Button>
                </div>
            </DashboardHeader>

            <main className="flex-1 p-4 sm:px-6 lg:px-8">
                 <Tabs defaultValue="connections" className="w-full">
                    <TabsList>
                        <TabsTrigger value="connections">Connections</TabsTrigger>
                        <TabsTrigger value="activity">Activity</TabsTrigger>
                    </TabsList>
                    <TabsContent value="connections" className="mt-6">
                        <Card>
                            <CardHeader>
                                <div className="flex items-center justify-between gap-4">
                                     <Input
                                        placeholder="Filter integrations..."
                                        value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
                                        onChange={(event) =>
                                            table.getColumn("name")?.setFilterValue(event.target.value)
                                        }
                                        className="max-w-xs"
                                    />
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="outline" size="sm">
                                                <Filter className="h-4 w-4 mr-2" /> Filter
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuSub>
                                                <DropdownMenuSubTrigger>Status</DropdownMenuSubTrigger>
                                                <DropdownMenuSubContent>
                                                    <DropdownMenuItem onClick={() => table.getColumn("status")?.setFilterValue(undefined)}>All</DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => table.getColumn("status")?.setFilterValue("Connected")}>Connected</DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => table.getColumn("status")?.setFilterValue("Not Connected")}>Not Connected</DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => table.getColumn("status")?.setFilterValue("Error")}>Error</DropdownMenuItem>
                                                </DropdownMenuSubContent>
                                            </DropdownMenuSub>
                                            <DropdownMenuSub>
                                                <DropdownMenuSubTrigger>Category</DropdownMenuSubTrigger>
                                                <DropdownMenuSubContent>
                                                     <DropdownMenuItem onClick={() => table.getColumn("category")?.setFilterValue(undefined)}>All</DropdownMenuItem>
                                                    {[...new Set(integrations.map(i => i.category))].map(category => (
                                                        <DropdownMenuItem key={category} onClick={() => table.getColumn("category")?.setFilterValue(category)}>{category}</DropdownMenuItem>
                                                    ))}
                                                </DropdownMenuSubContent>
                                            </DropdownMenuSub>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuLabel>Visible Columns</DropdownMenuLabel>
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
                            </CardHeader>
                            <CardContent>
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
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                </TableCell>
                                            ))}
                                            </TableRow>
                                        ))
                                        ) : (
                                        <TableRow>
                                            <TableCell colSpan={columns.length} className="h-24 text-center">
                                            No results.
                                            </TableCell>
                                        </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                           </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="activity" className="mt-6">
                         <Card>
                            <CardHeader>
                                <CardTitle className="font-headline">Recent Activity</CardTitle>
                                <CardDescription>A log of recent data synchronization events from your integrations.</CardDescription>
                            </CardHeader>
                            <CardContent>
                               <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Integration</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Description</TableHead>
                                        <TableHead>Timestamp</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {syncHistory.map(item => {
                                        const Icon = activityStatusIconMap[item.status];
                                        return (
                                            <TableRow key={item.id}>
                                                <TableCell className="font-medium">{item.integration}</TableCell>
                                                <TableCell><Badge variant={activityStatusVariantMap[item.status]}><Icon className="h-3 w-3 mr-1.5" />{item.status}</Badge></TableCell>
                                                <TableCell>{item.description}</TableCell>
                                                <TableCell>{item.timestamp.toLocaleTimeString()}</TableCell>
                                            </TableRow>
                                        )
                                    })}
                                </TableBody>
                               </Table>
                            </CardContent>
                        </Card>
                    </TabsContent>
                 </Tabs>
            </main>

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

    