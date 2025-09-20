
import { redirect } from "next/navigation";
import { userList } from "@/lib/mock-data";

// This page is deprecated and functionality has been moved to the
// Company Admin dashboard. We redirect to the dashboard to avoid a broken link.
export default function UsersPage() {
    redirect('/admin/dashboard');
}
