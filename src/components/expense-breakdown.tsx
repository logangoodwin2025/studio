
"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const data = [
  { name: 'Personnel', value: 180000, color: 'hsl(var(--chart-1))' },
  { name: 'Operations', value: 120000, color: 'hsl(var(--chart-2))' },
  { name: 'Marketing', value: 80000, color: 'hsl(var(--chart-3))' },
  { name: 'Technology', value: 60000, color: 'hsl(var(--chart-4))' },
  { name: 'Other', value: 40000, color: 'hsl(var(--chart-5))' },
];

export function ExpenseBreakdown() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Expense Breakdown</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
           <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Tooltip
                cursor={{ fill: 'hsl(var(--secondary))' }}
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  borderColor: "hsl(var(--border))",
                }}
                formatter={(value: number) => `$${value.toLocaleString()}`}
              />
              <Legend 
                iconType="circle" 
                iconSize={8} 
                verticalAlign="middle" 
                align="right" 
                layout="vertical"
              />
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                innerRadius={60}
                fill="#8884d8"
                dataKey="value"
                strokeWidth={2}
                className='focus:outline-none'
                isAnimationActive={true}
                animationDuration={800}
              >
                {data.map((entry) => (
                  <Cell key={`cell-${entry.name}`} fill={entry.color} stroke={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
