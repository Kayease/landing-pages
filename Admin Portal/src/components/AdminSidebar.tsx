import { memo, useCallback, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  ShoppingBag,
  ShoppingCart,
  BarChart3,
  Settings,
  FileText,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Palette
} from "lucide-react";
import { useAuth } from "@/features/auth/AuthContext";
import * as prefetch from "@/routes/prefetch";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const mainNavItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Analytics", url: "/analytics", icon: BarChart3 },
  { title: "Orders", url: "/orders", icon: ShoppingCart },
  { title: "Products", url: "/products", icon: ShoppingBag },
  { title: "Categories", url: "/categories", icon: FileText },
];

const ecommerceItems = [
  { title: "Customers", url: "/customers", icon: Users },
  { title: "Users", url: "/users", icon: Users },
  { title: "Inventory", url: "/inventory", icon: ShoppingBag },
  { title: "Promotions", url: "/promotions", icon: Palette },
  { title: "Reviews", url: "/reviews", icon: FileText },
];

const businessItems = [
  { title: "Reports", url: "/reports", icon: BarChart3 },
  { title: "Notifications", url: "/notifications", icon: Settings },
  { title: "Settings", url: "/settings", icon: Settings },
  { title: "Theme", url: "/theme", icon: Palette },
];

function AdminSidebarComponent() {
  const { state } = useSidebar();
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const currentPath = location.pathname;
  const collapsed = state === "collapsed";

  const isActive = (path: string) => {
    if (path === "/") return currentPath === "/";
    return currentPath.startsWith(path);
  };

  const getNavClassName = (path: string) => {
    const baseClasses = "w-full justify-start transition-all duration-200 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground";
    return isActive(path) 
      ? `${baseClasses} bg-sidebar-primary text-sidebar-primary-foreground shadow-md` 
      : `${baseClasses} text-sidebar-foreground`;
  };

  const handlePrefetch = useCallback((url: string) => {
    switch (url) {
      case '/': prefetch.prefetchDashboard(); break;
      case '/analytics': prefetch.prefetchAnalytics(); break;
      case '/orders': prefetch.prefetchOrders(); break;
      case '/products': prefetch.prefetchProducts(); break;
      case '/categories': prefetch.prefetchCategories(); break;
      case '/customers': prefetch.prefetchCustomers(); break;
      case '/inventory': prefetch.prefetchInventory(); break;
      case '/promotions': prefetch.prefetchPromotions(); break;
      case '/reviews': prefetch.prefetchReviews(); break;
      case '/reports': prefetch.prefetchReports(); break;
      case '/notifications': prefetch.prefetchNotifications(); break;
      case '/settings': prefetch.prefetchSettings(); break;
      case '/theme': prefetch.prefetchTheme(); break;
      case '/users': prefetch.prefetchUsers(); break;
    }
  }, [])

  return (
    <Sidebar className={`${collapsed ? "w-16" : "w-64"} transition-all duration-300 border-r border-sidebar-border bg-sidebar`}>
      <SidebarHeader className="p-4 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
            <LayoutDashboard className="w-4 h-4 text-white" />
          </div>
          {!collapsed && (
            <div>
              <h2 className="text-sm font-semibold text-sidebar-foreground">Admin Pro</h2>
              <p className="text-xs text-sidebar-foreground/60">Premium Dashboard</p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="p-2">
        <SidebarGroup>
          <SidebarGroupLabel className={`px-3 py-2 text-xs font-medium text-sidebar-foreground/60 ${collapsed ? "hidden" : ""}`}>
            Main Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {mainNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className={getNavClassName(item.url)} onMouseEnter={() => handlePrefetch(item.url)}>
                      <item.icon className={`${collapsed ? "w-5 h-5" : "w-4 h-4 mr-3"} shrink-0`} />
                      {!collapsed && <span className="font-medium">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <Separator className="my-4 bg-sidebar-border" />

        <SidebarGroup>
          <SidebarGroupLabel className={`px-3 py-2 text-xs font-medium text-sidebar-foreground/60 ${collapsed ? "hidden" : ""}`}>
            E-commerce
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {ecommerceItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className={getNavClassName(item.url)} onMouseEnter={() => handlePrefetch(item.url)}>
                      <item.icon className={`${collapsed ? "w-5 h-5" : "w-4 h-4 mr-3"} shrink-0`} />
                      {!collapsed && <span className="font-medium">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <Separator className="my-4 bg-sidebar-border" />

        <SidebarGroup>
          <SidebarGroupLabel className={`px-3 py-2 text-xs font-medium text-sidebar-foreground/60 ${collapsed ? "hidden" : ""}`}>
            Business Intelligence
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {businessItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className={getNavClassName(item.url)} onMouseEnter={() => handlePrefetch(item.url)}>
                      <item.icon className={`${collapsed ? "w-5 h-5" : "w-4 h-4 mr-3"} shrink-0`} />
                      {!collapsed && <span className="font-medium">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <div className="p-4 border-t border-sidebar-border mt-auto">
        <Button
          variant="ghost"
          className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          onClick={() => { logout(); navigate('/login'); }}
        >
          <LogOut className={`${collapsed ? "w-5 h-5" : "w-4 h-4 mr-3"} shrink-0`} />
          {!collapsed && <span>Sign Out</span>}
        </Button>
      </div>
    </Sidebar>
  );
}

export const AdminSidebar = memo(AdminSidebarComponent)