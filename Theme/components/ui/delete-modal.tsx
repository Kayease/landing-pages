'use client'

import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationTriangleIcon, TrashIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { motion } from 'framer-motion'

interface DeleteModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  description: string
  confirmText?: string
  isLoading?: boolean
  variant?: 'danger' | 'warning'
  itemName?: string
  itemType?: string
  destructiveAction?: string
}

export function DeleteModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = 'Delete',
  isLoading = false,
  variant = 'danger',
  itemName,
  itemType = 'item',
  destructiveAction = 'delete'
}: DeleteModalProps) {

  const colorClasses = {
    danger: {
      icon: 'text-red-600 dark:text-red-400',
      iconBg: 'bg-red-100 dark:bg-red-900/20',
      primaryButton: 'bg-red-600 hover:bg-red-700 focus:ring-red-500',
      border: 'border-red-200 dark:border-red-800',
      text: 'text-red-800 dark:text-red-200'
    },
    warning: {
      icon: 'text-yellow-600 dark:text-yellow-400', 
      iconBg: 'bg-yellow-100 dark:bg-yellow-900/20',
      primaryButton: 'bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500',
      border: 'border-yellow-200 dark:border-yellow-800',
      text: 'text-yellow-800 dark:text-yellow-200'
    }
  }

  const colors = colorClasses[variant]

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-[9999]" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-slate-800 p-6 text-left align-middle shadow-xl border border-slate-200 dark:border-slate-700 transition-all">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className={`flex items-center justify-center w-12 h-12 rounded-full ${colors.iconBg}`}>
                        <ExclamationTriangleIcon className={`h-6 w-6 ${colors.icon}`} />
                      </div>
                      <div>
                        <Dialog.Title
                          as="h3"
                          className="text-lg font-semibold leading-6 text-slate-900 dark:text-slate-100"
                        >
                          {title}
                        </Dialog.Title>
                        {itemName && (
                          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                            {itemType}: <span className="font-medium">{itemName}</span>
                          </p>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={onClose}
                      className="text-slate-400 hover:text-slate-500 dark:hover:text-slate-300 transition-colors"
                      disabled={isLoading}
                    >
                      <XMarkIcon className="h-6 w-6" />
                    </button>
                  </div>

                  {/* Content */}
                  <div className="mb-6">
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                      {description}
                    </p>
                    
                    {variant === 'danger' && (
                      <div className={`mt-4 p-3 rounded-lg border ${colors.border} ${colors.iconBg}`}>
                        <div className="flex items-start space-x-2">
                          <TrashIcon className={`h-4 w-4 mt-0.5 ${colors.icon}`} />
                          <div className="text-xs">
                            <p className={`font-medium ${colors.text}`}>
                              Warning: This action cannot be undone
                            </p>
                            <p className={`mt-1 ${colors.text}`}>
                              This will permanently {destructiveAction} the {itemType} and all associated data.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-end space-x-3">
                    <button
                      type="button"
                      className="inline-flex items-center px-4 py-2 border border-slate-300 dark:border-slate-600 text-sm font-medium rounded-lg text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-700 hover:bg-slate-50 dark:hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800 transition-all duration-200"
                      onClick={onClose}
                      disabled={isLoading}
                    >
                      Cancel
                    </button>
                    <motion.button
                      type="button"
                      whileHover={{ scale: isLoading ? 1 : 1.02 }}
                      whileTap={{ scale: isLoading ? 1 : 0.98 }}
                      className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white ${colors.primaryButton} focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200`}
                      onClick={onConfirm}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                          Deleting...
                        </>
                      ) : (
                        <>
                          <TrashIcon className="h-4 w-4 mr-2" />
                          {confirmText}
                        </>
                      )}
                    </motion.button>
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