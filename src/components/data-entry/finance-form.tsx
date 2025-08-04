
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";
import { CalendarIcon, Save } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "../ui/separator";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";

const financeFormSchema = z.object({
  // Revenue
  revenueDate: z.date(),
  revenueSource: z.string(),
  revenueAmount: z.coerce.number(),
  revenueType: z.string(),
  
  // COGS
  cogsDate: z.date().optional(),
  cogsCategory: z.string().optional(),
  cogsAmount: z.coerce.number().optional(),

  // Operating Expenses
  opexDate: z.date().optional(),
  opexType: z.string().optional(),
  opexAmount: z.coerce.number().optional(),

  // Cash Flow
  cashInflowDate: z.date().optional(),
  cashInflowSource: z.string().optional(),
  cashInflowAmount: z.coerce.number().optional(),

  cashOutflowDate: z.date().optional(),
  cashOutflowPurpose: z.string().optional(),
  cashOutflowAmount: z.coerce.number().optional(),
});

type FinanceFormValues = z.infer<typeof financeFormSchema>;

export function FinanceForm() {
  const { toast } = useToast();
  const form = useForm<FinanceFormValues>({
    resolver: zodResolver(financeFormSchema),
    defaultValues: {
        revenueDate: new Date(),
    }
  });

  function onSubmit(data: FinanceFormValues) {
    console.log(data);
    toast({
      title: "Finance Data Submitted",
      description: "Your financial data has been recorded.",
    });
  }

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="font-headline">Finance Department Data Entry</CardTitle>
        <CardDescription>
          Enter raw financial data below. Derived metrics will be calculated automatically.
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent>
            <Accordion type="multiple" defaultValue={['revenue']} className="w-full">
              <AccordionItem value="revenue">
                <AccordionTrigger className="text-lg font-semibold font-headline">Revenue Tracking</AccordionTrigger>
                <AccordionContent className="pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <FormField
                      control={form.control}
                      name="revenueDate"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Date</FormLabel>
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
                                disabled={(date) =>
                                  date > new Date() || date < new Date("1900-01-01")
                                }
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
                        name="revenueSource"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Revenue Source</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a source" />
                                </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="membership">Membership</SelectItem>
                                    <SelectItem value="services">Services</SelectItem>
                                    <SelectItem value="products">Products</SelectItem>
                                    <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                    <FormField
                      control={form.control}
                      name="revenueAmount"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Revenue Amount</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="e.g., 50000" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                        control={form.control}
                        name="revenueType"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Revenue Type</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a type" />
                                </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="recurring">Recurring</SelectItem>
                                    <SelectItem value="one-time">One-time</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="expenses">
                <AccordionTrigger className="text-lg font-semibold font-headline">Expenses</AccordionTrigger>
                <AccordionContent className="pt-4 space-y-6">
                    <div>
                        <h4 className="font-medium mb-4">Cost of Goods Sold (COGS)</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                           <FormField control={form.control} name="cogsDate" render={({ field }) => ( <FormItem className="flex flex-col"><FormLabel>Date</FormLabel><Popover><PopoverTrigger asChild><FormControl><Button variant={"outline"} className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}>{field.value ? format(field.value, "PPP") : (<span>Pick a date</span>)}<CalendarIcon className="ml-auto h-4 w-4 opacity-50" /></Button></FormControl></PopoverTrigger><PopoverContent className="w-auto p-0" align="start"><Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus /></PopoverContent></Popover><FormMessage /></FormItem>)} />
                           <FormField control={form.control} name="cogsCategory" render={({ field }) => ( <FormItem><FormLabel>Expense Category</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Select a category" /></SelectTrigger></FormControl><SelectContent><SelectItem value="direct-labor">Direct Labor</SelectItem><SelectItem value="materials">Materials</SelectItem><SelectItem value="overhead">Overhead</SelectItem></SelectContent></Select><FormMessage /></FormItem>)} />
                           <FormField control={form.control} name="cogsAmount" render={({ field }) => ( <FormItem><FormLabel>Amount</FormLabel><FormControl><Input type="number" placeholder="e.g., 15000" {...field} /></FormControl><FormMessage /></FormItem>)} />
                        </div>
                    </div>
                     <Separator />
                    <div>
                        <h4 className="font-medium mb-4">Operating Expenses</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                           <FormField control={form.control} name="opexDate" render={({ field }) => ( <FormItem className="flex flex-col"><FormLabel>Date</FormLabel><Popover><PopoverTrigger asChild><FormControl><Button variant={"outline"} className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}>{field.value ? format(field.value, "PPP") : (<span>Pick a date</span>)}<CalendarIcon className="ml-auto h-4 w-4 opacity-50" /></Button></FormControl></PopoverTrigger><PopoverContent className="w-auto p-0" align="start"><Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus /></PopoverContent></Popover><FormMessage /></FormItem>)} />
                           <FormField control={form.control} name="opexType" render={({ field }) => ( <FormItem><FormLabel>Expense Type</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Select a type" /></SelectTrigger></FormControl><SelectContent><SelectItem value="salaries">Salaries</SelectItem><SelectItem value="rent">Rent</SelectItem><SelectItem value="marketing">Marketing</SelectItem><SelectItem value="r-d">R&D</SelectItem><SelectItem value="other">Other</SelectItem></SelectContent></Select><FormMessage /></FormItem>)} />
                           <FormField control={form.control} name="opexAmount" render={({ field }) => ( <FormItem><FormLabel>Amount</FormLabel><FormControl><Input type="number" placeholder="e.g., 25000" {...field} /></FormControl><FormMessage /></FormItem>)} />
                        </div>
                    </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="cash-flow">
                <AccordionTrigger className="text-lg font-semibold font-headline">Cash Flow Components</AccordionTrigger>
                <AccordionContent className="pt-4 space-y-6">
                     <div>
                        <h4 className="font-medium mb-4">Cash Inflow</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                           <FormField control={form.control} name="cashInflowDate" render={({ field }) => ( <FormItem className="flex flex-col"><FormLabel>Date</FormLabel><Popover><PopoverTrigger asChild><FormControl><Button variant={"outline"} className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}>{field.value ? format(field.value, "PPP") : (<span>Pick a date</span>)}<CalendarIcon className="ml-auto h-4 w-4 opacity-50" /></Button></FormControl></PopoverTrigger><PopoverContent className="w-auto p-0" align="start"><Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus /></PopoverContent></Popover><FormMessage /></FormItem>)} />
                           <FormField control={form.control} name="cashInflowSource" render={({ field }) => ( <FormItem><FormLabel>Inflow Source</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Select a source" /></SelectTrigger></FormControl><SelectContent><SelectItem value="customer-payments">Customer Payments</SelectItem><SelectItem value="loans">Loans</SelectItem><SelectItem value="investments">Investments</SelectItem></SelectContent></Select><FormMessage /></FormItem>)} />
                           <FormField control={form.control} name="cashInflowAmount" render={({ field }) => ( <FormItem><FormLabel>Amount</FormLabel><FormControl><Input type="number" placeholder="e.g., 30000" {...field} /></FormControl><FormMessage /></FormItem>)} />
                        </div>
                    </div>
                     <Separator />
                    <div>
                        <h4 className="font-medium mb-4">Cash Outflow</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                           <FormField control={form.control} name="cashOutflowDate" render={({ field }) => ( <FormItem className="flex flex-col"><FormLabel>Date</FormLabel><Popover><PopoverTrigger asChild><FormControl><Button variant={"outline"} className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}>{field.value ? format(field.value, "PPP") : (<span>Pick a date</span>)}<CalendarIcon className="ml-auto h-4 w-4 opacity-50" /></Button></FormControl></PopoverTrigger><PopoverContent className="w-auto p-0" align="start"><Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus /></PopoverContent></Popover><FormMessage /></FormItem>)} />
                           <FormField control={form.control} name="cashOutflowPurpose" render={({ field }) => ( <FormItem><FormLabel>Outflow Purpose</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Select a purpose" /></SelectTrigger></FormControl><SelectContent><SelectItem value="supplier-payments">Supplier Payments</SelectItem><SelectItem value="salaries">Salaries</SelectItem><SelectItem value="capex">CapEx</SelectItem></SelectContent></Select><FormMessage /></FormItem>)} />
                           <FormField control={form.control} name="cashOutflowAmount" render={({ field }) => ( <FormItem><FormLabel>Amount</FormLabel><FormControl><Input type="number" placeholder="e.g., 18000" {...field} /></FormControl><FormMessage /></FormItem>)} />
                        </div>
                    </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

          </CardContent>
          <CardFooter className="flex justify-end border-t pt-6">
            <Button type="submit" size="lg">
              <Save className="mr-2 h-4 w-4" />
              Save Financial Entries
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
