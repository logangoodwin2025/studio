
"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { LogOut, ChevronDown, Bell, LayoutDashboard, Users, Shield, Settings, User, Component } from "lucide-react";

import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
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
import { useUserRole } from "@/hooks/use-user-role";

const allNavItems = {
    PLATFORM: [
        { href: "/admin/dashboard", icon: LayoutDashboard, label: "Platform Dashboard", roles: ["Platform Super Admin", "Platform Manager"] },
        { href: "/admin/tenants", icon: Component, label: "Tenants", roles: ["Platform Super Admin", "Platform Manager"] },
    ],
    COMPANY_ADMIN: [
        { href: "/admin/dashboard", icon: LayoutDashboard, label: "Admin Dashboard", roles: ["Company Admin"] },
        { href: "/users", icon: Users, label: "Users", roles: ["Company Admin"] },
        { href: "/roles", icon: Shield, label: "Roles", roles: ["Company Admin"] },
        { href: "/settings", icon: Settings, label: "Settings", roles: ["Company Admin"] },
    ]
};

function Header() {
  const searchParams = useSearchParams();
  const name = searchParams.get('name') || "Admin";
  const role = searchParams.get('role') || "Administrator";
  const avatarUrl = searchParams.get('avatar');

  return (
    <header className="fixed top-0 left-0 right-0 z-40 flex h-16 items-center justify-between border-b bg-background px-4 md:left-64">
        <div className="flex items-center gap-2">
            <h1 className="font-bold text-lg font-headline flex items-center gap-2">
              <User className="h-5 w-5 text-muted-foreground"/>
              <span>Platform Administration</span>
            </h1>
        </div>

        <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5"/>
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
          <h1 className="font-bold text-lg font-headline">PinnSight</h1>
        </div>
    )
}

function getVisibleNavItems(role: string | null) {
    if (!role) {
        return { PLATFORM: [], COMPANY_ADMIN: [] };
    }

    const filterItems = (items: typeof allNavItems.PLATFORM) => 
        items.filter(item => item.roles.includes(role));

    return {
        PLATFORM: filterItems(allNavItems.PLATFORM),
        COMPANY_ADMIN: filterItems(allNavItems.COMPANY_ADMIN)
    }
}


export function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { role } = useUserRole();
  const searchParams = useSearchParams();
  const navItems = getVisibleNavItems(role);

  const createHref = (href: string) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    // For company admin, we need to preserve the company slug in the URLs
    if (role === 'Company Admin') {
        return `/techcorp-solutions${href}?${newSearchParams.toString()}`;
    }
    return `${href}?${newSearchParams.toString()}`;
  }


  return (
    <>
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
                        isActive={pathname.includes(item.href)}
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
    </>
  );
}
