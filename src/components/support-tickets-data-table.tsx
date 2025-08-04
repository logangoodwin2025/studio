
"use client";

import * as React from "react";
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
import { Card, CardContent } from "@/components/ui/card";
import { DashboardHeader } from "./dashboard-header";
import { Input } from "./ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { DateRangePicker } from "./date-range-picker";
import { type SupportTicket, supportTickets } from "@/lib/mock-data";
import { Badge } from "./ui/badge";

const priorityVariantMap: Record<SupportTicket['priority'], "destructive" | "default" | "secondary"> = {
    High: "destructive",
    Medium: "default",
    Low: "secondary"
}

const statusVariantMap: Record<SupportTicket['status'], "secondary" | "default" | "destructive"> = {
    Open: "secondary",
    "In Progress": "default",
    Resolved: "secondary",
    Closed: "destructive",
}


export function SupportTicketsDataTable() {
  const [date, setDate] = React.useState<DateRange | undefined>(undefined);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);

  React.useEffect(() => {
    setDate({
      from: addDays(new Date(), -90),
      to: new Date(),
    });
  }, []);


  const columns: ColumnDef<SupportTicket>[] = [
    { accessorKey: "id", header: "Ticket ID" },
    { accessorKey: "subject", header: "Subject" },
    { accessorKey: "tenant", header: "Tenant" },
    { accessorKey: "user", header: "User" },
    { 
        accessorKey: "priority", 
        header: "Priority",
        cell: ({ row }) => {
            const priority = row.original.priority;
            return <Badge variant={priorityVariantMap[priority]}>{priority}</Badge>
        }
    },
    { 
        accessorKey: "status", 
        header: "Status",
        cell: ({ row }) => {
            const status = row.original.status;
            return <Badge variant={statusVariantMap[status]}>{status}</Badge>
        }
    },
    { 
        accessorKey: "created", 
        header: "Created",
        cell: ({ row }) => format(row.original.created, "PPP")
    },
    { 
        accessorKey: "lastUpdated", 
        header: "Last Updated",
        cell: ({ row }) => format(row.original.lastUpdated, "PPP")
    },
  ];

  const table = useReactTable({
    data: supportTickets,
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
    <>
      <DashboardHeader
        title="Support Tickets"
        description="Review and manage all support tickets from tenants."
      />
      <main className="flex-1 p-4 sm:px-6 lg:px-8 space-y-6">
        <Card>
          <CardContent className="p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <DateRangePicker date={date} onDateChange={setDate} />
             <Input
                placeholder="Filter by subject..."
                value={(table.getColumn("subject")?.getFilterValue() as string) ?? ""}
                onChange={(event) => table.getColumn("subject")?.setFilterValue(event.target.value)}
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
      </main>
    </>
  );
}
