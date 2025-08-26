'use client'
import { useState, useEffect } from 'react'
import { 
  WrenchScrewdriverIcon, 
  ExclamationTriangleIcon,
  SunIcon,
  MoonIcon,
  ComputerDesktopIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline'
import Link from 'next/link'
import { getStoredToken } from '@/lib/contexts/auth-context'

interface MaintenanceConfig {
  title: string
  description: string
  theme: 'light' | 'dark' | 'auto'
}

export default function MaintenancePage() {
  const [config, setConfig] = useState<MaintenanceConfig>({
    title: 'Site Under Maintenance',
    description: 'We are currently performing maintenance to improve your experience. Please check back soon.',
    theme: 'auto'
  })
  const [currentTheme, setCurrentTheme] = useState<'light' | 'dark'>('light')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadMaintenanceConfig()
    applyTheme()
  }, [])

  const loadMaintenanceConfig = async () => {
    try {
      // In a real app, this would fetch from your API
      // For now, we'll use localStorage or default values
      const savedConfig = localStorage.getItem('maintenanceConfig')
      if (savedConfig) {
        setConfig(JSON.parse(savedConfig))
      }
    } catch (error) {
      console.error('Failed to load maintenance config:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const applyTheme = () => {
    const savedTheme = localStorage.getItem('theme') || 'auto'
    let theme: 'light' | 'dark' = 'light'
    
    if (savedTheme === 'dark') {
      theme = 'dark'
    } else if (savedTheme === 'auto') {
      theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    }
    
    setCurrentTheme(theme)
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  const toggleTheme = () => {
    const newTheme = currentTheme === 'light' ? 'dark' : 'light'
    setCurrentTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  const refreshPage = () => {
    window.location.reload()
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Header with Theme Toggle */}
      <header className="absolute top-0 right-0 p-6">
        <div className="flex items-center space-x-4">
          <button
            onClick={refreshPage}
            className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors duration-200"
            title="Refresh Page"
          >
            <ArrowPathIcon className="h-5 w-5" />
          </button>
          <button
            onClick={toggleTheme}
            className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors duration-200"
            title={`Switch to ${currentTheme === 'light' ? 'Dark' : 'Light'} Mode`}
          >
            {currentTheme === 'light' ? (
              <MoonIcon className="h-5 w-5" />
            ) : (
              <SunIcon className="h-5 w-5" />
            )}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          {/* Maintenance Icon */}
          <div className="mb-8">
            <div className="mx-auto w-24 h-24 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mb-6">
              <WrenchScrewdriverIcon className="h-12 w-12 text-orange-600 dark:text-orange-400" />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            {config.title}
          </h1>

          {/* Description */}
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed max-w-lg mx-auto">
            {config.description}
          </p>

          {/* Status Badge */}
          <div className="inline-flex items-center px-6 py-3 bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-200 rounded-full text-sm font-medium mb-8">
            <ExclamationTriangleIcon className="h-5 w-5 mr-2" />
            Maintenance Mode Active
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={refreshPage}
              className="inline-flex items-center px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              <ArrowPathIcon className="h-5 w-5 mr-2" />
              Try Again
            </button>
            
            <Link
              href="/auth/login"
              className="inline-flex items-center px-6 py-3 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-lg transition-colors duration-200"
            >
              Admin Login
            </Link>
          </div>

          {/* Additional Info */}
          <div className="mt-12 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <ComputerDesktopIcon className="h-5 w-5 text-gray-400" />
              <span className="text-sm text-gray-500 dark:text-gray-400">What's happening?</span>
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300 space-y-2">
              <p>• We're updating our systems to serve you better</p>
              <p>• This maintenance is scheduled and necessary</p>
              <p>• We'll be back online as soon as possible</p>
              <p>• Admin users can still access the system</p>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-12 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Need immediate assistance?{' '}
              <Link href="/contact" className="text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 underline">
                Contact Support
              </Link>
            </p>
          </div>
        </div>
      </main>

      {/* Background Pattern */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-transparent to-blue-50 dark:from-orange-900/10 dark:via-transparent dark:to-blue-900/10"></div>
        <div className="absolute inset-0 opacity-30 dark:opacity-10">
          <div className="w-full h-full" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f97316' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>
      </div>
    </div>
  )
}
