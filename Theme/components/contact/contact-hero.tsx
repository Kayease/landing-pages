"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react"

export function ContactHero() {
  return (
    <section className="relative py-24 bg-gradient-to-br from-slate-950 via-blue-950/20 to-cyan-950/20 overflow-hidden">
      {/* 3D Communication Satellites */}
      <div className="absolute top-20 right-20 w-32 h-32 opacity-20">
        <motion.div
          animate={{
            rotate: [0, 360],
            y: [0, -15, 0],
          }}
          transition={{
            duration: 15,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          className="w-full h-full"
          style={{
            background: `url('/placeholder.svg?height=128&width=128&text=🛰️') center/contain no-repeat`,
          }}
        />
      </div>

      {/* Floating Communication Icons */}
      <motion.div
        className="absolute top-40 left-20 w-16 h-16 opacity-25"
        animate={{
          y: [0, -20, 0],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 12,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        style={{
          background: `url('/placeholder.svg?height=64&width=64&text=📡') center/contain no-repeat`,
        }}
      />

      <motion.div
        className="absolute bottom-40 right-1/4 w-12 h-12 opacity-30"
        animate={{
          y: [0, 15, 0],
          x: [0, -10, 0],
        }}
        transition={{
          duration: 10,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        style={{
          background: `url('/placeholder.svg?height=48&width=48&text=📞') center/contain no-repeat`,
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-5xl mx-auto"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border border-blue-500/30 rounded-full px-6 py-3 mb-8 backdrop-blur-sm"
          >
            <MessageCircle className="h-5 w-5 text-blue-400" />
            <span className="font-medium">Get In Touch</span>
          </motion.div>

          <motion.h1
            className="text-6xl md:text-8xl font-bold mb-8 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
              Contact
            </span>
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-teal-400 to-green-400 bg-clip-text text-transparent">
              Us
            </span>
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-slate-300 mb-12 leading-relaxed max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Have questions about our shows, educational programs, or want to plan a visit? We&apos;re here to help you
            explore the cosmos!
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-12 py-4 text-lg group"
            >
              <Phone className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
              Call Now
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="border-2 border-slate-400 text-slate-300 hover:bg-slate-800/50 px-12 py-4 text-lg bg-transparent backdrop-blur-sm group"
            >
              <Mail className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
              Send Email
            </Button>
          </motion.div>

          {/* Quick Contact Info */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            <div className="text-center p-6 bg-slate-800/30 rounded-xl backdrop-blur-sm border border-slate-700/50">
              <Phone className="h-8 w-8 text-blue-400 mx-auto mb-3" />
              <div className="text-lg font-semibold text-white mb-1">Call Us</div>
              <div className="text-slate-400 text-sm">+00-000-000000</div>
            </div>

            <div className="text-center p-6 bg-slate-800/30 rounded-xl backdrop-blur-sm border border-slate-700/50">
              <Mail className="h-8 w-8 text-cyan-400 mx-auto mb-3" />
              <div className="text-lg font-semibold text-white mb-1">Email Us</div>
              <div className="text-slate-400 text-sm">hello@example.com</div>
            </div>

            <div className="text-center p-6 bg-slate-800/30 rounded-xl backdrop-blur-sm border border-slate-700/50">
              <MapPin className="h-8 w-8 text-teal-400 mx-auto mb-3" />
              <div className="text-lg font-semibold text-white mb-1">Visit Us</div>
              <div className="text-slate-400 text-sm">123 Placeholder Ave, City</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
