/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  EnvelopeIcon,
  LockClosedIcon,
  EyeIcon,
  EyeSlashIcon,
  ArrowRightIcon,
  ExclamationTriangleIcon,
  SparklesIcon
} from '@heroicons/react/24/outline'
import toast from 'react-hot-toast'
import { z } from 'zod'
import { SimpleForgotPasswordModal } from './SimpleForgotPasswordModal'
import { useRouter } from 'next/navigation'

// Inline schema and types to avoid external imports
const loginSchema = z.object({
  username: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  remember: z.boolean().optional()
})

type LoginFormData = z.infer<typeof loginSchema>

// Local login function for demo/theme usage
async function login(username: string, password: string): Promise<{ role: string }>{
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL || ''}/auth/login`
  try {
    const res = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    })

    if (!res.ok) {
      const data = await res.json().catch(() => ({}))
      throw new Error(data?.message || 'Invalid email or password')
    }

    const data = await res.json().catch(() => ({}))
    // Persist a minimal demo user payload expected elsewhere
    const userData = {
      role: data?.user?.role || 'User',
      email: username
    }
    localStorage.setItem('theme_demo_user_data', JSON.stringify(userData))
    return userData
  } catch (err) {
    throw err as Error
  }
}

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showForgotPassword, setShowForgotPassword] = useState(false)
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema)
  })

  const onSubmit = async (data: LoginFormData) => {
    try {
      setIsLoading(true)
      const loadingToast = toast.loading('Signing you in...')

      await login(data.username, data.password)

      // Get user data from localStorage after login (demo key)
      const userDataStr = localStorage.getItem('theme_demo_user_data')
      const userData = userDataStr ? JSON.parse(userDataStr) : null

      toast.dismiss(loadingToast)
      toast.success('Welcome back! Login successful.', {
        duration: 3000,
        icon: '🎉',
      })

      // Use the user data from localStorage for navigation
      if (userData?.role === 'Admin') {
        router.push('/admin/dashboard')
      } else if (userData?.role === 'POS') {
        router.push('/pos-booking')
      } else {
        router.push('/')
      }
    } catch (err: any) {
      toast.dismiss()

      if (err.message?.includes('verify your email')) {
        toast.error('Please verify your email address first.', {
          duration: 5000,
          icon: '📧',
        })
      } else if (err.message?.includes('Invalid email or password')) {
        toast.error('Invalid email or password. Please try again.', {
          duration: 4000,
          icon: '❌',
        })
      } else if (err.message?.includes('deactivated')) {
        toast.error('Your account has been deactivated. Contact administrator.', {
          duration: 5000,
          icon: '🚫',
        })
      } else {
        toast.error(err.message || 'Login failed. Please try again.', {
          duration: 4000,
          icon: '⚠️',
        })
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <motion.form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Email Field */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          <label htmlFor="username" className=" text-sm font-semibold text-white mb-3 flex items-center space-x-2">
            <EnvelopeIcon className="h-4 w-4 text-blue-400" />
            <span>Email Address</span>
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <EnvelopeIcon className="h-5 w-5 text-slate-400 group-focus-within:text-blue-400 transition-colors duration-200" />
            </div>
            <input
              id="username"
              type="email"
              autoComplete="email"
              placeholder="Enter your cosmic email..."
              {...register('username')}
              className={`block w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-sm border ${errors.username
                ? 'border-red-400 focus:ring-red-400 focus:border-red-400'
                : 'border-white/20 focus:ring-blue-400 focus:border-blue-400'
                } rounded-xl shadow-lg placeholder-slate-400 text-white focus:outline-none focus:ring-2 focus:ring-opacity-50 sm:text-sm transition-all duration-200 hover:bg-white/15`}
            />
            {errors.username && (
              <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                <ExclamationTriangleIcon className="h-5 w-5 text-red-400" />
              </div>
            )}
          </div>
          {errors.username && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-2 text-sm text-red-400 flex items-center space-x-2"
            >
              <ExclamationTriangleIcon className="h-4 w-4" />
              <span>{errors.username.message}</span>
            </motion.p>
          )}
        </motion.div>

        {/* Password Field */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <label htmlFor="password" className="text-sm font-semibold text-white mb-3 flex items-center space-x-2">
            <LockClosedIcon className="h-4 w-4 text-purple-400" />
            <span>Password</span>
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <LockClosedIcon className="h-5 w-5 text-slate-400 group-focus-within:text-purple-400 transition-colors duration-200" />
            </div>
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              placeholder="Enter your secret key..."
              {...register('password')}
              className={`block w-full pl-12 pr-12 py-4 bg-white/10 backdrop-blur-sm border ${errors.password
                ? 'border-red-400 focus:ring-red-400 focus:border-red-400'
                : 'border-white/20 focus:ring-purple-400 focus:border-purple-400'
                } rounded-xl shadow-lg placeholder-slate-400 text-white focus:outline-none focus:ring-2 focus:ring-opacity-50 sm:text-sm transition-all duration-200 hover:bg-white/15`}
            />
            <motion.button
              type="button"
              className="absolute inset-y-0 right-0 pr-4 flex items-center"
              onClick={() => setShowPassword(!showPassword)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {showPassword ? (
                <EyeSlashIcon className="h-5 w-5 text-slate-400 hover:text-purple-400 transition-colors duration-200" />
              ) : (
                <EyeIcon className="h-5 w-5 text-slate-400 hover:text-purple-400 transition-colors duration-200" />
              )}
            </motion.button>
            {errors.password && (
              <div className="absolute inset-y-0 right-12 pr-4 flex items-center">
                <ExclamationTriangleIcon className="h-5 w-5 text-red-400" />
              </div>
            )}
          </div>
          {errors.password && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-2 text-sm text-red-400 flex items-center space-x-2"
            >
              <ExclamationTriangleIcon className="h-4 w-4" />
              <span>{errors.password.message}</span>
            </motion.p>
          )}
        </motion.div>

        {/* Remember Me & Forgot Password */}
        <motion.div
          className="flex items-center justify-between"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <div className="flex items-center">
            <input
              id="remember"
              type="checkbox"
              {...register('remember')}
              className="h-4 w-4 text-blue-500 focus:ring-blue-400 border-white/30 rounded bg-white/10 backdrop-blur-sm transition-colors duration-200"
            />
            <label htmlFor="remember" className="ml-3 block text-sm text-slate-300">
              Remember me in the cosmos
            </label>
          </div>

          <div className="text-sm">
            <motion.button
              type="button"
              onClick={() => setShowForgotPassword(true)}
              className="font-medium text-blue-400 hover:text-blue-300 transition-colors duration-200 flex items-center space-x-1"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <SparklesIcon className="h-4 w-4" />
              <span>Forgot password?</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Submit Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <motion.button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center items-center py-4 px-6 border border-transparent rounded-xl shadow-lg text-sm font-semibold text-white bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 relative overflow-hidden group"
            whileHover={{ scale: isLoading ? 1 : 1.02 }}
            whileTap={{ scale: isLoading ? 1 : 0.98 }}
          >
            {/* Button Background Animation */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            <div className="relative z-10 flex items-center">
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-3"></div>
                  <span>Entering the cosmos...</span>
                </>
              ) : (
                <>
                  <LockClosedIcon className="mr-3 h-5 w-5" />
                  <span>Launch into Space</span>
                  <ArrowRightIcon className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
                </>
              )}
            </div>
          </motion.button>
        </motion.div>

        {/* Register Link */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <span className="text-sm text-slate-300">
            New to our cosmic journey?{' '}
            <Link
              href="/auth/register"
              className="font-semibold text-blue-400 hover:text-blue-300 transition-colors duration-200 inline-flex items-center space-x-1"
            >
              <span>Join the adventure</span>
              <SparklesIcon className="h-4 w-4" />
            </Link>
          </span>
        </motion.div>
      </motion.form>

      {/* Forgot Password Modal */}
      <SimpleForgotPasswordModal
        isOpen={showForgotPassword}
        onClose={() => setShowForgotPassword(false)}
      />
    </>
  )
}