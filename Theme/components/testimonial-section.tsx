"use client";

import { motion } from "framer-motion";
import { TestimonialSlider } from "@/components/testimonial-slider";
import Image from "next/image";

export function TestimonialSection() {
  return (
    <section className="py-24 bg-gradient-to-b from-slate-900 to-slate-950 relative overflow-hidden">
      {/* Background Planets */}
      <div className="absolute inset-0 z-0">
        {/* Moon */}
        <motion.div
          className="absolute top-20 left-20 w-24 h-24 opacity-15"
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
            src="/Planets/Moon.png"
            alt="Moon"
            width={96}
            height={96}
            className="w-full h-full object-contain"
          />
        </motion.div>

        {/* Planet-13 */}
        <motion.div
          className="absolute bottom-20 right-20 w-28 h-28 opacity-15"
          animate={{
            rotate: [0, -360],
            y: [0, -10, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Image
            src="/Planets/Planet-13.png"
            alt="Distant Planet"
            width={112}
            height={112}
            className="w-full h-full object-contain"
          />
        </motion.div>

        {/* Orb */}
        <motion.div
          className="absolute top-1/2 left-1/3 w-20 h-20 opacity-15"
          animate={{
            rotate: [0, 360],
            x: [0, 15, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Image
            src="/Planets/Orb.png"
            alt="Orb"
            width={80}
            height={80}
            className="w-full h-full object-contain"
          />
        </motion.div>

        {/* Floating stars */}
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-yellow-400 rounded-full"
            style={{
              left: `${8 + i * 10}%`,
              top: `${12 + i * 8}%`,
            }}
            animate={{
              opacity: [0.2, 0.7, 0.2],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 3 + i * 0.3,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-600/30 to-pink-600/30 border border-purple-500/50 rounded-full px-8 py-3 mb-8 backdrop-blur-lg shadow-2xl"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <span className="text-2xl">⭐</span>
            </motion.div>
            <span className="text-sm font-medium bg-gradient-to-r from-purple-200 to-pink-200 bg-clip-text text-transparent">
              Visitor Experiences
            </span>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <span className="text-xl">✨</span>
            </motion.div>
          </motion.div>

          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            What Our Visitors Say
          </motion.h2>
          <motion.p
            className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Hear from those who&apos;ve journeyed with us through the cosmos and
            discovered the wonders of the universe
          </motion.p>
        </motion.div>

        <TestimonialSlider />
      </div>
    </section>
  );
}
