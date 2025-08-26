import { useQuery } from '@tanstack/react-query'
import { DashboardApi } from './api'

export const dashboardKeys = {
  all: ['dashboard'] as const,
  stats: () => [...dashboardKeys.all, 'stats'] as const,
  topProducts: () => [...dashboardKeys.all, 'top-products'] as const,
  recentUsers: () => [...dashboardKeys.all, 'recent-users'] as const,
  recentOrders: () => [...dashboardKeys.all, 'recent-orders'] as const,
}

export function useDashboardStats() {
  return useQuery({ queryKey: dashboardKeys.stats(), queryFn: DashboardApi.getStats })
}

export function useTopProducts() {
  return useQuery({ queryKey: dashboardKeys.topProducts(), queryFn: DashboardApi.getTopProducts })
}

export function useRecentUsers() {
  return useQuery({ queryKey: dashboardKeys.recentUsers(), queryFn: DashboardApi.getRecentUsers })
}

export function useRecentOrders() {
  return useQuery({ queryKey: dashboardKeys.recentOrders(), queryFn: DashboardApi.getRecentOrders })
}


