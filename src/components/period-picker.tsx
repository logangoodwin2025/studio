
"use client"

import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import type { DateRange } from "react-day-picker"

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

  const handleDateRangeSelect = (newDateRange: DateRange | undefined) => {
    onDateRangeChange(newDateRange);
    onPeriodChange('CUSTOM');
  }

  return (
    <div className={cn("flex items-center gap-2", className)}>
        <Tabs value={period} onValueChange={(value) => onPeriodChange(value as Period)}>
            <TabsList className="grid h-9 grid-cols-4">
                <TabsTrigger value="D" className="text-xs">Daily</TabsTrigger>
                <TabsTrigger value="W" className="text-xs">Weekly</TabsTrigger>
                <TabsTrigger value="M" className="text-xs">Monthly</TabsTrigger>
                <TabsTrigger value="YTD" className="text-xs">YTD</TabsTrigger>
            </TabsList>
        </Tabs>
        <Popover>
            <PopoverTrigger asChild>
            <Button
                id="date"
                variant={"outline"}
                className={cn(
                "w-[260px] justify-start text-left font-normal h-9",
                !dateRange && "text-muted-foreground",
                period === 'CUSTOM' && "bg-primary/10 border-primary text-primary"
                )}
            >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dateRange?.from ? (
                dateRange.to ? (
                    <>
                    {format(dateRange.from, "LLL dd, y")} -{" "}
                    {format(dateRange.to, "LLL dd, y")}
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
                defaultMonth={dateRange?.from}
                selected={dateRange}
                onSelect={handleDateRangeSelect}
                numberOfMonths={2}
            />
            </PopoverContent>
        </Popover>
    </div>
  )
}
