
"use client";

import { Card } from "@/components/ui/card";
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
    <Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
       <div className="absolute top-0 left-0 h-full w-full bg-gradient-to-br from-primary/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
      <Card className="relative z-10 h-full bg-card/80 backdrop-blur-sm">
        <CardContent className="p-4 flex items-center gap-4">
            <div className="p-3 rounded-lg bg-primary/10 shadow-inner self-start">
                <Icon className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider break-words">{title}</p>
            <div className="flex flex-wrap items-baseline gap-x-2">
                <p className="text-xl font-bold text-foreground break-words">{value}</p>
                {change && (
                <span className={cn("text-sm font-semibold", changeColor)}>
                    {change}
                </span>
                )}
            </div>
            </div>
        </CardContent>
      </Card>
    </Card>
  );
}
