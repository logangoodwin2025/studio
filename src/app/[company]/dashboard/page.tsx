import { DashboardHeader } from "@/components/dashboard-header";
import { CeoDashboardView } from "@/components/dashboards/ceo-dashboard-view";
import { FinanceDashboardView } from "@/components/dashboards/finance-dashboard-view";
import { OperationsDashboardView } from "@/components/dashboards/operations-dashboard-view";
import { SalesMarketingDashboardView } from "@/components/dashboards/sales-marketing-dashboard-view";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function DashboardPage() {
  return (
    <>
      <DashboardHeader
        title="Dashboard"
        description="Comprehensive metrics and performance indicators for your organization."
      />
      <main className="flex-1 p-4 sm:px-6 lg:px-8">
        <Tabs defaultValue="ceo">
          <TabsList className="mb-4">
            <TabsTrigger value="ceo">CEO/Executive</TabsTrigger>
            <TabsTrigger value="finance">Finance</TabsTrigger>
            <TabsTrigger value="sales">Sales & Marketing</TabsTrigger>
            <TabsTrigger value="operations">Operations</TabsTrigger>
          </TabsList>

          <TabsContent value="ceo" className="space-y-6">
            <CeoDashboardView />
          </TabsContent>
          <TabsContent value="finance" className="space-y-6">
            <FinanceDashboardView />
          </TabsContent>
          <TabsContent value="sales" className="space-y-6">
            <SalesMarketingDashboardView />
          </TabsContent>
          <TabsContent value="operations" className="space-y-6">
            <OperationsDashboardView />
          </TabsContent>
        </Tabs>
      </main>
    </>
  );
}
