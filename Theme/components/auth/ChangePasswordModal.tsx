'use client'
import { Fragment, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Dialog, Transition } from '@headlessui/react'
import { motion } from 'framer-motion'
import {
  XMarkIcon,
  KeyIcon,
  EyeIcon,
  EyeSlashIcon,
  CheckCircleIcon,
  LockClosedIcon,
  ShieldCheckIcon,
  SparklesIcon,
  UserCircleIcon
} from '@heroicons/react/24/outline'
import { toast } from 'react-hot-toast'
import { z } from 'zod'
import { getStoredToken } from '@/lib/contexts/auth-context'

const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required'),
  newPassword: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, 
      'Password must contain uppercase, lowercase, number and special character'),
  confirmPassword: z.string()
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

type ChangePasswordFormData = z.infer<typeof changePasswordSchema>

interface ChangePasswordModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess?: () => void
}

export function ChangePasswordModal({ isOpen, onClose, onSuccess }: ChangePasswordModalProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset
  } = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordSchema)
  })

  const newPassword = watch('newPassword')

  const getPasswordStrength = (password: string) => {
    if (!password) return { strength: 0, label: '', color: '' }
    
    let strength = 0
    const checks = [
      password.length >= 8,
      /[a-z]/.test(password),
      /[A-Z]/.test(password),
      /\d/.test(password),
      /[@$!%*?&]/.test(password)
    ]
    
    strength = checks.filter(Boolean).length
    
    if (strength <= 2) return { strength, label: 'Weak', color: 'bg-red-500' }
    if (strength <= 3) return { strength, label: 'Fair', color: 'bg-yellow-500' }
    if (strength <= 4) return { strength, label: 'Good', color: 'bg-blue-500' }
    return { strength, label: 'Strong', color: 'bg-emerald-500' }
  }

  const passwordStrength = getPasswordStrength(newPassword || '')

  const onSubmit = async (data: ChangePasswordFormData) => {
    try {
      setIsLoading(true)
      
      const token = getStoredToken()
      if (!token) {
        toast.error('Please log in to change your password')
        return
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/change-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          currentPassword: data.currentPassword,
          newPassword: data.newPassword
        }),
      })

      const result = await response.json()

      if (response.ok) {
        setIsSuccess(true)
        reset()
        toast.success('✨ Password changed successfully!', {
          duration: 5000,
          style: {
            borderRadius: '12px',
            background: '#059669',
            color: '#ffffff',
          },
        })
        onSuccess?.()
      } else {
        toast.error(result.message || 'Failed to change password', {
          duration: 4000,
          style: {
            borderRadius: '12px',
            background: '#dc2626',
            color: '#ffffff',
          },
        })
      }
    } catch (error) {
      toast.error('⚠️ Network error. Please try again.', {
        duration: 4000,
        style: {
          borderRadius: '12px',
          background: '#dc2626',
          color: '#ffffff',
        },
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleClose = () => {
    setIsSuccess(false)
    reset()
    onClose()
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-[99999]" onClose={handleClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-[99998]" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto z-[99999]">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-500"
              enterFrom="opacity-0 scale-90 rotate-3"
              enterTo="opacity-100 scale-100 rotate-0"
              leave="ease-in duration-300"
              leaveFrom="opacity-100 scale-100 rotate-0"
              leaveTo="opacity-0 scale-90 rotate-3"
            >
              <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-3xl bg-white dark:bg-slate-800 text-left align-middle shadow-2xl transition-all border border-slate-200 dark:border-slate-700">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="relative"
                >
                  {/* Decorative Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-slate-800 dark:via-slate-800 dark:to-slate-700 rounded-3xl" />
                  
                  {/* Content */}
                  <div className="relative">
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg">
                          {isSuccess ? (
                            <CheckCircleIcon className="h-6 w-6 text-white" />
                          ) : (
                            <UserCircleIcon className="h-6 w-6 text-white" />
                          )}
                        </div>
                        <div>
                          <Dialog.Title
                            as="h3"
                            className="text-xl font-semibold text-slate-900 dark:text-slate-100"
                          >
                            {isSuccess ? 'Password Changed!' : 'Change Password'}
                          </Dialog.Title>
                          <p className="text-sm text-slate-500 dark:text-slate-400">
                            {isSuccess ? 'Your password has been updated' : 'Update your account password'}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={handleClose}
                        className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl transition-all duration-200"
                      >
                        <XMarkIcon className="h-5 w-5" />
                      </button>
                    </div>

                    {isSuccess ? (
                      /* Success State */
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                        className="text-center py-8 px-6"
                      >
                        <div className="relative mb-6">
                          <div className="flex items-center justify-center w-20 h-20 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full mx-auto shadow-lg">
                            <CheckCircleIcon className="h-10 w-10 text-white" />
                          </div>
                          <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                            <SparklesIcon className="h-3 w-3 text-white" />
                          </div>
                        </div>
                        
                        <h4 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-3">
                          Password Changed Successfully!
                        </h4>
                        <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                          Your password has been updated successfully. Your account is now more secure.
                        </p>

                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={handleClose}
                          className="w-full px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-xl shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800 transition-all duration-200"
                        >
                          Perfect, thanks!
                        </motion.button>
                      </motion.div>
                    ) : (
                      /* Form State */
                      <form onSubmit={handleSubmit(onSubmit)} className="p-6">
                        <div className="space-y-6">
                          {/* Current Password */}
                          <div>
                            <label htmlFor="currentPassword" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                              Current Password
                            </label>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <KeyIcon className="h-5 w-5 text-slate-400" />
                              </div>
                              <input
                                id="currentPassword"
                                type={showCurrentPassword ? 'text' : 'password'}
                                placeholder="Enter your current password"
                                {...register('currentPassword')}
                                className={`block w-full pl-12 pr-12 py-4 border ${
                                  errors.currentPassword 
                                    ? 'border-red-300 focus:ring-red-500 focus:border-red-500 dark:border-red-600' 
                                    : 'border-slate-300 focus:ring-indigo-500 focus:border-indigo-500 dark:border-slate-600'
                                } rounded-xl bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-0 transition-all duration-200`}
                              />
                              <button
                                type="button"
                                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                              >
                                {showCurrentPassword ? (
                                  <EyeSlashIcon className="h-5 w-5" />
                                ) : (
                                  <EyeIcon className="h-5 w-5" />
                                )}
                              </button>
                            </div>
                            {errors.currentPassword && (
                              <motion.p
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center"
                              >
                                <span className="mr-1">⚠️</span>
                                {errors.currentPassword.message}
                              </motion.p>
                            )}
                          </div>

                          {/* New Password */}
                          <div>
                            <label htmlFor="newPassword" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                              New Password
                            </label>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <LockClosedIcon className="h-5 w-5 text-slate-400" />
                              </div>
                              <input
                                id="newPassword"
                                type={showNewPassword ? 'text' : 'password'}
                                placeholder="Enter your new password"
                                {...register('newPassword')}
                                className={`block w-full pl-12 pr-12 py-4 border ${
                                  errors.newPassword 
                                    ? 'border-red-300 focus:ring-red-500 focus:border-red-500 dark:border-red-600' 
                                    : 'border-slate-300 focus:ring-indigo-500 focus:border-indigo-500 dark:border-slate-600'
                                } rounded-xl bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-0 transition-all duration-200`}
                              />
                              <button
                                type="button"
                                onClick={() => setShowNewPassword(!showNewPassword)}
                                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                              >
                                {showNewPassword ? (
                                  <EyeSlashIcon className="h-5 w-5" />
                                ) : (
                                  <EyeIcon className="h-5 w-5" />
                                )}
                              </button>
                            </div>
                            
                            {/* Password Strength Indicator */}
                            {newPassword && (
                              <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mt-3"
                              >
                                <div className="flex items-center justify-between mb-2">
                                  <span className="text-sm text-slate-600 dark:text-slate-400">Password Strength</span>
                                  <span className={`text-sm font-medium ${
                                    passwordStrength.strength <= 2 ? 'text-red-600' :
                                    passwordStrength.strength <= 3 ? 'text-yellow-600' :
                                    passwordStrength.strength <= 4 ? 'text-blue-600' : 'text-emerald-600'
                                  }`}>
                                    {passwordStrength.label}
                                  </span>
                                </div>
                                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                                  <div
                                    className={`h-2 rounded-full transition-all duration-300 ${passwordStrength.color}`}
                                    style={{ width: `${(passwordStrength.strength / 5) * 100}%` }}
                                  />
                                </div>
                              </motion.div>
                            )}
                            
                            {errors.newPassword && (
                              <motion.p
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center"
                              >
                                <span className="mr-1">⚠️</span>
                                {errors.newPassword.message}
                              </motion.p>
                            )}
                          </div>

                          {/* Confirm Password */}
                          <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                              Confirm New Password
                            </label>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <ShieldCheckIcon className="h-5 w-5 text-slate-400" />
                              </div>
                              <input
                                id="confirmPassword"
                                type={showConfirmPassword ? 'text' : 'password'}
                                placeholder="Confirm your new password"
                                {...register('confirmPassword')}
                                className={`block w-full pl-12 pr-12 py-4 border ${
                                  errors.confirmPassword 
                                    ? 'border-red-300 focus:ring-red-500 focus:border-red-500 dark:border-red-600' 
                                    : 'border-slate-300 focus:ring-indigo-500 focus:border-indigo-500 dark:border-slate-600'
                                } rounded-xl bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-0 transition-all duration-200`}
                              />
                              <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                              >
                                {showConfirmPassword ? (
                                  <EyeSlashIcon className="h-5 w-5" />
                                ) : (
                                  <EyeIcon className="h-5 w-5" />
                                )}
                              </button>
                            </div>
                            {errors.confirmPassword && (
                              <motion.p
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center"
                              >
                                <span className="mr-1">⚠️</span>
                                {errors.confirmPassword.message}
                              </motion.p>
                            )}
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center justify-end space-x-3 mt-8 pt-6 border-t border-slate-200 dark:border-slate-700">
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="button"
                            onClick={handleClose}
                            disabled={isLoading}
                            className="px-6 py-3 border border-slate-300 dark:border-slate-600 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-700 hover:bg-slate-50 dark:hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            Cancel
                          </motion.button>
                          
                          <motion.button
                            whileHover={{ scale: isLoading ? 1 : 1.02 }}
                            whileTap={{ scale: isLoading ? 1 : 0.98 }}
                            type="submit"
                            disabled={isLoading}
                            className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-medium rounded-xl shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center"
                          >
                            {isLoading ? (
                              <>
                                <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                                Changing...
                              </>
                            ) : (
                              <>
                                <KeyIcon className="h-4 w-4 mr-2" />
                                Change Password
                              </>
                            )}
                          </motion.button>
                        </div>
                      </form>
                    )}
                  </div>
                </motion.div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}