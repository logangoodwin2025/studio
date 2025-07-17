import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  change?: string;
  icon: LucideIcon;
  iconBgColor?: string;
}

export function StatCard({ title, value, change, icon: Icon, iconBgColor = 'bg-primary/10' }: StatCardProps) {
  const isPositive = change?.startsWith("+");
  const isNegative = change?.startsWith("-");
  const changeColor = isPositive ? "text-green-600" : isNegative ? "text-red-600" : "text-muted-foreground";
  const trendIcon = isPositive ? "↗︎" : isNegative ? "↘︎" : "";

  return (
    <Card className="transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
          <div className={cn("flex h-8 w-8 items-center justify-center rounded-lg", iconBgColor)}>
            <Icon className="h-4 w-4 text-primary" />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {change && (
            <p className={cn("text-xs", changeColor)}>
                {trendIcon} {change}
            </p>
        )}
      </CardContent>
    </Card>
  );
}
