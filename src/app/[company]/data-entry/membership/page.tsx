
"use client";

import * as React from "react";
import { DashboardHeader } from "@/components/dashboard-header";
import { MembershipForm } from "@/components/data-entry/membership-form";
import { PeriodPicker } from "@/components/period-picker";
import type { Period } from "@/lib/types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";
import { DateRange } from "react-day-picker";
import { formatISO, parseISO } from "date-fns";
import { Button } from "@/components/ui/button";
import { Download, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function MembershipDataEntryPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { toast } = useToast();

  const period = (searchParams.get('period') as Period) || 'M';
  
  const dateRange = useMemo(() => {
    const fromParam = searchParams.get('from');
    const toParam = searchParams.get('to');
    if (period === 'CUSTOM' && fromParam) {
      return {
        from: parseISO(fromParam),
        to: toParam ? parseISO(toParam) : undefined
      };
    }
    return undefined;
  }, [period, searchParams]);
  
  const handlePeriodChange = useCallback((newPeriod: Period) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('period', newPeriod);
    if (newPeriod !== 'CUSTOM') {
      params.delete('from');
      params.delete('to');
    }
    router.push(`${pathname}?${params.toString()}`);
  }, [pathname, router, searchParams]);

  const handleDateRangeChange = useCallback((newDateRange: DateRange | undefined) => {
    const params = new URLSearchParams(searchParams.toString());
    if (newDateRange?.from) {
      params.set('period', 'CUSTOM');
      params.set('from', formatISO(newDateRange.from, { representation: 'date' }));
      if (newDateRange.to) {
        params.set('to', formatISO(newDateRange.to, { representation: 'date' }));
      } else {
        params.delete('to');
      }
      router.push(`${pathname}?${params.toString()}`);
    }
  }, [pathname, router, searchParams]);

  const handleActionClick = (action: "Download" | "Upload") => {
    toast({
      title: `${action} Initiated`,
      description: `The template ${action.toLowerCase()} process has started.`,
    });
  }

  return (
    <>
      <DashboardHeader
        title="Membership Data Entry"
        description="Input membership and customer metrics"
      />
      <main className="flex-1 p-4 sm:px-6 lg:px-8 space-y-6">
         <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
           <PeriodPicker 
              period={period} 
              onPeriodChange={handlePeriodChange}
              dateRange={dateRange}
              onDateRangeChange={handleDateRangeChange}
            />
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={() => handleActionClick("Download")}>
                <Download className="h-4 w-4 mr-2" />
                Download Template
              </Button>
              <Button onClick={() => handleActionClick("Upload")}>
                <Upload className="h-4 w-4 mr-2" />
                Upload Data
              </Button>
            </div>
        </div>
        <div className="mx-auto max-w-7xl">
            <MembershipForm />
        </div>
      </main>
    </>
  );
}
