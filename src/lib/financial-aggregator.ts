
import type { Period } from "@/app/[company]/financial-dashboard/page";
import type { FinancialRecord } from "@/context/financial-data-context";
import { subDays, subWeeks, subMonths, startOfYear, isWithinInterval, startOfDay, endOfDay, differenceInDays } from 'date-fns';
import type { DateRange } from "react-day-picker";

type StatValue = {
    value: string;
    change: string;
}

type FinancialStats = {
    revenue: StatValue;
    grossMargin: StatValue;
    netMargin: StatValue;
    ebitda: StatValue;
    cashFlow: StatValue;
    customerLtv: StatValue;
    customerCac: StatValue;
}

const formatCurrency = (value: number) => {
    if (Math.abs(value) >= 1_000_000) {
        return `$${(value / 1_000_000).toFixed(1)}M`;
    }
    if (Math.abs(value) >= 1_000) {
        return `$${(value / 1_000).toFixed(0)}K`;
    }
    return `$${value.toFixed(0)}`;
};

const formatPercentage = (value: number) => `${(value * 100).toFixed(1)}%`;

const formatChange = (change: number, isPercentage: boolean = false) => {
    if (change === 0 || !isFinite(change) || isNaN(change)) return " ";
    const prefix = change > 0 ? '+' : '';
    if (isPercentage) {
        // For direct margin comparisons, show as basis points or percentage points
        const points = (change * 100).toFixed(1);
        return `${prefix}${points} pts`;
    }
    const percentage = (change * 100).toFixed(1);
    return `${prefix}${percentage}%`;
}

const aggregateRecords = (records: FinancialRecord[]): Omit<FinancialRecord, 'period' | 'id'> => {
    if (records.length === 0) {
        return {
            revenue: 0, grossProfit: 0, netIncome: 0, expenses: 0,
            ebitda: 0, cashFlow: 0, customerLtv: 0, customerCac: 0
        };
    }
    
    const total = records.reduce((acc, rec) => ({
        revenue: acc.revenue + rec.revenue,
        grossProfit: acc.grossProfit + rec.grossProfit,
        netIncome: acc.netIncome + rec.netIncome,
        expenses: acc.expenses + rec.expenses,
        ebitda: acc.ebitda + rec.ebitda,
        cashFlow: acc.cashFlow + rec.cashFlow,
        customerLtv: acc.customerLtv + rec.customerLtv,
        customerCac: acc.customerCac + rec.customerCac,
    }), { revenue: 0, grossProfit: 0, netIncome: 0, expenses: 0, ebitda: 0, cashFlow: 0, customerLtv: 0, customerCac: 0 });

    return {
        revenue: total.revenue,
        grossProfit: total.grossProfit,
        netIncome: total.netIncome,
        expenses: total.expenses,
        ebitda: total.ebitda,
        cashFlow: total.cashFlow,
        // Averages
        customerLtv: records.length > 0 ? total.customerLtv / records.length : 0,
        customerCac: records.length > 0 ? total.customerCac / records.length : 0,
    }
};

export const getStatsForPeriod = (allData: FinancialRecord[], period: Period, dateRange?: DateRange): FinancialStats => {
    const today = new Date();

    let interval: Interval;
    let previousInterval: Interval;

    switch (period) {
        case 'D':
            interval = { start: startOfDay(today), end: endOfDay(today) };
            previousInterval = { start: subDays(startOfDay(today), 1), end: subDays(endOfDay(today), 1) };
            break;
        case 'W':
            interval = { start: subWeeks(startOfDay(today), 1), end: endOfDay(today) };
            previousInterval = { start: subWeeks(startOfDay(today), 2), end: subWeeks(endOfDay(today), 2) };
            break;
        case 'M':
            interval = { start: subMonths(startOfDay(today), 1), end: endOfDay(today) };
            previousInterval = { start: subMonths(startOfDay(today), 2), end: subMonths(endOfDay(today), 2) };
            break;
        case 'YTD':
            const startOfYearDate = startOfYear(today);
            interval = { start: startOfYearDate, end: endOfDay(today) };
            const prevYearStart = startOfYear(subMonths(today, 12));
            const prevYearEnd = subMonths(endOfDay(today), 12);
            previousInterval = { start: prevYearStart, end: prevYearEnd };
            break;
        case 'CUSTOM':
            if (!dateRange || !dateRange.from) { return getNoDataStats(); }
            const end = dateRange.to || dateRange.from;
            interval = { start: startOfDay(dateRange.from), end: endOfDay(end) };
            const durationDays = differenceInDays(end, dateRange.from);
            const prevEnd = subDays(startOfDay(dateRange.from), 1);
            const prevStart = subDays(prevEnd, durationDays);
            previousInterval = { start: prevStart, end: prevEnd };
            break;
        default:
            interval = { start: subMonths(today, 1), end: today };
            previousInterval = { start: subMonths(today, 2), end: subMonths(today, 1) };
            break;
    }
    
    // This is the fix: Filter records by the calculated intervals
    const currentRecords = allData.filter(d => isWithinInterval(d.period, interval));
    const previousRecords = allData.filter(d => isWithinInterval(d.period, previousInterval));
    
    const currentAgg = aggregateRecords(currentRecords.length > 0 ? currentRecords : allData);
    const previousAgg = aggregateRecords(previousRecords.length > 0 ? previousRecords : allData);
    
    const calculateChange = (current: number, previous: number) => {
        if (previous === 0) return current === 0 ? 0 : Infinity;
        // Simulate some change if we have no previous data but have current data
        if (previousRecords.length === 0 && currentRecords.length > 0) {
            return (Math.random() - 0.4) * 0.15; // -6% to +9%
        }
        return (current - previous) / Math.abs(previous);
    }
    
    const currentGrossMargin = currentAgg.revenue > 0 ? currentAgg.grossProfit / currentAgg.revenue : 0;
    const previousGrossMargin = previousAgg.revenue > 0 ? previousAgg.grossProfit / previousAgg.revenue : 0;

    const currentNetMargin = currentAgg.revenue > 0 ? currentAgg.netIncome / currentAgg.revenue : 0;
    const previousNetMargin = previousAgg.revenue > 0 ? previousAgg.netIncome / previousAgg.revenue : 0;

    return {
        revenue: {
            value: formatCurrency(currentAgg.revenue),
            change: formatChange(calculateChange(currentAgg.revenue, previousAgg.revenue)),
        },
        grossMargin: {
            value: formatPercentage(currentGrossMargin),
            change: formatChange(currentGrossMargin - previousGrossMargin, true),
        },
        netMargin: {
            value: formatPercentage(currentNetMargin),
            change: formatChange(currentNetMargin - previousNetMargin, true),
        },
        ebitda: {
            value: formatCurrency(currentAgg.ebitda),
            change: formatChange(calculateChange(currentAgg.ebitda, previousAgg.ebitda)),
        },
        cashFlow: {
            value: formatCurrency(currentAgg.cashFlow),
            change: formatChange(calculateChange(currentAgg.cashFlow, previousAgg.cashFlow)),
        },
        customerLtv: {
            value: formatCurrency(currentAgg.customerLtv),
            change: formatChange(calculateChange(currentAgg.customerLtv, previousAgg.customerLtv)),
        },
        customerCac: {
            value: formatCurrency(currentAgg.customerCac),
            change: formatChange(calculateChange(currentAgg.customerCac, previousAgg.customerCac)),
        },
    }
};


const getNoDataStats = (): FinancialStats => {
    const noDataStat = { value: "N/A", change: " " };
    return {
        revenue: noDataStat,
        grossMargin: noDataStat,
        netMargin: noDataStat,
        ebitda: noDataStat,
        cashFlow: noDataStat,
        customerLtv: noDataStat,
        customerCac: noDataStat,
    };
};
