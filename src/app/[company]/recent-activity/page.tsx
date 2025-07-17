import { DashboardHeader } from "@/components/dashboard-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const activityLog = [
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

export default function RecentActivityPage() {
  return (
    <>
      <DashboardHeader 
        title="Recent Activity" 
        description="A log of recent actions and events within the dashboard." 
      />
      <main className="flex-1 p-4 sm:px-6 lg:px-8">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Activity Feed</CardTitle>
            <CardDescription>
              Here is what has happened recently in your organization.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {activityLog.map((item, index) => (
                <div key={index} className="flex items-start gap-4">
                  <Avatar>
                    <AvatarImage src={item.avatar} alt={item.user} />
                    <AvatarFallback>
                      {item.user.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-sm">
                    <p>
                      <span className="font-semibold">{item.user}</span> {item.action}
                    </p>
                    <p className="text-xs text-muted-foreground">{item.timestamp}</p>
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
