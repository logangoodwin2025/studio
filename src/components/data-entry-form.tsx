
"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";
import { CalendarIcon, Save } from "lucide-react";
import { cn } from "@/lib/utils";

const dataEntrySchema = z.object({
  period: z.date({ required_error: "A period date is required." }),
  revenue: z.coerce.number().min(0, "Revenue must be a positive number."),
  expenses: z.coerce.number().min(0, "Expenses must be a positive number."),
  profit: z.coerce.number(),
  cashFlow: z.coerce.number(),
  ebitda: z.coerce.number(),
  customerLtv: z.coerce.number(),
  customerCac: z.coerce.number(),
});

type DataEntryFormValues = z.infer<typeof dataEntrySchema>;

const defaultValues: Partial<DataEntryFormValues> = {
  period: new Date("2025-07-17T00:00:00"),
  revenue: 670000,
  expenses: 410000,
  profit: 260000,
  cashFlow: 195000,
  ebitda: 285000,
  customerLtv: 45200,
  customerCac: 2850,
};

export function DataEntryForm() {
  const { toast } = useToast();
  const form = useForm<DataEntryFormValues>({
    resolver: zodResolver(dataEntrySchema),
    defaultValues,
  });

  const onSubmit = (data: DataEntryFormValues) => {
    console.log(data);
    toast({
      title: "Data Saved",
      description: "Financial metrics have been successfully saved.",
    });
  };
  
  const selectedDate = form.watch("period");

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="space-y-1.5">
              <CardTitle className="font-headline">Financial Metrics</CardTitle>
            </div>
             <p className="text-sm text-muted-foreground">
                Period: {selectedDate ? format(selectedDate, "yyyy-MM-dd") : "Not selected"}
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <FormField
                control={form.control}
                name="period"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Period</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="revenue"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Revenue ($)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="670000" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="expenses"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Expenses ($)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="410000" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <FormField
                control={form.control}
                name="profit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Profit ($)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="260000" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="cashFlow"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cash Flow ($)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="195000" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="ebitda"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>EBITDA ($)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="285000" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <FormField
                control={form.control}
                name="customerLtv"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Customer LTV ($)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="45200" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="customerCac"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Customer CAC ($)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="2850" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button type="submit">
                <Save className="mr-2 h-4 w-4" />
                Save Financial Data
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
