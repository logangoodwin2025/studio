"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const data = [
  { name: 'Personnel', value: 180000, color: 'hsl(var(--chart-1))' },
  { name: 'Operations', value: 120000, color: 'hsl(var(--chart-2))' },
  { name: 'Marketing', value: 80000, color: 'hsl(var(--chart-3))' },
  { name: 'Technology', value: 60000, color: 'hsl(var(--chart-4))' },
  { name: 'Other', value: 40000, color: 'hsl(var(--chart-5))' },
];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" className="text-xs font-bold">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};


const CustomLegend = (props: any) => {
  const { payload } = props;
  return (
    <ul className="flex flex-col space-y-2">
      {payload.map((entry: any, index: any) => (
        <li key={`item-${index}`} className="flex items-center justify-between text-sm">
          <div className="flex items-center">
            <span style={{ backgroundColor: entry.color }} className="w-2.5 h-2.5 rounded-full mr-2"></span>
            <span className="text-muted-foreground">{entry.value}</span>
          </div>
          <span className="font-medium">${data[index].value.toLocaleString()}</span>
        </li>
      ))}
    </ul>
  );
};

export function ExpenseBreakdown() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Expense Breakdown</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] grid grid-cols-2 gap-4 items-center">
           <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                // label={renderCustomizedLabel}
                outerRadius={100}
                innerRadius={60}
                fill="#8884d8"
                dataKey="value"
                strokeWidth={2}
                className='focus:outline-none'
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} stroke={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div>
            <CustomLegend payload={data.map(i => ({value: i.name, color: i.color}))} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
