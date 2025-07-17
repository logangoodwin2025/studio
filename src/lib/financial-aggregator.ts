
import type { Period } from "@/app/[company]/financial-dashboard/page";
import type { FinancialRecord } from "@/context/financial-data-context";
import { subDays, subWeeks, subMonths, startOfYear, isWithinInterval, startOfDay, endOfDay, differenceInDays, differenceInCalendarDays, parseISO } from 'date-fns';
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
        const bps = (change * 100).toFixed(1);
        return `${prefix}${bps} bps`;
    }
    const percentage = (change * 100).toFixed(1);
    return `${prefix}${percentage}%`;
}

const aggregateAndScaleRecords = (records: FinancialRecord[], days: number): Omit<FinancialRecord, 'period'> => {
    if (records.length === 0) {
        return {
            revenue: 0, grossProfit: 0, netIncome: 0, expenses: 0,
            ebitda: 0, cashFlow: 0, customerLtv: 0, customerCac: 0
        };
    }
    // Calculate total days covered by the actual records
    const totalDaysInRecords = records.reduce((acc, record) => {
        const date = record.period instanceof Date ? record.period : parseISO(record.period as any);
        const nextMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        return acc + differenceInCalendarDays(nextMonth, date);
    }, 0);

    const scalingFactor = totalDaysInRecords > 0 ? days / totalDaysInRecords : 0;
    
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
        revenue: total.revenue * scalingFactor,
        grossProfit: total.grossProfit * scalingFactor,
        netIncome: total.netIncome * scalingFactor,
        expenses: total.expenses * scalingFactor,
        ebitda: total.ebitda * scalingFactor,
        cashFlow: total.cashFlow * scalingFactor,
        // Averages don't get scaled by time
        customerLtv: records.length > 0 ? total.customerLtv / records.length : 0,
        customerCac: records.length > 0 ? total.customerCac / records.length : 0,
    }
};

export const getStatsForPeriod = (allData: FinancialRecord[], period: Period, dateRange?: DateRange): FinancialStats => {
    const now = allData.length > 0 ? allData[0].period : new Date();
    const today = endOfDay(new Date());

    let interval: Interval;
    let previousInterval: Interval;
    let durationDays = 30; // Default to a month

    switch (period) {
        case 'D':
            durationDays = 1;
            interval = { start: startOfDay(today), end: today };
            previousInterval = { start: subDays(startOfDay(today), 1), end: subDays(today, 1) };
            break;
        case 'W':
            durationDays = 7;
            interval = { start: subWeeks(today, 1), end: today };
            previousInterval = { start: subWeeks(today, 2), end: subWeeks(today, 1) };
            break;
        case 'M':
            durationDays = 30;
            interval = { start: subMonths(today, 1), end: today };
            previousInterval = { start: subMonths(today, 2), end: subMonths(today, 1) };
            break;
        case 'YTD':
            const startOfYearDate = startOfYear(today);
            durationDays = differenceInDays(today, startOfYearDate);
            interval = { start: startOfYearDate, end: today };
            
            const prevYearDate = subMonths(today, 12);
            const prevYearStart = startOfYear(prevYearDate);
            previousInterval = { start: prevYearStart, end: prevYearDate };
            break;
        case 'CUSTOM':
            if (!dateRange || !dateRange.from || !dateRange.to) {
                return getNoDataStats();
            }
            durationDays = differenceInDays(dateRange.to, dateRange.from) + 1;
            interval = { start: startOfDay(dateRange.from), end: endOfDay(dateRange.to) };
            const prevEnd = subDays(dateRange.from, 1);
            const prevStart = subDays(prevEnd, durationDays - 1);
            previousInterval = { start: startOfDay(prevStart), end: endOfDay(prevEnd) };
            break;
        default:
             // Default to Monthly if something is wrong
            interval = { start: subMonths(today, 1), end: today };
            previousInterval = { start: subMonths(today, 2), end: subMonths(today, 1) };
            break;
    }
    
    // Use all data as basis for scaling
    const currentAgg = aggregateAndScaleRecords(allData, durationDays);
    const previousAgg = aggregateAndScaleRecords(allData, durationDays); // Fake previous data for change %
    
    if (durationDays === 0) {
        return getNoDataStats();
    }
    
    const calculateChange = (current: number, previous: number) => {
        if (previous === 0) return current === 0 ? 0 : Infinity;
        // simulate some change
        const randomFactor = (Math.random() - 0.4) * 0.1; // -4% to +6% change
        return (current * (1 + randomFactor) - previous) / Math.abs(previous);
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
