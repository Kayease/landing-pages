'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ExclamationTriangleIcon,
  XMarkIcon,
  TrashIcon,
  ShieldExclamationIcon
} from '@heroicons/react/24/outline'

interface BasicModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  message: string
  confirmText?: string
  requireConfirmation?: boolean
  isDestructive?: boolean
  icon?: 'warning' | 'danger' | 'shield'
}

export function BasicModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Delete",
  requireConfirmation = false,
  isDestructive = true,
  icon = 'warning'
}: BasicModalProps) {
  const [confirmInput, setConfirmInput] = useState('')
  const [isConfirming, setIsConfirming] = useState(false)

  const isConfirmDisabled = requireConfirmation && confirmInput.toLowerCase() !== 'delete'

  // Reset confirmation input when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setConfirmInput('')
      setIsConfirming(false)
    }
  }, [isOpen])

  const handleConfirm = async () => {
    if (isConfirmDisabled) return

    setIsConfirming(true)
    try {
      await onConfirm()
    } finally {
      setIsConfirming(false)
    }
  }

  const getIcon = () => {
    switch (icon) {
      case 'danger':
        return TrashIcon
      case 'shield':
        return ShieldExclamationIcon
      default:
        return ExclamationTriangleIcon
    }
  }

  const IconComponent = getIcon()

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          {/* Enhanced Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/10 backdrop-blur-sm rounded-xl"
            onClick={onClose}
          />

          {/* Enhanced Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="relative bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-md w-full border border-slate-200 dark:border-slate-700 overflow-hidden"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all duration-200"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>

            {/* Content */}
            <div className="p-6 sm:p-8">
              {/* Icon */}
              <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-full bg-red-100 dark:bg-red-900/20">
                <IconComponent className="h-6 w-6 text-red-600 dark:text-red-400" />
              </div>

              {/* Title */}
              <h2 className="text-xl font-bold text-center text-slate-900 dark:text-white mb-2">
                {title}
              </h2>

              {/* Message */}
              <p className="text-center text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
                {message}
              </p>

              {/* Confirmation Input */}
              {requireConfirmation && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Type <span className="font-semibold text-red-600 dark:text-red-400">delete</span> to confirm:
                  </label>
                  <input
                    type="text"
                    value={confirmInput}
                    onChange={(e) => setConfirmInput(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-red-500 dark:focus:ring-red-400 focus:border-transparent transition-all duration-200"
                    placeholder="Type 'delete' here"
                    autoComplete="off"
                  />
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onClose}
                  disabled={isConfirming}
                  className="flex-1 px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-xl text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-700 hover:bg-slate-50 dark:hover:bg-slate-600 font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancel
                </motion.button>

                <motion.button
                  whileHover={!isConfirmDisabled && !isConfirming ? { scale: 1.02 } : {}}
                  whileTap={!isConfirmDisabled && !isConfirming ? { scale: 0.98 } : {}}
                  onClick={handleConfirm}
                  disabled={isConfirmDisabled || isConfirming}
                  className={`flex-1 px-4 py-3 rounded-xl font-medium transition-all duration-200 flex items-center justify-center space-x-2 ${isDestructive
                      ? 'bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-500/25'
                      : 'bg-purple-600 hover:bg-purple-700 text-white shadow-lg shadow-purple-500/25'
                    } ${(isConfirmDisabled || isConfirming)
                      ? 'opacity-50 cursor-not-allowed'
                      : 'hover:shadow-xl'
                    }`}
                >
                  {isConfirming ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                      <span>Deleting...</span>
                    </>
                  ) : (
                    <>
                      <TrashIcon className="h-4 w-4" />
                      <span>{confirmText}</span>
                    </>
                  )}
                </motion.button>
              </div>

              {/* Warning Footer */}
              {isDestructive && (
                <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/10 rounded-lg border border-red-200 dark:border-red-800">
                  <div className="flex items-center space-x-2">
                    <ExclamationTriangleIcon className="h-4 w-4 text-red-500 dark:text-red-400 flex-shrink-0" />
                    <p className="text-xs text-red-600 dark:text-red-400">
                      This action cannot be undone. The item will be permanently deleted.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
