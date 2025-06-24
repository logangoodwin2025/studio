"use client";

import * as React from "react";
import { Calendar as CalendarIcon, Download } from "lucide-react";
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
import { Badge } from "@/components/ui/badge";
import { DashboardHeader } from "./dashboard-header";
import { Card, CardContent } from "./ui/card";
import { useToast } from "@/hooks/use-toast";

type Report = {
  id: string;
  user: string;
  amount: number;
  date: string;
  status: "Paid" | "Pending" | "Failed";
};

export function ReportsDataTable({ reports }: { reports: Report[] }) {
  const { toast } = useToast();
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: addDays(new Date(), -30),
    to: new Date(),
  });

  const getStatusVariant = (status: Report["status"]) => {
    switch (status) {
      case "Paid":
        return "default";
      case "Pending":
        return "secondary";
      case "Failed":
        return "destructive";
    }
  };

  const handleExport = () => {
    toast({
      title: "Exporting Report",
      description: "Your report is being generated and will be downloaded shortly.",
    });
  };

  return (
    <>
      <DashboardHeader title="Reports">
        <div className="flex items-center space-x-2">
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
            <PopoverContent className="w-auto p-0" align="end">
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
          <Button onClick={handleExport}>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </DashboardHeader>
      <main className="flex-1 p-4 sm:px-6 lg:px-8">
        <Card>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Transaction ID</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reports.map((report) => (
                  <TableRow key={report.id}>
                    <TableCell className="font-medium">{report.id}</TableCell>
                    <TableCell>{report.user}</TableCell>
                    <TableCell>{report.date}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusVariant(report.status)}>
                        {report.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      ${report.amount.toFixed(2)}
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
