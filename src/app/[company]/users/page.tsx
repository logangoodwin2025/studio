import { UsersDataTable } from "@/components/users-data-table";
import { userList } from "@/lib/mock-data";
import { DashboardHeader } from "@/components/dashboard-header";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

export default function UsersPage() {
  // In a real app, you would fetch this data from an API
  const users = userList;

  return (
    <>
      <DashboardHeader title="User Management">
        {/* The button inside UsersDataTable will handle its own logic */}
      </DashboardHeader>
      <main className="flex-1 p-4 sm:px-6 lg:px-8">
        <UsersDataTable initialUsers={users} showHeader={false} />
      </main>
    </>
  );
}
