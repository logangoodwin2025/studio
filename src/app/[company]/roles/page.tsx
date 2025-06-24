import { RolesView } from "@/components/roles-view";
import { roles } from "@/lib/mock-data";

export default function RolesPage() {
  // In a real app, you would fetch this data from an API
  const initialRoles = roles;
  return <RolesView initialRoles={initialRoles} />;
}
