import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DashboardLayout } from "@/components/DashboardLayout";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AuthProvider } from "@/features/auth/AuthContext";
import { ProtectedRoute } from "@/features/auth/ProtectedRoute";
import { Suspense, lazy } from "react";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { PageSkeleton } from "@/components/PageSkeleton";
import { I18nProvider } from "@/features/i18n/I18nContext";
import { DirectionProvider } from "@/features/i18n/DirectionProvider";
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Analytics = lazy(() => import("./pages/Analytics"));
const Products = lazy(() => import("./pages/Products"));
const Orders = lazy(() => import("./pages/Orders"));
const Customers = lazy(() => import("./pages/Customers"));
const Categories = lazy(() => import("./pages/Categories"));
const Inventory = lazy(() => import("./pages/Inventory"));
const Promotions = lazy(() => import("./pages/Promotions"));
const Reviews = lazy(() => import("./pages/Reviews"));
const Reports = lazy(() => import("./pages/Reports"));
const Notifications = lazy(() => import("./pages/Notifications"));
const Login = lazy(() => import("./pages/Login"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Settings = lazy(() => import("./pages/Settings"));
const ThemeConfigurator = lazy(() => import("./pages/ThemeConfigurator"));
const Users = lazy(() => import("./pages/Users"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <I18nProvider>
        <DirectionProvider>
      <ThemeProvider defaultTheme="system" storageKey="admin-theme">
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={
                <Suspense fallback={<PageSkeleton />}>
                  <Login />
                </Suspense>
              } />
              <Route path="/" element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <ErrorBoundary>
                      <Suspense fallback={<PageSkeleton />}>
                        <Dashboard />
                      </Suspense>
                    </ErrorBoundary>
                  </DashboardLayout>
                </ProtectedRoute>
              } />
              <Route path="/analytics" element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <ErrorBoundary>
                      <Suspense fallback={<PageSkeleton />}>
                        <Analytics />
                      </Suspense>
                    </ErrorBoundary>
                  </DashboardLayout>
                </ProtectedRoute>
              } />
              <Route path="/orders" element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <ErrorBoundary>
                      <Suspense fallback={<PageSkeleton />}>
                        <Orders />
                      </Suspense>
                    </ErrorBoundary>
                  </DashboardLayout>
                </ProtectedRoute>
              } />
              <Route path="/products" element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <ErrorBoundary>
                      <Suspense fallback={<PageSkeleton />}>
                        <Products />
                      </Suspense>
                    </ErrorBoundary>
                  </DashboardLayout>
                </ProtectedRoute>
              } />
              <Route path="/categories" element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <ErrorBoundary>
                      <Suspense fallback={<PageSkeleton />}>
                        <Categories />
                      </Suspense>
                    </ErrorBoundary>
                  </DashboardLayout>
                </ProtectedRoute>
              } />
              <Route path="/customers" element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <ErrorBoundary>
                      <Suspense fallback={<PageSkeleton />}>
                        <Customers />
                      </Suspense>
                    </ErrorBoundary>
                  </DashboardLayout>
                </ProtectedRoute>
              } />
              <Route path="/inventory" element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <ErrorBoundary>
                      <Suspense fallback={<PageSkeleton />}>
                        <Inventory />
                      </Suspense>
                    </ErrorBoundary>
                  </DashboardLayout>
                </ProtectedRoute>
              } />
              <Route path="/promotions" element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <ErrorBoundary>
                      <Suspense fallback={<PageSkeleton />}>
                        <Promotions />
                      </Suspense>
                    </ErrorBoundary>
                  </DashboardLayout>
                </ProtectedRoute>
              } />
              <Route path="/reviews" element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <ErrorBoundary>
                      <Suspense fallback={<PageSkeleton />}>
                        <Reviews />
                      </Suspense>
                    </ErrorBoundary>
                  </DashboardLayout>
                </ProtectedRoute>
              } />
              <Route path="/reports" element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <ErrorBoundary>
                      <Suspense fallback={<PageSkeleton />}>
                        <Reports />
                      </Suspense>
                    </ErrorBoundary>
                  </DashboardLayout>
                </ProtectedRoute>
              } />
              <Route path="/users" element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <ErrorBoundary>
                      <Suspense fallback={<PageSkeleton />}>
                        <Users />
                      </Suspense>
                    </ErrorBoundary>
                  </DashboardLayout>
                </ProtectedRoute>
              } />
              <Route path="/notifications" element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <ErrorBoundary>
                      <Suspense fallback={<PageSkeleton />}>
                        <Notifications />
                      </Suspense>
                    </ErrorBoundary>
                  </DashboardLayout>
                </ProtectedRoute>
              } />
              <Route path="/settings" element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <ErrorBoundary>
                      <Suspense fallback={<PageSkeleton />}>
                        <Settings />
                      </Suspense>
                    </ErrorBoundary>
                  </DashboardLayout>
                </ProtectedRoute>
              } />
              <Route path="/theme" element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <ErrorBoundary>
                      <Suspense fallback={<PageSkeleton />}>
                        <ThemeConfigurator />
                      </Suspense>
                    </ErrorBoundary>
                  </DashboardLayout>
                </ProtectedRoute>
              } />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={
                <Suspense fallback={<PageSkeleton />}>
                  <NotFound />
                </Suspense>
              } />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
        </DirectionProvider>
      </I18nProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
