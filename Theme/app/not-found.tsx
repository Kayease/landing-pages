"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  HomeIcon,
  ArrowLeftIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";

export default function NotFound() {
  return (
    <div className="min-h-screen relative">
      {/* Fixed Cosmic Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950 z-0">
        {/* Animated Stars */}
        <div className="absolute inset-0">
          {[...Array(80)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>

        {/* Cosmic Nebula Effects */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-yellow-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />

        {/* Floating Asteroids */}
        <div className="absolute inset-0">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-3 h-3 bg-gradient-to-r from-gray-400 to-gray-600 rounded-full opacity-40"
              style={{
                left: `${10 + i * 7}%`,
                top: `${15 + (i % 6) * 12}%`,
              }}
              animate={{
                y: [-10, 10, -10],
                rotate: [0, 360],
                opacity: [0.2, 0.6, 0.2],
              }}
              transition={{
                duration: 4 + Math.random() * 2,
                repeat: Infinity,
                delay: i * 0.3,
              }}
            />
          ))}
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="relative z-10 min-h-screen overflow-y-auto">
        <div className="min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
          {/* Lost Astronaut */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative">
              {/* Astronaut Helmet */}
              <motion.div
                className="w-32 h-32 bg-gradient-to-br from-slate-300 to-slate-500 rounded-full mx-auto mb-4 relative overflow-hidden shadow-2xl"
                animate={{
                  boxShadow: [
                    "0 0 20px rgba(59, 130, 246, 0.5)",
                    "0 0 40px rgba(147, 51, 234, 0.5)",
                    "0 0 20px rgba(59, 130, 246, 0.5)",
                  ],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                {/* Helmet Reflection */}
                <div className="absolute inset-2 bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-full" />
                <div className="absolute top-4 left-6 w-8 h-8 bg-white/20 rounded-full" />
                <div className="absolute bottom-6 right-4 w-6 h-6 bg-white/10 rounded-full" />

                {/* Astronaut Face */}
                <div className="absolute inset-6 bg-gradient-to-br from-orange-200 to-orange-300 rounded-full flex items-center justify-center">
                  <div className="text-2xl">😵</div>
                </div>
              </motion.div>

              {/* Floating Effect */}
              <motion.div
                className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full opacity-60"
                animate={{
                  y: [-5, 5, -5],
                  opacity: [0.4, 0.8, 0.4],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              />
            </div>
          </motion.div>

          {/* 404 Display */}
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <h1 className="text-8xl md:text-9xl font-bold bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent mb-4">
              404
            </h1>
            <div className="flex items-center justify-center space-x-2 mb-4">
              <ExclamationTriangleIcon className="h-6 w-6 text-orange-400" />
              <h2 className="text-2xl md:text-3xl font-bold text-white">
                Lost in Space
              </h2>
              <ExclamationTriangleIcon className="h-6 w-6 text-orange-400" />
            </div>
          </motion.div>

          {/* Error Message */}
          <motion.div
            className="text-center mb-12 max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <p className="text-xl text-slate-300 mb-4">
              Houston, we have a problem! 🚀
            </p>
            <p className="text-slate-400 text-lg leading-relaxed">
              The page you&apos;re looking for has drifted into a black hole.
              Our cosmic navigation system couldn&apos;t locate it in this
              galaxy.
            </p>
            <p className="text-slate-500 text-sm mt-4 italic">
              &quot;Space is big. You just won&apos;t believe how vastly,
              hugely, mind-bogglingly big it is.&quot; - Douglas Adams
            </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
          >
            <Link href="/">
              <motion.button
                className="flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-semibold rounded-xl shadow-lg hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 transition-all duration-300 group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <HomeIcon className="h-5 w-5 mr-3 group-hover:animate-bounce" />
                Return to Earth (Home)
              </motion.button>
            </Link>

            <motion.button
              onClick={() => window.history.back()}
              className="flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300 group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeftIcon className="h-5 w-5 mr-3 group-hover:-translate-x-1 transition-transform duration-200" />
              Go Back in Time
            </motion.button>
          </motion.div>

          {/* Floating Rescue Ship */}
          <motion.div
            className="absolute bottom-10 right-10 hidden lg:block"
            animate={{
              y: [-10, 10, -10],
              rotate: [-2, 2, -2],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
            }}
          >
            <div className="text-4xl opacity-60">🛸</div>
          </motion.div>

          {/* Floating Satellite */}
          <motion.div
            className="absolute top-20 left-10 hidden lg:block"
            animate={{
              y: [10, -10, 10],
              rotate: [2, -2, 2],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
            }}
          >
            <div className="text-3xl opacity-40">🛰️</div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
