import { RolesView } from "@/components/roles-view";
import { roles } from "@/lib/mock-data";
import { DashboardHeader } from "@/components/dashboard-header";


export default function RolesPage() {
  // In a real app, you would fetch this data from an API
  const initialRoles = roles;
  return (
     <>
      <DashboardHeader title="Role Management" description="Define roles and manage permissions for users in your company." />
      <main className="flex-1 p-4 sm:px-6 lg:px-8">
        <RolesView initialRoles={initialRoles} />
      </main>
    </>
  )
}
