import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, TrendingDown, Users, DollarSign, ShoppingCart, Eye } from "lucide-react";
import { ChartCard } from "@/components/charts/ChartCard";
import { BarChart } from "@/components/charts/BarChart";
import { LineChart } from "@/components/charts/LineChart";
import { DonutChart } from "@/components/charts/DonutChart";

const Analytics = () => {
  const analyticsData = [
    { title: "Page Views", value: "2,429,352", change: "+12.5%", changeType: "positive", icon: Eye },
    { title: "Unique Visitors", value: "284,532", change: "+8.2%", changeType: "positive", icon: Users },
    { title: "Conversion Rate", value: "3.24%", change: "-0.5%", changeType: "negative", icon: TrendingUp },
    { title: "Revenue", value: "$54,239", change: "+12.5%", changeType: "positive", icon: DollarSign },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
          <p className="text-muted-foreground">Deep insights into your business performance</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {analyticsData.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="hover-lift">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="flex items-center text-xs text-muted-foreground">
                  {stat.changeType === "positive" ? (
                    <TrendingUp className="mr-1 h-3 w-3 text-success" />
                  ) : (
                    <TrendingDown className="mr-1 h-3 w-3 text-destructive" />
                  )}
                  <span className={stat.changeType === "positive" ? "text-success" : "text-destructive"}>
                    {stat.change}
                  </span>
                  <span className="ml-1">from last month</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Tabs defaultValue="traffic" className="space-y-4">
        <TabsList>
          <TabsTrigger value="traffic">Traffic</TabsTrigger>
          <TabsTrigger value="sales">Sales</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
        </TabsList>

        <TabsContent value="traffic" className="space-y-4">
          <ChartCard title="Website Traffic">
            <LineChart labels={["Mon","Tue","Wed","Thu","Fri","Sat","Sun"]} values={[1200,1400,1350,1600,1800,1500,1700]} />
          </ChartCard>
        </TabsContent>

        <TabsContent value="sales" className="space-y-4">
          <ChartCard title="Sales Performance">
            <BarChart labels={["Q1","Q2","Q3","Q4"]} values={[42000,56000,47000,62000]} />
          </ChartCard>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <ChartCard title="User Segments">
            <DonutChart labels={["New","Returning","Churn Risk"]} values={[55,35,10]} />
          </ChartCard>
        </TabsContent>

        <TabsContent value="products" className="space-y-4">
          <ChartCard title="Product Performance">
            <BarChart labels={["Headphones","Watch","Mouse","Monitor","Keyboard"]} values={[812,640,512,402,380]} />
          </ChartCard>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Analytics;