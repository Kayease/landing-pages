"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import { Users, Calendar, Award, Globe, Star, Sparkles } from "lucide-react"
import Image from "next/image"

interface CounterProps {
  end: number
  duration?: number
  suffix?: string
  prefix?: string
}

function AnimatedCounter({ end, duration = 2, suffix = "", prefix = "" }: CounterProps) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return

    let startTime: number
    let animationFrame: number

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1)
      
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      setCount(Math.floor(easeOutQuart * end))

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [isInView, end, duration])

  return (
    <span ref={ref}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  )
}

export function EnhancedStatsSection() {
  const stats = [
    {
      icon: Users,
      value: 10000,
      suffix: "+",
      label: "Cosmic Explorers",
      description: "Visitors who've journeyed through space with us",
      color: "from-blue-400 to-cyan-400",
      bgColor: "from-blue-600/20 to-cyan-600/20",
      planet: "/Planets/Earth.png"
    },
    {
      icon: Calendar,
      value: 62,
      label: "Years of Wonder",
      description: "Decades of inspiring cosmic curiosity",
      color: "from-purple-400 to-pink-400",
      bgColor: "from-purple-600/20 to-pink-600/20",
      planet: "/Planets/Sun.png"
    },
    {
      icon: Award,
      value: 8,
      suffix: "+",
      label: "Stellar Shows",
      description: "Unique planetarium experiences",
      color: "from-yellow-400 to-orange-400",
      bgColor: "from-yellow-600/20 to-orange-600/20",
      planet: "/Planets/Star2.png"
    },
    {
      icon: Globe,
      value: 50,
      suffix: "+",
      label: "Countries Reached",
      description: "International visitors from around the world",
      color: "from-green-400 to-emerald-400",
      bgColor: "from-green-600/20 to-emerald-600/20",
      planet: "/Planets/Planet-8.png"
    },
  ]

  return (
    <section className="py-32 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden font-poppins">
      {/* Background Planets */}
      <div className="absolute inset-0 z-0">
        {/* Jupiter */}
        <motion.div
          className="absolute top-20 right-20 w-32 h-32 opacity-10"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1],
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
            width={128}
            height={128}
            className="w-full h-full object-contain"
          />
        </motion.div>

        {/* Saturn */}
        <motion.div
          className="absolute bottom-20 left-20 w-28 h-28 opacity-10"
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
            width={112}
            height={112}
            className="w-full h-full object-contain"
          />
        </motion.div>

        {/* Mars */}
        <motion.div
          className="absolute top-1/2 left-1/3 w-20 h-20 opacity-10"
          animate={{
            rotate: [0, 360],
            x: [0, 10, 0],
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
            width={80}
            height={80}
            className="w-full h-full object-contain"
          />
        </motion.div>

        {/* Venus */}
        <motion.div
          className="absolute bottom-1/3 right-1/4 w-16 h-16 opacity-10"
          animate={{
            rotate: [0, -360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Image
            src="/Planets/Venus.png"
            alt="Venus"
            width={64}
            height={64}
            className="w-full h-full object-contain"
          />
        </motion.div>

        {/* Floating stars */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-yellow-400 rounded-full"
            style={{
              left: `${5 + i * 8}%`,
              top: `${10 + i * 7}%`,
            }}
            animate={{
              opacity: [0.2, 0.6, 0.2],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 4 + i * 0.2,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto mb-16"
        >

          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-3 bg-gradient-to-r from-yellow-600/30 to-orange-600/30 border border-yellow-500/50 rounded-full px-8 py-3 mb-8 backdrop-blur-lg shadow-2xl"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <Star className="h-5 w-5 text-yellow-400" />
            </motion.div>
            <span className="text-sm font-medium bg-gradient-to-r from-yellow-200 to-orange-200 bg-clip-text text-transparent">
              Our Achievements
            </span>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <Sparkles className="h-4 w-4 text-orange-400" />
            </motion.div>
          </motion.div>

          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Cosmic Milestones
          </motion.h2>

          <motion.p
            className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Discover the incredible journey of B.M. Birla Planetarium through our remarkable achievements and milestones
          </motion.p>
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.35, 
                  delay: index * 0.08,
                  type: "spring",
                  stiffness: 180,
                  damping: 18
                }}
                whileHover={{ 
                  scale: 1.045, 
                  y: -8,
                  transition: { duration: 0.18 }
                }}
                className="group"
              >
                <div className={`relative p-8 rounded-2xl bg-gradient-to-br ${stat.bgColor} border border-white/10 backdrop-blur-sm shadow-2xl overflow-hidden`}>
                  {/* Planet Background */}
                  <div className="absolute top-4 right-4 w-16 h-16 opacity-20">
                    <Image
                      src={stat.planet}
                      alt="Planet"
                      width={64}
                      height={64}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  {/* Glow Effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
                    animate={{
                      x: ["-100%", "100%"],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      repeatDelay: 2,
                    }}
                  />

                  {/* Icon */}
                  <div className="relative z-10 mb-6">
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${stat.color} shadow-2xl group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="relative z-10">
                    <div className={`text-4xl font-bold mb-2 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                      <AnimatedCounter 
                        end={stat.value} 
                        suffix={stat.suffix || ""} 
                        duration={2.5}
                      />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-300 group-hover:bg-clip-text transition-all duration-300">
                      {stat.label}
                    </h3>
                    <p className="text-slate-300 text-sm leading-relaxed">
                      {stat.description}
                    </p>
                  </div>

                  {/* Floating particles */}
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-yellow-400 rounded-full opacity-60"
                      style={{
                        left: `${20 + i * 20}%`,
                        top: `${30 + i * 15}%`,
                      }}
                      animate={{
                        y: [0, -10, 0],
                        opacity: [0.4, 0.8, 0.4],
                      }}
                      transition={{
                        duration: 2 + i * 0.5,
                        repeat: Infinity,
                        delay: i * 0.3,
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-4 bg-gradient-to-r from-slate-800/50 to-slate-700/50 border border-slate-600/30 rounded-2xl px-8 py-6 backdrop-blur-sm">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Globe className="h-8 w-8 text-blue-400" />
            </motion.div>
            <div className="text-left">
              <h3 className="text-lg font-semibold text-white mb-1">
                Global Recognition
              </h3>
              <p className="text-slate-300 text-sm">
                Recognized worldwide for excellence in science education and cosmic exploration
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}