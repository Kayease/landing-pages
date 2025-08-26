"use client";

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Rocket } from 'lucide-react';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const ContactHero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Hero entrance animation with magnetic effect
      const tl = gsap.timeline();
      
      tl.from(badgeRef.current, {
        scale: 0,
        rotation: 360,
        opacity: 0,
        duration: 1,
        ease: "elastic.out(1, 0.5)"
      })
      .from(titleRef.current, {
        y: 100,
        opacity: 0,
        scale: 0.8,
        duration: 1.2,
        ease: "power4.out"
      }, "-=0.5")
      .from(subtitleRef.current, {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
      }, "-=0.6");

      // Magnetic mouse follow effect for title
      const handleMouseMove = (e: MouseEvent) => {
        if (!titleRef.current) return;
        
        const rect = titleRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const deltaX = (e.clientX - centerX) * 0.015;
        const deltaY = (e.clientY - centerY) * 0.015;
        
        gsap.to(titleRef.current, {
          x: deltaX,
          y: deltaY,
          duration: 0.3,
          ease: "power2.out"
        });
      };

      window.addEventListener('mousemove', handleMouseMove);

      // Floating orbs parallax
      gsap.utils.toArray<HTMLElement>(".floating-orb").forEach((orb, i) => {
        gsap.to(orb, {
          y: i % 2 === 0 ? -60 : 60,
          x: i % 2 === 0 ? 30 : -30,
          rotation: 360,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1 + i * 0.3
          }
        });
      });

      // Text glow effect on scroll
      ScrollTrigger.create({
        trigger: titleRef.current,
        start: "top 80%",
        end: "bottom 20%",
        onEnter: () => {
          gsap.to(titleRef.current, {
            textShadow: "0 0 30px rgba(34, 211, 238, 0.5), 0 0 60px rgba(16, 185, 129, 0.3)",
            duration: 1.2,
            ease: "power2.out"
          });
        },
        onLeave: () => {
          gsap.to(titleRef.current, {
            textShadow: "0 0 0px rgba(34, 211, 238, 0)",
            duration: 0.8,
            ease: "power2.out"
          });
        }
      });

      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
      };

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-[80vh] bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-indigo-500/5" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/20 to-slate-900/40" />
        
        {/* Floating orbs */}
        <motion.div
          className="floating-orb absolute w-64 h-64 rounded-full bg-gradient-to-br from-cyan-400/20 to-blue-500/20 blur-3xl"
          style={{ top: '15%', left: '10%' }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="floating-orb absolute w-48 h-48 rounded-full bg-gradient-to-br from-emerald-400/20 to-teal-500/20 blur-3xl"
          style={{ bottom: '15%', right: '10%' }}
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3
          }}
        />
        <motion.div
          className="floating-orb absolute w-40 h-40 rounded-full bg-gradient-to-br from-blue-400/20 to-indigo-500/20 blur-3xl"
          style={{ top: '40%', right: '20%' }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 6
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <motion.div 
            ref={badgeRef}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500/10 to-emerald-500/10 border border-cyan-500/30 rounded-full px-4 py-2 mb-8 backdrop-blur-sm"
          >
            <Mail className="h-4 w-4 text-cyan-400" />
            <span className="text-sm font-medium text-cyan-300">Get in Touch with the Universe</span>
          </motion.div>

          {/* Main Title */}
          <motion.h1 
            ref={titleRef}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-emerald-400 to-blue-400 bg-clip-text text-transparent cursor-pointer leading-tight"
          >
            Contact Us
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            ref={subtitleRef}
            className="text-lg sm:text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed"
          >
            Ready to embark on a cosmic journey? Connect with us to explore the wonders of the universe, book your visit, or learn more about our educational programs.
          </motion.p>

          {/* Floating Rocket Icon */}
          <motion.div
            className="absolute top-1/4 right-1/6 hidden lg:block"
            animate={{
              y: [0, -20, 0],
              rotate: [0, 5, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Rocket className="h-12 w-12 text-amber-400 opacity-70 drop-shadow-lg" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactHero;