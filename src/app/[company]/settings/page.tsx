
import { DashboardHeader } from "@/components/dashboard-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function SettingsPage() {
  return (
    <>
      <DashboardHeader 
        title="Settings" 
        description="Manage your account and organization settings." 
      />
      <main className="flex-1 p-4 sm:px-6 lg:px-8">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Organization Settings</CardTitle>
            <CardDescription>
              Settings for TechCorp Solutions.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>Settings form will go here.</p>
          </CardContent>
        </Card>
      </main>
    </>
  );
}
