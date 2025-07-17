import { DashboardHeader } from "@/components/dashboard-header";
import { Card, CardContent } from "@/components/ui/card";

export default function AlertsPage() {
  return (
    <>
      <DashboardHeader 
        title="Alerts" 
        description="Notifications and important updates" 
      />
      <main className="flex-1 p-4 sm:px-6 lg:px-8">
        <Card>
          <CardContent className="p-6">
            <div className="text-center text-muted-foreground">
              <p className="font-semibold">No new alerts</p>
              <p className="text-sm">Check back later for important notifications.</p>
            </div>
          </CardContent>
        </Card>
      </main>
    </>
  );
}
