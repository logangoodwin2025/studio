
"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FinanceForm } from "./finance-form";
import { SalesForm } from "./sales-form";
import { OperationsForm } from "./operations-form";
import { MembershipForm } from "./membership-form";
import { DollarSign, Lightbulb, Activity, Users } from "lucide-react";

export function DataEntryView() {
  return (
    <Tabs defaultValue="finance" className="w-full">
      <TabsList className="grid w-full grid-cols-4 h-auto">
        <TabsTrigger value="finance" className="flex items-center gap-2 py-2">
          <DollarSign className="h-5 w-5" />
          <div className="text-left">
            <p className="font-bold">Finance</p>
            <p className="text-xs text-muted-foreground">Revenue, Expenses, etc.</p>
          </div>
        </TabsTrigger>
        <TabsTrigger value="sales" className="flex items-center gap-2 py-2">
          <Lightbulb className="h-5 w-5" />
          <div className="text-left">
            <p className="font-bold">Sales & Marketing</p>
            <p className="text-xs text-muted-foreground">Leads, Campaigns, etc.</p>
          </div>
        </TabsTrigger>
        <TabsTrigger value="operations" className="flex items-center gap-2 py-2">
          <Activity className="h-5 w-5" />
           <div className="text-left">
            <p className="font-bold">Operations</p>
            <p className="text-xs text-muted-foreground">Projects, Headcount, etc.</p>
          </div>
        </TabsTrigger>
        <TabsTrigger value="membership" className="flex items-center gap-2 py-2">
          <Users className="h-5 w-5" />
           <div className="text-left">
            <p className="font-bold">Membership</p>
            <p className="text-xs text-muted-foreground">Growth, Churn, etc.</p>
          </div>
        </TabsTrigger>
      </TabsList>
      <TabsContent value="finance">
        <FinanceForm />
      </TabsContent>
      <TabsContent value="sales">
        <SalesForm />
      </TabsContent>
      <TabsContent value="operations">
        <OperationsForm />
      </TabsContent>
      <TabsContent value="membership">
        <MembershipForm />
      </TabsContent>
    </Tabs>
  );
}
