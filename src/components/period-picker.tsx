
"use client"

import { format } from "date-fns"
import { Calendar as CalendarIcon, Check } from "lucide-react"
import type { DateRange } from "react-day-picker"
import * as React from "react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { Period } from "@/app/[company]/financial-dashboard/page"

interface PeriodPickerProps {
    period: Period;
    onPeriodChange: (period: Period) => void;
    dateRange: DateRange | undefined;
    onDateRangeChange: (dateRange: DateRange | undefined) => void;
    className?: string
}

export function PeriodPicker({
    period,
    onPeriodChange,
    dateRange,
    onDateRangeChange,
    className
}: PeriodPickerProps) {
  const [popoverOpen, setPopoverOpen] = React.useState(false);
  const [localDateRange, setLocalDateRange] = React.useState(dateRange);

  React.useEffect(() => {
    setLocalDateRange(dateRange);
  }, [dateRange]);

  const handleApplyDateRange = () => {
    onDateRangeChange(localDateRange);
    onPeriodChange('CUSTOM');
    setPopoverOpen(false);
  }

  const handlePeriodChange = (value: string) => {
    const newPeriod = value as Period;
    onPeriodChange(newPeriod);
    if (newPeriod !== 'CUSTOM') {
      // Reset date range when a pre-defined period is selected.
      // The dashboard page will then set the correct range.
      onDateRangeChange(undefined);
    }
  }

  return (
    <div className={cn("flex items-center gap-2 bg-card/50 p-1 rounded-lg", className)}>
        <Tabs value={period} onValueChange={handlePeriodChange}>
            <TabsList className="grid h-9 grid-cols-4 bg-transparent p-0">
                <TabsTrigger value="D" className="text-xs">Daily</TabsTrigger>
                <TabsTrigger value="W" className="text-xs">Weekly</TabsTrigger>
                <TabsTrigger value="M" className="text-xs">Monthly</TabsTrigger>
                <TabsTrigger value="YTD" className="text-xs">YTD</TabsTrigger>
            </TabsList>
        </Tabs>
        <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
            <PopoverTrigger asChild>
            <Button
                id="date"
                variant={"outline"}
                className={cn(
                "w-[260px] justify-start text-left font-normal h-9 bg-background",
                !dateRange && "text-muted-foreground",
                period === 'CUSTOM' && "ring-2 ring-primary ring-offset-2"
                )}
            >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dateRange?.from ? (
                dateRange.to ? (
                    <>
                    {format(dateRange.from, "LLL dd, y")} -{" "}
                    {format(date.to, "LLL dd, y")}
                    </>
                ) : (
                    format(dateRange.from, "LLL dd, y")
                )
                ) : (
                <span>Custom range</span>
                )}
            </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={localDateRange?.from}
                  selected={localDateRange}
                  onSelect={setLocalDateRange}
                  numberOfMonths={2}
              />
              <div className="p-2 border-t flex justify-end">
                <Button onClick={handleApplyDateRange} size="sm">
                  <Check className="h-4 w-4 mr-2" />
                  Apply
                </Button>
              </div>
            </PopoverContent>
        </Popover>
    </div>
  )
}
