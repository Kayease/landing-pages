import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BarChart3, TrendingUp, TrendingDown, DollarSign, Users, ShoppingCart, Download, Calendar } from "lucide-react";

const Reports = () => {
  const salesData = [
    { period: "This Week", revenue: "$12,450", orders: 124, growth: "+8.2%" },
    { period: "This Month", revenue: "$54,239", orders: 542, growth: "+12.5%" },
    { period: "This Quarter", revenue: "$162,717", orders: 1627, growth: "+15.3%" },
    { period: "This Year", revenue: "$650,868", orders: 6509, growth: "+22.1%" }
  ];

  const topPerformers = [
    { name: "Premium Headphones", sales: 1234, revenue: "$24,680", margin: "35%" },
    { name: "Smart Watch Pro", sales: 987, revenue: "$19,740", margin: "28%" },
    { name: "Wireless Earbuds", sales: 756, revenue: "$15,120", margin: "42%" },
    { name: "Gaming Mouse", sales: 654, revenue: "$13,080", margin: "25%" },
    { name: "Bluetooth Speaker", sales: 543, revenue: "$10,860", margin: "38%" }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
          <p className="text-muted-foreground">Comprehensive business intelligence and analytics</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            Date Range
          </Button>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$650,868</div>
            <div className="flex items-center text-xs text-success">
              <TrendingUp className="mr-1 h-3 w-3" />
              +22.1% from last year
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">6,509</div>
            <div className="flex items-center text-xs text-success">
              <TrendingUp className="mr-1 h-3 w-3" />
              +18.5% from last year
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8,429</div>
            <div className="flex items-center text-xs text-success">
              <TrendingUp className="mr-1 h-3 w-3" />
              +12.8% from last year
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Order Value</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$100.03</div>
            <div className="flex items-center text-xs text-success">
              <TrendingUp className="mr-1 h-3 w-3" />
              +3.2% from last year
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="sales" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="sales">Sales</TabsTrigger>
          <TabsTrigger value="customers">Customers</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="financial">Financial</TabsTrigger>
        </TabsList>

        <TabsContent value="sales" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Sales Performance</CardTitle>
                <CardDescription>Revenue and order trends across different periods</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {salesData.map((data, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <div className="font-medium">{data.period}</div>
                        <div className="text-sm text-muted-foreground">{data.orders} orders</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">{data.revenue}</div>
                        <Badge variant="secondary" className="text-success">
                          {data.growth}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Sales Chart</CardTitle>
                <CardDescription>Visual representation of sales trends</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center border-2 border-dashed border-muted rounded-lg">
                  <p className="text-muted-foreground">Sales Chart - Integration with charting library required</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="customers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Customer Analytics</CardTitle>
              <CardDescription>Customer behavior and demographics analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="p-4 border rounded-lg">
                  <div className="text-2xl font-bold">8,429</div>
                  <div className="text-sm text-muted-foreground">Total Customers</div>
                </div>
                <div className="p-4 border rounded-lg">
                  <div className="text-2xl font-bold">234</div>
                  <div className="text-sm text-muted-foreground">New This Month</div>
                </div>
                <div className="p-4 border rounded-lg">
                  <div className="text-2xl font-bold">92.3%</div>
                  <div className="text-sm text-muted-foreground">Retention Rate</div>
                </div>
              </div>
              <div className="h-[300px] mt-4 flex items-center justify-center border-2 border-dashed border-muted rounded-lg">
                <p className="text-muted-foreground">Customer Analytics Chart - Integration required</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="products" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Top Performing Products</CardTitle>
              <CardDescription>Products ranked by sales performance and profitability</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>Sales</TableHead>
                    <TableHead>Revenue</TableHead>
                    <TableHead>Margin</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {topPerformers.map((product, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{product.name}</TableCell>
                      <TableCell>{product.sales.toLocaleString()}</TableCell>
                      <TableCell className="font-semibold">{product.revenue}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">{product.margin}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="financial" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Financial Overview</CardTitle>
              <CardDescription>Comprehensive financial metrics and KPIs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <div className="p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-success">$650K</div>
                  <div className="text-sm text-muted-foreground">Gross Revenue</div>
                </div>
                <div className="p-4 border rounded-lg">
                  <div className="text-2xl font-bold">$195K</div>
                  <div className="text-sm text-muted-foreground">Total Costs</div>
                </div>
                <div className="p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-success">$455K</div>
                  <div className="text-sm text-muted-foreground">Net Profit</div>
                </div>
                <div className="p-4 border rounded-lg">
                  <div className="text-2xl font-bold">30%</div>
                  <div className="text-sm text-muted-foreground">Profit Margin</div>
                </div>
              </div>
              <div className="h-[300px] mt-4 flex items-center justify-center border-2 border-dashed border-muted rounded-lg">
                <p className="text-muted-foreground">Financial Chart - Integration with accounting system required</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Reports;