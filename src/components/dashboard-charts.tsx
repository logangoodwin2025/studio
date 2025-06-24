"use client";

import { Bar, BarChart, CartesianGrid, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";
import { monthlyRevenueData, userAcquisitionData } from "@/lib/mock-data";

const revenueChartConfig = {
  revenue: {
    label: "Revenue",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

const acquisitionChartConfig = {
  users: {
    label: "Users",
  },
  Organic: {
    label: "Organic",
    color: "hsl(var(--chart-1))",
  },
  Referral: {
    label: "Referral",
    color: "hsl(var(--chart-2))",
  },
  Paid: {
    label: "Paid",
    color: "hsl(var(--chart-3))",
  },
  Social: {
    label: "Social",
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig;

export function DashboardCharts() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
      <Card className="lg:col-span-4">
        <CardHeader>
          <CardTitle className="font-headline">Monthly Revenue</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={revenueChartConfig} className="h-64 w-full">
            <ResponsiveContainer>
              <BarChart data={monthlyRevenueData}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="month" tickLine={false} tickMargin={10} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} tickMargin={10} />
                <Tooltip cursor={false} content={<ChartTooltipContent />} />
                <Bar dataKey="revenue" fill="var(--color-revenue)" radius={4} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
      <Card className="lg:col-span-3">
        <CardHeader>
          <CardTitle className="font-headline">User Acquisition</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={acquisitionChartConfig} className="h-64 w-full">
            <ResponsiveContainer>
              <PieChart>
                <Tooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                <Pie data={userAcquisitionData} dataKey="value" nameKey="name" innerRadius={60} strokeWidth={5} />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
