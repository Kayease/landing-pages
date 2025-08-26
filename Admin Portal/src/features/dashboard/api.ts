import dashboardStatsJson from '@/data/mock/dashboardStats.json'
import topProductsJson from '@/data/mock/topProducts.json'
import recentUsersJson from '@/data/mock/recentUsers.json'
import recentOrdersJson from '@/data/mock/recentOrders.json'

export interface DashboardStat {
  title: string;
  value: string;
  change: string;
  changeType: 'increase' | 'decrease' | 'neutral';
  description?: string;
}

export interface TopProduct {
  id: string | number;
  name: string;
  sales: number;
  revenue: string;
  change: string;
}

export interface RecentUser {
  id: string | number;
  name: string;
  email: string;
  role: string;
  status: string;
  avatar?: string;
}

export interface RecentOrder {
  id: string;
  customer: string;
  date: string;
  amount: string;
  status: string;
}

export const DashboardApi = {
  getStats: async () => Promise.resolve(dashboardStatsJson as unknown as DashboardStat[]),
  getTopProducts: async () => Promise.resolve(topProductsJson as unknown as TopProduct[]),
  getRecentUsers: async () => Promise.resolve(recentUsersJson as unknown as RecentUser[]),
  getRecentOrders: async () => Promise.resolve(recentOrdersJson as unknown as RecentOrder[]),
}


