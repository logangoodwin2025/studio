
"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useParams } from "next/navigation";
import {
  DollarSign,
  ClipboardPlus,
  FileBarChart2,
  LogOut,
  ChevronDown,
  Users,
  Shield,
  Bell,
  Building,
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
import { Logo } from "@/components/icons";
import { Badge } from "@/components/ui/badge";
import { SheetTitle } from "@/components/ui/sheet";
import { FinancialDataProvider } from "@/context/financial-data-context";

const navItems = {
  DASHBOARDS: [
    { href: "/financial-dashboard", icon: DollarSign, label: "Financial Dashboard" },
  ],
  "DATA & REPORTS": [
      { href: "/data-entry", icon: ClipboardPlus, label: "Data Entry" },
      { href: "/reports", icon: FileBarChart2, label: "Reports" },
      { href: "/alerts", icon: Bell, label: "Alerts" },
  ],
};

function Header({ companySlug }: { companySlug: string }) {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 flex h-16 items-center justify-between border-b bg-background px-4 md:left-64">
        <div className="flex items-center gap-2">
            <h1 className="font-bold text-lg font-headline flex items-center gap-2">
              <Building className="h-5 w-5 text-muted-foreground"/>
              <span>TechCorp Solutions</span>
            </h1>
        </div>

        <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5"/>
                <span className="absolute top-1 right-1 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500 justify-center text-white text-[10px] items-center">3</span>
                </span>
            </Button>
            <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 text-sm font-medium">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="Emily Rodriguez" />
                  <AvatarFallback>ER</AvatarFallback>
                </Avatar>
                <div className="hidden md:flex flex-col items-start">
                    <span className="font-semibold">Emily Rodriguez</span>
                    <span className="text-xs text-muted-foreground">Finance Team</span>
                </div>
                <ChevronDown className="h-4 w-4 hidden md:block" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 mt-2" align="end">
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
        </div>
    </header>
  )
}

function SidebarHeaderContent() {
    return (
        <div className="flex items-center gap-2">
          <Logo className="h-6 w-6 text-primary" />
          <h1 className="font-bold text-lg font-headline">CEO Dashboard</h1>
        </div>
    )
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
    <FinancialDataProvider>
      <SidebarProvider>
        <Sidebar>
          <SidebarHeader>
            <SidebarHeaderContent />
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
        </Sidebar>
        <div className="flex flex-1 flex-col md:ml-64">
          <Header companySlug={companySlug} />
          <SidebarInset>
              {children}
          </SidebarInset>
        </div>
      </SidebarProvider>
    </FinancialDataProvider>
  );
}
