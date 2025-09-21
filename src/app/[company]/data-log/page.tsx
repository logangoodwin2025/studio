
"use client";

import * as React from "react";
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
import { MoreHorizontal, ChevronsUpDown, Edit, Upload, File, Bot } from "lucide-react";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { DashboardHeader } from "@/components/dashboard-header";
import { type DataLogEntry, dataLogEntries as initialData, departmentOptions } from "@/lib/mock-data";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useUserRole } from "@/hooks/use-user-role";
import { Loading } from "@/components/loading";


const sourceVariantMap: Record<DataLogEntry['source'], "secondary" | "default" | "outline"> = {
    "Web Form": "secondary",
    "CSV Upload": "default",
    "QuickBooks": "outline",
    "Manual Correction": "destructive",
}

const sourceIconMap: Record<DataLogEntry['source'], React.ElementType> = {
    "Web Form": Edit,
    "CSV Upload": Upload,
    "QuickBooks": Bot,
    "Manual Correction": Edit,
}

function DataLogPageContent() {
  const { toast } = useToast();
  const { role, isLoaded } = useUserRole();
  
  const filteredData = React.useMemo(() => {
    if (!isLoaded) return [];
    if (role === 'CEO/Executive' || role === 'Company Admin') {
      return initialData;
    }
    if (role === 'Finance Team') {
      return initialData.filter(d => d.department === 'Financials');
    }
    if (role === 'Sales & Marketing') {
      return initialData.filter(d => d.department === 'Sales & Marketing' || d.department === 'Membership');
    }
    if (role === 'Operations Team') {
        return initialData.filter(d => d.department === 'Operations');
    }
    return [];
  }, [role, isLoaded]);

  const [data, setData] = React.useState(filteredData);
  const [sorting, setSorting] = React.useState<SortingState>([ { id: 'date', desc: true }]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = React.useState({});
  
  React.useEffect(() => {
    setData(filteredData);
  }, [filteredData]);

  const canViewAllDepartments = role === 'CEO/Executive' || role === 'Company Admin';

  const columns: ColumnDef<DataLogEntry>[] = [
    {
      accessorKey: "metric",
      header: "Metric",
    },
    {
      accessorKey: "value",
      header: "Value",
    },
    {
      accessorKey: "date",
      header: ({ column }) => (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Date <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => format(row.original.date, "PPpp"),
    },
    {
        accessorKey: "department",
        header: "Department"
    },
    {
      accessorKey: "source",
      header: "Source",
      cell: ({ row }) => {
        const source = row.original.source;
        const Icon = sourceIconMap[source];
        return (
          <Badge variant={sourceVariantMap[source]}>
            <Icon className="mr-1.5 h-3 w-3" />
            {source}
          </Badge>
        );
      },
    },
    {
      accessorKey: "user",
      header: "User/System",
    },
    {
      id: "actions",
      cell: ({ row }) => {
        return (
          <div className="text-right">
            <Button variant="ghost" size="sm">
                <Edit className="h-4 w-4 mr-2" />
                Edit
            </Button>
          </div>
        );
      },
    },
  ];

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      rowSelection,
    },
  });

  const uniqueMetrics = React.useMemo(() => {
    const metrics = new Set(data.map(item => item.metric));
    return ['all', ...Array.from(metrics)];
  }, [data]);
  
  if (!isLoaded) {
    return <Loading />
  }

  return (
    <>
      <DashboardHeader
        title="Data Log"
        description="A unified, chronological view of all data entries into the system."
      />
      <main className="flex-1 p-4 sm:px-6 lg:px-8 space-y-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-wrap items-center gap-4">
              <Input
                placeholder="Filter by metric..."
                value={(table.getColumn("metric")?.getFilterValue() as string) ?? ""}
                onChange={(event) =>
                  table.getColumn("metric")?.setFilterValue(event.target.value)
                }
                className="max-w-sm"
              />
              <Select onValueChange={(value) => table.getColumn("source")?.setFilterValue(value === 'all' ? undefined : value)}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Filter by source" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sources</SelectItem>
                  <SelectItem value="Web Form">Web Form</SelectItem>
                  <SelectItem value="CSV Upload">CSV Upload</SelectItem>
                  <SelectItem value="QuickBooks">QuickBooks</SelectItem>
                  <SelectItem value="Manual Correction">Manual Correction</SelectItem>
                </SelectContent>
              </Select>
               {canViewAllDepartments && (
                <Select onValueChange={(value) => table.getColumn("department")?.setFilterValue(value === 'all' ? undefined : value)}>
                    <SelectTrigger className="w-full sm:w-[180px]">
                        <SelectValue placeholder="Filter by department" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Departments</SelectItem>
                        {departmentOptions.map(dept => (
                           <SelectItem key={dept.id} value={dept.label}>{dept.label}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
              )}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead key={header.id}>
                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
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
        <div className="flex items-center justify-end space-x-2 py-4">
          <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
            Previous
          </Button>
          <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
            Next
          </Button>
        </div>
      </main>
    </>
  );
}

export default function DataLogPage() {
    return (
        <React.Suspense>
            <DataLogPageContent />
        </React.Suspense>
    )
}
