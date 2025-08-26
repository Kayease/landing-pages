'use client'

import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationTriangleIcon, TrashIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { motion } from 'framer-motion'

interface BulkDeleteModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  itemCount: number
  itemType?: string
  isLoading?: boolean
  selectedItems?: Array<{ id: string; name: string }>
}

export function BulkDeleteModal({
  isOpen,
  onClose,
  onConfirm,
  itemCount,
  itemType = 'items',
  isLoading = false,
  selectedItems = []
}: BulkDeleteModalProps) {
  const displayItems = selectedItems.slice(0, 5) // Show max 5 items
  const hasMore = selectedItems.length > 5

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
              <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white dark:bg-slate-800 p-6 text-left align-middle shadow-xl border border-slate-200 dark:border-slate-700 transition-all">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/20">
                        <ExclamationTriangleIcon className="h-6 w-6 text-red-600 dark:text-red-400" />
                      </div>
                      <div>
                        <Dialog.Title
                          as="h3"
                          className="text-lg font-semibold leading-6 text-slate-900 dark:text-slate-100"
                        >
                          Delete Multiple {itemType.charAt(0).toUpperCase() + itemType.slice(1)}
                        </Dialog.Title>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                          {itemCount} {itemType} selected
                        </p>
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
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                      Are you sure you want to delete {itemCount} {itemType}? This action cannot be undone.
                    </p>

                    {/* Selected Items Preview */}
                    {selectedItems.length > 0 && (
                      <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-3 mb-4">
                        <h4 className="text-xs font-medium text-slate-700 dark:text-slate-300 mb-2 uppercase tracking-wide">
                          Selected {itemType}:
                        </h4>
                        <div className="space-y-1">
                          {displayItems.map((item, index) => (
                            <div key={item.id} className="flex items-center space-x-2 text-sm">
                              <div className="w-2 h-2 bg-slate-400 dark:bg-slate-500 rounded-full"></div>
                              <span className="text-slate-600 dark:text-slate-400 truncate">
                                {item.name}
                              </span>
                            </div>
                          ))}
                          {hasMore && (
                            <div className="flex items-center space-x-2 text-sm">
                              <div className="w-2 h-2 bg-slate-400 dark:bg-slate-500 rounded-full"></div>
                              <span className="text-slate-500 dark:text-slate-500 italic">
                                and {selectedItems.length - 5} more...
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                    
                    {/* Warning */}
                    <div className="p-3 rounded-lg border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20">
                      <div className="flex items-start space-x-2">
                        <TrashIcon className="h-4 w-4 mt-0.5 text-red-600 dark:text-red-400" />
                        <div className="text-xs">
                          <p className="font-medium text-red-800 dark:text-red-200">
                            Critical Warning: Irreversible Action
                          </p>
                          <p className="mt-1 text-red-800 dark:text-red-200">
                            This will permanently delete all selected {itemType} and their associated data including:
                          </p>
                          <ul className="mt-1 ml-4 list-disc text-red-700 dark:text-red-300">
                            <li>Show information and metadata</li>
                            <li>Scheduling and timing data</li>
                            <li>Pricing and booking configurations</li>
                            <li>Any related booking history</li>
                          </ul>
                        </div>
                      </div>
                    </div>
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
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                      onClick={onConfirm}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                          Deleting {itemCount} {itemType}...
                        </>
                      ) : (
                        <>
                          <TrashIcon className="h-4 w-4 mr-2" />
                          Delete {itemCount} {itemType}
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