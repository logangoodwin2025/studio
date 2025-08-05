
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";
import { DashboardHeader } from "@/components/dashboard-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";
import { supportTickets } from "@/lib/mock-data";
import { useSearchParams, useParams } from "next/navigation";

const raiseTicketSchema = z.object({
  subject: z.string().min(5, "Subject must be at least 5 characters long."),
  description: z.string().min(20, "Description must be at least 20 characters long."),
  priority: z.enum(["Low", "Medium", "High"]),
});

type RaiseTicketFormValues = z.infer<typeof raiseTicketSchema>;

export default function RaiseTicketPage() {
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const params = useParams();

  const form = useForm<RaiseTicketFormValues>({
    resolver: zodResolver(raiseTicketSchema),
    defaultValues: {
      subject: "",
      description: "",
      priority: "Medium",
    },
  });

  const onSubmit = (values: RaiseTicketFormValues) => {
    const user = searchParams.get('name') || "Unknown User";
    const tenant = params.company as string || "Unknown Tenant";
    
    // In a real app, this would be an API call.
    // Here, we just add it to our mock data array.
    const newTicket = {
      id: `T-${Math.floor(Math.random() * 9000) + 1000}`,
      subject: values.subject,
      tenant: tenant.charAt(0).toUpperCase() + tenant.slice(1),
      user: user,
      priority: values.priority,
      status: "Open" as const,
      created: new Date(),
      lastUpdated: new Date(),
    };
    
    supportTickets.unshift(newTicket);
    
    toast({
      title: "Ticket Submitted Successfully!",
      description: `Your support ticket #${newTicket.id} has been received.`,
    });
    form.reset();
  };

  return (
    <>
      <DashboardHeader 
        title="Raise a Support Ticket" 
        description="Experiencing an issue or have a question? Let us know."
      />
      <main className="flex-1 p-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl">
           <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline">Submit a New Ticket</CardTitle>
                        <CardDescription>
                            Please provide as much detail as possible so we can assist you effectively.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <FormField
                            control={form.control}
                            name="subject"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Subject</FormLabel>
                                    <FormControl>
                                        <Input placeholder="e.g., Unable to export financial report" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                         <FormField
                            control={form.control}
                            name="priority"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Priority</FormLabel>
                                     <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a priority level" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="Low">Low - General question or minor issue</SelectItem>
                                            <SelectItem value="Medium">Medium - Functionality is impaired but can work around</SelectItem>
                                            <SelectItem value="High">High - Critical functionality is blocked</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                         <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Describe the issue in detail. Include steps to reproduce, any error messages, and what you expected to happen."
                                            rows={8}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </CardContent>
                    <CardFooter className="flex justify-end border-t pt-6">
                        <Button type="submit" size="lg">
                            <Send className="mr-2 h-4 w-4" />
                            Submit Ticket
                        </Button>
                    </CardFooter>
                </Card>
            </form>
           </Form>
        </div>
      </main>
    </>
  );
}
