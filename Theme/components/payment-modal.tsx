"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CreditCard, CheckCircle, Loader2, X } from "lucide-react"

interface PaymentModalProps {
  isOpen: boolean
  onClose: () => void
  bookingData: any
  onSuccess: () => void
}

export function PaymentModal({ isOpen, onClose, bookingData, onSuccess }: PaymentModalProps) {
  const [paymentStep, setPaymentStep] = useState<'form' | 'processing' | 'success'>('form')
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
    email: ''
  })

  const handlePayment = async () => {
    setPaymentStep('processing')
    
    // Simulate payment processing
    setTimeout(() => {
      setPaymentStep('success')
      setTimeout(() => {
        onSuccess()
        onClose()
        setPaymentStep('form')
      }, 2000)
    }, 3000)
  }

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    const matches = v.match(/\d{4,16}/g)
    const match = matches && matches[0] || ''
    const parts = []
    
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }
    
    if (parts.length) {
      return parts.join(' ')
    } else {
      return v
    }
  }

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4)
    }
    return v
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-slate-800/95 border-slate-700 backdrop-blur-lg max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl text-white font-cosmic flex items-center gap-2">
            <CreditCard className="w-5 h-5" />
            Complete Payment
          </DialogTitle>
        </DialogHeader>

        <AnimatePresence mode="wait">
          {paymentStep === 'form' && (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4"
            >
              {/* Booking Summary */}
              <div className="p-3 bg-slate-900/50 rounded-lg border border-slate-700">
                <h4 className="font-semibold text-white mb-2">Booking Summary</h4>
                <div className="text-sm text-slate-300 space-y-1">
                  <div className="flex justify-between">
                    <span>Amount:</span>
                    <span className="text-white">₹{bookingData.totalAmount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tickets:</span>
                    <span className="text-white">{bookingData.quantity}</span>
                  </div>
                </div>
              </div>

              {/* Payment Form */}
              <div className="space-y-4">
                <div>
                  <Label className="text-sm font-medium text-slate-300">Card Number</Label>
                  <Input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    value={paymentData.cardNumber}
                    onChange={(e) => setPaymentData(prev => ({
                      ...prev,
                      cardNumber: formatCardNumber(e.target.value)
                    }))}
                    maxLength={19}
                    className="bg-slate-900/50 border-slate-700 text-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-slate-300">Expiry Date</Label>
                    <Input
                      type="text"
                      placeholder="MM/YY"
                      value={paymentData.expiryDate}
                      onChange={(e) => setPaymentData(prev => ({
                        ...prev,
                        expiryDate: formatExpiryDate(e.target.value)
                      }))}
                      maxLength={5}
                      className="bg-slate-900/50 border-slate-700 text-white"
                    />
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-slate-300">CVV</Label>
                    <Input
                      type="password"
                      placeholder="123"
                      value={paymentData.cvv}
                      onChange={(e) => setPaymentData(prev => ({
                        ...prev,
                        cvv: e.target.value.replace(/\D/g, '').slice(0, 4)
                      }))}
                      maxLength={4}
                      className="bg-slate-900/50 border-slate-700 text-white"
                    />
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium text-slate-300">Cardholder Name</Label>
                  <Input
                    type="text"
                    placeholder="John Doe"
                    value={paymentData.cardholderName}
                    onChange={(e) => setPaymentData(prev => ({
                      ...prev,
                      cardholderName: e.target.value
                    }))}
                    className="bg-slate-900/50 border-slate-700 text-white"
                  />
                </div>

                <div>
                  <Label className="text-sm font-medium text-slate-300">Email</Label>
                  <Input
                    type="email"
                    placeholder="john@example.com"
                    value={paymentData.email}
                    onChange={(e) => setPaymentData(prev => ({
                      ...prev,
                      email: e.target.value
                    }))}
                    className="bg-slate-900/50 border-slate-700 text-white"
                  />
                </div>
              </div>

              <Button
                onClick={handlePayment}
                className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                disabled={!paymentData.cardNumber || !paymentData.expiryDate || !paymentData.cvv || !paymentData.cardholderName || !paymentData.email}
              >
                Pay ₹{bookingData.totalAmount}
              </Button>
            </motion.div>
          )}

          {paymentStep === 'processing' && (
            <motion.div
              key="processing"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="text-center py-8"
            >
              <Loader2 className="w-12 h-12 text-blue-500 animate-spin mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Processing Payment</h3>
              <p className="text-slate-300">Please wait while we secure your booking...</p>
            </motion.div>
          )}

          {paymentStep === 'success' && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="text-center py-8"
            >
              <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Payment Successful!</h3>
              <p className="text-slate-300 mb-4">Your cosmic adventure has been booked successfully.</p>
              <div className="p-3 bg-green-500/20 rounded-lg border border-green-500/30">
                <p className="text-sm text-green-400">
                  Booking confirmation will be sent to your email shortly.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  )
} 