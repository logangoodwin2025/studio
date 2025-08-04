
"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useParams, useSearchParams } from "next/navigation";
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
  History,
  LayoutDashboard,
  BarChart3,
  Users2,
  Settings,
  Activity,
  Lightbulb,
} from "lucide-react";

import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
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
import { FinancialDataProvider } from "@/context/financial-data-context";
import { useUserRole } from "@/hooks/use-user-role";

const allNavItems = {
    GENERAL: [
      { href: "/dashboard", icon: LayoutDashboard, label: "CEO Dashboard", roles: ["CEO/Executive"] },
      { href: "/financial-dashboard", icon: DollarSign, label: "Financials", roles: ["Finance Team", "Company Admin"] },
      { href: "/sales-marketing-dashboard", icon: Lightbulb, label: "Sales & Marketing", roles: ["Sales & Marketing", "Company Admin"] },
      { href: "/operations-dashboard", icon: Activity, label: "Operations", roles: ["Operations Team", "Company Admin"] },
      { href: "/membership-dashboard", icon: Users2, label: "Membership", roles: ["Sales & Marketing", "Company Admin"] },
      { href: "/recent-activity", icon: History, label: "Recent Activity", roles: ["Platform Super Admin", "Company Admin", "CEO/Executive", "Finance Team", "Sales & Marketing", "Operations Team"] },
    ],
    MANAGEMENT: [
      { href: "/data-entry", icon: ClipboardPlus, label: "Data Entry", roles: ["Finance Team", "Company Admin"] },
      { href: "/reports", icon: FileBarChart2, label: "Reports", roles: ["Finance Team", "CEO/Executive", "Company Admin"] },
      { href: "/users", icon: Users, label: "Users", roles: ["Company Admin", "Platform Super Admin"] },
      { href: "/roles", icon: Shield, label: "Roles", roles: ["Company Admin", "Platform Super Admin"] },
      { href: "/settings", icon: Settings, label: "Settings", roles: ["Company Admin"] },
    ],
};


function Header() {
  const searchParams = useSearchParams();
  const name = searchParams.get('name') || "User";
  const role = searchParams.get('role') || "User";
  const avatarUrl = searchParams.get('avatar');

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
                  {avatarUrl && <AvatarImage src={decodeURIComponent(avatarUrl)} alt={name} />}
                  <AvatarFallback>{name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div className="hidden md:flex flex-col items-start">
                    <span className="font-semibold">{name}</span>
                    <span className="text-xs text-muted-foreground">{role}</span>
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

function getVisibleNavItems(role: string | null) {
    if (!role) {
        return { GENERAL: [], MANAGEMENT: [] };
    }

    const filterItems = (items: typeof allNavItems.GENERAL) => 
        items.filter(item => item.roles.includes(role));

    return {
        GENERAL: filterItems(allNavItems.GENERAL),
        MANAGEMENT: filterItems(allNavItems.MANAGEMENT)
    }
}


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const params = useParams();
  const { role } = useUserRole();
  const companySlug = params.company as string;
  const searchParams = useSearchParams();
  const navItems = getVisibleNavItems(role);

  const createHref = (href: string) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    return `/${companySlug}${href}?${newSearchParams.toString()}`;
  }


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
                  {items.length > 0 && <SidebarLabel>{label}</SidebarLabel>}
                  {items.map((item) => (
                    <SidebarMenuItem key={item.href}>
                      <Link href={createHref(item.href)}>
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
          <Header />
          <SidebarInset>
              {children}
          </SidebarInset>
        </div>
      </SidebarProvider>
    </FinancialDataProvider>
  );
}
