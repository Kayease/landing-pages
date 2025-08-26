import type { PaginatedResponse } from '@/lib/apiClient'
import recentUsersJson from '@/data/mock/recentUsers.json'

export interface UserRecord {
  id: string
  name: string
  email: string
  role: 'admin' | 'manager' | 'viewer'
  status: 'active' | 'inactive'
}

export interface ListUsersParams {
  page?: number
  pageSize?: number
  search?: string
}

export const UsersApi = {
  list: async (params: ListUsersParams = {}) => {
    const page = params.page ?? 1
    const pageSize = params.pageSize ?? 10
    const search = (params.search ?? '').toLowerCase()
    const base = (recentUsersJson as any[]).map(u => ({ id: String(u.id), name: u.name, email: u.email, role: u.role, status: u.status }))
    const filtered = base.filter(u => (u.name + u.email).toLowerCase().includes(search))
    const start = (page - 1) * pageSize
    const items = filtered.slice(start, start + pageSize) as UserRecord[]
    return { items, total: filtered.length, page, pageSize } as PaginatedResponse<UserRecord>
  },
  create: async (user: Omit<UserRecord, 'id'>) => ({ id: String(Math.floor(Math.random()*100000)), ...user } as UserRecord),
  update: async (id: string, user: Partial<Omit<UserRecord, 'id'>>) => ({ id, ...(user as any) } as UserRecord),
  remove: async (_id: string) => undefined,
}


