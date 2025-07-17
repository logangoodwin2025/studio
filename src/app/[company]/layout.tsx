"use client";

import Link from "next/link";
import { usePathname, useParams } from "next/navigation";
import {
  Bell,
  DollarSign,
  ClipboardPlus,
  FileBarChart2,
  LogOut,
  MoreVertical,
  ChevronDown,
} from "lucide-react";

import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarProvider,
  SidebarInset,
  SidebarLabel,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const navItems = {
  OVERVIEW: [
    { href: "/alerts", icon: Bell, label: "Alerts" },
  ],
  DASHBOARDS: [
    { href: "/financial-dashboard", icon: DollarSign, label: "Financial Dashboard" },
  ],
  "DATA & REPORTS": [
      { href: "/data-entry", icon: ClipboardPlus, label: "Data Entry" },
      { href: "/reports", icon: FileBarChart2, label: "Reports" },
  ],
};


function CompanySwitcher({ companySlug }: { companySlug: string }) {
  return (
    <div className="flex items-center gap-2">
      <h1 className="font-bold text-lg font-headline">BusinessHub</h1>
      <Button variant="outline" size="sm" className="ml-auto text-xs">
        TechCorp Solutions
        <ChevronDown className="h-4 w-4 ml-2" />
      </Button>
    </div>
  );
}


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const params = useParams();
  const companySlug = params.company as string;

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <CompanySwitcher companySlug={companySlug} />
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {Object.entries(navItems).map(([label, items]) => (
              <React.Fragment key={label}>
                <SidebarLabel>{label}</SidebarLabel>
                {items.map((item) => (
                  <SidebarMenuItem key={item.href}>
                    <Link href={`/${companySlug}${item.href}`}>
                      <SidebarMenuButton
                        isActive={pathname.endsWith(item.href)}
                        className="w-full"
                      >
                        <item.icon className="h-4 w-4" />
                        <span>{item.label}</span>
                      </SidebarMenuButton>
                    </Link>
                  </SidebarMenuItem>
                ))}
              </React.Fragment>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
           <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex w-full items-center justify-between rounded-md p-2 text-sm font-medium text-left hover:bg-secondary">
                <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="Emily Rodriguez" />
                      <AvatarFallback>ER</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col items-start">
                        <span className="font-semibold">Emily Rodriguez</span>
                    </div>
                </div>
                <ChevronDown className="h-4 w-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 mb-2" align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <Link href="/login">
                  <DropdownMenuItem className="text-destructive">
                      <LogOut className="mr-2 h-4 w-4"/>
                      Log out
                  </DropdownMenuItem>
                </Link>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <div className="flex h-full flex-col">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
