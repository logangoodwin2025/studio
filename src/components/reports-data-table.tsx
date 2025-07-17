
"use client";

import * as React from "react";
import { Calendar as CalendarIcon, FileText, Download } from "lucide-react";
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
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "./ui/card";
import { useToast } from "@/hooks/use-toast";
import { DashboardHeader } from "./dashboard-header";

type Report = {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
};

const availableReports: Report[] = [
    { id: 'rep_01', title: 'Financial Summary', description: 'Revenue, Profit, EBITDA, and Margins.', icon: FileText },
    { id: 'rep_02', title: 'Customer Metrics', description: 'CLV, CAC, and Retention analysis.', icon: FileText },
    { id: 'rep_03', title: 'Cash Flow Statement', description: 'Detailed cash inflow and outflow.', icon: FileText },
    { id: 'rep_04', title: 'AR/AP Aging Report', description: 'Breakdown of outstanding receivables and payables.', icon: FileText },
    { id: 'rep_05', title: 'Profitability Analysis', description: 'Deep dive into profit margins and SGR.', icon: FileText },
    { id: 'rep_06', title: 'Burn Rate Report', description: 'Monthly cash burn and runway.', icon: FileText },
];


export function ReportsDataTable() {
  const { toast } = useToast();
  const [date, setDate] = React.useState<DateRange | undefined>(undefined);
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setDate({
        from: addDays(new Date(), -30),
        to: new Date(),
    });
    setIsMounted(true);
  }, []);


  const handleExport = (reportTitle: string) => {
    toast({
      title: "Generating PDF Report...",
      description: `Your "${reportTitle}" report for the selected period is being generated.`,
    });
  };
  
  if (!isMounted) {
    return (
        <>
            <DashboardHeader 
                title="Reports"
                description="Generate and download financial reports."
            />
            <main className="flex-1 p-4 sm:px-6 lg:px-8">
                <div className="animate-pulse rounded-lg border bg-card p-6">
                    <div className="h-8 w-1/3 bg-muted rounded"></div>
                    <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        <div className="h-48 bg-muted rounded-lg"></div>
                        <div className="h-48 bg-muted rounded-lg"></div>
                        <div className="h-48 bg-muted rounded-lg"></div>
                    </div>
                </div>
            </main>
        </>
    );
  }

  return (
    <>
      <DashboardHeader 
        title="Reports"
        description="Generate and download financial reports for sharing and documentation."
      />
      <main className="flex-1 p-4 sm:px-6 lg:px-8 space-y-6">
        <Card>
            <CardHeader>
                <CardTitle className="font-headline">Select Period</CardTitle>
                <CardDescription>Choose a date range for your reports.</CardDescription>
            </CardHeader>
            <CardContent>
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
            </CardContent>
        </Card>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {availableReports.map((report) => (
                <Card key={report.id} className="flex flex-col group transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                    <CardHeader>
                        <div className="flex items-center gap-4">
                            <div className="bg-primary/10 p-3 rounded-lg">
                                <report.icon className="h-6 w-6 text-primary" />
                            </div>
                            <CardTitle className="font-headline text-lg">{report.title}</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent className="flex-grow">
                        <CardDescription>{report.description}</CardDescription>
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full" onClick={() => handleExport(report.title)}>
                            <Download className="mr-2 h-4 w-4" />
                            Export PDF
                        </Button>
                    </CardFooter>
                </Card>
            ))}
        </div>
      </main>
    </>
  );
}
