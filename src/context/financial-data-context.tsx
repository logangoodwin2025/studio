
"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { subDays, subHours } from 'date-fns';

export interface FinancialRecord {
  period: Date;
  revenue: number;
  grossProfit: number;
  netIncome: number;
  expenses: number;
  cashFlow: number;
  ebitda: number;
  customerLtv: number;
  customerCac: number;
}

interface FinancialDataContextType {
  data: FinancialRecord[];
  addFinancialRecord: (record: FinancialRecord) => void;
}

const FinancialDataContext = createContext<FinancialDataContextType | undefined>(undefined);

// Helper to generate more realistic recent data
const generateRecentData = () => {
    const data: FinancialRecord[] = [];
    const now = new Date();
    for (let i = 0; i < 48; i++) { // Last 48 hours
        const period = subHours(now, i);
        const revenue = 680000 / 30 / 24 + Math.random() * 5000;
        const expenses = 515000 / 30 / 24 + Math.random() * 3000;
        const netIncome = revenue - expenses;
        const grossProfit = revenue * (0.65 + (Math.random() - 0.5) * 0.1);

        data.push({
            period,
            revenue: Math.round(revenue),
            expenses: Math.round(expenses),
            netIncome: Math.round(netIncome),
            grossProfit: Math.round(grossProfit),
            ebitda: Math.round(netIncome * 1.2),
            cashFlow: Math.round(netIncome * 1.1),
            customerLtv: 45300 + Math.random() * 500,
            customerCac: 2870 + Math.random() * 100,
        });
    }

    for (let i = 2; i < 90; i++) { // Last 90 days
        const period = subDays(now, i);
        const revenue = 680000 / 30 + Math.random() * 20000 - 10000;
        const expenses = 515000 / 30 + Math.random() * 15000 - 7500;
        const netIncome = revenue - expenses;
        const grossProfit = revenue * (0.65 + (Math.random() - 0.5) * 0.1);

        data.push({
            period,
            revenue: Math.round(revenue),
            expenses: Math.round(expenses),
            netIncome: Math.round(netIncome),
            grossProfit: Math.round(grossProfit),
            ebitda: Math.round(netIncome * 1.2),
            cashFlow: Math.round(netIncome * 1.1),
            customerLtv: 45300 + Math.random() * 500,
            customerCac: 2870 + Math.random() * 100,
        });
    }
    return data;
}

const initialData: FinancialRecord[] = [
    // Pre-seed with some realistic monthly data for 2025
    { period: new Date('2025-01-31'), revenue: 650000, grossProfit: 420000, netIncome: 150000, expenses: 500000, ebitda: 250000, cashFlow: 180000, customerLtv: 45000, customerCac: 2800 },
    { period: new Date('2025-02-28'), revenue: 660000, grossProfit: 430000, netIncome: 155000, expenses: 505000, ebitda: 255000, cashFlow: 185000, customerLtv: 45100, customerCac: 2820 },
    { period: new Date('2025-03-31'), revenue: 670000, grossProfit: 440000, netIncome: 160000, expenses: 510000, ebitda: 260000, cashFlow: 190000, customerLtv: 45200, customerCac: 2850 },
    { period: new Date('2025-04-30'), revenue: 680000, grossProfit: 450000, netIncome: 165000, expenses: 515000, ebitda: 265000, cashFlow: 195000, customerLtv: 45300, customerCac: 2870 },
    { period: new Date('2025-05-31'), revenue: 690000, grossProfit: 460000, netIncome: 170000, expenses: 520000, ebitda: 270000, cashFlow: 200000, customerLtv: 45400, customerCac: 2890 },
    { period: new Date('2025-06-30'), revenue: 700000, grossProfit: 470000, netIncome: 175000, expenses: 525000, ebitda: 275000, cashFlow: 205000, customerLtv: 45500, customerCac: 2910 },
    ...generateRecentData()
];

export const FinancialDataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [data, setData] = useState<FinancialRecord[]>(initialData);

  const addFinancialRecord = (record: FinancialRecord) => {
    setData(prevData => [...prevData, record].sort((a, b) => b.period.getTime() - a.period.getTime()));
  };

  return (
    <FinancialDataContext.Provider value={{ data, addFinancialRecord }}>
      {children}
    </FinancialDataContext.Provider>
  );
};

export const useFinancialData = () => {
  const context = useContext(FinancialDataContext);
  if (context === undefined) {
    throw new Error('useFinancialData must be used within a FinancialDataProvider');
  }
  return context;
};
