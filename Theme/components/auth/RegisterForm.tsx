/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  UserIcon,
  EnvelopeIcon,
  PhoneIcon,
  LockClosedIcon,
  EyeIcon,
  EyeSlashIcon,
  ArrowRightIcon,
  ExclamationTriangleIcon,
  SparklesIcon,
  RocketLaunchIcon,
} from "@heroicons/react/24/outline";
import toast from "react-hot-toast";
import { registerSchema, type RegisterFormData } from "@/lib/validations/auth";
import authService from "@/lib/services/auth.service";

export function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      role_type: "Subscriber", // Set default role as Subscriber
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setIsLoading(true);
      const loadingToast = toast.loading("Creating your account...");

      // Ensure role is set to Subscriber
      const registrationData = {
        ...data,
        role_type: "Subscriber",
      };

      await authService.register(registrationData);

      toast.dismiss(loadingToast);
      toast.success(
        "Account created successfully! Please check your email to verify your account.",
        {
          duration: 6000,
          icon: "🎉",
        }
      );

      // Redirect to login with success message
      router.push("/auth/login?registered=true");
    } catch (err: any) {
      toast.dismiss();

      if (err.message?.includes("already registered")) {
        toast.error(
          "This email is already registered. Please try logging in instead.",
          {
            duration: 5000,
            icon: "📧",
          }
        );
      } else if (err.message?.includes("validation")) {
        toast.error("Please check your information and try again.", {
          duration: 4000,
          icon: "⚠️",
        });
      } else {
        toast.error(err.message || "Registration failed. Please try again.", {
          duration: 4000,
          icon: "❌",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Name Fields */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          <label
            htmlFor="first_name"
            className="text-sm font-semibold text-white mb-3 flex items-center space-x-2"
          >
            <UserIcon className="h-4 w-4 text-purple-400" />
            <span>First Name</span>
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <UserIcon className="h-5 w-5 text-slate-400 group-focus-within:text-purple-400 transition-colors duration-200" />
            </div>
            <input
              id="first_name"
              type="text"
              placeholder="Your cosmic first name..."
              {...register("first_name")}
              className={`block w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-sm border ${
                errors.first_name
                  ? "border-red-400 focus:ring-red-400 focus:border-red-400"
                  : "border-white/20 focus:ring-purple-400 focus:border-purple-400"
              } rounded-xl shadow-lg placeholder-slate-400 text-white focus:outline-none focus:ring-2 focus:ring-opacity-50 sm:text-sm transition-all duration-200 hover:bg-white/15`}
            />
            {errors.first_name && (
              <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                <ExclamationTriangleIcon className="h-5 w-5 text-red-400" />
              </div>
            )}
          </div>
          {errors.first_name && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-2 text-sm text-red-400 flex items-center space-x-2"
            >
              <ExclamationTriangleIcon className="h-4 w-4" />
              <span>{errors.first_name.message}</span>
            </motion.p>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15, duration: 0.5 }}
        >
          <label
            htmlFor="last_name"
            className="text-sm font-semibold text-white mb-3 flex items-center space-x-2"
          >
            <UserIcon className="h-4 w-4 text-pink-400" />
            <span>Last Name</span>
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <UserIcon className="h-5 w-5 text-slate-400 group-focus-within:text-pink-400 transition-colors duration-200" />
            </div>
            <input
              id="last_name"
              type="text"
              placeholder="Your stellar last name..."
              {...register("last_name")}
              className={`block w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-sm border ${
                errors.last_name
                  ? "border-red-400 focus:ring-red-400 focus:border-red-400"
                  : "border-white/20 focus:ring-pink-400 focus:border-pink-400"
              } rounded-xl shadow-lg placeholder-slate-400 text-white focus:outline-none focus:ring-2 focus:ring-opacity-50 sm:text-sm transition-all duration-200 hover:bg-white/15`}
            />
            {errors.last_name && (
              <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                <ExclamationTriangleIcon className="h-5 w-5 text-red-400" />
              </div>
            )}
          </div>
          {errors.last_name && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-2 text-sm text-red-400 flex items-center space-x-2"
            >
              <ExclamationTriangleIcon className="h-4 w-4" />
              <span>{errors.last_name.message}</span>
            </motion.p>
          )}
        </motion.div>
      </div>

      {/* Email Field */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <label
          htmlFor="email"
          className="text-sm font-semibold text-white mb-3 flex items-center space-x-2"
        >
          <EnvelopeIcon className="h-4 w-4 text-blue-400" />
          <span>Email Address</span>
        </label>
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <EnvelopeIcon className="h-5 w-5 text-slate-400 group-focus-within:text-blue-400 transition-colors duration-200" />
          </div>
          <input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="your.cosmic@email.com"
            {...register("email")}
            className={`block w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-sm border ${
              errors.email
                ? "border-red-400 focus:ring-red-400 focus:border-red-400"
                : "border-white/20 focus:ring-blue-400 focus:border-blue-400"
            } rounded-xl shadow-lg placeholder-slate-400 text-white focus:outline-none focus:ring-2 focus:ring-opacity-50 sm:text-sm transition-all duration-200 hover:bg-white/15`}
          />
          {errors.email && (
            <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
              <ExclamationTriangleIcon className="h-5 w-5 text-red-400" />
            </div>
          )}
        </div>
        {errors.email && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-2 text-sm text-red-400 flex items-center space-x-2"
          >
            <ExclamationTriangleIcon className="h-4 w-4" />
            <span>{errors.email.message}</span>
          </motion.p>
        )}
      </motion.div>

      {/* Phone Field */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.25, duration: 0.5 }}
      >
        <label
          htmlFor="phone"
          className="text-sm font-semibold text-white mb-3 flex items-center space-x-2"
        >
          <PhoneIcon className="h-4 w-4 text-emerald-400" />
          <span>Phone Number</span>
        </label>
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <PhoneIcon className="h-5 w-5 text-slate-400 group-focus-within:text-emerald-400 transition-colors duration-200" />
          </div>
          <input
            id="phone"
            type="tel"
            placeholder="+91 98765 43210"
            {...register("phone")}
            className={`block w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-sm border ${
              errors.phone
                ? "border-red-400 focus:ring-red-400 focus:border-red-400"
                : "border-white/20 focus:ring-emerald-400 focus:border-emerald-400"
            } rounded-xl shadow-lg placeholder-slate-400 text-white focus:outline-none focus:ring-2 focus:ring-opacity-50 sm:text-sm transition-all duration-200 hover:bg-white/15`}
          />
          {errors.phone && (
            <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
              <ExclamationTriangleIcon className="h-5 w-5 text-red-400" />
            </div>
          )}
        </div>
        {errors.phone && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-2 text-sm text-red-400 flex items-center space-x-2"
          >
            <ExclamationTriangleIcon className="h-4 w-4" />
            <span>{errors.phone.message}</span>
          </motion.p>
        )}
      </motion.div>

      {/* Hidden Role Field - Default to Subscriber */}
      <input type="hidden" {...register("role_type")} value="Subscriber" />

      {/* Password Fields */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
                  <label
          htmlFor="password"
          className="text-sm font-semibold text-white mb-3 flex items-center space-x-2"
        >
            <LockClosedIcon className="h-4 w-4 text-orange-400" />
            <span>Password</span>
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <LockClosedIcon className="h-5 w-5 text-slate-400 group-focus-within:text-orange-400 transition-colors duration-200" />
            </div>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Create your secret key..."
              {...register("password")}
              className={`block w-full pl-12 pr-12 py-4 bg-white/10 backdrop-blur-sm border ${
                errors.password
                  ? "border-red-400 focus:ring-red-400 focus:border-red-400"
                  : "border-white/20 focus:ring-orange-400 focus:border-orange-400"
              } rounded-xl shadow-lg placeholder-slate-400 text-white focus:outline-none focus:ring-2 focus:ring-opacity-50 sm:text-sm transition-all duration-200 hover:bg-white/15`}
            />
            <motion.button
              type="button"
              className="absolute inset-y-0 right-0 pr-4 flex items-center"
              onClick={() => setShowPassword(!showPassword)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {showPassword ? (
                <EyeSlashIcon className="h-5 w-5 text-slate-400 hover:text-orange-400 transition-colors duration-200" />
              ) : (
                <EyeIcon className="h-5 w-5 text-slate-400 hover:text-orange-400 transition-colors duration-200" />
              )}
            </motion.button>
            {errors.password && (
              <div className="absolute inset-y-0 right-12 pr-4 flex items-center">
                <ExclamationTriangleIcon className="h-5 w-5 text-red-400" />
              </div>
            )}
          </div>
          {errors.password && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-2 text-sm text-red-400 flex items-center space-x-2"
            >
              <ExclamationTriangleIcon className="h-4 w-4" />
              <span>{errors.password.message}</span>
            </motion.p>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35, duration: 0.5 }}
        >
          <label
            htmlFor="confirm_password"
            className="text-sm font-semibold text-white mb-3 flex items-center space-x-2"
          >
            <LockClosedIcon className="h-4 w-4 text-red-400" />
            <span>Confirm Password</span>
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <LockClosedIcon className="h-5 w-5 text-slate-400 group-focus-within:text-red-400 transition-colors duration-200" />
            </div>
            <input
              id="confirm_password"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm your secret key..."
              {...register("confirm_password")}
              className={`block w-full pl-12 pr-12 py-4 bg-white/10 backdrop-blur-sm border ${
                errors.confirm_password
                  ? "border-red-400 focus:ring-red-400 focus:border-red-400"
                  : "border-white/20 focus:ring-red-400 focus:border-red-400"
              } rounded-xl shadow-lg placeholder-slate-400 text-white focus:outline-none focus:ring-2 focus:ring-opacity-50 sm:text-sm transition-all duration-200 hover:bg-white/15`}
            />
            <motion.button
              type="button"
              className="absolute inset-y-0 right-0 pr-4 flex items-center"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {showConfirmPassword ? (
                <EyeSlashIcon className="h-5 w-5 text-slate-400 hover:text-red-400 transition-colors duration-200" />
              ) : (
                <EyeIcon className="h-5 w-5 text-slate-400 hover:text-red-400 transition-colors duration-200" />
              )}
            </motion.button>
            {errors.confirm_password && (
              <div className="absolute inset-y-0 right-12 pr-4 flex items-center">
                <ExclamationTriangleIcon className="h-5 w-5 text-red-400" />
              </div>
            )}
          </div>
          {errors.confirm_password && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-2 text-sm text-red-400 flex items-center space-x-2"
            >
              <ExclamationTriangleIcon className="h-4 w-4" />
              <span>{errors.confirm_password.message}</span>
            </motion.p>
          )}
        </motion.div>
      </div>

      {/* Submit Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <motion.button
          type="submit"
          disabled={isLoading}
          className="w-full flex justify-center items-center py-4 px-6 border border-transparent rounded-xl shadow-lg text-sm font-semibold text-white bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 hover:from-purple-600 hover:via-pink-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 relative overflow-hidden group"
          whileHover={{ scale: isLoading ? 1 : 1.02 }}
          whileTap={{ scale: isLoading ? 1 : 0.98 }}
        >
          {/* Button Background Animation */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

          {/* Cosmic Particles Effect */}
          <div className="absolute inset-0 opacity-30">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full"
                style={{
                  left: `${10 + i * 10}%`,
                  top: `${20 + (i % 3) * 20}%`,
                }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </div>

          <div className="relative z-10 flex items-center">
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-3"></div>
                <span>Launching into space...</span>
              </>
            ) : (
              <>
                <RocketLaunchIcon className="mr-3 h-5 w-5 group-hover:animate-bounce" />
                <span>Begin Cosmic Journey</span>
                <ArrowRightIcon className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
              </>
            )}
          </div>
        </motion.button>
      </motion.div>

      {/* Login Link */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <span className="text-sm text-slate-300">
          Already exploring the cosmos?{" "}
          <Link
            href="/auth/login"
            className="font-semibold text-purple-400 hover:text-purple-300 transition-colors duration-200 inline-flex items-center space-x-1"
          >
            <span>Return to your journey</span>
            <SparklesIcon className="h-4 w-4" />
          </Link>
        </span>
      </motion.div>
    </motion.form>
  );
}
