import { 
  DollarSign, 
  Users, 
  ShoppingCart, 
  TrendingUp,
  Activity,
  BarChart3
} from "lucide-react";
import { StatsCard } from "@/components/StatsCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useDashboardStats, useTopProducts, useRecentUsers, useRecentOrders } from "@/features/dashboard/hooks";
import { ChartCard } from "@/components/charts/ChartCard";
import { BarChart } from "@/components/charts/BarChart";
import { LineChart } from "@/components/charts/LineChart";

export default function Dashboard() {
  const statsIcons = [DollarSign, Users, ShoppingCart, TrendingUp];

  const { data: stats, isLoading: statsLoading, isError: statsError } = useDashboardStats();
  const { data: products, isLoading: productsLoading, isError: productsError } = useTopProducts();
  const { data: users, isLoading: usersLoading, isError: usersError } = useRecentUsers();
  const { data: orders, isLoading: ordersLoading, isError: ordersError } = useRecentOrders();

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return <Badge className="bg-success/10 text-success border-success/20">Active</Badge>;
      case "inactive":
        return <Badge className="bg-muted text-muted-foreground">Inactive</Badge>;
      case "delivered":
        return <Badge className="bg-success/10 text-success border-success/20">Delivered</Badge>;
      case "processing":
        return <Badge className="bg-warning/10 text-warning border-warning/20">Processing</Badge>;
      case "shipped":
        return <Badge className="bg-info/10 text-info border-info/20">Shipped</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard Overview</h1>
          <p className="text-muted-foreground mt-1">Welcome back! Here's what's happening with your business today.</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
            <Activity className="w-3 h-3 mr-1" />
            {statsLoading || productsLoading || usersLoading || ordersLoading ? 'Loading' : 'Live Data'}
          </Badge>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {statsError && <p className="text-sm text-destructive">Failed to load stats.</p>}
        {(statsLoading ? Array.from({ length: 4 }) : stats ?? []).map((stat: any, index: number) => (
          <StatsCard
            key={stat?.title ?? index}
            title={stat?.title ?? '—'}
            value={stat?.value ?? '—'}
            change={stat?.change ?? '—'}
            changeType={stat?.changeType ?? 'neutral'}
            icon={statsIcons[index]}
            description={stat?.description}
          />
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid gap-6 lg:grid-cols-2">
        <ChartCard title="Revenue Overview">
          <BarChart labels={["Jan","Feb","Mar","Apr","May","Jun"]} values={[12,19,8,14,22,17]} />
        </ChartCard>
        <ChartCard title="Monthly Orders">
          <LineChart labels={["Jan","Feb","Mar","Apr","May","Jun"]} values={[120,140,130,160,150,180]} />
        </ChartCard>
      </div>

      {/* Data Tables Row */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Top Products */}
        <Card className="bg-gradient-to-br from-card to-card/50 border-border/60">
          <CardHeader>
            <CardTitle className="text-lg">Top Products</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {productsError && <p className="text-sm text-destructive">Failed to load top products.</p>}
            {(productsLoading ? Array.from({ length: 5 }) : products ?? []).map((product: any, i: number) => (
              <div key={product?.id ?? i} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                <div>
                  <p className="font-medium text-sm text-foreground">{product?.name ?? '—'}</p>
                  <p className="text-xs text-muted-foreground">{product?.sales ?? '—'} sales</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-sm text-foreground">{product?.revenue ?? '—'}</p>
                  <p className={`text-xs ${String(product?.change ?? '').startsWith('+') ? 'text-success' : 'text-destructive'}`}>
                    {product?.change ?? '—'}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Users */}
        <Card className="bg-gradient-to-br from-card to-card/50 border-border/60">
          <CardHeader>
            <CardTitle className="text-lg">Recent Users</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {usersError && <p className="text-sm text-destructive">Failed to load users.</p>}
            {(usersLoading ? Array.from({ length: 5 }) : users ?? []).map((user: any, i: number) => (
              <div key={user?.id ?? i} className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                <Avatar className="w-8 h-8">
                  {user?.avatar ? <AvatarImage src={user.avatar} alt={user?.name} /> : null}
                  <AvatarFallback className="bg-primary/10 text-primary text-xs">
                    {user?.name ? user.name.split(' ').map((n: string) => n[0]).join('') : '—'}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm text-foreground truncate">{user?.name ?? '—'}</p>
                  <p className="text-xs text-muted-foreground truncate">{user?.email ?? '—'}</p>
                </div>
                <div className="text-right">
                  {getStatusBadge(String(user?.status ?? '—'))}
                  <p className="text-xs text-muted-foreground mt-1">{user?.role ?? '—'}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Orders */}
        <Card className="bg-gradient-to-br from-card to-card/50 border-border/60">
          <CardHeader>
            <CardTitle className="text-lg">Recent Orders</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {ordersError && <p className="text-sm text-destructive">Failed to load orders.</p>}
            {(ordersLoading ? Array.from({ length: 5 }) : orders ?? []).map((order: any, i: number) => (
              <div key={order?.id ?? i} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm text-foreground">{order?.id ?? '—'}</p>
                  <p className="text-xs text-muted-foreground truncate">{order?.customer ?? '—'}</p>
                  <p className="text-xs text-muted-foreground">{order?.date ?? '—'}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-sm text-foreground">{order?.amount ?? '—'}</p>
                  {getStatusBadge(String(order?.status ?? '—'))}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}