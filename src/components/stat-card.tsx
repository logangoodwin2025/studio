import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  change?: string;
  icon: LucideIcon;
}

export function StatCard({ title, value, change, icon: Icon }: StatCardProps) {
  const isPositive = change?.startsWith("+");
  const isNegative = change?.startsWith("-");
  const changeColor = isPositive ? "text-green-500" : isNegative ? "text-red-500" : "text-muted-foreground";

  return (
    <Card className="group transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <CardContent className="p-4 flex items-center gap-4">
        <div className="p-3 rounded-lg bg-primary/10 shadow-inner">
            <Icon className="h-6 w-6 text-primary" />
        </div>
        <div className="flex-1 overflow-hidden">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider truncate">{title}</p>
          <div className="flex items-baseline gap-2">
            <p className="text-2xl font-bold text-foreground truncate">{value}</p>
            {change && (
              <span className={cn("text-sm font-semibold", changeColor)}>
                {change}
              </span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
