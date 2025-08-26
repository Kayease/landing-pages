import { http, HttpResponse } from 'msw'

import dashboardStatsJson from '@/data/mock/dashboardStats.json'
import topProductsJson from '@/data/mock/topProducts.json'
import recentUsersJson from '@/data/mock/recentUsers.json'
import recentOrdersJson from '@/data/mock/recentOrders.json'
import productsJson from '@/data/mock/products.json'
import ordersJson from '@/data/mock/orders.json'

// Match requests regardless of origin; MSW supports wildcard patterns
const API = (path: string) => `*${path}`

export const handlers = [
  // Health
  http.get(API('/health'), () => HttpResponse.json({ status: 'ok' })),

  // Dashboard
  http.get(API('/dashboard/stats'), () => HttpResponse.json(dashboardStatsJson as any)),
  http.get(API('/dashboard/top-products'), () => HttpResponse.json(topProductsJson as any)),
  http.get(API('/dashboard/recent-users'), () => HttpResponse.json(recentUsersJson as any)),
  http.get(API('/dashboard/recent-orders'), () => HttpResponse.json(recentOrdersJson as any)),
  // Users CRUD (in-memory)
  http.get(API('/users'), ({ request }) => {
    const url = new URL(request.url)
    const page = Number(url.searchParams.get('page') ?? 1)
    const pageSize = Number(url.searchParams.get('pageSize') ?? 10)
    const search = String(url.searchParams.get('search') ?? '')
    const base = (recentUsersJson as any[]).map(u => ({ id: String(u.id), name: u.name, email: u.email, role: u.role as any, status: u.status as any }))
    const filtered = base.filter(u => (u.name + u.email).toLowerCase().includes(search.toLowerCase()))
    const start = (page - 1) * pageSize
    const items = filtered.slice(start, start + pageSize)
    return HttpResponse.json({ items, total: filtered.length, page, pageSize })
  }),
  http.post(API('/users'), async ({ request }) => {
    const body = await request.json() as any
    const id = String(Math.floor(Math.random() * 100000))
    return HttpResponse.json({ id, ...body })
  }),
  http.put(API('/users/:id'), async ({ request, params }) => {
    const body = await request.json()
    return HttpResponse.json({ id: params.id, ...body })
  }),
  http.delete(API('/users/:id'), () => new HttpResponse(null, { status: 204 })),

  // Products endpoints
  http.get(API('/products'), ({ request }) => {
    const url = new URL(request.url)
    const page = Number(url.searchParams.get('page') ?? 1)
    const pageSize = Number(url.searchParams.get('pageSize') ?? 10)
    const search = String(url.searchParams.get('search') ?? '')
    const filtered = (productsJson as any[]).filter(p => (p.name + p.sku + p.category).toLowerCase().includes(search.toLowerCase()))
    const start = (page - 1) * pageSize
    const items = filtered.slice(start, start + pageSize)
    return HttpResponse.json({ items, total: filtered.length, page, pageSize })
  }),

  // Orders endpoints
  http.get(API('/orders'), ({ request }) => {
    const url = new URL(request.url)
    const page = Number(url.searchParams.get('page') ?? 1)
    const pageSize = Number(url.searchParams.get('pageSize') ?? 10)
    const status = url.searchParams.get('status')
    let filtered = ordersJson as any[]
    if (status) filtered = filtered.filter(o => String(o.status) === status)
    const start = (page - 1) * pageSize
    const items = filtered.slice(start, start + pageSize)
    return HttpResponse.json({ items, total: filtered.length, page, pageSize })
  }),
]


