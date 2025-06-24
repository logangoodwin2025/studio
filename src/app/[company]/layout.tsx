"use client";

import Link from "next/link";
import { usePathname, useParams } from "next/navigation";
import {
  LayoutGrid,
  Users,
  ShieldCheck,
  FileBarChart2,
  LogOut,
  MoreVertical,
  ChevronDown,
  Landmark,
  Megaphone,
  Wrench,
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
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Logo } from "@/components/icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const navItems = [
  { href: "/dashboard", icon: LayoutGrid, label: "CEO Dashboard" },
  { href: "/finance", icon: Landmark, label: "Finance" },
  { href: "/sales-marketing", icon: Megaphone, label: "Sales & Marketing" },
  { href: "/operations", icon: Wrench, label: "Operations" },
  { href: "/users", icon: Users, label: "Users" },
  { href: "/roles", icon: ShieldCheck, label: "Roles" },
  { href: "/reports", icon: FileBarChart2, label: "Reports" },
];

function CompanySwitcher({ companySlug }: { companySlug: string }) {
  const formattedCompany = companySlug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="w-full justify-between">
          <div className="flex items-center gap-2">
            <Logo className="h-5 w-5" />
            <span className="font-semibold">{formattedCompany}</span>
          </div>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start">
        <DropdownMenuLabel>Switch Company</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Innovate Inc.</DropdownMenuItem>
        <DropdownMenuItem>QuantumLeap Corp.</DropdownMenuItem>
        <DropdownMenuItem>Synergy Solutions</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
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
            {navItems.map((item) => (
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
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
           <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex w-full items-center justify-between rounded-md p-2 text-sm font-medium text-left hover:bg-sidebar-accent">
                <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="https://i.pravatar.cc/150?u=ceo" alt="CEO" />
                      <AvatarFallback>CEO</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                        <span className="font-semibold">The CEO</span>
                        <span className="text-xs text-muted-foreground">ceo@example.com</span>
                    </div>
                </div>
                <MoreVertical className="h-4 w-4" />
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
