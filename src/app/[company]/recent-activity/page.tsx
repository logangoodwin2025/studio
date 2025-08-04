
"use client";

import { useUserRole } from "@/hooks/use-user-role";
import { DashboardHeader } from "@/components/dashboard-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { CheckCircle, TrendingUp, AlertTriangle, Target, HandCoins } from "lucide-react";
import { Loading } from "@/components/loading";

const userActivityLog = [
  {
    user: "Emily Rodriguez",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    action: "updated the financial report for Q2 2025.",
    timestamp: "2 hours ago",
  },
  {
    user: "Bob Williams",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    action: "added new data for June 2025.",
    timestamp: "1 day ago",
  },
  {
    user: "Alice Johnson",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    action: "viewed the sales & marketing dashboard.",
    timestamp: "3 days ago",
  },
  {
    user: "System",
    avatar: "/placeholder.svg",
    action: "generated the monthly P&L statement.",
    timestamp: "5 days ago",
  },
  {
    user: "Charlie Brown",
    avatar: "https://i.pravatar.cc/150?u=a04258114e29026702d",
    action: "exported the customer metrics report.",
    timestamp: "1 week ago",
  },
];

const metricActivityLog = [
    {
      icon: TrendingUp,
      title: "Positive Revenue Trend",
      description: "Monthly revenue increased by 8% compared to the previous month, exceeding projections.",
      timestamp: "1 day ago",
      color: "text-green-500",
    },
    {
      icon: Target,
      title: "New Market Segment Entry",
      description: "Successfully launched the new product line targeting the SMB market segment.",
      timestamp: "3 days ago",
      color: "text-primary",
    },
    {
      icon: CheckCircle,
      title: "Q2 Financials Closed",
      description: "The quarterly financial reports have been finalized and are available for review.",
      timestamp: "5 days ago",
      color: "text-green-500",
    },
     {
      icon: AlertTriangle,
      title: "Churn Rate Spike",
      description: "Customer churn rate increased by 1.2% this week, investigation is underway.",
      timestamp: "6 days ago",
      color: "text-orange-500",
    },
    {
      icon: HandCoins,
      title: "Cost-Saving Initiative Success",
      description: "Operational cost-saving measures have reduced overhead by 6% in the last quarter.",
      timestamp: "1 week ago",
      color: "text-primary",
    },
];


function RecentActivityPageContent() {
  const { role, isLoaded } = useUserRole();

  if (!isLoaded) {
    return <Loading />;
  }

  const isCeo = role === "CEO/Executive";
  const activityLog = isCeo ? metricActivityLog : userActivityLog;
  const title = isCeo ? "Business Activity" : "User Activity";
  const description = isCeo 
    ? "A feed of key business events, milestones, and metric changes."
    : "A log of recent user actions and events within the dashboard.";

  return (
    <>
      <DashboardHeader 
        title={title} 
        description={description}
      />
      <main className="flex-1 p-4 sm:px-6 lg:px-8">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Activity Feed</CardTitle>
            <CardDescription>
                {isCeo ? "Here are the most important recent events in your organization." : "Here is what has happened recently in your organization."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {activityLog.map((item, index) => (
                <div key={index} className="flex items-start gap-4">
                  {isCeo ? (
                     <div className="p-2 bg-primary/10 rounded-full">
                        <item.icon className={`h-6 w-6 ${item.color}`} />
                     </div>
                  ) : (
                    <Avatar>
                        <AvatarImage src={item.avatar} alt={item.user} />
                        <AvatarFallback>
                        {item.user.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                    </Avatar>
                  )}
                  
                  <div className="text-sm flex-1">
                    {isCeo ? (
                        <>
                            <p className="font-semibold">{item.title}</p>
                            <p>{item.description}</p>
                        </>
                    ) : (
                        <p>
                            <span className="font-semibold">{item.user}</span> {item.action}
                        </p>
                    )}
                    <p className="text-xs text-muted-foreground mt-1">{item.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </>
  );
}

export default function RecentActivityPage() {
    return <RecentActivityPageContent />
}
