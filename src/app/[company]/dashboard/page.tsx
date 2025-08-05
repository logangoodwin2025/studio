
"use client";

import { Suspense, useCallback, useMemo, useState, useEffect } from "react";
import { useUserRole } from "@/hooks/use-user-role";
import { AccessDenied } from "@/components/access-denied";
import { DashboardHeader } from "@/components/dashboard-header";
import { PeriodPicker } from "@/components/period-picker";
import type { Period } from "@/lib/types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { DateRange } from "react-day-picker";
import { formatISO, parseISO } from "date-fns";
import { Loading } from "@/components/loading";
import { useFinancialData } from "@/context/financial-data-context";
import { getChartDataForPeriod, getStatsForPeriod } from "@/lib/financial-aggregator";
import type { FinancialRecord } from "@/context/financial-data-context";
import type { FinancialStats } from "@/lib/financial-aggregator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FinanceDashboardView } from "@/components/dashboards/finance-dashboard-view";
import { SalesMarketingDashboardView } from "@/components/dashboards/sales-marketing-dashboard-view";
import { OperationsDashboardView } from "@/components/dashboards/operations-dashboard-view";
import { MembershipDashboardView } from "@/components/dashboards/membership-dashboard-view";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const REQUIRED_ROLES = ["CEO/Executive", "Company Admin"];

const kpiOptions = [
    { id: 'financials', label: 'Financials' },
    { id: 'membership', label: 'Membership' },
    { id: 'sales', label: 'Sales & Marketing' },
    { id: 'operations', label: 'Operations' }
];

function DashboardPageContent() {
    const { role, isLoaded } = useUserRole();
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const { data: allData } = useFinancialData();

    const [stats, setStats] = useState<FinancialStats | null>(null);
    const [chartData, setChartData] = useState<FinancialRecord[]>([]);
    const [visibleKpis, setVisibleKpis] = useState<string[]>(kpiOptions.map(k => k.id));
    const [tempVisibleKpis, setTempVisibleKpis] = useState<string[]>(visibleKpis);

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
    
    useEffect(() => {
        if (allData.length > 0) {
            const newStats = getStatsForPeriod(allData, period, dateRange);
            const newChartData = getChartDataForPeriod(allData, period, dateRange);
            setStats(newStats);
            setChartData(newChartData);
        }
    }, [allData, period, dateRange]);


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

    const handleKpiSelectionChange = (kpiId: string) => {
        setTempVisibleKpis(prev => 
            prev.includes(kpiId) ? prev.filter(id => id !== kpiId) : [...prev, kpiId]
        );
    };

    const applyKpiChanges = () => {
        setVisibleKpis(tempVisibleKpis);
    }
    
    const filteredTabs = kpiOptions.filter(kpi => visibleKpis.includes(kpi.id));

    if (!isLoaded || !stats) {
        return <Loading />;
    }
    
    if (!role || !REQUIRED_ROLES.includes(role)) {
        return <AccessDenied />;
    }
    
    return (
        <>
            <DashboardHeader
                title="CEO Dashboard"
                description="Department-level metrics and performance indicators for your organization."
            >
                <div className="flex items-center gap-2">
                    <Dialog onOpenChange={(open) => !open && setTempVisibleKpis(visibleKpis)}>
                        <DialogTrigger asChild>
                             <Button variant="outline" size="icon" aria-label="Configure KPIs">
                                <PlusCircle className="h-4 w-4" />
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Configure Dashboard KPIs</DialogTitle>
                                <DialogDescription>
                                    Select the KPI categories you want to display on the dashboard.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                {kpiOptions.map(kpi => (
                                    <div key={kpi.id} className="flex items-center space-x-2">
                                        <Checkbox
                                            id={kpi.id}
                                            checked={tempVisibleKpis.includes(kpi.id)}
                                            onCheckedChange={() => handleKpiSelectionChange(kpi.id)}
                                        />
                                        <Label htmlFor={kpi.id} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                            {kpi.label}
                                        </Label>
                                    </div>
                                ))}
                            </div>
                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button type="button" onClick={applyKpiChanges}>
                                        Apply Changes
                                    </Button>
                                </DialogClose>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                    <PeriodPicker 
                        period={period} 
                        onPeriodChange={handlePeriodChange}
                        dateRange={dateRange}
                        onDateRangeChange={handleDateRangeChange}
                    />
                </div>
            </DashboardHeader>
            <main className="flex-1 space-y-6 p-4 sm:px-6 lg:px-8">
                <Tabs defaultValue={filteredTabs.length > 0 ? filteredTabs[0].id : ""} className="w-full">
                    <TabsList className={`grid w-full grid-cols-${filteredTabs.length > 0 ? filteredTabs.length : 1}`}>
                        {filteredTabs.map(tab => (
                            <TabsTrigger key={tab.id} value={tab.id}>{tab.label}</TabsTrigger>
                        ))}
                    </TabsList>
                    
                    {visibleKpis.includes('financials') && (
                        <TabsContent value="financials" className="mt-6">
                            <FinanceDashboardView stats={stats} chartData={chartData} />
                        </TabsContent>
                    )}
                    {visibleKpis.includes('membership') && (
                        <TabsContent value="membership" className="mt-6">
                            <MembershipDashboardView stats={stats} />
                        </TabsContent>
                    )}
                    {visibleKpis.includes('sales') && (
                        <TabsContent value="sales" className="mt-6">
                            <SalesMarketingDashboardView stats={stats} />
                        </TabsContent>
                    )}
                    {visibleKpis.includes('operations') && (
                        <TabsContent value="operations" className="mt-6">
                            <OperationsDashboardView stats={stats} />
                        </TabsContent>
                    )}
                </Tabs>
                {filteredTabs.length === 0 && (
                     <div className="flex flex-col items-center justify-center text-center p-12 border-2 border-dashed rounded-lg">
                        <h3 className="text-xl font-semibold">No KPIs Selected</h3>
                        <p className="text-muted-foreground mt-2">
                           Click the '+' button in the header to configure your dashboard.
                        </p>
                    </div>
                )}
            </main>
        </>
    );
}

export default function DashboardPage() {
    return (
        <Suspense>
            <DashboardPageContent />
        </Suspense>
    )
}
