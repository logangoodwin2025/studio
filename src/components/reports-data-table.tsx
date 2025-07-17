"use client";

import * as React from "react";
import { Calendar as CalendarIcon, Download, FileText } from "lucide-react";
import { addDays, format } from "date-fns";
import type { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DashboardHeader } from "./dashboard-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { useToast } from "@/hooks/use-toast";

type Report = {
  id: string;
  title: string;
  description: string;
  lastRun: string;
};

const availableReports: Report[] = [
    { id: 'rep_01', title: 'Monthly Financial Summary', description: 'Key metrics including revenue, profit, and EBITDA.', lastRun: '2025-07-01' },
    { id: 'rep_02', title: 'Customer Metrics Analysis', description: 'CLV, CAC, and retention rates for the selected period.', lastRun: '2025-07-01' },
    { id: 'rep_03', title: 'Cash Flow Statement', description: 'Detailed cash inflow and outflow.', lastRun: '2025-06-28' },
    { id: 'rep_04', title: 'Accounts Receivable Aging', description: 'Breakdown of outstanding invoices.', lastRun: '2025-07-03' },
    { id: 'rep_05', title: 'Accounts Payable Summary', description: 'Overview of money owed to suppliers.', lastRun: '2025-07-03' },
];


export function ReportsDataTable({ reports }: { reports: any[] }) {
  const { toast } = useToast();
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: addDays(new Date(), -30),
    to: new Date(),
  });

  const handleExport = (reportTitle: string) => {
    toast({
      title: "Generating Report...",
      description: `Your "${reportTitle}" report for the selected period is being generated.`,
    });
  };

  return (
    <>
      <DashboardHeader 
        title="Financial Reports"
        description="Generate and download financial reports for specific time periods."
      />
      <main className="flex-1 p-4 sm:px-6 lg:px-8">
        <Card>
            <CardHeader>
                <CardTitle className="font-headline">Report Generator</CardTitle>
                <CardDescription>Select a date range and choose a report to generate.</CardDescription>
            </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center gap-4">
                <Popover>
                    <PopoverTrigger asChild>
                    <Button
                        id="date"
                        variant={"outline"}
                        className={cn(
                        "w-[300px] justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                        )}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date?.from ? (
                        date.to ? (
                            <>
                            {format(date.from, "LLL dd, y")} -{" "}
                            {format(date.to, "LLL dd, y")}
                            </>
                        ) : (
                            format(date.from, "LLL dd, y")
                        )
                        ) : (
                        <span>Pick a date</span>
                        )}
                    </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={date?.from}
                        selected={date}
                        onSelect={setDate}
                        numberOfMonths={2}
                    />
                    </PopoverContent>
                </Popover>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Report Name</TableHead>
                  <TableHead>Last Run</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {availableReports.map((report) => (
                  <TableRow key={report.id}>
                    <TableCell>
                        <div className="flex items-center gap-3">
                            <FileText className="h-5 w-5 text-muted-foreground" />
                            <div>
                                <p className="font-medium">{report.title}</p>
                                <p className="text-sm text-muted-foreground">{report.description}</p>
                            </div>
                        </div>
                    </TableCell>
                    <TableCell>{format(new Date(report.lastRun), "LLL dd, y")}</TableCell>
                    <TableCell className="text-right">
                        <Button variant="outline" size="sm" onClick={() => handleExport(report.title)}>
                            <Download className="mr-2 h-4 w-4" />
                            Export
                        </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </>
  );
}
