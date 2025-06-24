import type { ReactNode } from "react";

interface DashboardHeaderProps {
  title: string;
  children?: ReactNode;
}

export function DashboardHeader({ title, children }: DashboardHeaderProps) {
  return (
    <div className="flex items-center justify-between px-4 py-6 sm:px-6 lg:px-8">
      <h1 className="font-headline text-2xl font-semibold text-foreground md:text-3xl">
        {title}
      </h1>
      {children && <div className="flex items-center space-x-2">{children}</div>}
    </div>
  );
}
