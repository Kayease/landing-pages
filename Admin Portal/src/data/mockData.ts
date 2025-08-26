// Mock data for the admin dashboard

export const dashboardStats = [
  {
    title: "Total Revenue",
    value: "$54,239",
    change: "12.5%",
    changeType: "positive" as const,
    description: "From last month"
  },
  {
    title: "Active Users", 
    value: "8,429",
    change: "8.2%",
    changeType: "positive" as const,
    description: "Currently online"
  },
  {
    title: "Orders",
    value: "1,234",
    change: "3.1%", 
    changeType: "negative" as const,
    description: "This month"
  },
  {
    title: "Conversion Rate",
    value: "3.24%",
    change: "0.5%",
    changeType: "positive" as const,
    description: "From last week"
  }
];

export const revenueData = [
  { month: "Jan", revenue: 4200, orders: 120 },
  { month: "Feb", revenue: 3800, orders: 110 },
  { month: "Mar", revenue: 5200, orders: 145 },
  { month: "Apr", revenue: 4800, orders: 135 },
  { month: "May", revenue: 6200, orders: 165 },
  { month: "Jun", revenue: 5800, orders: 155 },
  { month: "Jul", revenue: 7200, orders: 185 },
  { month: "Aug", revenue: 6800, orders: 175 },
  { month: "Sep", revenue: 8200, orders: 205 },
  { month: "Oct", revenue: 7800, orders: 195 },
  { month: "Nov", revenue: 9200, orders: 225 },
  { month: "Dec", revenue: 8800, orders: 215 }
];

export const topProducts = [
  {
    id: 1,
    name: "Premium Headphones",
    sales: 1234,
    revenue: "$24,680",
    change: "+12%"
  },
  {
    id: 2,
    name: "Smart Watch Pro",
    sales: 987,
    revenue: "$19,740",
    change: "+8%"
  },
  {
    id: 3,
    name: "Wireless Earbuds",
    sales: 756,
    revenue: "$15,120",
    change: "-3%"
  },
  {
    id: 4,
    name: "Gaming Mouse",
    sales: 654,
    revenue: "$13,080",
    change: "+5%"
  }
];

export const recentUsers = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice@example.com",
    avatar: "/placeholder-avatar.jpg",
    role: "Premium",
    status: "Active",
    joinDate: "2024-01-15"
  },
  {
    id: 2,
    name: "Bob Smith",
    email: "bob@example.com", 
    avatar: "/placeholder-avatar.jpg",
    role: "Standard",
    status: "Active",
    joinDate: "2024-01-14"
  },
  {
    id: 3,
    name: "Carol White",
    email: "carol@example.com",
    avatar: "/placeholder-avatar.jpg",
    role: "Premium",
    status: "Inactive",
    joinDate: "2024-01-13"
  },
  {
    id: 4,
    name: "David Brown",
    email: "david@example.com",
    avatar: "/placeholder-avatar.jpg",
    role: "Standard", 
    status: "Active",
    joinDate: "2024-01-12"
  }
];

export const allUsers = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice@example.com",
    avatar: "/placeholder-avatar.jpg",
    role: "Admin",
    status: "Active",
    joinDate: "2024-01-15",
    lastLogin: "2024-01-20 14:30",
    orders: 23,
    spent: "$1,234"
  },
  {
    id: 2,
    name: "Bob Smith", 
    email: "bob@example.com",
    avatar: "/placeholder-avatar.jpg",
    role: "User",
    status: "Active",
    joinDate: "2024-01-14",
    lastLogin: "2024-01-20 12:15",
    orders: 15,
    spent: "$892"
  },
  {
    id: 3,
    name: "Carol White",
    email: "carol@example.com",
    avatar: "/placeholder-avatar.jpg", 
    role: "User",
    status: "Inactive",
    joinDate: "2024-01-13",
    lastLogin: "2024-01-18 09:22",
    orders: 8,
    spent: "$445"
  },
  {
    id: 4,
    name: "David Brown",
    email: "david@example.com",
    avatar: "/placeholder-avatar.jpg",
    role: "Moderator",
    status: "Active", 
    joinDate: "2024-01-12",
    lastLogin: "2024-01-20 16:45",
    orders: 31,
    spent: "$2,106"
  },
  {
    id: 5,
    name: "Eva Martinez",
    email: "eva@example.com",
    avatar: "/placeholder-avatar.jpg",
    role: "User",
    status: "Active",
    joinDate: "2024-01-11",
    lastLogin: "2024-01-20 11:30",
    orders: 12,
    spent: "$678"
  }
];

export const recentOrders = [
  {
    id: "ORD-001",
    customer: "Alice Johnson",
    product: "Premium Headphones",
    amount: "$199.99",
    status: "Delivered",
    date: "2024-01-20"
  },
  {
    id: "ORD-002", 
    customer: "Bob Smith",
    product: "Smart Watch Pro",
    amount: "$299.99",
    status: "Processing",
    date: "2024-01-20"
  },
  {
    id: "ORD-003",
    customer: "Carol White", 
    product: "Wireless Earbuds",
    amount: "$149.99",
    status: "Shipped",
    date: "2024-01-19"
  },
  {
    id: "ORD-004",
    customer: "David Brown",
    product: "Gaming Mouse",
    amount: "$79.99", 
    status: "Delivered",
    date: "2024-01-19"
  }
];