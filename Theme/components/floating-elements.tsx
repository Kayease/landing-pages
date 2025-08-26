"use client"

import { motion } from "framer-motion"

export function FloatingElements() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Floating Planets - Optimized */}
      <motion.div
        className="absolute top-20 left-10 w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full opacity-20"
        animate={{
          y: [0, -15, 0],
          rotate: [0, 360],
        }}
        transition={{
          duration: 6,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute top-40 right-20 w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full opacity-15"
        animate={{
          y: [0, 10, 0],
          rotate: [0, -360],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-40 left-1/4 w-8 h-8 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-full opacity-25"
        animate={{
          y: [0, -20, 0],
          x: [0, 8, 0],
        }}
        transition={{
          duration: 7,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      {/* Floating Rings - Optimized */}
      <motion.div
        className="absolute top-1/3 right-1/4 w-32 h-32 border-2 border-blue-400/10 rounded-full"
        animate={{
          rotate: [0, 360],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 12,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      />

      <motion.div
        className="absolute bottom-1/3 left-1/3 w-24 h-24 border border-purple-400/15 rounded-full"
        animate={{
          rotate: [360, 0],
          scale: [1, 0.95, 1],
        }}
        transition={{
          duration: 15,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      />
    </div>
  )
}
