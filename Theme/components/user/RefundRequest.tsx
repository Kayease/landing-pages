/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "react-hot-toast";
import {
  ExclamationTriangleIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  CurrencyRupeeIcon,
} from "@heroicons/react/24/outline";

const refundSchema = z.object({
  amount: z.number().min(0.01, "Amount must be greater than 0"),
  reason: z
    .string()
    .min(10, "Reason must be at least 10 characters")
    .max(500, "Reason must be less than 500 characters"),
});

type RefundFormData = z.infer<typeof refundSchema>;

interface Booking {
  id: string;
  show_name: string;
  show_date: string;
  ticket_count: number;
  total_amount: number;
  status: string;
  created_date: string;
}

interface RefundRequestProps {
  booking: Booking;
  onRefundRequested?: () => void;
}

export function RefundRequest({
  booking,
  onRefundRequested,
}: RefundRequestProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [existingRefund, setExistingRefund] = useState<any>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<RefundFormData>({
    resolver: zodResolver(refundSchema),
    defaultValues: {
      amount: booking.total_amount,
      reason: "",
    },
  });

  const watchedAmount = watch("amount");

  // Check if refund already exists
  useEffect(() => {
    checkExistingRefund();
  }, [booking.id]);

  const checkExistingRefund = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/refunds/user?booking_id=${booking.id}`
      );
      if (response.ok) {
        const data = await response.json();
        if (data.refunds && data.refunds.length > 0) {
          setExistingRefund(data.refunds[0]);
        }
      }
    } catch (error) {
      console.error("Error checking existing refund:", error);
    }
  };

  const onSubmit = async (data: RefundFormData) => {
    if (data.amount > booking.total_amount) {
      toast.error("Refund amount cannot exceed booking amount");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/refunds`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          booking_id: booking.id,
          amount: data.amount,
          reason: data.reason,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        toast.success("Refund request submitted successfully");
        setShowForm(false);
        reset();
        onRefundRequested?.();
        checkExistingRefund(); // Refresh to show existing refund
      } else {
        const error = await response.json();
        toast.error(error.message || "Failed to submit refund request");
      }
    } catch (error) {
      console.error("Error submitting refund:", error);
      toast.error("Failed to submit refund request");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <ClockIcon className="h-5 w-5 text-yellow-500" />;
      case "approved":
        return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
      case "rejected":
        return <XCircleIcon className="h-5 w-5 text-red-500" />;
      case "processing":
        return <ClockIcon className="h-5 w-5 text-blue-500 animate-spin" />;
      case "completed":
        return <CheckCircleIcon className="h-5 w-5 text-green-600" />;
      case "failed":
        return <XCircleIcon className="h-5 w-5 text-red-600" />;
      default:
        return <ClockIcon className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "approved":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      case "processing":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "pending":
        return "Pending Review";
      case "approved":
        return "Approved";
      case "rejected":
        return "Rejected";
      case "processing":
        return "Processing";
      case "completed":
        return "Completed";
      case "failed":
        return "Failed";
      default:
        return "Unknown";
    }
  };

  // If refund already exists, show status
  if (existingRefund) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Refund Status</h3>
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
              existingRefund.status
            )}`}
          >
            {getStatusText(existingRefund.status)}
          </span>
        </div>

        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            {getStatusIcon(existingRefund.status)}
            <div>
              <p className="text-sm text-gray-600">
                Status: {getStatusText(existingRefund.status)}
              </p>
              <p className="text-sm text-gray-500">
                Requested on{" "}
                {new Date(existingRefund.created_at).toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm font-medium text-gray-700 mb-2">
              Refund Details:
            </p>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Amount:</span>
                <span className="ml-2 font-medium">
                  ₹{existingRefund.amount}
                </span>
              </div>
              <div>
                <span className="text-gray-600">Reason:</span>
                <span className="ml-2">{existingRefund.reason}</span>
              </div>
            </div>
            {existingRefund.admin_notes && (
              <div className="mt-3 pt-3 border-t border-gray-200">
                <p className="text-sm text-gray-600 mb-1">Admin Notes:</p>
                <p className="text-sm text-gray-700">
                  {existingRefund.admin_notes}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Show refund form
  if (showForm) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Request Refund
          </h3>
          <button
            onClick={() => setShowForm(false)}
            className="text-gray-400 hover:text-gray-600"
          >
            <XCircleIcon className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Refund Amount (₹)
            </label>
            <input
              type="number"
              step="0.01"
              min="0.01"
              max={booking.total_amount}
              {...register("amount", { valueAsNumber: true })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {errors.amount && (
              <p className="mt-1 text-sm text-red-600">
                {errors.amount.message}
              </p>
            )}
            <p className="mt-1 text-sm text-gray-500">
              Maximum refund amount: ₹{booking.total_amount}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Reason for Refund
            </label>
            <textarea
              {...register("reason")}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Please provide a detailed reason for your refund request..."
            />
            {errors.reason && (
              <p className="mt-1 text-sm text-red-600">
                {errors.reason.message}
              </p>
            )}
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <ExclamationTriangleIcon className="h-5 w-5 text-blue-600 mt-0.5" />
              <div className="text-sm text-blue-800">
                <p className="font-medium">Important Information:</p>
                <ul className="mt-2 space-y-1">
                  <li>• Refunds can only be requested for future shows</li>
                  <li>• Processing time: 3-5 business days</li>
                  <li>• Admin approval required for all refunds</li>
                  <li>• Partial refunds are allowed</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Submitting..." : "Submit Refund Request"}
            </button>
          </div>
        </form>
      </div>
    );
  }

  // Show refund button
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Refund Options</h3>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <CurrencyRupeeIcon className="h-4 w-4" />
          <span>Total: ₹{booking.total_amount}</span>
        </div>
      </div>

      <div className="space-y-4">
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-sm text-gray-700 mb-3">
            Need to cancel your booking? You can request a refund if the show
            hasn&apos;t started yet.
          </p>

          <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
            <div>
              <span className="font-medium">Show Date:</span>
              <span className="ml-2">
                {new Date(booking.show_date).toLocaleDateString()}
              </span>
            </div>
            <div>
              <span className="font-medium">Tickets:</span>
              <span className="ml-2">{booking.ticket_count}</span>
            </div>
          </div>
        </div>

        <button
          onClick={() => setShowForm(true)}
          className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Request Refund
        </button>
      </div>
    </div>
  );
}
