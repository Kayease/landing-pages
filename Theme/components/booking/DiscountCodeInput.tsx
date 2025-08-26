'use client'

import { useState, useEffect } from 'react'
import { 
  TicketIcon, 
  CheckCircleIcon, 
  XCircleIcon,
  ExclamationTriangleIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline'
import { discountService, type DiscountValidationResponse } from '@/lib/services/discount.service'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'

interface DiscountCodeInputProps {
  amount: number
  showId?: string
  onDiscountApplied: (discount: DiscountValidationResponse['discount']) => void
  onDiscountRemoved: () => void
  className?: string
}

export function DiscountCodeInput({ 
  amount, 
  showId, 
  onDiscountApplied, 
  onDiscountRemoved,
  className = '' 
}: DiscountCodeInputProps) {
  const [code, setCode] = useState('')
  const [isValidating, setIsValidating] = useState(false)
  const [validationResult, setValidationResult] = useState<DiscountValidationResponse | null>(null)
  const [appliedDiscount, setAppliedDiscount] = useState<DiscountValidationResponse['discount'] | null>(null)

  // Reset validation when amount or show changes
  useEffect(() => {
    if (appliedDiscount && code) {
      validateDiscount(code, false) // Re-validate silently
    }
  }, [amount, showId])

  const validateDiscount = async (discountCode: string, showFeedback = true) => {
    if (!discountCode.trim()) {
      setValidationResult(null)
      setAppliedDiscount(null)
      onDiscountRemoved()
      return
    }

    try {
      setIsValidating(true)
      const result = await discountService.validateDiscountCode(discountCode, amount, showId)
      
      setValidationResult(result)
      
      if (result.valid && result.discount) {
        setAppliedDiscount(result.discount)
        onDiscountApplied(result.discount)
        if (showFeedback) {
          toast.success(`Discount applied! You saved ₹${result.discount.discount_amount}`)
        }
      } else {
        setAppliedDiscount(null)
        onDiscountRemoved()
        if (showFeedback) {
          toast.error(result.message || 'Invalid discount code')
        }
      }
    } catch (error: any) {
      setValidationResult({ valid: false, message: error.message })
      setAppliedDiscount(null)
      onDiscountRemoved()
      if (showFeedback) {
        toast.error('Failed to validate discount code')
      }
    } finally {
      setIsValidating(false)
    }
  }

  const handleApplyDiscount = () => {
    if (code.trim()) {
      validateDiscount(code.trim())
    }
  }

  const handleRemoveDiscount = () => {
    setCode('')
    setValidationResult(null)
    setAppliedDiscount(null)
    onDiscountRemoved()
    toast.success('Discount removed')
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleApplyDiscount()
    }
  }

  const getStatusIcon = () => {
    if (isValidating) {
      return <ArrowPathIcon className="h-5 w-5 text-gray-400 animate-spin" />
    }
    
    if (validationResult?.valid) {
      return <CheckCircleIcon className="h-5 w-5 text-green-500" />
    }
    
    if (validationResult && !validationResult.valid) {
      return <XCircleIcon className="h-5 w-5 text-red-500" />
    }
    
    return <TicketIcon className="h-5 w-5 text-gray-400" />
  }

  const getInputBorderClass = () => {
    if (validationResult?.valid) {
      return 'border-green-300 focus:border-green-500 focus:ring-green-500'
    }
    
    if (validationResult && !validationResult.valid) {
      return 'border-red-300 focus:border-red-500 focus:ring-red-500'
    }
    
    return 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
  }

  return (
    <div className={`space-y-3 ${className}`}>
      <div className="flex items-center space-x-2">
        <TicketIcon className="h-5 w-5 text-gray-500" />
        <label htmlFor="discount-code" className="text-sm font-medium text-gray-700">
          Have a discount code?
        </label>
      </div>

      <div className="flex space-x-2">
        <div className="flex-1 relative">
          <input
            type="text"
            id="discount-code"
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            onKeyPress={handleKeyPress}
            placeholder="Enter discount code"
            disabled={isValidating}
            className={`block w-full rounded-md shadow-sm sm:text-sm pl-10 pr-10 ${getInputBorderClass()} disabled:opacity-50 disabled:cursor-not-allowed`}
          />
          
          {/* Left icon */}
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {getStatusIcon()}
          </div>

          {/* Right clear button */}
          {code && (
            <button
              type="button"
              onClick={() => setCode('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              <XCircleIcon className="h-4 w-4 text-gray-400 hover:text-gray-600" />
            </button>
          )}
        </div>

        {!appliedDiscount ? (
          <button
            type="button"
            onClick={handleApplyDiscount}
            disabled={!code.trim() || isValidating}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isValidating ? 'Applying...' : 'Apply'}
          </button>
        ) : (
          <button
            type="button"
            onClick={handleRemoveDiscount}
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Remove
          </button>
        )}
      </div>

      {/* Validation feedback */}
      <AnimatePresence>
        {validationResult && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`flex items-start space-x-2 text-sm ${
              validationResult.valid ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {validationResult.valid ? (
              <CheckCircleIcon className="h-4 w-4 mt-0.5 flex-shrink-0" />
            ) : (
              <ExclamationTriangleIcon className="h-4 w-4 mt-0.5 flex-shrink-0" />
            )}
            <div>
              {validationResult.valid ? (
                <div>
                  <p className="font-medium">Discount Applied!</p>
                  {validationResult.discount && (
                    <p className="text-xs mt-1">
                      {validationResult.discount.name} - 
                      {validationResult.discount.type === 'percentage' 
                        ? ` ${validationResult.discount.value}% off` 
                        : ` ₹${validationResult.discount.value} off`
                      }
                    </p>
                  )}
                </div>
              ) : (
                <p>{validationResult.message}</p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Applied discount summary */}
      {appliedDiscount && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-green-50 border border-green-200 rounded-lg p-3"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <CheckCircleIcon className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-sm font-medium text-green-800">
                  {appliedDiscount.name}
                </p>
                <p className="text-xs text-green-600">
                  Code: {code}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-green-800">
                -₹{appliedDiscount.discount_amount}
              </p>
              <p className="text-xs text-green-600">
                You saved ₹{appliedDiscount.discount_amount}!
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}
