

"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { MoreHorizontal, PlusCircle } from "lucide-react";
import Link from 'next/link';
import { useSearchParams } from "next/navigation";


import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { DashboardHeader } from "./dashboard-header";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { type Tenant, tenants as initialTenants } from "@/lib/mock-data";


const tenantSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  plan: z.enum(["Free", "Trial", "Paid", "Enterprise"]),
});


export function TenantsDataTable() {
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const [tenants, setTenants] = useState(initialTenants);
  const [isSheetOpen, setSheetOpen] = useState(false);
  const [editingTenant, setEditingTenant] = useState<Tenant | null>(null);

  const form = useForm<z.infer<typeof tenantSchema>>({
    resolver: zodResolver(tenantSchema),
    defaultValues: { name: "", plan: "Trial" },
  });

  const handleAddNew = () => {
    setEditingTenant(null);
    form.reset({ name: "", plan: "Trial" });
    setSheetOpen(true);
  };

  const handleEdit = (tenant: Tenant) => {
    setEditingTenant(tenant);
    form.reset({ name: tenant.name, plan: tenant.plan as "Free" | "Trial" | "Paid" | "Enterprise" });
    setSheetOpen(true);
  };
  
  const createHref = (href: string) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    return `${href}?${newSearchParams.toString()}`;
  }


  const onSubmit = (values: z.infer<typeof tenantSchema>) => {
    setTimeout(() => {
      if (editingTenant) {
        setTenants(tenants.map((t) => (t.id === editingTenant.id ? { ...t, ...values, plan: values.plan, status: t.status } : t)));
        toast({ title: "Tenant Updated", description: "The tenant details have been successfully updated." });
      } else {
        const newTenant: Tenant = { 
            ...values,
            plan: values.plan,
            id: `ten_${Date.now()}`, 
            users: 1, 
            lastActive: 'Just now',
            status: "Provisioning"
        };
        setTenants([newTenant, ...tenants]);
        toast({ title: "Tenant Added", description: "A new tenant has been successfully added." });
      }
      setSheetOpen(false);
    }, 500);
  };
  
  const content = (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Company Name</TableHead>
              <TableHead>Plan</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Users</TableHead>
              <TableHead>Last Active</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tenants.map((tenant) => (
              <TableRow key={tenant.id}>
                <TableCell className="font-medium">{tenant.name}</TableCell>
                <TableCell>
                    <Badge variant={tenant.plan === 'Enterprise' ? 'default' : 'secondary'}>{tenant.plan}</Badge>
                </TableCell>
                <TableCell>
                    <Badge variant={tenant.status === 'Active' ? 'secondary' : 'destructive'}>{tenant.status}</Badge>
                </TableCell>
                <TableCell>{tenant.users}</TableCell>
                <TableCell>{tenant.lastActive}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem onClick={() => handleEdit(tenant)}>Edit</DropdownMenuItem>
                       <DropdownMenuItem asChild>
                          <Link href={createHref(`/admin/tenants/${tenant.id}`)}>View Details</Link>
                        </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">Suspend</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );

  return (
    <>
      <DashboardHeader title="Tenant Management" description="Onboard, manage, and monitor all tenant accounts on the platform.">
        <Button onClick={handleAddNew}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add New Tenant
        </Button>
      </DashboardHeader>
      <main className="flex-1 p-4 sm:px-6 lg:px-8">
        {content}
      </main>
      <Sheet open={isSheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>{editingTenant ? "Edit Tenant" : "Add New Tenant"}</SheetTitle>
            <SheetDescription>
              {editingTenant ? "Update the tenant's details below." : "Fill in the form to add a new tenant."}
            </SheetDescription>
          </SheetHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 py-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Acme Inc." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="plan"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subscription Plan</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a plan" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Trial">Trial</SelectItem>
                        <SelectItem value="Paid">Paid</SelectItem>
                        <SelectItem value="Enterprise">Enterprise</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <SheetFooter>
                <SheetClose asChild>
                  <Button type="button" variant="outline">Cancel</Button>
                </SheetClose>
                <Button type="submit">Save changes</Button>
              </SheetFooter>
            </form>
          </Form>
        </SheetContent>
      </Sheet>
    </>
  );
}
