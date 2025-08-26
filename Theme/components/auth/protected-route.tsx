'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/contexts/auth-context'
import { CosmicLoading } from '@/components/cosmic-loading'

interface ProtectedRouteProps {
  children: React.ReactNode
  requireAuth?: boolean
  requireRole?: string[]
  redirectTo?: string
}

export function ProtectedRoute({ 
  children, 
  requireAuth = true, 
  requireRole = [], 
  redirectTo = '/auth/login' 
}: ProtectedRouteProps) {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (isLoading) return

    // Check authentication requirement
    if (requireAuth && !user) {
      router.push(redirectTo)
      return
    }

    // Check role requirement
    if (requireRole.length > 0 && user && !requireRole.includes(user.role)) {
      router.push('/unauthorized')
      return
    }

    // If user is authenticated but trying to access auth pages, redirect to dashboard
    if (!requireAuth && user) {
      router.push('/dashboard')
      return
    }
  }, [user, isLoading, requireAuth, requireRole, redirectTo, router])

  // Show cosmic loading while checking authentication
  if (isLoading) {
    return <CosmicLoading />
  }

  // Don't render children if auth requirements aren't met
  if (requireAuth && !user) {
    return null
  }

  if (requireRole.length > 0 && user && !requireRole.includes(user.role)) {
    return null
  }

  // If user is authenticated but trying to access auth pages, don't render
  if (!requireAuth && user) {
    return null
  }

  return <>{children}</>
}