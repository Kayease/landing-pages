'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  SparklesIcon, 
  GiftIcon,
  CheckCircleIcon,
  TagIcon
} from '@heroicons/react/24/outline'
import { discountService } from '@/lib/services/discount.service'
import toast from 'react-hot-toast'

interface AutoApplyDiscountProps {
  showId: string
  amount: number
  bookingDate?: string
  onAutoDiscountApplied: (discount: any) => void
  className?: string
}

export function AutoApplyDiscount({ 
  showId, 
  amount, 
  bookingDate,
  onAutoDiscountApplied,
  className = '' 
}: AutoApplyDiscountProps) {
  const [autoDiscounts, setAutoDiscounts] = useState<any[]>([])
  const [bestDiscount, setBestDiscount] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [showDiscountInfo, setShowDiscountInfo] = useState(false)

  useEffect(() => {
    if (showId && amount > 0) {
      checkAutoApplyDiscounts()
    }
  }, [showId, amount, bookingDate])

  const checkAutoApplyDiscounts = async () => {
    try {
      setIsLoading(true)
      const response = await discountService.getAutoApplyDiscounts(showId, amount, bookingDate)
      
      if (response.success && response.discounts.length > 0) {
        setAutoDiscounts(response.discounts)
        setBestDiscount(response.best_discount)
        
        // Automatically apply the best discount
        if (response.best_discount) {
          onAutoDiscountApplied(response.best_discount)
          setShowDiscountInfo(true)
          
          // Show success message
          toast.success(
            `🎉 Great! We've automatically applied a ${response.best_discount.type === 'percentage' 
              ? `${response.best_discount.value}%` 
              : `₹${response.best_discount.value}`
            } discount for you!`,
            { duration: 4000 }
          )
        }
      } else {
        setAutoDiscounts([])
        setBestDiscount(null)
        setShowDiscountInfo(false)
      }
    } catch (error) {
      console.error('Error checking auto-apply discounts:', error)
      setAutoDiscounts([])
      setBestDiscount(null)
      setShowDiscountInfo(false)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className={`${className}`}>
        <div className="flex items-center justify-center py-4">
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-indigo-600"></div>
          <span className="ml-2 text-sm text-gray-600">Checking for available discounts...</span>
        </div>
      </div>
    )
  }

  if (!bestDiscount) {
    return null
  }

  return (
    <AnimatePresence>
      {showDiscountInfo && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          transition={{ duration: 0.3 }}
          className={`${className}`}
        >
          <div className="bg-gradient-to-r from-green-50 via-emerald-50 to-teal-50 border border-green-200 rounded-xl p-4 shadow-sm">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-sm">
                  <SparklesIcon className="h-5 w-5 text-white" />
                </div>
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-2">
                  <GiftIcon className="h-4 w-4 text-green-600" />
                  <h3 className="text-sm font-semibold text-green-800">
                    Automatic Discount Applied!
                  </h3>
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 0.5, repeat: 2 }}
                  >
                    <CheckCircleIcon className="h-4 w-4 text-green-600" />
                  </motion.div>
                </div>
                
                <p className="text-sm text-green-700 mb-3">
                  <strong>{bestDiscount.name}</strong>
                  {bestDiscount.description && (
                    <span className="block text-xs text-green-600 mt-1">
                      {bestDiscount.description}
                    </span>
                  )}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <TagIcon className="h-4 w-4 text-green-500" />
                    <span className="text-xs font-medium bg-green-100 text-green-800 px-2 py-1 rounded-full">
                      {bestDiscount.type === 'percentage' 
                        ? `${bestDiscount.value}% OFF` 
                        : `₹${bestDiscount.value} OFF`
                      }
                    </span>
                    <span className="text-xs text-green-600">
                      • Auto Applied
                    </span>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-sm font-bold text-green-600">
                      -₹{bestDiscount.discount_amount}
                    </div>
                    <div className="text-xs text-green-600">
                      You saved ₹{bestDiscount.discount_amount}!
                    </div>
                  </div>
                </div>
                
                {/* Additional available discounts */}
                {autoDiscounts.length > 1 && (
                  <div className="mt-3 pt-3 border-t border-green-200">
                    <p className="text-xs text-green-600">
                      💡 This is the best available discount for your booking. 
                      {autoDiscounts.length - 1} other discount{autoDiscounts.length - 1 !== 1 ? 's are' : ' is'} also available but with lower savings.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Compact version for smaller spaces
export function CompactAutoApplyDiscount({ 
  bestDiscount,
  className = '' 
}: { 
  bestDiscount: any
  className?: string 
}) {
  if (!bestDiscount) return null

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className={`inline-flex items-center space-x-2 bg-green-100 text-green-800 text-xs font-medium px-3 py-1 rounded-full ${className}`}
    >
      <SparklesIcon className="h-3 w-3" />
      <span>
        Auto: {bestDiscount.type === 'percentage' 
          ? `${bestDiscount.value}% OFF` 
          : `₹${bestDiscount.value} OFF`
        }
      </span>
      <span className="font-bold">-₹{bestDiscount.discount_amount}</span>
    </motion.div>
  )
}

// Show discount badge for display on show cards/listings
export function ShowDiscountBadge({ 
  showId,
  sampleAmount = 1000,
  className = ''
}: {
  showId: string
  sampleAmount?: number
  className?: string
}) {
  const [hasDiscount, setHasDiscount] = useState(false)
  const [discountInfo, setDiscountInfo] = useState<any>(null)

  useEffect(() => {
    checkShowDiscount()
  }, [showId])

  const checkShowDiscount = async () => {
    try {
      const response = await discountService.getAutoApplyDiscounts(showId, sampleAmount)
      if (response.success && response.best_discount) {
        setHasDiscount(true)
        setDiscountInfo(response.best_discount)
      } else {
        setHasDiscount(false)
        setDiscountInfo(null)
      }
    } catch (error) {
      setHasDiscount(false)
      setDiscountInfo(null)
    }
  }

  if (!hasDiscount || !discountInfo) return null

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`absolute top-2 right-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md ${className}`}
    >
      <div className="flex items-center space-x-1">
        <SparklesIcon className="h-3 w-3" />
        <span>
          {discountInfo.type === 'percentage' 
            ? `${discountInfo.value}% OFF` 
            : `₹${discountInfo.value} OFF`
          }
        </span>
      </div>
    </motion.div>
  )
}
