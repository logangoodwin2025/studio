
import type { Period } from "@/app/[company]/financial-dashboard/page";
import type { FinancialRecord } from "@/context/financial-data-context";
import { subDays, subWeeks, subMonths, startOfYear, isWithinInterval, startOfDay } from 'date-fns';
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
        return `$${(value / 1_000).toFixed(1)}K`;
    }
    return `$${value.toFixed(0)}`;
};

const formatPercentage = (value: number) => `${(value * 100).toFixed(1)}%`;

const formatChange = (change: number) => {
    if (change === 0 || !isFinite(change)) return " ";
    return `${change > 0 ? '+' : ''}${(change * 100).toFixed(1)}%`;
}

const aggregateRecords = (records: FinancialRecord[]): Omit<FinancialRecord, 'period'> => {
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
        ...total,
        // Average LTV and CAC
        customerLtv: total.customerLtv / records.length,
        customerCac: total.customerCac / records.length,
    }
};

export const getStatsForPeriod = (allData: FinancialRecord[], period: Period, dateRange?: DateRange): FinancialStats => {
    const now = allData.length > 0 ? allData[0].period : new Date();

    let interval: Interval;
    let previousInterval: Interval;

    switch (period) {
        case 'D':
            interval = { start: subDays(now, 1), end: now };
            previousInterval = { start: subDays(now, 2), end: subDays(now, 1) };
            break;
        case 'W':
            interval = { start: subWeeks(now, 1), end: now };
            previousInterval = { start: subWeeks(now, 2), end: subWeeks(now, 1) };
            break;
        case 'M':
            interval = { start: subMonths(now, 1), end: now };
            previousInterval = { start: subMonths(now, 2), end: subMonths(now, 1) };
            break;
        case 'YTD':
            interval = { start: startOfYear(now), end: now };
            const prevYearStart = startOfYear(subMonths(now, 12));
            const prevYearEnd = subMonths(now, 12);
            previousInterval = { start: prevYearStart, end: prevYearEnd };
            break;
        case 'CUSTOM':
            if (!dateRange || !dateRange.from || !dateRange.to) {
                // Return zeroed-out data if custom range is not valid
                 return getZeroStats();
            }
            interval = { start: startOfDay(dateRange.from), end: startOfDay(dateRange.to) };
            const duration = dateRange.to.getTime() - dateRange.from.getTime();
            const prevEnd = subDays(dateRange.from, 1);
            const prevStart = new Date(prevEnd.getTime() - duration);
            previousInterval = { start: prevStart, end: prevEnd };
            break;
    }
    
    const currentRecords = allData.filter(d => isWithinInterval(d.period, interval));
    const previousRecords = allData.filter(d => isWithinInterval(d.period, previousInterval));

    const currentAgg = aggregateRecords(currentRecords);
    const previousAgg = aggregateRecords(previousRecords);
    
    if (currentRecords.length === 0) {
        return getZeroStats();
    }

    const calculateChange = (current: number, previous: number) => {
        if (previous === 0) return 0;
        return (current - previous) / previous;
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
            change: formatChange(calculateChange(currentGrossMargin, previousGrossMargin)),
        },
        netMargin: {
            value: formatPercentage(currentNetMargin),
            change: formatChange(calculateChange(currentNetMargin, previousNetMargin)),
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


const getZeroStats = (): FinancialStats => {
    const zeroStat = { value: "$0", change: " " };
    const zeroPercentStat = { value: "0.0%", change: " " };
    return {
        revenue: zeroStat,
        grossMargin: zeroPercentStat,
        netMargin: zeroPercentStat,
        ebitda: zeroStat,
        cashFlow: zeroStat,
        customerLtv: zeroStat,
        customerCac: zeroStat,
    };
};
