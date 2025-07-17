"use client";

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const data = [
  { name: 'W1', inflow: 122000, outflow: 88000 },
  { name: 'W2', inflow: 148000, outflow: 115000 },
  { name: 'W3', inflow: 145000, outflow: 112000 },
  { name: 'W4', inflow: 165000, outflow: 120000 },
];

export function WeeklyCashFlow() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Weekly Cash Flow</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} className="stroke-border/50" />
              <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value/1000}k`} />
              <Tooltip
                cursor={{ fill: 'hsl(var(--secondary))' }}
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  borderColor: "hsl(var(--border))",
                }}
              />
              <Bar dataKey="inflow" fill="hsl(var(--chart-2))" name="Inflow" radius={[4, 4, 0, 0]} />
              <Bar dataKey="outflow" fill="hsl(var(--chart-5))" name="Outflow" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
