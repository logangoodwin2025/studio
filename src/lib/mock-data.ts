

import { FileText, Users, Lightbulb, Activity } from "lucide-react";

export const userList = [
  // Srisys Inc. Users
  {
    id: "usr_1",
    name: "Alice Johnson",
    email: "admin@srisys.com",
    role: "Company Admin",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
  },
  {
    id: "usr_2",
    name: "Robert Williams",
    email: "finance@srisys.com",
    role: "Finance Team",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704e",
  },
  {
    id: "usr_3",
    name: "Charles Brown",
    email: "sales@srisys.com",
    role: "Sales & Marketing",
    avatar: "https://i.pravatar.cc/150?u=a04258114e29026702d",
  },
  {
    id: "usr_4",
    name: "Diane Prince",
    email: "ops@srisys.com",
    role: "Operations Team",
    avatar: "https://i.pravatar.cc/150?u=a048581f4e29026701d",
  },
  {
    id: "usr_5",
    name: "Edward Hunt",
    email: "user@srisys.com",
    role: "Basic User",
    avatar: "https://i.pravatar.cc/150?u=a092581f4e29026703d",
  },
  {
    id: "usr_6",
    name: "Francis Castle",
    email: "ceo@srisys.com",
    role: "CEO/Executive",
    avatar: "https://i.pravatar.cc/150?u=ceo-srisys",
  },
  // Pigeon-Tech Users
  {
    id: "usr_11",
    name: "Peter Quill",
    email: "ceo@pigeon-tech.com",
    role: "CEO/Executive",
    avatar: "https://i.pravatar.cc/150?u=ceo-pigeon",
  },
  {
    id: "usr_12",
    name: "Gamora Titan",
    email: "admin@pigeon-tech.com",
    role: "Company Admin",
    avatar: "https://i.pravatar.cc/150?u=admin-pigeon",
  },
  {
    id: "usr_13",
    name: "Drax Destroyer",
    email: "ops@pigeon-tech.com",
    role: "Operations Team",
    avatar: "https://i.pravatar.cc/150?u=ops-pigeon",
  },
  {
    id: "usr_14",
    name: "Rocket Raccoon",
    email: "finance@pigeon-tech.com",
    role: "Finance Team",
    avatar: "https://i.pravatar.cc/150?u=finance-pigeon",
  },
  {
    id: "usr_15",
    name: "Groot Flora",
    email: "sales@pigeon-tech.com",
    role: "Sales & Marketing",
    avatar: "https://i.pravatar.cc/150?u=sales-pigeon",
  },
   {
    id: "usr_16",
    name: "Mantis empath",
    email: "user@pigeon-tech.com",
    role: "Basic User",
    avatar: "https://i.pravatar.cc/150?u=user-pigeon",
  },
  // Platform-level Users
  {
    id: "usr_7",
    name: "Grace Lee",
    email: "super@pinnsight.com",
    role: "Platform Super Admin",
    avatar: "https://i.pravatar.cc/150?u=super",
  },
  {
    id: "usr_8",
    name: "Helen Turner",
    email: "manager@pinnsight.com",
    role: "Platform Manager",
    avatar: "https://i.pravatar.cc/150?u=manager",
  },
];

export const allPermissions = [
  "Manages tenant accounts",
  "Manages platform settings",
  "Manages organization settings and users",
  "Access to all dashboards and reports",
  "Access to financial metrics",
  "Access to sales/marketing data",
  "Access to operational data",
  "Limited view-only access",
];

export const roles: Record<string, string[]> = {
  "Platform Super Admin": ["Manages tenant accounts", "Manages platform settings"],
  "Platform Manager": ["Manages tenant accounts"],
  "Company Admin": ["Manages organization settings and users"],
  "CEO/Executive": ["Access to all dashboards and reports"],
  "Finance Team": ["Access to financial metrics"],
  "Sales & Marketing": ["Access to sales/marketing data"],
  "Operations Team": ["Access to operational data"],
  "Basic User": ["Limited view-only access"],
};

export type Tenant = {
  id: string;
  name: string;
  plan: string;
  users: number;
  lastActive: string;
  status: string;
};

export const tenants: Tenant[] = [
    { id: "ten_srisys", name: "Srisys Inc.", plan: "Enterprise", users: 25, lastActive: "2 hours ago", status: "Active" },
    { id: "ten_pigeon", name: "Pigeon-Tech", plan: "Enterprise", users: 6, lastActive: "5 minutes ago", status: "Active" },
    { id: "ten_2", name: "Innovate Inc.", plan: "Paid", users: 10, lastActive: "1 day ago", status: "Active" },
    { id: "ten_3", name: "Synergy Labs", plan: "Trial", users: 5, lastActive: "3 days ago", status: "Provisioning" },
    { id: "ten_4", name: "QuantumLeap", plan: "Paid", users: 15, lastActive: "5 hours ago", status: "Active" },
    { id: "ten_5", name: "DataWeavers", plan: "Free", users: 2, lastActive: "1 week ago", status: "Suspended" },
];

export type SupportTicket = {
    id: string;
    subject: string;
    tenant: string;
    user: string;
    priority: "Low" | "Medium" | "High";
    status: "Open" | "In Progress" | "Resolved" | "Closed";
    created: Date;
    lastUpdated: Date;
};

export const supportTickets: SupportTicket[] = [
    { id: "T-1234", subject: "Integration with Salesforce failing", tenant: "Innovate Inc.", user: "finance@innovate.com", priority: "High", status: "Open", created: new Date("2025-07-25T10:00:00Z"), lastUpdated: new Date("2025-07-25T14:30:00Z") },
    { id: "T-1235", subject: "How to add a new user?", tenant: "QuantumLeap", user: "admin@quantum.com", priority: "Low", status: "Closed", created: new Date("2025-07-24T11:00:00Z"), lastUpdated: new Date("2025-07-24T11:30:00Z") },
    { id: "T-1236", subject: "API rate limit exceeded", tenant: "DataWeavers", user: "dev@dataweavers.com", priority: "Medium", status: "In Progress", created: new Date("2025-07-25T09:00:00Z"), lastUpdated: new Date("2025-07-25T16:00:00Z") },
    { id: "T-1237", subject: "Cannot access reports", tenant: "Srisys Inc.", user: "ceo@srisys.com", priority: "High", status: "Open", created: new Date("2025-07-25T15:00:00Z"), lastUpdated: new Date("2025-07-25T15:05:00Z") },
    { id: "T-1238", subject: "Feature request: Dark mode", tenant: "Synergy Labs", user: "user@synergy.com", priority: "Low", status: "Resolved", created: new Date("2025-07-22T18:00:00Z"), lastUpdated: new Date("2025-07-23T10:00:00Z") },
    { id: "T-1239", subject: "Billing question", tenant: "Innovate Inc.", user: "finance@innovate.com", priority: "Medium", status: "Open", created: new Date("2025-07-26T08:00:00Z"), lastUpdated: new Date("2025-07-26T08:15:00Z") },
];

export type Report = {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  lastGenerated: Date;
};

export const availableReports = {
    financial: [
        { id: 'fin_01', title: 'Financial Summary', description: 'Revenue, Profit, EBITDA, and Margins.', icon: FileText, lastGenerated: new Date('2025-07-01T00:00:00Z') },
        { id: 'fin_02', title: 'Cash Flow Statement', description: 'Detailed cash inflow and outflow.', icon: FileText, lastGenerated: new Date('2025-06-30T00:00:00Z') },
        { id: 'fin_03', title: 'AR/AP Aging Report', description: 'Breakdown of outstanding receivables and payables.', icon: FileText, lastGenerated: new Date('2025-07-20T00:00:00Z') },
        { id: 'fin_04', title: 'Profitability Analysis', description: 'Deep dive into profit margins and SGR.', icon: FileText, lastGenerated: new Date('2025-07-18T00:00:00Z') },
    ],
    membership: [
        { id: 'mem_01', title: 'Customer Metrics', description: 'CLV, CAC, and Retention analysis.', icon: Users, lastGenerated: new Date('2025-07-15T00:00:00Z') },
        { id: 'mem_02', title: 'Churn Analysis', description: 'Analysis of lost members and reasons.', icon: Users, lastGenerated: new Date('2025-07-10T00:00:00Z') },
        { id: 'mem_03', title: 'NPS & CSAT Trends', description: 'Customer satisfaction trends over time.', icon: Users, lastGenerated: new Date('2025-07-19T00:00:00Z') },
    ],
    sales: [
        { id: 'sal_01', title: 'Lead Generation', description: 'Tracking of new leads by source.', icon: Lightbulb, lastGenerated: new Date('2025-07-21T00:00:00Z') },
        { id: 'sal_02', title: 'Sales Pipeline', description: 'Value and stage distribution of deals.', icon: Lightbulb, lastGenerated: new Date('2025-07-22T00:00:00Z') },
        { id: 'sal_03', title: 'Campaign ROI', description: 'Return on investment for marketing campaigns.', icon: Lightbulb, lastGenerated: new Date('2025-07-23T00:00:00Z') },
    ],
    operations: [
        { id: 'ops_01', title: 'Project Health', description: 'On-time completion and budget adherence.', icon: Activity, lastGenerated: new Date('2025-07-24T00:00:00Z') },
        { id: 'ops_02', title: 'Resource Utilization', description: 'Team and employee billable hours.', icon: Activity, lastGenerated: new Date('2025-07-25T00:00:00Z') },
        { id: 'ops_03', title: 'Service Delivery', description: 'SLA compliance and average delivery times.', icon: Activity, lastGenerated: new Date('2025-07-26T00:00:00Z') },
    ]
}


export const monthlyRevenueData = [
  { month: "Jan", revenue: 4000 }, { month: "Feb", revenue: 3000 },
  { month: "Mar", revenue: 5000 }, { month: "Apr", revenue: 4500 },
  { month: "May", revenue: 6000 }, { month: "Jun", revenue: 5500 },
];

export const userAcquisitionData = [
  { name: "Organic", value: 400, fill: "var(--color-chart-1)" },
  { name: "Referral", value: 300, fill: "var(--color-chart-2)" },
  { name: "Paid", value: 200, fill: "var(--color-chart-3)" },
  { name: "Social", value: 278, fill: "var(--color-chart-4)" },
];

export const reportData = [
  { id: "TRX001", user: "Alice Johnson", amount: 250.00, date: "2023-10-01", status: "Paid" },
  { id: "TRX002", user: "Bob Williams", amount: 150.50, date: "2023-10-01", status: "Paid" },
  { id: "TRX003", user: "Charlie Brown", amount: 350.00, date: "2023-10-02", status: "Pending" },
  { id: "TRX004", user: "Diana Prince", amount: 75.00, date: "2023-10-03", status: "Paid" },
  { id: "TRX005", user: "Ethan Hunt", amount: 650.25, date: "2023-10-04", status: "Failed" },
  { id: "TRX006", user: "Alice Johnson", amount: 120.00, date: "2023-10-05", status: "Paid" },
  { id: "TRX007", user: "Bob Williams", amount: 200.00, date: "2023-10-06", status: "Paid" },
];
