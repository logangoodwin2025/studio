export const userList = [
  {
    id: "usr_1",
    name: "Alice Johnson",
    email: "alice.j@innovate.inc",
    role: "Administrator",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
  },
  {
    id: "usr_2",
    name: "Bob Williams",
    email: "bob.w@innovate.inc",
    role: "Manager",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
  },
  {
    id: "usr_3",
    name: "Charlie Brown",
    email: "charlie.b@innovate.inc",
    role: "Viewer",
    avatar: "https://i.pravatar.cc/150?u=a04258114e29026702d",
  },
  {
    id: "usr_4",
    name: "Diana Prince",
    email: "diana.p@innovate.inc",
    role: "Manager",
    avatar: "https://i.pravatar.cc/150?u=a048581f4e29026701d",
  },
  {
    id: "usr_5",
    name: "Ethan Hunt",
    email: "ethan.h@innovate.inc",
    role: "Viewer",
    avatar: "https://i.pravatar.cc/150?u=a092581f4e29026703d",
  },
];

export const roles = {
  Administrator: [
    "View Dashboard", "Manage Users", "Manage Roles", "Generate Reports", "Full Access",
  ],
  Manager: [
    "View Dashboard", "Manage Users", "Generate Reports",
  ],
  Viewer: [
    "View Dashboard", "Generate Reports",
  ],
};

export const allPermissions = [
  "View Dashboard",
  "Manage Users",
  "Manage Roles",
  "Generate Reports",
  "Full Access",
  "View Financials",
  "Edit Settings",
  "Export Data",
];

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
