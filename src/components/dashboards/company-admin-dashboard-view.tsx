
import { DashboardHeader } from "@/components/dashboard-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { UsersDataTable } from "../users-data-table";
import { userList } from "@/lib/mock-data";


export function CompanyAdminDashboardView() {
  return (
    <>
      <DashboardHeader 
        title="Company Admin Dashboard" 
        description="Manage your company's users, settings, and subscription."
      >
        <div className="flex items-center gap-2">
          <Button>
            <PlusCircle className="h-4 w-4 mr-2" />
            Add User
          </Button>
          <Button variant="outline">
            Upgrade Plan
          </Button>
        </div>
      </DashboardHeader>
      <main className="flex-1 p-4 sm:px-6 lg:px-8 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
                <UsersDataTable initialUsers={userList} />
            </div>
            <div className="space-y-6">
                 <Card>
                    <CardHeader>
                        <CardTitle className="font-headline">Subscription Status</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>Plan: <span className="font-semibold text-primary">Enterprise</span></p>
                        <p className="text-sm text-muted-foreground">Next billing date: August 1, 2025</p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle className="font-headline">Customization Hub</CardTitle>
                        <CardDescription>Manage your company's branding.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Button variant="outline" className="w-full">Upload Logo</Button>
                        <Button variant="outline" className="w-full">Select Color Palette</Button>
                    </CardContent>
                </Card>
            </div>
        </div>
        
      </main>
    </>
  );
}
