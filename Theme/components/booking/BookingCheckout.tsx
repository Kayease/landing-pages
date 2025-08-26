'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  CreditCardIcon, 
  TicketIcon,
  ClockIcon,
  MapPinIcon,
  CalendarIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline'
import { DiscountCodeInput } from './DiscountCodeInput'
import { DiscountSummary } from './DiscountSummary'
import { AutoApplyDiscount } from './AutoApplyDiscount'
import { type DiscountValidationResponse } from '@/lib/services/discount.service'
import toast from 'react-hot-toast'

interface BookingDetails {
  showId: string
  showTitle: string
  showDate: string
  showTime: string
  venue: string
  seats: Array<{
    id: string
    row: string
    number: number
    price: number
  }>
}

interface BookingCheckoutProps {
  bookingDetails: BookingDetails
  onBookingComplete: (bookingData: any) => void
  className?: string
}

export function BookingCheckout({ 
  bookingDetails, 
  onBookingComplete,
  className = '' 
}: BookingCheckoutProps) {
  const [appliedDiscount, setAppliedDiscount] = useState<DiscountValidationResponse['discount'] | null>(null)
  const [autoAppliedDiscount, setAutoAppliedDiscount] = useState<any>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: ''
  })

  // Calculate amounts - prioritize manual discount over auto-applied
  const originalAmount = bookingDetails.seats.reduce((total, seat) => total + seat.price, 0)
  const activeDiscount = appliedDiscount || autoAppliedDiscount
  const discountAmount = activeDiscount?.discount_amount || 0
  const finalAmount = originalAmount - discountAmount
  const taxAmount = Math.round(finalAmount * 0.18) // 18% GST
  const totalAmount = finalAmount + taxAmount

  const handleAutoDiscountApplied = (discount: any) => {
    // Only apply auto-discount if no manual discount is applied
    if (!appliedDiscount) {
      setAutoAppliedDiscount(discount)
    }
  }

  const handleDiscountApplied = (discount: DiscountValidationResponse['discount']) => {
    setAppliedDiscount(discount)
    // Clear auto-applied discount when manual discount is applied
    setAutoAppliedDiscount(null)
  }

  const handleDiscountRemoved = () => {
    setAppliedDiscount(null)
    // Auto-discount will be re-applied by the AutoApplyDiscount component
  }

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!customerInfo.name || !customerInfo.email || !customerInfo.phone) {
      toast.error('Please fill in all required fields')
      return
    }

    try {
      setIsProcessing(true)
      
      // Simulate booking API call
      const bookingData = {
        ...bookingDetails,
        customer: customerInfo,
        pricing: {
          original_amount: originalAmount,
          discount_amount: discountAmount,
          discount_code: appliedDiscount ? 'APPLIED_CODE' : null,
          discount_id: activeDiscount?.id || null,
          discount_type: activeDiscount ? (appliedDiscount ? 'manual' : 'auto') : null,
          final_amount: finalAmount,
          tax_amount: taxAmount,
          total_amount: totalAmount
        },
        applied_discount: activeDiscount
      }

      // Here you would make the actual booking API call
      await new Promise(resolve => setTimeout(resolve, 2000)) // Simulate API delay
      
      toast.success('Booking confirmed successfully!')
      onBookingComplete(bookingData)
      
    } catch (error: any) {
      console.error('Booking error:', error)
      toast.error('Failed to complete booking. Please try again.')
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className={`max-w-4xl mx-auto ${className}`}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Booking Details */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-sm border p-6"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Booking Details</h2>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <TicketIcon className="h-5 w-5 text-gray-400 mt-0.5" />
                <div>
                  <h3 className="font-medium text-gray-900">{bookingDetails.showTitle}</h3>
                  <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                    <div className="flex items-center space-x-1">
                      <CalendarIcon className="h-4 w-4" />
                      <span>{bookingDetails.showDate}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <ClockIcon className="h-4 w-4" />
                      <span>{bookingDetails.showTime}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1 text-sm text-gray-500 mt-1">
                    <MapPinIcon className="h-4 w-4" />
                    <span>{bookingDetails.venue}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <UserGroupIcon className="h-5 w-5 text-gray-400 mt-0.5" />
                <div>
                  <h4 className="font-medium text-gray-900">Selected Seats</h4>
                  <div className="mt-2 space-y-1">
                    {bookingDetails.seats.map((seat, index) => (
                      <div key={seat.id} className="flex justify-between text-sm">
                        <span className="text-gray-600">
                          Row {seat.row}, Seat {seat.number}
                        </span>
                        <span className="font-medium">₹{seat.price}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Customer Information Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-lg shadow-sm border p-6"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Customer Information</h2>
            
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  value={customerInfo.name}
                  onChange={(e) => setCustomerInfo(prev => ({ ...prev, name: e.target.value }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  value={customerInfo.email}
                  onChange={(e) => setCustomerInfo(prev => ({ ...prev, email: e.target.value }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={customerInfo.phone}
                  onChange={(e) => setCustomerInfo(prev => ({ ...prev, phone: e.target.value }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  required
                />
              </div>
            </form>
          </motion.div>
        </div>

        {/* Right Column - Payment Summary */}
        <div className="space-y-6">
          {/* Auto-Apply Discount Check */}
          <AutoApplyDiscount
            showId={bookingDetails.showId}
            amount={originalAmount}
            bookingDate={bookingDetails.showDate}
            onAutoDiscountApplied={handleAutoDiscountApplied}
          />

          {/* Discount Code Input */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-lg shadow-sm border p-6"
          >
            <DiscountCodeInput
              amount={originalAmount}
              showId={bookingDetails.showId}
              onDiscountApplied={handleDiscountApplied}
              onDiscountRemoved={handleDiscountRemoved}
            />
            
            {/* Info about auto-applied discount */}
            {autoAppliedDiscount && !appliedDiscount && (
              <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-700">
                  💡 <strong>Tip:</strong> We've automatically applied the best available discount for this show. 
                  You can still enter a discount code above if you have one - we'll use whichever gives you better savings!
                </p>
              </div>
            )}
          </motion.div>

          {/* Applied Discount Summary */}
          {activeDiscount && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <DiscountSummary
                appliedDiscount={activeDiscount}
                originalAmount={originalAmount}
              />
            </motion.div>
          )}

          {/* Payment Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-lg shadow-sm border p-6"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Payment Summary</h2>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal ({bookingDetails.seats.length} seats)</span>
                <span className="font-medium">₹{originalAmount}</span>
              </div>
              
              {activeDiscount && (
                <div className="flex justify-between text-green-600">
                  <span>
                    Discount Applied 
                    {appliedDiscount ? ' (Code)' : ' (Auto)'}
                  </span>
                  <span>-₹{discountAmount}</span>
                </div>
              )}
              
              <div className="flex justify-between">
                <span className="text-gray-600">GST (18%)</span>
                <span className="font-medium">₹{taxAmount}</span>
              </div>
              
              <div className="border-t pt-3">
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total Amount</span>
                  <span>₹{totalAmount}</span>
                </div>
                {activeDiscount && (
                  <p className="text-sm text-green-600 mt-1">
                    You saved ₹{discountAmount}! 
                    {!appliedDiscount && ' (Automatically applied)'}
                  </p>
                )}
              </div>
            </div>

            <button
              onClick={handleBookingSubmit}
              disabled={isProcessing}
              className="w-full mt-6 bg-indigo-600 text-white py-3 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              <CreditCardIcon className="h-5 w-5" />
              <span>
                {isProcessing ? 'Processing...' : `Pay ₹${totalAmount}`}
              </span>
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
