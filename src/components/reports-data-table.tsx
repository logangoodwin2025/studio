
"use client";

import * as React from "react";
import { Download, FileText, MoreHorizontal } from "lucide-react";
import { addDays, format } from "date-fns";
import type { DateRange } from "react-day-picker";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { useToast } from "@/hooks/use-toast";
import { Input } from "./ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DateRangePicker } from "./date-range-picker";
import { type Report, availableReports as allReports } from "@/lib/mock-data";


type ReportType = "financial" | "membership" | "sales" | "operations" | "all";

interface ReportsDataTableProps {
  reportType?: ReportType;
}

export function ReportsDataTable({ reportType = "all" }: ReportsDataTableProps) {
  const { toast } = useToast();
  const [date, setDate] = React.useState<DateRange | undefined>(undefined);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  
  const availableReports = reportType === 'all' 
    ? allReports.financial.concat(allReports.membership, allReports.sales, allReports.operations)
    : allReports[reportType];

  React.useEffect(() => {
    setDate({
      from: addDays(new Date(), -30),
      to: new Date(),
    });
  }, []);

  const handleExport = (reportTitle: string, format: "PDF" | "CSV" | "XLSX") => {
    toast({
      title: `Generating ${format} Report...`,
      description: `Your "${reportTitle}" report for the selected period is being generated.`,
    });
  };

  const columns: ColumnDef<Report>[] = [
    {
      accessorKey: "title",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Report Title
          </Button>
        );
      },
      cell: ({ row }) => {
        const report = row.original;
        return (
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 p-2 rounded-lg">
              <report.icon className="h-5 w-5 text-primary" />
            </div>
            <div>
              <div className="font-medium">{report.title}</div>
              <div className="text-sm text-muted-foreground">{report.description}</div>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "lastGenerated",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Last Generated
          </Button>
        );
      },
      cell: ({ row }) => format(row.getValue("lastGenerated"), "LLL dd, yyyy"),
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const report = row.original;
        return (
          <div className="text-right">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => handleExport(report.title, "PDF")}>
                  <Download className="mr-2 h-4 w-4" /> Download PDF
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleExport(report.title, "CSV")}>
                 <Download className="mr-2 h-4 w-4" /> Download CSV
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleExport(report.title, "XLSX")}>
                  <Download className="mr-2 h-4 w-4" /> Download XLSX
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
    },
  ];

  const table = useReactTable({
    data: availableReports,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  return (
    <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Report Generation</CardTitle>
            <CardDescription>Select a period and generate reports from the list below.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <DateRangePicker date={date} onDateChange={setDate} />
             <Input
                placeholder="Filter reports by name..."
                value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
                onChange={(event) => table.getColumn("title")?.setFilterValue(event.target.value)}
                className="w-full sm:w-[300px]"
             />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead key={header.id}>
                          {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                        </TableHead>
                      );
                    })}
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
      </div>
  );
}
