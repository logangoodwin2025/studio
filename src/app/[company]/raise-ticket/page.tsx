
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
import { Send, ChevronsUpDown } from "lucide-react";
import { supportTickets } from "@/lib/mock-data";
import type { SupportTicket } from "@/lib/mock-data";
import { useSearchParams, useParams } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import React from "react";

const raiseTicketSchema = z.object({
  subject: z.string().min(5, "Subject must be at least 5 characters long."),
  description: z.string().min(20, "Description must be at least 20 characters long."),
  priority: z.enum(["Low", "Medium", "High"]),
});

type RaiseTicketFormValues = z.infer<typeof raiseTicketSchema>;

const priorityVariantMap: Record<SupportTicket['priority'], "destructive" | "default" | "secondary"> = {
    High: "destructive",
    Medium: "default",
    Low: "secondary"
}

const statusVariantMap: Record<SupportTicket['status'], "secondary" | "default" | "destructive"> = {
    Open: "secondary",
    "In Progress": "default",
    Resolved: "secondary",
    Closed: "destructive",
}

export default function RaiseTicketPage() {
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const params = useParams();

  const userName = searchParams.get('name') || "Unknown User";

  const form = useForm<RaiseTicketFormValues>({
    resolver: zodResolver(raiseTicketSchema),
    defaultValues: {
      subject: "",
      description: "",
      priority: "Medium",
    },
  });

  const [myTickets, setMyTickets] = React.useState<SupportTicket[]>(() => 
    supportTickets.filter(t => t.user === userName || (t.user.includes('@') && userName.includes('@') && t.user.split('@')[1] === userName.split('@')[1]))
  );

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
    setMyTickets(prev => [newTicket, ...prev]);
    
    toast({
      title: "Ticket Submitted Successfully!",
      description: `Your support ticket #${newTicket.id} has been received.`,
    });
    form.reset();
  };

  return (
    <>
      <DashboardHeader 
        title="Support Center" 
        description="Raise a new ticket or view the status of your existing tickets."
      />
      <main className="flex-1 p-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
            <Tabs defaultValue="new-ticket" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="new-ticket">Submit a New Ticket</TabsTrigger>
                    <TabsTrigger value="my-tickets">My Tickets</TabsTrigger>
                </TabsList>
                <TabsContent value="new-ticket" className="mt-6">
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
                </TabsContent>
                <TabsContent value="my-tickets" className="mt-6">
                     <Card>
                        <CardHeader>
                            <CardTitle className="font-headline">My Submitted Tickets</CardTitle>
                             <CardDescription>
                                Here is a list of all the support tickets you have submitted.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                           <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Ticket ID</TableHead>
                                    <TableHead>Subject</TableHead>
                                    <TableHead>Priority</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Last Updated</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {myTickets.length > 0 ? myTickets.map(ticket => (
                                    <TableRow key={ticket.id}>
                                        <TableCell className="font-mono">{ticket.id}</TableCell>
                                        <TableCell className="font-medium">{ticket.subject}</TableCell>
                                        <TableCell><Badge variant={priorityVariantMap[ticket.priority]}>{ticket.priority}</Badge></TableCell>
                                        <TableCell><Badge variant={statusVariantMap[ticket.status]}>{ticket.status}</Badge></TableCell>
                                        <TableCell>{format(ticket.lastUpdated, "PPP")}</TableCell>
                                    </TableRow>
                                )) : (
                                    <TableRow>
                                        <TableCell colSpan={5} className="text-center h-24">You have not submitted any tickets.</TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                           </Table>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
      </main>
    </>
  );
}
