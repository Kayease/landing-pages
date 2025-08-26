"use client";
import { useState } from "react";
import { createPortal } from "react-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import {
  XMarkIcon,
  EnvelopeIcon,
  ArrowPathIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import { z } from "zod";

const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

interface SimpleForgotPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SimpleForgotPasswordModal({
  isOpen,
  onClose,
}: SimpleForgotPasswordModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setIsLoading(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/forgot-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: data.email }),
        }
      );

      const result = await response.json();

      if (response.ok) {
        setIsSuccess(true);

        // Auto close after 5 seconds
        setTimeout(() => {
          handleClose();
        }, 5000);
      } else {
        console.error(
          "❌ API Error:",
          result.message || "Failed to send reset email"
        );
        alert(`Error: ${result.message || "Failed to send reset email"}`);
      }
    } catch (error) {
      console.error("❌ Network error:", error);
      alert("Network error. Please check if the backend server is running.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setIsSuccess(false);
    setIsLoading(false);
    reset();
    onClose();
  };

  if (!isOpen) return null;

  const modalContent = (
    <div
      className="fixed inset-0"
      style={{
        zIndex: 2147483647,
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.9)",
        backdropFilter: "blur(8px)",
      }}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 cursor-pointer"
        onClick={handleClose}
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.9)",
          backdropFilter: "blur(8px)",
        }}
      />

      {/* Modal */}
      <div
        className="relative flex min-h-full items-center justify-center p-4"
        style={{ zIndex: 2147483647 }}
      >
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3, type: "spring" }}
              className="relative bg-white dark:bg-slate-800 rounded-3xl shadow-2xl p-8 max-w-md w-full border border-slate-200 dark:border-slate-700"
              style={{
                backgroundColor: "white",
                zIndex: 2147483647,
              }}
            >
              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>

              {/* Header */}
              <div className="text-center mb-6">
                <div className="mx-auto h-16 w-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                  <EnvelopeIcon className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                  Reset Your Password
                </h2>
                <p className="text-slate-600 dark:text-slate-400">
                  Enter your email address and we&apos;ll send you a secure link
                  to reset your password.
                </p>
              </div>

              {isSuccess ? (
                /* Success State */
                <div className="text-center space-y-6">
                  <div className="mx-auto h-20 w-20 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
                    <CheckCircleIcon className="h-12 w-12 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-2">
                      Check Your Email! 📧
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 mb-4">
                      We&apos;ve sent a password reset link to your email
                      address. Please check your inbox and follow the
                      instructions.
                    </p>
                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 mb-4 border border-blue-200 dark:border-blue-800">
                      <h4 className="text-sm font-medium text-blue-900 dark:text-blue-100 mb-2">
                        📬 Email Delivery Tips:
                      </h4>
                      <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                        <li>
                          • Check your <strong>spam/junk folder</strong>
                        </li>
                        <li>
                          • Add <strong>noreply@kayease.in</strong> to your
                          contacts
                        </li>
                        <li>• Email may take 1-2 minutes to arrive</li>
                        <li>• Check email filters/rules</li>
                      </ul>
                    </div>
                  </div>
                  <button
                    onClick={handleClose}
                    className="w-full px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors"
                  >
                    Got it, thanks!
                  </button>
                </div>
              ) : (
                /* Form State */
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
                    >
                      Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <EnvelopeIcon className="h-5 w-5 text-slate-400" />
                      </div>
                      <input
                        id="email"
                        type="email"
                        placeholder="Enter your email address"
                        {...register("email")}
                        className={`block w-full pl-12 pr-4 py-4 border ${
                          errors.email
                            ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                            : "border-slate-300 focus:ring-indigo-500 focus:border-indigo-500"
                        } rounded-xl bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-0 transition-all duration-200`}
                      />
                    </div>
                    {errors.email && (
                      <p className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center">
                        <span className="mr-1">⚠️</span>
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  <div className="flex space-x-3 pt-4">
                    <button
                      type="button"
                      onClick={handleClose}
                      className="flex-1 px-6 py-3 border border-slate-300 dark:border-slate-600 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-700 hover:bg-slate-50 dark:hover:bg-slate-600 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="flex-1 flex justify-center items-center px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-medium rounded-xl shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                    >
                      {isLoading ? (
                        <>
                          <ArrowPathIcon className="animate-spin -ml-1 mr-2 h-4 w-4" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <EnvelopeIcon className="h-4 w-4 mr-2" />
                          Send Reset Email
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );

  // Always render to body using portal
  if (typeof document !== "undefined") {
    return createPortal(modalContent, document.body);
  }

  return null;
}
