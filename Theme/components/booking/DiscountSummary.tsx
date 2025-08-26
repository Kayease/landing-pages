'use client'

import { motion } from 'framer-motion'
import { 
  TicketIcon, 
  CheckCircleIcon, 
  TagIcon,
  SparklesIcon
} from '@heroicons/react/24/outline'
import { type DiscountValidationResponse } from '@/lib/services/discount.service'

interface DiscountSummaryProps {
  appliedDiscount: DiscountValidationResponse['discount']
  originalAmount: number
  className?: string
  variant?: 'compact' | 'detailed'
  showSavings?: boolean
}

export function DiscountSummary({ 
  appliedDiscount, 
  originalAmount,
  className = '',
  variant = 'detailed',
  showSavings = true
}: DiscountSummaryProps) {
  if (!appliedDiscount) return null

  const discountAmount = appliedDiscount.discount_amount
  const finalAmount = appliedDiscount.final_amount
  const savingsPercentage = ((discountAmount / originalAmount) * 100).toFixed(1)

  if (variant === 'compact') {
    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className={`flex items-center justify-between py-2 ${className}`}
      >
        <div className="flex items-center space-x-2">
          <TicketIcon className="h-4 w-4 text-green-500" />
          <span className="text-sm text-gray-600">
            {appliedDiscount.name}
          </span>
        </div>
        <span className="text-sm font-medium text-green-600">
          -₹{discountAmount}
        </span>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-4 ${className}`}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircleIcon className="h-6 w-6 text-green-600" />
            </div>
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2">
              <h4 className="text-sm font-medium text-green-800">
                Discount Applied
              </h4>
              <SparklesIcon className="h-4 w-4 text-green-500" />
            </div>
            
            <p className="text-sm text-green-700 mt-1">
              {appliedDiscount.name}
            </p>
            
            <div className="flex items-center space-x-2 mt-2">
              <TagIcon className="h-4 w-4 text-green-500" />
              <span className="text-xs font-mono bg-green-100 text-green-800 px-2 py-1 rounded">
                {appliedDiscount.type === 'percentage' 
                  ? `${appliedDiscount.value}% OFF` 
                  : `₹${appliedDiscount.value} OFF`
                }
              </span>
            </div>
          </div>
        </div>

        <div className="text-right">
          <div className="text-lg font-bold text-green-600">
            -₹{discountAmount}
          </div>
          {showSavings && (
            <div className="text-xs text-green-600 mt-1">
              {savingsPercentage}% savings
            </div>
          )}
        </div>
      </div>

      {/* Breakdown */}
      <div className="mt-4 pt-4 border-t border-green-200">
        <div className="space-y-2 text-sm">
          <div className="flex justify-between text-gray-600">
            <span>Original Amount:</span>
            <span>₹{originalAmount}</span>
          </div>
          <div className="flex justify-between text-green-600">
            <span>Discount:</span>
            <span>-₹{discountAmount}</span>
          </div>
          <div className="flex justify-between font-semibold text-gray-900 pt-2 border-t border-green-200">
            <span>Final Amount:</span>
            <span>₹{finalAmount}</span>
          </div>
        </div>
      </div>

      {/* Savings highlight */}
      {showSavings && (
        <div className="mt-3 text-center">
          <div className="inline-flex items-center space-x-1 bg-green-100 text-green-800 text-xs font-medium px-3 py-1 rounded-full">
            <SparklesIcon className="h-3 w-3" />
            <span>You saved ₹{discountAmount} on this booking!</span>
          </div>
        </div>
      )}
    </motion.div>
  )
}

// Compact version for use in lists or smaller spaces
export function CompactDiscountSummary({ 
  appliedDiscount, 
  originalAmount, 
  className = '' 
}: Omit<DiscountSummaryProps, 'variant'>) {
  return (
    <DiscountSummary
      appliedDiscount={appliedDiscount}
      originalAmount={originalAmount}
      className={className}
      variant="compact"
      showSavings={false}
    />
  )
}

// Inline discount badge for showing in ticket/booking cards
export function DiscountBadge({ 
  appliedDiscount,
  className = ''
}: { 
  appliedDiscount: DiscountValidationResponse['discount']
  className?: string 
}) {
  if (!appliedDiscount) return null

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`inline-flex items-center space-x-1 bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full ${className}`}
    >
      <TicketIcon className="h-3 w-3" />
      <span>
        {appliedDiscount.type === 'percentage' 
          ? `${appliedDiscount.value}% OFF` 
          : `₹${appliedDiscount.value} OFF`
        }
      </span>
    </motion.div>
  )
}
