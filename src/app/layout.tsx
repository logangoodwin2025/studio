
"use client";

import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import { Toaster } from "@/components/ui/toaster"
import './globals.css';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import { FinancialDataProvider } from '@/context/financial-data-context';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AdminLayout } from '@/components/layouts/admin-layout';
import { DashboardLayout } from '@/components/layouts/dashboard-layout';

const fontBody = Inter({ 
  subsets: ['latin'],
  variable: '--font-body',
});

const fontHeadline = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-headline',
});

// Metadata can't be dynamic on a client component, but we can handle title changes elsewhere if needed.
// export const metadata: Metadata = {
//   title: 'PinnSight',
//   description: 'A dashboard for CEOs to manage their business.',
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith('/admin');

  return (
    <html lang="en" suppressHydrationWarning>
      <body 
        className={cn(
          "min-h-screen bg-background font-body antialiased",
          fontBody.variable,
          fontHeadline.variable
        )}
      >
        <FinancialDataProvider>
           <SidebarProvider>
            {isAdminRoute ? (
              <AdminLayout>
                {children}
              </AdminLayout>
            ) : (
              <DashboardLayout>
                {children}
              </DashboardLayout>
            )}
           </SidebarProvider>
        </FinancialDataProvider>
        <Toaster />
      </body>
    </html>
  );
}
