import { UsersDataTable } from "@/components/users-data-table";
import { userList } from "@/lib/mock-data";

export default function UsersPage() {
  // In a real app, you would fetch this data from an API
  const users = userList;

  return <UsersDataTable initialUsers={users} />;
}
