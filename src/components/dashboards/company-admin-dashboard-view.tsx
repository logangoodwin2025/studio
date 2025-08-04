
import { DashboardHeader } from "@/components/dashboard-header";
import { UsersDataTable } from "../users-data-table";
import { userList } from "@/lib/mock-data";
import { CompanyAdminSettings } from "../company-admin-settings";


export function CompanyAdminDashboardView() {
  return (
    <>
      <DashboardHeader 
        title="Company Admin Dashboard" 
        description="Manage your company's users, settings, and subscription."
      />
      <main className="flex-1 p-4 sm:px-6 lg:px-8 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
                <UsersDataTable initialUsers={userList} />
            </div>
            <div className="space-y-6">
                 <CompanyAdminSettings />
            </div>
        </div>
        
      </main>
    </>
  );
}
