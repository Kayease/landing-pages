import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Plus, Search, Filter, MoreHorizontal, Bell, Mail, MessageSquare, Settings, Send, Users } from "lucide-react";

const mockNotifications = [
  {
    id: 1,
    title: "Low Stock Alert",
    message: "Wireless Earbuds inventory is running low (5 items remaining)",
    type: "alert",
    recipient: "Inventory Team",
    status: "sent",
    date: "2024-01-20 14:30",
    readStatus: "read"
  },
  {
    id: 2,
    title: "New Order Received",
    message: "Order #ORD-12345 has been placed by Alice Johnson",
    type: "order",
    recipient: "Sales Team",
    status: "sent",
    date: "2024-01-20 12:15",
    readStatus: "read"
  },
  {
    id: 3,
    title: "Weekly Sales Report",
    message: "Your weekly sales summary is ready for review",
    type: "report",
    recipient: "All Users",
    status: "scheduled",
    date: "2024-01-21 09:00",
    readStatus: "unread"
  },
  {
    id: 4,
    title: "Customer Review Alert",
    message: "New 2-star review requires attention for Premium Headphones",
    type: "review",
    recipient: "Customer Service",
    status: "sent",
    date: "2024-01-19 16:45",
    readStatus: "unread"
  },
  {
    id: 5,
    title: "System Maintenance",
    message: "Scheduled maintenance window tonight from 2:00 AM - 4:00 AM",
    type: "system",
    recipient: "All Users",
    status: "draft",
    date: "2024-01-22 02:00",
    readStatus: "unread"
  }
];

const Notifications = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "alert": return "bg-destructive/10 text-destructive border-destructive/20";
      case "order": return "bg-success/10 text-success border-success/20";
      case "report": return "bg-info/10 text-info border-info/20";
      case "review": return "bg-warning/10 text-warning border-warning/20";
      case "system": return "bg-muted/10 text-muted-foreground border-muted/20";
      default: return "bg-muted/10 text-muted-foreground border-muted/20";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "sent": return "bg-success/10 text-success border-success/20";
      case "scheduled": return "bg-info/10 text-info border-info/20";
      case "draft": return "bg-muted/10 text-muted-foreground border-muted/20";
      case "failed": return "bg-destructive/10 text-destructive border-destructive/20";
      default: return "bg-muted/10 text-muted-foreground border-muted/20";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "alert": return <Bell className="h-4 w-4" />;
      case "order": return <MessageSquare className="h-4 w-4" />;
      case "report": return <Mail className="h-4 w-4" />;
      case "review": return <Users className="h-4 w-4" />;
      case "system": return <Settings className="h-4 w-4" />;
      default: return <Bell className="h-4 w-4" />;
    }
  };

  const filteredNotifications = mockNotifications.filter(notification =>
    notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    notification.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalNotifications = mockNotifications.length;
  const sentNotifications = mockNotifications.filter(n => n.status === 'sent').length;
  const scheduledNotifications = mockNotifications.filter(n => n.status === 'scheduled').length;
  const unreadNotifications = mockNotifications.filter(n => n.readStatus === 'unread').length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
          <p className="text-muted-foreground">Manage system notifications and communication</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <Plus className="mr-2 h-4 w-4" />
          Create Notification
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sent</CardTitle>
            <Send className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{sentNotifications}</div>
            <p className="text-xs text-muted-foreground">
              Successfully delivered
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Scheduled</CardTitle>
            <Bell className="h-4 w-4 text-info" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{scheduledNotifications}</div>
            <p className="text-xs text-muted-foreground">
              Pending delivery
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unread</CardTitle>
            <Mail className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{unreadNotifications}</div>
            <p className="text-xs text-muted-foreground">
              Require attention
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalNotifications}</div>
            <p className="text-xs text-muted-foreground">
              All notifications
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="manage" className="space-y-4">
        <TabsList>
          <TabsTrigger value="manage">Manage</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="manage" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Management</CardTitle>
              <CardDescription>
                View, create, and manage system notifications
              </CardDescription>
              <div className="flex items-center space-x-2">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search notifications..."
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
                    <TableHead>Type</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Message</TableHead>
                    <TableHead>Recipient</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredNotifications.map((notification) => (
                    <TableRow key={notification.id}>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          {getTypeIcon(notification.type)}
                          <Badge className={getTypeColor(notification.type)}>
                            {notification.type}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{notification.title}</TableCell>
                      <TableCell className="max-w-[250px] truncate">
                        {notification.message}
                      </TableCell>
                      <TableCell>{notification.recipient}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(notification.status)}>
                          {notification.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {notification.date}
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
                              <Send className="mr-2 h-4 w-4" />
                              Send Now
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Settings className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Mail className="mr-2 h-4 w-4" />
                              Duplicate
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
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Email Notifications</CardTitle>
                <CardDescription>
                  Configure email notification preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="order-emails">Order confirmations</Label>
                  <Switch id="order-emails" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="inventory-emails">Inventory alerts</Label>
                  <Switch id="inventory-emails" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="review-emails">Review notifications</Label>
                  <Switch id="review-emails" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="report-emails">Weekly reports</Label>
                  <Switch id="report-emails" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Push Notifications</CardTitle>
                <CardDescription>
                  Configure in-app notification settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="push-orders">New orders</Label>
                  <Switch id="push-orders" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="push-alerts">System alerts</Label>
                  <Switch id="push-alerts" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="push-reviews">Customer reviews</Label>
                  <Switch id="push-reviews" />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="push-promotions">Promotion updates</Label>
                  <Switch id="push-promotions" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Notifications;