/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function CosmicLoading() {
  const [progress, setProgress] = useState(0);
  const [currentPhase, setCurrentPhase] = useState(0);

  const loadingPhases = [
    "Initializing cosmic engines...",
    "Calibrating stellar navigation...",
    "Loading galactic databases...",
    "Synchronizing with space-time...",
    "Preparing for launch sequence...",
    "Journey complete!",
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + 2;
        const phaseIndex = Math.floor(newProgress / 20);
        setCurrentPhase(Math.min(phaseIndex, loadingPhases.length - 1));

        if (newProgress >= 100) {
          clearInterval(timer);
          return 100;
        }
        return newProgress;
      });
    }, 80);

    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-slate-950 flex items-center justify-center"
      initial={{ opacity: 1 }}
      animate={{ opacity: progress >= 100 ? 0 : 1 }}
      transition={{ duration: 0.3, delay: progress >= 100 ? 0.3 : 0 }}
      style={{ pointerEvents: progress >= 100 ? "none" : "auto" }}
    >
      {/* Animated galaxy background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
      </div>

      {/* Optimized floating stars */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full opacity-40"
          style={{
            left: `${10 + i * 8}%`,
            top: `${10 + (i % 6) * 15}%`,
          }}
          animate={{
            opacity: [0.2, 0.8, 0.2],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.1,
          }}
        />
      ))}

      {/* Main loading content */}
      <div className="relative z-10 text-center">
        {/* Rotating planet */}
        <motion.div
          className="w-32 h-32 mx-auto mb-8 relative"
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        >
          <div className="w-full h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full relative overflow-hidden">
            {/* Planet surface details */}
            <div className="absolute inset-2 bg-gradient-to-br from-blue-400/30 to-purple-400/30 rounded-full" />
            <div className="absolute top-4 left-6 w-8 h-8 bg-blue-300/20 rounded-full" />
            <div className="absolute bottom-6 right-4 w-6 h-6 bg-purple-300/20 rounded-full" />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-pink-300/20 rounded-full" />

            {/* Orbital ring */}
            <motion.div
              className="absolute inset-0 border-2 border-white/20 rounded-full"
              animate={{ rotate: -360 }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            />
          </div>

          {/* Orbiting satellite */}
          <motion.div
            className="absolute top-0 left-1/2 w-2 h-2 bg-yellow-400 rounded-full transform -translate-x-1/2"
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: "50% 64px" }}
          />
        </motion.div>

        {/* Loading text */}
        <motion.h2
          className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            backgroundSize: "200% 200%",
          }}
        >
          Theme Demo
        </motion.h2>

        {/* Current Phase */}
        <motion.p
          className="text-slate-300 text-lg mb-8 h-6"
          key={currentPhase}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {loadingPhases[currentPhase]}
        </motion.p>

        {/* Enhanced Progress bar */}
        <div className="w-96 h-3 bg-slate-800/50 rounded-full mx-auto mb-2 overflow-hidden relative">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full relative"
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          >
            {/* Glowing effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-full blur-sm opacity-50"></div>
          </motion.div>

          {/* Progress indicator dot */}
          <motion.div
            className="absolute top-1/2 transform -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg"
            style={{ left: `${progress}%` }}
            animate={{
              boxShadow: [
                "0 0 10px rgba(255, 255, 255, 0.5)",
                "0 0 20px rgba(255, 255, 255, 0.8)",
                "0 0 10px rgba(255, 255, 255, 0.5)",
              ],
            }}
            transition={{ duration: 1, repeat: Infinity }}
          />
        </div>

        {/* Progress percentage and stats */}
        <div className="flex justify-between items-center w-96 mx-auto mb-8 text-sm">
          <motion.span
            className="text-slate-400"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {Math.round(progress)}% Complete
          </motion.span>
          <span className="text-slate-500">Phase {currentPhase + 1}/6</span>
        </div>

        {/* Enhanced Loading dots */}
        <div className="flex justify-center space-x-3 mb-8">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="w-3 h-3 rounded-full"
              style={{
                background: `linear-gradient(45deg, 
                  ${
                    i === 0
                      ? "#3B82F6"
                      : i === 1
                      ? "#8B5CF6"
                      : i === 2
                      ? "#EC4899"
                      : i === 3
                      ? "#F59E0B"
                      : "#10B981"
                  }
                  0%, 
                  ${
                    i === 0
                      ? "#1D4ED8"
                      : i === 1
                      ? "#7C3AED"
                      : i === 2
                      ? "#DB2777"
                      : i === 3
                      ? "#D97706"
                      : "#059669"
                  }
                  100%)`,
              }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 1, 0.3],
                y: [0, -10, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>

        {/* System Status */}
        <motion.div
          className="bg-slate-800/30 backdrop-blur-sm rounded-lg p-4 max-w-md mx-auto mb-6"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>System Status</span>
            <span className="text-green-400">● Online</span>
          </div>
          <div className="space-y-1">
            <div className="flex justify-between text-xs text-slate-400">
              <span>Cosmic Engine</span>
              <span
                className={progress > 20 ? "text-green-400" : "text-yellow-400"}
              >
                {progress > 20 ? "Ready" : "Warming up..."}
              </span>
            </div>
            <div className="flex justify-between text-xs text-slate-400">
              <span>Navigation</span>
              <span
                className={progress > 40 ? "text-green-400" : "text-yellow-400"}
              >
                {progress > 40 ? "Calibrated" : "Calibrating..."}
              </span>
            </div>
            <div className="flex justify-between text-xs text-slate-400">
              <span>Database</span>
              <span
                className={progress > 60 ? "text-green-400" : "text-yellow-400"}
              >
                {progress > 60 ? "Loaded" : "Loading..."}
              </span>
            </div>
            <div className="flex justify-between text-xs text-slate-400">
              <span>Launch Sequence</span>
              <span
                className={progress > 80 ? "text-green-400" : "text-slate-500"}
              >
                {progress > 80 ? "Ready" : "Standby"}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Inspirational text */}
        <motion.div
          className="text-center max-w-lg mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <p className="text-slate-400 text-sm italic mb-2">
            &ldquo;The cosmos is within us. We are made of star-stuff.&rdquo;
          </p>
          <p className="text-slate-500 text-xs">- Carl Sagan</p>
        </motion.div>

        {/* Completion Animation */}
        {progress >= 100 && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-6xl">🚀</div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
