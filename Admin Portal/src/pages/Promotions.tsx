import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Plus, Search, Filter, MoreHorizontal, Edit, Trash, Eye, Percent, Gift, Calendar } from "lucide-react";

const mockPromotions = [
  {
    id: 1,
    name: "Summer Sale 2024",
    type: "Percentage",
    value: "25%",
    code: "SUMMER25",
    status: "active",
    startDate: "2024-06-01",
    endDate: "2024-08-31",
    usageCount: 1247,
    usageLimit: 5000,
    description: "Summer collection discount"
  },
  {
    id: 2,
    name: "First Order Discount",
    type: "Fixed Amount",
    value: "$10",
    code: "WELCOME10",
    status: "active",
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    usageCount: 3456,
    usageLimit: null,
    description: "New customer welcome offer"
  },
  {
    id: 3,
    name: "Black Friday Deal",
    type: "Percentage",
    value: "50%",
    code: "BF50",
    status: "scheduled",
    startDate: "2024-11-29",
    endDate: "2024-11-30",
    usageCount: 0,
    usageLimit: 1000,
    description: "Black Friday mega sale"
  },
  {
    id: 4,
    name: "Free Shipping",
    type: "Free Shipping",
    value: "Free",
    code: "FREESHIP",
    status: "active",
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    usageCount: 2145,
    usageLimit: null,
    description: "Free shipping on all orders"
  },
  {
    id: 5,
    name: "Holiday Special",
    type: "Percentage",
    value: "15%",
    code: "HOLIDAY15",
    status: "expired",
    startDate: "2023-12-01",
    endDate: "2023-12-31",
    usageCount: 892,
    usageLimit: 2000,
    description: "Holiday season discount"
  }
];

const Promotions = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active": return "bg-success/10 text-success border-success/20";
      case "scheduled": return "bg-info/10 text-info border-info/20";
      case "expired": return "bg-muted/10 text-muted-foreground border-muted/20";
      case "paused": return "bg-warning/10 text-warning border-warning/20";
      default: return "bg-muted/10 text-muted-foreground border-muted/20";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "percentage": return <Percent className="h-4 w-4" />;
      case "fixed amount": return <Gift className="h-4 w-4" />;
      case "free shipping": return <Gift className="h-4 w-4" />;
      default: return <Gift className="h-4 w-4" />;
    }
  };

  const filteredPromotions = mockPromotions.filter(promo =>
    promo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    promo.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const activePromotions = mockPromotions.filter(p => p.status === 'active').length;
  const scheduledPromotions = mockPromotions.filter(p => p.status === 'scheduled').length;
  const totalUsage = mockPromotions.reduce((sum, p) => sum + p.usageCount, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Promotions</h1>
          <p className="text-muted-foreground">Create and manage discount codes and promotional campaigns</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <Plus className="mr-2 h-4 w-4" />
          Create Promotion
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Promotions</CardTitle>
            <Percent className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activePromotions}</div>
            <p className="text-xs text-muted-foreground">
              Currently running
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Scheduled</CardTitle>
            <Calendar className="h-4 w-4 text-info" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{scheduledPromotions}</div>
            <p className="text-xs text-muted-foreground">
              Coming soon
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Usage</CardTitle>
            <Gift className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalUsage.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Codes redeemed
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue Impact</CardTitle>
            <Percent className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$124K</div>
            <p className="text-xs text-muted-foreground">
              Generated revenue
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Promotion Management</CardTitle>
          <CardDescription>
            Create, manage and track your promotional campaigns
          </CardDescription>
          <div className="flex items-center space-x-2">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search promotions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Promotion</TableHead>
                <TableHead>Code</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Usage</TableHead>
                <TableHead>Valid Until</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPromotions.map((promo) => (
                <TableRow key={promo.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{promo.name}</div>
                      <div className="text-sm text-muted-foreground">{promo.description}</div>
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-sm bg-muted/50 rounded px-2 py-1 max-w-fit">
                    {promo.code}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {getTypeIcon(promo.type)}
                      <span className="text-sm">{promo.type}</span>
                    </div>
                  </TableCell>
                  <TableCell className="font-semibold">{promo.value}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(promo.status)}>
                      {promo.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      {promo.usageCount.toLocaleString()}
                      {promo.usageLimit && (
                        <span className="text-muted-foreground"> / {promo.usageLimit.toLocaleString()}</span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {promo.endDate}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Promotion
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Calendar className="mr-2 h-4 w-4" />
                          Schedule
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash className="mr-2 h-4 w-4" />
                          Delete Promotion
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Promotions;