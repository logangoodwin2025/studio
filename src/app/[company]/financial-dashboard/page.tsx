
import { FinancialDashboardClient } from "@/components/financial-dashboard-client";
import { getStatsForPeriod, getChartDataForPeriod } from "@/lib/financial-aggregator";
import type { FinancialRecord } from "@/context/financial-data-context";
import type { DateRange } from "react-day-picker";
import { parseISO, formatISO } from "date-fns";

// This is a placeholder for fetching data from a database or API in a real app.
import { initialData } from "@/context/financial-data-context";

export type Period = 'D' | 'W' | 'M' | 'YTD' | 'MAX' | 'CUSTOM';

// Ensure this component is treated as a server component.
// No "use client" directive.

export default async function FinancePage({
  searchParams
}: {
  searchParams?: {
    period?: Period;
    from?: string;
    to?: string;
  }
}) {
  // Fetch all data on the server. In a real app, this would be an async call.
  const allData: FinancialRecord[] = initialData;

  // Determine period and date range from URL search params
  const period = searchParams?.period || 'D';
  let dateRange: DateRange | undefined = undefined;

  if (period === 'CUSTOM' && searchParams?.from) {
    dateRange = {
      from: parseISO(searchParams.from),
      to: searchParams.to ? parseISO(searchParams.to) : undefined
    };
  }
  
  // Perform data aggregation and filtering on the server.
  const stats = getStatsForPeriod(allData, period, dateRange);
  const chartData = getChartDataForPeriod(allData, period, dateRange);

  // Serialize dateRange for the client component
  const serializedDateRange = dateRange?.from ? {
    from: formatISO(dateRange.from),
    to: dateRange.to ? formatISO(dateRange.to) : undefined
  } : undefined;

  return (
    <FinancialDashboardClient
      stats={stats}
      chartData={chartData}
      initialPeriod={period}
      initialDateRange={serializedDateRange}
    />
  );
}
