export const userList = [
  {
    id: "usr_1",
    name: "Alice Johnson",
    email: "alice.j@innovate.inc",
    role: "Company Admin",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
  },
  {
    id: "usr_2",
    name: "Bob Williams",
    email: "bob.w@innovate.inc",
    role: "Finance Team",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
  },
  {
    id: "usr_3",
    name: "Charlie Brown",
    email: "charlie.b@innovate.inc",
    role: "Sales & Marketing",
    avatar: "https://i.pravatar.cc/150?u=a04258114e29026702d",
  },
  {
    id: "usr_4",
    name: "Diana Prince",
    email: "diana.p@innovate.inc",
    role: "Operations Team",
    avatar: "https://i.pravatar.cc/150?u=a048581f4e29026701d",
  },
  {
    id: "usr_5",
    name: "Ethan Hunt",
    email: "ethan.h@innovate.inc",
    role: "Basic User",
    avatar: "https://i.pravatar.cc/150?u=a092581f4e29026703d",
  },
  {
    id: "usr_6",
    name: "Frank Castle",
    email: "frank.c@innovate.inc",
    role: "CEO/Executive",
    avatar: "https://i.pravatar.cc/150?u=ceo",
  },
  {
    id: "usr_7",
    name: "Grace Lee",
    email: "grace.l@innovate.inc",
    role: "Platform Super Admin",
    avatar: "https://i.pravatar.cc/150?u=super",
  },
];

export const allPermissions = [
  "Manages tenant accounts",
  "Manages organization settings and users",
  "Access to all dashboards and reports",
  "Access to financial metrics",
  "Access to sales/marketing data",
  "Access to operational data",
  "Limited view-only access",
];

export const roles: Record<string, string[]> = {
  "Platform Super Admin": ["Manages tenant accounts"],
  "Company Admin": ["Manages organization settings and users"],
  "CEO/Executive": ["Access to all dashboards and reports"],
  "Finance Team": ["Access to financial metrics"],
  "Sales & Marketing": ["Access to sales/marketing data"],
  "Operations Team": ["Access to operational data"],
  "Basic User": ["Limited view-only access"],
};

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
