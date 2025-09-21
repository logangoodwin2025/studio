
"use client";

import * as React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DashboardHeader } from "@/components/dashboard-header";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PlusCircle, Edit, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

const planSchema = z.object({
  name: z.string().min(3, "Plan name must be at least 3 characters."),
  price: z.coerce.number().min(0, "Price must be a positive number."),
  description: z.string().min(10, "Description must be at least 10 characters."),
  features: z.string().min(10, "Features must be at least 10 characters."),
});

type PlanFormValues = z.infer<typeof planSchema>;

const initialPlans = [
  { id: "plan_std", name: "Standard", price: 49, description: "For small teams.", features: "10 Users, Basic Reporting, Email Support", active: true },
  { id: "plan_pro", name: "Pro", price: 99, description: "For growing businesses.", features: "50 Users, Advanced Reporting, Priority Support", active: true },
  { id: "plan_ent", name: "Enterprise", price: 499, description: "For large organizations.", features: "Unlimited Users, Custom Integrations, Dedicated Support", active: true },
  { id: "plan_trial", name: "Trial", price: 0, description: "14-day free trial.", features: "All Pro features", active: false },
];

export default function BillingPage() {
  const { toast } = useToast();
  const [plans, setPlans] = React.useState(initialPlans);
  const [isDialogOpen, setDialogOpen] = React.useState(false);
  const [editingPlan, setEditingPlan] = React.useState<typeof initialPlans[0] | null>(null);
  
  const form = useForm<PlanFormValues>({
    resolver: zodResolver(planSchema),
    defaultValues: { name: "", price: 0, description: "", features: "" },
  });

  const handleAddNew = () => {
    setEditingPlan(null);
    form.reset({ name: "", price: 0, description: "", features: "" });
    setDialogOpen(true);
  };

  const handleEdit = (plan: typeof initialPlans[0]) => {
    setEditingPlan(plan);
    form.reset({
        name: plan.name,
        price: plan.price,
        description: plan.description,
        features: plan.features,
    });
    setDialogOpen(true);
  };

  const onSubmit = (values: PlanFormValues) => {
    if (editingPlan) {
      setPlans(plans.map(p => p.id === editingPlan.id ? {...p, ...values} : p));
      toast({ title: "Plan Updated", description: "The plan has been successfully updated." });
    } else {
      const newPlan = { ...values, id: `plan_${Date.now()}`, active: true };
      setPlans([...plans, newPlan]);
      toast({ title: "Plan Created", description: "The new plan has been successfully created." });
    }
    setDialogOpen(false);
  };


  return (
    <>
      <DashboardHeader
        title="Billing & Plan Management"
        description="Create, edit, and manage subscription plans for tenants."
      >
        <Button onClick={handleAddNew}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Create New Plan
        </Button>
      </DashboardHeader>
      <main className="flex-1 p-4 sm:px-6 lg:px-8">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Available Subscription Plans</CardTitle>
            <CardDescription>
              These are the plans that tenants can subscribe to.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Plan Name</TableHead>
                  <TableHead>Price (per month)</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {plans.map((plan) => (
                  <TableRow key={plan.id}>
                    <TableCell className="font-medium">{plan.name}</TableCell>
                    <TableCell>${plan.price}</TableCell>
                    <TableCell>
                      <Badge variant={plan.active ? "secondary" : "destructive"}>
                        {plan.active ? "Active" : "Archived"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(plan)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>

       <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{editingPlan ? 'Edit Plan' : 'Create New Plan'}</DialogTitle>
                    <DialogDescription>
                        {editingPlan ? "Update the details for this plan." : "Fill out the form to create a new subscription plan."}
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField control={form.control} name="name" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Plan Name</FormLabel>
                                <FormControl><Input {...field} placeholder="e.g., Professional" /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )}/>
                        <FormField control={form.control} name="price" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Monthly Price ($)</FormLabel>
                                <FormControl><Input type="number" {...field} placeholder="e.g., 99" /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )}/>
                         <FormField control={form.control} name="description" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl><Input {...field} placeholder="A short description for the plan." /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )}/>
                        <FormField control={form.control} name="features" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Features</FormLabel>
                                <FormControl><Textarea {...field} placeholder="List features, separated by commas." /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )}/>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button type="button" variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button type="submit">Save Plan</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    </>
  );
}
