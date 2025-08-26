'use client'
import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { motion } from 'framer-motion'
import {
  ExclamationTriangleIcon,
  TrashIcon,
  CheckCircleIcon,
  XMarkIcon
} from '@heroicons/react/24/outline'
import { ModalPortal } from './ModalPortal'

interface ConfirmationModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  message: string
  confirmText?: string
  cancelText?: string
  type?: 'danger' | 'warning' | 'info' | 'success'
  isLoading?: boolean
  icon?: React.ComponentType<{ className?: string }>
}

export function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  type = 'danger',
  isLoading = false,
  icon: CustomIcon
}: ConfirmationModalProps) {
  const getTypeStyles = () => {
    switch (type) {
      case 'danger':
        return {
          iconBg: 'bg-red-100 dark:bg-red-900/50',
          iconColor: 'text-red-600 dark:text-red-400',
          confirmButton: 'bg-red-600 hover:bg-red-700 focus:ring-red-500',
          defaultIcon: TrashIcon
        }
      case 'warning':
        return {
          iconBg: 'bg-amber-100 dark:bg-amber-900/50',
          iconColor: 'text-amber-600 dark:text-amber-400',
          confirmButton: 'bg-amber-600 hover:bg-amber-700 focus:ring-amber-500',
          defaultIcon: ExclamationTriangleIcon
        }
      case 'success':
        return {
          iconBg: 'bg-emerald-100 dark:bg-emerald-900/50',
          iconColor: 'text-emerald-600 dark:text-emerald-400',
          confirmButton: 'bg-emerald-600 hover:bg-emerald-700 focus:ring-emerald-500',
          defaultIcon: CheckCircleIcon
        }
      default:
        return {
          iconBg: 'bg-blue-100 dark:bg-blue-900/50',
          iconColor: 'text-blue-600 dark:text-blue-400',
          confirmButton: 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500',
          defaultIcon: ExclamationTriangleIcon
        }
    }
  }

  const styles = getTypeStyles()
  const IconComponent = CustomIcon || styles.defaultIcon

  return (
    <ModalPortal>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={onClose}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-slate-800 p-8 text-left align-middle shadow-2xl transition-all border border-slate-200 dark:border-slate-700">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-center justify-center mb-6">
                      <div className={`flex items-center justify-center w-16 h-16 rounded-2xl ${styles.iconBg}`}>
                        <IconComponent className={`h-8 w-8 ${styles.iconColor}`} />
                      </div>
                    </div>

                    <div className="text-center mb-8">
                      <Dialog.Title
                        as="h3"
                        className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-3"
                      >
                        {title}
                      </Dialog.Title>
                      <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                        {message}
                      </p>
                    </div>

                    <div className="flex items-center space-x-3">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="button"
                        className="flex-1 inline-flex justify-center items-center px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-700 hover:bg-slate-50 dark:hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800 transition-all duration-200"
                        onClick={onClose}
                        disabled={isLoading}
                      >
                        <XMarkIcon className="h-4 w-4 mr-2" />
                        {cancelText}
                      </motion.button>
                      
                      <motion.button
                        whileHover={{ scale: isLoading ? 1 : 1.02 }}
                        whileTap={{ scale: isLoading ? 1 : 0.98 }}
                        type="button"
                        className={`flex-1 inline-flex justify-center items-center px-4 py-3 text-white text-sm font-medium rounded-xl shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 ${styles.confirmButton}`}
                        onClick={onConfirm}
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                            Processing...
                          </>
                        ) : (
                          <>
                            <IconComponent className="h-4 w-4 mr-2" />
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
    </ModalPortal>
  )
}