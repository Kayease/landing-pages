'use client'
import React from 'react'
import { usePermissions } from '@/lib/contexts/permission-context'
import { Permission } from '@/lib/permissions/roles'
import { motion } from 'framer-motion'
import clsx from 'clsx'

interface PermissionButtonProps {
  permission: Permission
  children: React.ReactNode
  className?: string
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'warning'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  showTooltip?: boolean
  tooltipText?: string
}

const variantStyles = {
  primary: 'bg-indigo-600 hover:bg-indigo-700 text-white border-indigo-600 hover:border-indigo-700',
  secondary: 'bg-gray-600 hover:bg-gray-700 text-white border-gray-600 hover:border-gray-700',
  danger: 'bg-red-600 hover:bg-red-700 text-white border-red-600 hover:border-red-700',
  success: 'bg-emerald-600 hover:bg-emerald-700 text-white border-emerald-600 hover:border-emerald-700',
  warning: 'bg-amber-600 hover:bg-amber-700 text-white border-amber-600 hover:border-amber-700'
}

const sizeStyles = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base'
}

export function PermissionButton({
  permission,
  children,
  className = '',
  variant = 'primary',
  size = 'md',
  disabled = false,
  onClick,
  type = 'button',
  showTooltip = false,
  tooltipText
}: PermissionButtonProps) {
  const { hasPermission } = usePermissions()
  
  const canPerformAction = hasPermission(permission)
  
  if (!canPerformAction) {
    return null // Don't render button if user doesn't have permission
  }
  
  const isDisabled = disabled || !canPerformAction
  
  return (
    <div className="relative group">
      <motion.button
        whileHover={{ scale: isDisabled ? 1 : 1.02 }}
        whileTap={{ scale: isDisabled ? 1 : 0.98 }}
        type={type}
        onClick={onClick}
        disabled={isDisabled}
        className={clsx(
          'inline-flex items-center justify-center font-medium rounded-xl border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-slate-800',
          variantStyles[variant],
          sizeStyles[size],
          isDisabled && 'opacity-50 cursor-not-allowed',
          !isDisabled && 'shadow-sm hover:shadow-md',
          className
        )}
      >
        {children}
      </motion.button>
      
      {/* Tooltip */}
      {showTooltip && tooltipText && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
          {tooltipText}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
        </div>
      )}
    </div>
  )
}

// Specialized button components for common actions
export function CreateButton({ children, onClick, className, ...props }: Omit<PermissionButtonProps, 'permission' | 'variant'> & { permission: Permission }) {
  return (
    <PermissionButton
      {...props}
      variant="success"
      onClick={onClick}
      className={className}
    >
      {children}
    </PermissionButton>
  )
}

export function EditButton({ children, onClick, className, ...props }: Omit<PermissionButtonProps, 'permission' | 'variant'> & { permission: Permission }) {
  return (
    <PermissionButton
      {...props}
      variant="primary"
      onClick={onClick}
      className={className}
    >
      {children}
    </PermissionButton>
  )
}

export function DeleteButton({ children, onClick, className, ...props }: Omit<PermissionButtonProps, 'permission' | 'variant'> & { permission: Permission }) {
  return (
    <PermissionButton
      {...props}
      variant="danger"
      onClick={onClick}
      className={className}
    >
      {children}
    </PermissionButton>
  )
}

// Permission-based section wrapper
interface PermissionSectionProps {
  permission: Permission
  children: React.ReactNode
  fallback?: React.ReactNode
  className?: string
}

export function PermissionSection({ 
  permission, 
  children, 
  fallback = null, 
  className = '' 
}: PermissionSectionProps) {
  const { hasPermission } = usePermissions()
  
  if (!hasPermission(permission)) {
    return <>{fallback}</>
  }
  
  return <div className={className}>{children}</div>
}