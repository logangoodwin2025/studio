
"use client";

import { Line, LineChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, Legend } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const data = [
  { name: 'Jan', grossMargin: 0.38, netMargin: 0.15, roi: 0.18 },
  { name: 'Feb', grossMargin: 0.39, netMargin: 0.16, roi: 0.19 },
  { name: 'Mar', grossMargin: 0.385, netMargin: 0.155, roi: 0.185 },
  { name: 'Apr', grossMargin: 0.41, netMargin: 0.17, roi: 0.20 },
  { name: 'May', grossMargin: 0.40, netMargin: 0.165, roi: 0.195 },
  { name: 'Jun', grossMargin: 0.42, netMargin: 0.18, roi: 0.21 },
];

export function ProfitabilityAnalysis() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Profitability Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} className="stroke-border/50" />
              <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis 
                stroke="hsl(var(--muted-foreground))" 
                fontSize={12} 
                tickLine={false} 
                axisLine={false} 
                tickFormatter={(value) => `${(value * 100).toFixed(0)}%`} 
              />
              <Tooltip
                formatter={(value: number, name: string) => [`${(value * 100).toFixed(1)}%`, name]}
                cursor={{ stroke: 'hsl(var(--primary))', strokeWidth: 1, strokeDasharray: '3 3' }}
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  borderColor: "hsl(var(--border))",
                  borderRadius: 'var(--radius)'
                }}
              />
              <Legend iconType="circle" iconSize={8} />
              <Line type="monotone" dataKey="grossMargin" name="Gross Margin" stroke="hsl(var(--chart-1))" strokeWidth={2} dot={false} animationDuration={800} />
              <Line type="monotone" dataKey="netMargin" name="Net Margin" stroke="hsl(var(--chart-2))" strokeWidth={2} dot={false} animationDuration={800} animationBegin={200} />
              <Line type="monotone" dataKey="roi" name="ROI" stroke="hsl(var(--chart-5))" strokeWidth={2} dot={false} animationDuration={800} animationBegin={400} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
