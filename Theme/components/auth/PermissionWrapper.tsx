'use client';

import React from 'react';
import { usePermissions } from '@/lib/contexts/permission-context';
import { Permission } from '@/lib/permissions/roles';

interface PermissionWrapperProps {
  children: React.ReactNode;
  permission: Permission;
  fallback?: React.ReactNode;
}

export function PermissionWrapper({ 
  children, 
  permission, 
  fallback 
}: PermissionWrapperProps) {
  const { hasPermission } = usePermissions();
  
  if (!hasPermission(permission)) {
    if (fallback) {
      return <>{fallback}</>;
    }
    
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="text-6xl mb-4">🔒</div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">
            Access Denied
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            You don't have permission to access this resource.
          </p>
        </div>
      </div>
    );
  }
  
  return <>{children}</>;
}