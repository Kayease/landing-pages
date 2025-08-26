"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Button } from "@/components/ui/button"
import { Rocket, Star, Globe, Sparkles } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export function GalaxySection() {
  const sectionRef = useRef<HTMLElement>(null)
  const planetsRef = useRef<HTMLDivElement[]>([])
  const starsRef = useRef<HTMLDivElement[]>([])
  const orbRef = useRef<HTMLDivElement>(null)

  // All available planet images
  const planetImages = [
    "/Planets/Sun.png",
    "/Planets/Earth.png",
    "/Planets/Mars.png",
    "/Planets/Venus.png",
    "/Planets/Jupitor.png",
    "/Planets/Saturn.png",
    "/Planets/Saturn-2.png",
    "/Planets/Moon.png",
    "/Planets/Planet-8.png",
    "/Planets/Planet-13.png",
    "/Planets/Orb.png",
    "/Planets/Group 3.png",
    "/Planets/Star2.png"
  ]

  // Base seconds for Earth's orbit; others scale proportionally but compressed for UX
  const BASE_ORBIT_SECONDS = 14
  const periodToSeconds = (years: number) => Math.max(8, BASE_ORBIT_SECONDS * Math.sqrt(years))
  const orbitalYears: Record<string, number> = {
    Mercury: 0.24,
    Venus: 0.62,
    Earth: 1,
    Mars: 1.88,
    Jupiter: 11.86,
    Saturn: 29.46,
    Orb: 84.01,
  }
  const getOrbitDuration = (name: string, fallback: number) => {
    const years = orbitalYears[name as keyof typeof orbitalYears]
    return years ? periodToSeconds(years) : fallback
  }

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      // Removed parallax from orbiting planets to keep orbits perfectly circular and smooth
      // If needed, apply parallax only to decorative/floating items, not to the orbit containers.

      // Floating animation for stars
      starsRef.current.forEach((star, index) => {
        if (star) {
          gsap.to(star, {
            y: "random(-25, 25)", // Reduced movement range
            x: "random(-15, 15)", // Reduced movement range
            rotation: "random(-90, 90)", // Reduced rotation range
            duration: "random(3, 8)",
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: index * 0.1
          })
        }
      })

      // Parent system rotation disabled to keep rings visually static and ultra-clean
      // If you want a gentle drift of the whole system, re-enable the block below.
      // if (orbRef.current) {
      //   gsap.to(orbRef.current, {
      //     rotation: 360,
      //     duration: 80,
      //     repeat: -1,
      //     ease: "none"
      //   })
      // }

      if (!sectionRef.current) return
      // Section entrance animation
      gsap.fromTo(sectionRef.current.querySelectorAll('.planet-element'),
        {
          scale: 0,
          opacity: 0,
          rotation: -180
        },
        {
          scale: 1,
          opacity: 1,
          rotation: 0,
          duration: 1.5,
          stagger: 0.2,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      )

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-32 bg-slate-950 relative overflow-hidden font-poppins galaxy-section">
      {/* Enhanced 3D Solar System Background */}
      <div className="absolute inset-0">
        {/* Central Sun with enhanced glow */}
        <div className="absolute top-1/2 left-1/2 w-40 h-40 transform -translate-x-1/2 -translate-y-1/2 planet-element">
          <motion.div
            animate={{
              scale: [1, 1.05, 1],
              rotate: [0, 360],
            }}
            transition={{
              duration: 20,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          >
            <Image
              src="/Planets/Sun.png"
              alt="Sun"
              width={160}
              height={160}
              className="w-full h-full object-contain drop-shadow-2xl"
              style={{
                filter: "drop-shadow(0 0 50px rgba(251, 191, 36, 0.6))",
              }}
            />
          </motion.div>
        </div>

        {/* Multiple Sun corona effects */}
        {/* {[...Array(3)].map((_, i) => (
          <motion.div
            key={`corona-${i}`}
            className={`absolute top-1/2 left-1/2 ${i === 0 ? 'w-60 h-60' : i === 1 ? 'w-80 h-80' : 'w-100 h-100'} bg-gradient-to-r from-yellow-400/20 to-orange-500/20 rounded-full transform -translate-x-1/2 -translate-y-1/2`}
            animate={{
              scale: [1, 1.2 + i * 0.1, 1],
              opacity: [0.2, 0.4 + i * 0.1, 0.2],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: i * 0.5
            }}
          />
        ))} */}

        {/* Enhanced Orbiting Planets with ALL Images */}
        <div ref={orbRef} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          {[
            {
              name: "Mercury",
              size: 40,
              distance: 140,
              duration: 12,
              image: "/Planets/Planet-8.png",
              glow: "rgba(156, 163, 175, 0.4)"
            },
            {
              name: "Venus",
              size: 50,
              distance: 180,
              duration: 16,
              image: "/Planets/Venus.png",
              glow: "rgba(251, 146, 60, 0.4)"
            },
            {
              name: "Earth",
              size: 60,
              distance: 220,
              duration: 20,
              image: "/Planets/Earth.png",
              glow: "rgba(59, 130, 246, 0.4)"
            },
            {
              name: "Mars",
              size: 45,
              distance: 260,
              duration: 24,
              image: "/Planets/Mars.png",
              glow: "rgba(239, 68, 68, 0.4)"
            },
            {
              name: "Jupiter",
              size: 80,
              distance: 320,
              duration: 30,
              image: "/Planets/Jupitor.png",
              glow: "rgba(251, 191, 36, 0.4)"
            },
            {
              name: "Saturn",
              size: 90,
              distance: 380,
              duration: 35,
              image: "/Planets/Saturn.png",
              glow: "rgba(168, 85, 247, 0.4)"
            },

            {
              name: "Orb",
              size: 55,
              distance: 460,
              duration: 45,
              image: "/Planets/Orb.png",
              glow: "rgba(34, 197, 94, 0.4)"
            },
          ].map((planet, index) => (
            <motion.div
              key={index}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 planet-element"
              ref={el => {
                if (el) planetsRef.current[index] = el
              }}
              animate={{
                rotate: [0, 360],
              }}
              transition={{
                // Proportional orbital periods (Kepler-inspired but compressed for UX)
                duration: getOrbitDuration(planet.name, planet.duration),
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
              style={{
                width: planet.distance * 2,
                height: planet.distance * 2,
              }}
            >
              <motion.div
                className="absolute top-0 left-1/2 transform -translate-x-1/2"
                style={{
                  width: planet.size,
                  height: planet.size,
                  filter: `drop-shadow(0 0 20px ${planet.glow})`,
                }}
                animate={{
                  // Softer pulse to keep motion smooth and clean
                  scale: [1, 1.03, 1],
                }}
                transition={{
                  duration: 6 + index * 0.5,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              >
                <Image
                  src={planet.image}
                  alt={planet.name}
                  width={planet.size}
                  height={planet.size}
                  className="w-full h-full object-contain"
                />
              </motion.div>

              {/* Orbit guideline ring for clean, perfect circular path */}
              <div
                className="absolute inset-0 rounded-full border border-slate-500/20"
                style={{ boxShadow: `0 0 8px ${planet.glow}` }}
                aria-hidden="true"
              />
            </motion.div>
          ))}
        </div>

        {/* Asteroid belt disabled for a cleaner, blueprint-like orbit visual */}
        {Array.from({ length: 0 }).map((_, index) => (
          <motion.div
            key={`asteroid-${index}`}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 40 + index * 1.5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
            style={{
              width: 500,
              height: 500,
              transformOrigin: `${250 + Math.cos((index * 12 * Math.PI) / 180) * 35}px ${250 + Math.sin((index * 12 * Math.PI) / 180) * 35}px`,
            }}
          >
            <motion.div
              className={`absolute top-0 left-1/2 ${index % 3 === 0 ? 'w-3 h-3' : index % 3 === 1 ? 'w-2 h-2' : 'w-1 h-1'} bg-gray-400 rounded-full transform -translate-x-1/2`}
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.4, 0.8, 0.4],
              }}
              transition={{
                duration: 2 + index * 0.1,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        ))}

        {/* Floating stars kept minimal to avoid distracting from clean orbits */}
        {Array.from({ length: 8 }).map((_, index) => (
          <motion.div
            key={`star-${index}`}
            ref={el => { if (el) starsRef.current[index] = el }}
            className="absolute w-4 h-4"
            style={{
              left: `${10 + (index * 6) % 80}%`,
              top: `${15 + (index * 7) % 70}%`,
            }}
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.5, 1],
              rotate: [0, 360]
            }}
            transition={{
              duration: 4 + index * 0.3,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            <Image
              src="/Planets/Star2.png"
              alt="Star"
              width={16}
              height={16}
              className="w-full h-full object-contain"
            />
          </motion.div>
        ))}

        {/* Removed extra floaters for a clean blueprint layout */}
      </div>

      {/* Enhanced Content Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/20 via-slate-950/20 to-slate-950/20" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-5xl mx-auto text-center"
        >
          {/* Enhanced Badge */}
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-600/30 to-pink-600/30 border border-purple-500/50 rounded-full px-8 py-3 mb-8 backdrop-blur-lg shadow-2xl"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <Globe className="h-5 w-5 text-purple-400" />
            </motion.div>
            <span className="text-sm font-medium text-white font-poppins">3D Solar System</span>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <Sparkles className="h-4 w-4 text-pink-400" />
            </motion.div>
          </motion.div>

          {/* Enhanced Title */}
          <motion.h2
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent font-poppins">
              Explore Our
            </span>
            <br />
            <span className="text-white font-poppins">Solar System</span>
          </motion.h2>

          {/* Enhanced Description */}
          <motion.p
            className="text-xl md:text-2xl text-slate-300 mb-12 leading-relaxed max-w-4xl mx-auto font-poppins"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Journey through our cosmic neighborhood and discover the wonders of planets, moons, and celestial bodies
            that make up our solar system
          </motion.p>

          {/* Enhanced CTA Buttons */}
          {/* <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Link href="/education">
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="group"
              >
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-12 py-6 text-lg font-poppins transition-all duration-200 shadow-2xl shadow-purple-500/25"
                >
                  <Star className="mr-3 h-5 w-5 group-hover:rotate-12 transition-transform duration-200" />
                  Learn More
                  <motion.div
                    className="ml-2"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    🌟
                  </motion.div>
                </Button>
              </motion.div>
            </Link>

            <Link href="/shows">
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="group"
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-slate-400 text-slate-300 hover:bg-slate-800/50 px-12 py-6 text-lg bg-transparent backdrop-blur-sm font-poppins transition-all duration-200 shadow-2xl"
                >
                  <Rocket className="mr-3 h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
                  Watch Shows
                  <motion.div
                    className="ml-2"
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  >
                    🚀
                  </motion.div>
                </Button>
              </motion.div>
            </Link>
          </motion.div> */}

          {/* Additional Info Cards */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            {[
              { icon: "🌍", title: "8 Planets", desc: "Explore all planets" },
              { icon: "⭐", title: "200+ Moons", desc: "Discover lunar worlds" },
              { icon: "☄️", title: "Asteroids", desc: "Countless space rocks" },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="p-6 bg-slate-800/30 rounded-xl backdrop-blur-sm border border-slate-700/50 text-center"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="text-lg font-semibold text-white mb-2 font-poppins">{item.title}</h3>
                <p className="text-slate-400 text-sm font-poppins">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}