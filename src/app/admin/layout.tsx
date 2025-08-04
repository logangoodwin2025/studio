
"use client";

import { AdminLayout as AdminLayoutComponent } from "@/components/layouts/admin-layout";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminLayoutComponent>
        {children}
    </AdminLayoutComponent>
  );
}
