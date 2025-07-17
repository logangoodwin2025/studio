
"use client"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface PeriodPickerProps {
    value: string;
    onValueChange: (value: string) => void;
}

export function PeriodPicker({ value, onValueChange }: PeriodPickerProps) {
  return (
    <Tabs value={value} onValueChange={onValueChange} className="w-[400px]">
      <TabsList className="grid w-full grid-cols-4 h-9">
        <TabsTrigger value="D" className="text-xs">Daily</TabsTrigger>
        <TabsTrigger value="W" className="text-xs">Weekly</TabsTrigger>
        <TabsTrigger value="M" className="text-xs">Monthly</TabsTrigger>
        <TabsTrigger value="YTD" className="text-xs">YTD</TabsTrigger>
      </TabsList>
    </Tabs>
  )
}
