'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/contexts/auth-context'
import { usePermissions } from '@/lib/contexts/permission-context'
import { Permission, UserRole } from '@/lib/permissions/roles'
import { CosmicLoading } from '@/components/cosmic-loading'

interface AdminRouteGuardProps {
  children: React.ReactNode
  requiredPermission?: Permission
  fallbackPath?: string
}

export function AdminRouteGuard({ 
  children, 
  requiredPermission,
  fallbackPath = '/auth/login' 
}: AdminRouteGuardProps) {
  const router = useRouter()
  const { user, isLoading } = useAuth()
  const { hasPermission, canAccessAdmin, userRole } = usePermissions()
  const [isChecking, setIsChecking] = useState(true)

  useEffect(() => {
    const checkAccess = async () => {
      // Wait for auth to finish loading
      if (isLoading) return

      // If no user, redirect to login
      if (!user) {
        router.push(fallbackPath)
        return
      }

      // Block POS users from accessing admin routes
      if (userRole === UserRole.POS) {
        router.push('/pos-booking')
        return
      }

      // Check if user can access admin portal
      if (!canAccessAdmin) {
        router.push('/')
        return
      }

      // Check specific permission if required
      if (requiredPermission && !hasPermission(requiredPermission)) {
        router.push('/admin/dashboard')
        return
      }

      setIsChecking(false)
    }

    checkAccess()
  }, [user, isLoading, hasPermission, canAccessAdmin, userRole, requiredPermission, router, fallbackPath])

  // Show loading while checking authentication and permissions
  if (isLoading || isChecking) {
    return <CosmicLoading />
  }

  // If we get here, user has access
  return <>{children}</>
}

// Higher-order component for page-level protection
export function withAdminAuth<P extends object>(
  Component: React.ComponentType<P>,
  requiredPermission?: Permission
) {
  return function ProtectedComponent(props: P) {
    return (
      <AdminRouteGuard requiredPermission={requiredPermission}>
        <Component {...props} />
      </AdminRouteGuard>
    )
  }
}

// Access denied component
export function AccessDenied({ 
  title = "Access Denied",
  message = "You don't have permission to access this resource.",
  showBackButton = true
}: {
  title?: string
  message?: string
  showBackButton?: boolean
}) {
  const router = useRouter()

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="max-w-md w-full space-y-8 p-8">
        <div className="text-center">
          <div className="mx-auto h-24 w-24 text-red-500">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white">
            {title}
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            {message}
          </p>
        </div>
        {showBackButton && (
          <div className="mt-8">
            <button
              onClick={() => router.back()}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Go Back
            </button>
          </div>
        )}
      </div>
    </div>
  )
}