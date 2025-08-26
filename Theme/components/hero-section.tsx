"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Rocket, Sparkles, Star } from "lucide-react";
import { VideoBackground } from "@/components/video-background";
import { useEffect, useState } from "react";
import Image from "next/image";

export function HeroSection() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <section className="relative min-h-[100svh] pt-20 md:pt-24 flex items-center justify-center overflow-hidden">
      <VideoBackground />

      {/* Enhanced Background Planets - now GSAP 3D stage */}
      <div className="absolute inset-0 z-5 stage-3d">
        {/* Sun */}
        <motion.div
          className="absolute top-6 right-4 w-16 h-16 md:top-20 md:right-20 md:w-24 md:h-24 planet"
          data-planet
          data-depth="300"
          data-float="14"
          data-rot="10"
          data-speed="8"
          data-parallax="0.9"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <Image
            src="/Planets/Sun.png"
            alt="Sun"
            width={96}
            height={96}
            className="w-full h-full object-contain drop-shadow-2xl"
          />
        </motion.div>

        {/* Earth */}
        <motion.div
          className="absolute bottom-10 left-6 w-14 h-14 md:bottom-32 md:left-16 md:w-20 md:h-20 planet"
          data-planet
          data-depth="180"
          data-float="10"
          data-rot="8"
          data-speed="7.2"
          data-parallax="0.8"
          animate={{
            rotate: [0, 360],
            y: [0, -10, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Image
            src="/Planets/Earth.png"
            alt="Earth"
            width={80}
            height={80}
            className="w-full h-full object-contain drop-shadow-2xl"
          />
        </motion.div>

        {/* Mars */}
        <motion.div
          className="absolute hidden sm:block top-1/3 left-1/4 w-16 h-16 planet"
          data-planet
          data-depth="220"
          data-float="12"
          data-rot="-9"
          data-speed="6.5"
          data-parallax="0.85"
          animate={{
            rotate: [0, -360],
            x: [0, 15, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Image
            src="/Planets/Mars.png"
            alt="Mars"
            width={64}
            height={64}
            className="w-full h-full object-contain drop-shadow-2xl"
          />
        </motion.div>

        {/* Jupiter */}
        <motion.div
          className="absolute hidden md:block bottom-1/4 right-1/3 w-28 h-28 planet"
          data-planet
          data-depth="260"
          data-float="9"
          data-rot="6"
          data-speed="7.8"
          data-parallax="0.7"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <Image
            src="/Planets/Jupitor.png"
            alt="Jupiter"
            width={112}
            height={112}
            className="w-full h-full object-contain drop-shadow-2xl"
          />
        </motion.div>

        {/* Saturn */}
        <motion.div
          className="absolute hidden sm:block top-1/2 right-4 w-20 h-20 md:right-8 md:w-32 md:h-32 planet"
          data-planet
          data-depth="320"
          data-float="13"
          data-rot="-8"
          data-speed="8.6"
          data-parallax="0.95"
          animate={{
            rotate: [0, -360],
            y: [0, -15, 0],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Image
            src="/Planets/Saturn.png"
            alt="Saturn"
            width={128}
            height={128}
            className="w-full h-full object-contain drop-shadow-2xl"
          />
        </motion.div>

        {/* Venus */}
        <motion.div
          className="absolute hidden sm:block top-2/3 left-1/3 w-14 h-14 planet"
          data-planet
          data-depth="140"
          data-float="9"
          data-rot="11"
          data-speed="6.2"
          data-parallax="0.65"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Image
            src="/Planets/Venus.png"
            alt="Venus"
            width={56}
            height={56}
            className="w-full h-full object-contain drop-shadow-2xl"
          />
        </motion.div>
      </div>

      {/* Optimized floating elements (kept) + PlanetAnimator to enable GSAP 3D and parallax */}
      <div className="absolute inset-0 z-10 hidden sm:block">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 2) * 25}%`,
            }}
            animate={{
              y: [0, -20, 0],
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          >
            {i % 2 === 0 ? (
              <Star className="w-4 h-4 text-yellow-400 drop-shadow-lg" />
            ) : (
              <Sparkles className="w-3 h-3 text-blue-400 drop-shadow-lg" />
            )}
          </motion.div>
        ))}
      </div>

      {/* Main content */}
      <motion.div
        className="relative z-20 text-center px-4 max-w-7xl mx-auto"
        style={{ y, opacity }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        {/* Animated badge */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600/30 to-purple-600/30 border border-blue-500/50 rounded-full px-8 py-3 mb-8 backdrop-blur-lg shadow-2xl"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <Rocket className="h-5 w-5 text-blue-400" />
          </motion.div>
          <span className="text-sm font-medium bg-gradient-to-r from-blue-200 to-purple-200 bg-clip-text text-transparent">
            Since 1962 • Demo Cosmic Experience
          </span>
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <Sparkles className="h-4 w-4 text-yellow-400" />
          </motion.div>
        </motion.div>

        {/* Main title with optimized typography */}
        <motion.div className="mb-6 px-2">
          <motion.h1
            className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <motion.span
              className="block bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent"
              style={{
                backgroundSize: "200% 200%",
              }}
            >
              Theme
            </motion.span>
            <motion.span
              className="block bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent"
              style={{
                backgroundSize: "200% 200%",
              }}
            >
              Demo
            </motion.span>
          </motion.h1>
        </motion.div>

        {/* Subtitle optimized */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mb-8"
        >
          <motion.p
            className="text-lg md:text-xl lg:text-2xl text-slate-300 font-light max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            Journey Through the{" "}
            <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent font-semibold">
              Cosmos
            </span>
            <br />
            <span className="text-base md:text-lg text-slate-400">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</span>
          </motion.p>
        </motion.div>
      </motion.div>
    </section>
  );
}
