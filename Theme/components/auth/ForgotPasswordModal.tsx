'use client'
import { Fragment, useState } from 'react'
import { createPortal } from 'react-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Dialog, Transition } from '@headlessui/react'
import { motion } from 'framer-motion'
import { 
  XMarkIcon, 
  EnvelopeIcon, 
  CheckCircleIcon,
  KeyIcon,
  SparklesIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline'
import toast from 'react-hot-toast'
import { z } from 'zod'

const forgotPasswordSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
})

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>

interface ForgotPasswordModalProps {
  isOpen: boolean
  onClose: () => void
}

export function ForgotPasswordModal({ isOpen, onClose }: ForgotPasswordModalProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema)
  })

  const onSubmit = async (data: ForgotPasswordFormData) => {
    try {
      setIsLoading(true)
      const loadingToast = toast.loading('🚀 Sending reset email...', {
        style: {
          borderRadius: '12px',
          background: '#1e293b',
          color: '#f1f5f9',
        },
      })

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      toast.dismiss(loadingToast)

      if (response.ok) {
        setIsSuccess(true)
        toast.success('✨ Password reset email sent successfully!', {
          duration: 5000,
          style: {
            borderRadius: '12px',
            background: '#059669',
            color: '#ffffff',
          },
        })
      } else {
        toast.error(result.message || 'Failed to send reset email', {
          duration: 4000,
          style: {
            borderRadius: '12px',
            background: '#dc2626',
            color: '#ffffff',
          },
        })
      }
    } catch (error) {
      toast.dismiss()
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

  const modalContent = (
    <div 
      className={`fixed inset-0 ${isOpen ? 'block' : 'hidden'}`}
      style={{ 
        zIndex: 2147483647, // Maximum possible z-index
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        pointerEvents: isOpen ? 'auto' : 'none'
      }}
    >
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative w-full h-full" onClose={handleClose} style={{ zIndex: 2147483647 }}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div 
            className="absolute inset-0 bg-black backdrop-blur-md" 
            style={{ 
              zIndex: 2147483646,
              backgroundColor: 'rgba(0, 0, 0, 0.9)',
              backdropFilter: 'blur(8px)',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0
            }}
          />
        </Transition.Child>

        <div 
          className="absolute inset-0 overflow-y-auto" 
          style={{ 
            zIndex: 2147483647,
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0
          }}
        >
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
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-3xl bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl text-left align-middle shadow-2xl transition-all border border-slate-200/50 dark:border-slate-700/50">
                <motion.div
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -30, scale: 0.9 }}
                  transition={{ 
                    duration: 0.4,
                    type: "spring",
                    stiffness: 300,
                    damping: 30
                  }}
                  className="relative"
                >
                  {/* Decorative Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/80 via-white/90 to-purple-50/80 dark:from-slate-800/90 dark:via-slate-800/95 dark:to-slate-700/90 rounded-3xl" />
                  
                  {/* Animated Border */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 p-[1px]">
                    <div className="h-full w-full rounded-3xl bg-white/95 dark:bg-slate-800/95"></div>
                  </div>
                  
                  {/* Content */}
                  <div className="relative p-8">
                    {/* Header */}
                    <motion.div 
                      className="flex items-center justify-between mb-6"
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1, duration: 0.3 }}
                    >
                      <div className="flex items-center space-x-3">
                        <motion.div 
                          className="flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg relative overflow-hidden"
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ delay: 0.2, duration: 0.5, type: "spring" }}
                        >
                          {/* Animated background */}
                          <div className="absolute inset-0 bg-gradient-to-br from-indigo-400 to-purple-500 animate-pulse"></div>
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.4, duration: 0.3 }}
                            className="relative z-10"
                          >
                            {isSuccess ? (
                              <CheckCircleIcon className="h-6 w-6 text-white" />
                            ) : (
                              <KeyIcon className="h-6 w-6 text-white" />
                            )}
                          </motion.div>
                        </motion.div>
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3, duration: 0.3 }}
                        >
                          <Dialog.Title
                            as="h3"
                            className="text-xl font-semibold text-slate-900 dark:text-slate-100"
                          >
                            {isSuccess ? 'Email Sent!' : 'Reset Password'}
                          </Dialog.Title>
                          <p className="text-sm text-slate-500 dark:text-slate-400">
                            {isSuccess ? 'Check your inbox' : 'Secure password recovery'}
                          </p>
                        </motion.div>
                      </div>
                      <motion.button
                        onClick={handleClose}
                        className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl transition-all duration-200"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4, duration: 0.2 }}
                        whileHover={{ scale: 1.1, rotate: 90 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <XMarkIcon className="h-5 w-5" />
                      </motion.button>
                    </motion.div>

                    {isSuccess ? (
                      /* Success State */
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1, type: "spring", stiffness: 200 }}
                        className="text-center py-6"
                      >
                        <motion.div 
                          className="relative mb-6"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.3, duration: 0.6, type: "spring", stiffness: 200 }}
                        >
                          <motion.div 
                            className="flex items-center justify-center w-20 h-20 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full mx-auto shadow-lg relative overflow-hidden"
                            animate={{ 
                              boxShadow: [
                                "0 10px 25px rgba(16, 185, 129, 0.3)",
                                "0 10px 35px rgba(16, 185, 129, 0.5)",
                                "0 10px 25px rgba(16, 185, 129, 0.3)"
                              ]
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            {/* Animated ring */}
                            <motion.div
                              className="absolute inset-0 rounded-full border-4 border-emerald-300"
                              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                              transition={{ duration: 2, repeat: Infinity }}
                            />
                            <motion.div
                              initial={{ scale: 0, rotate: -180 }}
                              animate={{ scale: 1, rotate: 0 }}
                              transition={{ delay: 0.5, duration: 0.5, type: "spring" }}
                            >
                              <CheckCircleIcon className="h-10 w-10 text-white" />
                            </motion.div>
                          </motion.div>
                          <motion.div 
                            className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center"
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ delay: 0.7, duration: 0.4, type: "spring" }}
                          >
                            <motion.div
                              animate={{ rotate: [0, 360] }}
                              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                            >
                              <SparklesIcon className="h-3 w-3 text-white" />
                            </motion.div>
                          </motion.div>
                        </motion.div>
                        
                        <h4 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-3">
                          Check Your Email
                        </h4>
                        <p className="text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
                          We&apos;ve sent a secure password reset link to your email address. 
                          Click the link in the email to create a new password.
                        </p>
                        
                        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-4 border border-blue-200 dark:border-blue-800">
                          <div className="flex items-center space-x-2 text-blue-800 dark:text-blue-200">
                            <EnvelopeIcon className="h-4 w-4" />
                            <span className="text-sm font-medium">Pro Tip:</span>
                          </div>
                          <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                            Don&apos;t forget to check your spam folder if you don&apos;t see the email within a few minutes.
                          </p>
                        </div>

                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={handleClose}
                          className="mt-6 w-full px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-xl shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800 transition-all duration-200"
                        >
                          Got it, thanks!
                        </motion.button>
                      </motion.div>
                    ) : (
                      /* Form State */
                      <motion.form 
                        onSubmit={handleSubmit(onSubmit)} 
                        className="space-y-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.4 }}
                      >
                        <motion.div 
                          className="text-center mb-6"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3, duration: 0.3 }}
                        >
                          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                            Enter your email address and we&apos;ll send you a secure link to reset your password.
                          </p>
                        </motion.div>
                        
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.4, duration: 0.3 }}
                        >
                          <motion.label 
                            htmlFor="email" 
                            className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5, duration: 0.2 }}
                          >
                            Email Address
                          </motion.label>
                          <motion.div 
                            className="relative"
                            initial={{ scale: 0.95 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.6, duration: 0.3, type: "spring" }}
                          >
                            <motion.div 
                              className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.7, duration: 0.2 }}
                            >
                              <EnvelopeIcon className="h-5 w-5 text-slate-400" />
                            </motion.div>
                            <motion.input
                              id="email"
                              type="email"
                              placeholder="Enter your email address"
                              {...register('email')}
                              className={`block w-full pl-12 pr-4 py-4 border ${
                                errors.email 
                                  ? 'border-red-300 focus:ring-red-500 focus:border-red-500 dark:border-red-600' 
                                  : 'border-slate-300 focus:ring-indigo-500 focus:border-indigo-500 dark:border-slate-600'
                              } rounded-xl bg-white/80 dark:bg-slate-700/80 backdrop-blur-sm text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-0 transition-all duration-300 hover:bg-white dark:hover:bg-slate-700`}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 0.8, duration: 0.2 }}
                              whileFocus={{ scale: 1.02 }}
                            />
                          </motion.div>
                          {errors.email && (
                            <motion.p
                              initial={{ opacity: 0, y: -10, scale: 0.9 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: -10, scale: 0.9 }}
                              transition={{ duration: 0.2 }}
                              className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center"
                            >
                              <motion.span 
                                className="mr-1"
                                animate={{ rotate: [0, -10, 10, -10, 0] }}
                                transition={{ duration: 0.5 }}
                              >
                                ⚠️
                              </motion.span>
                              {errors.email.message}
                            </motion.p>
                          )}
                        </motion.div>

                        <motion.div 
                          className="flex space-x-3 pt-4"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.9, duration: 0.3 }}
                        >
                          <motion.button
                            whileHover={{ scale: 1.02, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            type="button"
                            onClick={handleClose}
                            className="flex-1 px-6 py-3 border border-slate-300 dark:border-slate-600 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-300 bg-white/80 dark:bg-slate-700/80 backdrop-blur-sm hover:bg-white dark:hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800 transition-all duration-300"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 1.0, duration: 0.2 }}
                          >
                            Cancel
                          </motion.button>
                          <motion.button
                            whileHover={{ 
                              scale: isLoading ? 1 : 1.02, 
                              y: isLoading ? 0 : -2,
                              boxShadow: isLoading ? undefined : "0 10px 25px rgba(99, 102, 241, 0.3)"
                            }}
                            whileTap={{ scale: isLoading ? 1 : 0.98 }}
                            type="submit"
                            disabled={isLoading}
                            className="flex-1 flex justify-center items-center px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-medium rounded-xl shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 relative overflow-hidden"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 1.1, duration: 0.2 }}
                          >
                            {/* Button shine effect */}
                            <motion.div
                              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                              initial={{ x: "-100%" }}
                              animate={{ x: isLoading ? "-100%" : "100%" }}
                              transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 3 }}
                            />
                            
                            <div className="relative z-10 flex items-center">
                              {isLoading ? (
                                <>
                                  <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                  >
                                    <ArrowPathIcon className="-ml-1 mr-2 h-4 w-4" />
                                  </motion.div>
                                  <motion.span
                                    animate={{ opacity: [1, 0.5, 1] }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                  >
                                    Sending...
                                  </motion.span>
                                </>
                              ) : (
                                <>
                                  <motion.div
                                    whileHover={{ scale: 1.1, rotate: 5 }}
                                    transition={{ duration: 0.2 }}
                                  >
                                    <EnvelopeIcon className="h-4 w-4 mr-2" />
                                  </motion.div>
                                  Send Reset Email
                                </>
                              )}
                            </div>
                          </motion.button>
                        </motion.div>
                      </motion.form>
                    )}
                  </div>
                </motion.div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
    </div>
  )

  // Render to body using portal if available
  if (typeof document !== 'undefined') {
    return createPortal(modalContent, document.body)
  }

  return modalContent
}