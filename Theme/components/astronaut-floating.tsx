"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

// Register GSAP plugins only in browser
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function AstronautFloating() {
  const astronautRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    if (!astronautRef.current) return;

    const astronaut = astronautRef.current;

    // Ensure base styles
    gsap.set(astronaut, {
      position: "fixed",
      right: "2vw",
      top: "12vh",
      willChange: "top, transform",
      // Keep astronaut behind the header/navigation so header dropdowns remain clickable
      zIndex: 40,
    });

    // Micro-motion: subtle bob, sway, and tilt for natural feel
    const floatTimeline = gsap.timeline({ repeat: -1, yoyo: true });
    floatTimeline
      .to(astronaut, { y: -12, duration: 3.8, ease: "sine.inOut" }, 0)
      .to(astronaut, { x: 4, duration: 5.2, ease: "sine.inOut" }, 0)
      .to(astronaut, { rotation: 1.8, duration: 6.5, ease: "sine.inOut" }, 0);

    // Add slight random drift to avoid mechanical repetition
    const drift = gsap.to(astronaut, {
      x: "+=2",
      yoyo: true,
      repeat: -1,
      duration: 7,
      ease: "sine.inOut",
    });

    // Compute start and end within viewport
    const computeBounds = () => {
      const h = astronaut.offsetHeight || 0;
      const startTop = Math.round(window.innerHeight * 0.12); // ~12vh
      const endTop = Math.max(16, Math.round(window.innerHeight - h - 16)); // stay visible above bottom
      return { startTop, endTop };
    };

    let { startTop, endTop } = computeBounds();

    // Smoothed top position (manual easing for extra smoothness)
    let smoothTop = computeBounds().startTop;

    // Anchors (for glow only); movement maps to total page scroll
    const heroEl = document.querySelector('.hero-section') as HTMLElement | null;
    const footerEl = document.querySelector('footer') as HTMLElement | null;

    const update = () => {
      const { startTop, endTop } = computeBounds();
      const doc = document.documentElement;
      const maxScroll = Math.max(1, doc.scrollHeight - window.innerHeight);
      const p = Math.min(1, Math.max(0, window.scrollY / maxScroll));
      const targetTop = startTop + p * (endTop - startTop);
      quickTop(targetTop);
    };

    // RAF-driven update (robust even if scroll events are attached to custom scrollers)
    let rafId: number | null = null;
    let lastScrollTop = -1;
    const loop = () => {
      const se = document.scrollingElement || document.documentElement;
      const st = se.scrollTop;
      const max = Math.max(1, se.scrollHeight - window.innerHeight);
      const p = Math.min(1, Math.max(0, st / max));

      // Easing the progress a bit (smoother feel)
      const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
      const { startTop, endTop } = computeBounds();
      const targetTop = startTop + eased * (endTop - startTop);

      // Critically damped smoothing towards targetTop
      const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
      // t based on frame time; here we use a small factor for smoothness
      smoothTop = lerp(smoothTop, targetTop, 0.12);
      gsap.set(astronaut, { top: smoothTop });

      lastScrollTop = st;
      rafId = requestAnimationFrame(loop);
    };
    loop();

    // Section-specific glow color changes
    const glowEl = astronaut.querySelector('.glow') as HTMLElement | null;
    const setGlow = (cls: string) => {
      if (!glowEl) return;
      glowEl.className = 'glow absolute inset-0 rounded-full blur-2xl ' + cls;
    };
    const sectionConfigs = [
      { selector: '.hero-section', glow: 'bg-gradient-to-r from-blue-400/30 via-blue-300/25 to-cyan-400/30' },
      { selector: '.booking-section', glow: 'bg-gradient-to-r from-purple-400/30 via-fuchsia-300/25 to-blue-400/30' },
      { selector: '.current-show-section', glow: 'bg-gradient-to-r from-cyan-400/30 via-sky-300/25 to-blue-400/30' },
      { selector: '.stats-section', glow: 'bg-gradient-to-r from-green-400/30 via-emerald-300/25 to-teal-400/30' },
      { selector: '.galaxy-section', glow: 'bg-gradient-to-r from-pink-400/30 via-rose-300/25 to-purple-400/30' },
      { selector: '.testimonial-section', glow: 'bg-gradient-to-r from-orange-400/30 via-amber-300/25 to-yellow-400/30' },
    ];
    sectionConfigs.forEach(cfg => {
      const el = document.querySelector(cfg.selector);
      if (!el) return;
      ScrollTrigger.create({
        trigger: el as Element,
        start: 'top 60%',
        end: 'bottom 40%',
        onEnter: () => setGlow(cfg.glow),
        onEnterBack: () => setGlow(cfg.glow),
      });
    });

    // Hide astronaut when footer enters view to avoid covering footer
    const footerHideST = footerEl
      ? ScrollTrigger.create({
        trigger: footerEl,
        start: 'top bottom',
        end: 'top 85%',
        onEnter: () => gsap.to(astronaut, { autoAlpha: 0, x: 24, duration: 0.4, ease: 'power2.out' }),
        onLeaveBack: () => gsap.to(astronaut, { autoAlpha: 1, x: 0, duration: 0.4, ease: 'power2.out' }),
      })
      : null;

    const handleResize = () => {
      ({ startTop, endTop } = computeBounds());
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", handleResize);

    // Particles
    const particles = astronaut.querySelectorAll(".particle");
    particles.forEach((particle, index) => {
      gsap.to(particle as HTMLElement, {
        y: -18,
        x: Math.sin(index) * 10,
        opacity: 0.75,
        scale: 1.15,
        duration: 5 + index * 0.4,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1,
        delay: index * 0.3,
      });
    });

    // Sparkles
    const sparkles = astronaut.querySelectorAll(".sparkle");
    sparkles.forEach((sparkle, index) => {
      gsap.to(sparkle as HTMLElement, {
        scale: 0,
        opacity: 0,
        duration: 3,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1,
        delay: index * 0.5,
      });
    });

    // Glow pulse
    const glow = astronaut.querySelector(".glow");
    if (glow) {
      gsap.to(glow as HTMLElement, {
        scale: 1.12,
        opacity: 0.33,
        duration: 5,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1,
      });
    }

    // Pulse ring
    const pulseRing = astronaut.querySelector(".pulse-ring");
    if (pulseRing) {
      gsap.to(pulseRing as HTMLElement, {
        scale: 1.08,
        opacity: 0,
        duration: 4,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1,
      });
    }

    // Breathing effect
    const breathing = astronaut.querySelector(".breathing");
    if (breathing) {
      gsap.to(breathing as HTMLElement, {
        scale: 1.02,
        opacity: 0.12,
        duration: 4,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1,
      });
    }

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener("resize", handleResize);
      floatTimeline.kill();
      drift.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [mounted]);

  // Interactions
  const handleClick = () => {
    if (!astronautRef.current) return;
    const tl = gsap.timeline();
    tl.to(astronautRef.current, { scale: 0.96, rotation: "+=2", duration: 0.12, ease: "power2.out" })
      .to(astronautRef.current, { scale: 1, rotation: "-=2", duration: 0.18, ease: "power2.out" });

    const ripple = document.createElement("div");
    ripple.className = "absolute inset-0 bg-yellow-400/30 rounded-full pointer-events-none";
    astronautRef.current.appendChild(ripple);

    gsap.to(ripple, {
      scale: 2.2,
      opacity: 0,
      duration: 0.9,
      ease: "power2.out",
      onComplete: () => {
        if (ripple.parentNode) ripple.parentNode.removeChild(ripple);
      },
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (astronautRef.current) {
      gsap.to(astronautRef.current, { scale: 1.06, rotate: "+=1.5", duration: 0.28, ease: "power2.out" });
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (astronautRef.current) {
      gsap.to(astronautRef.current, { scale: 1, rotate: "-=1.5", duration: 0.28, ease: "power2.out" });
    }
  };

  // Render via portal to <body> to avoid any parent overflow/transform clipping
  if (!mounted) return null;

  return createPortal(
    <div
      ref={astronautRef}
      className="fixed w-24 h-32 sm:w-28 sm:h-36 md:w-48 md:h-48 lg:w-56 lg:h-56 xl:w-64 xl:h-64 cursor-pointer pointer-events-auto z-40"
      style={{ top: "12vh", right: "2vw", willChange: "top, transform" }}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Astronaut Image */}
      <Image
        src="/Planets/Astronaut.png"
        alt="Floating Astronaut"
        width={256}
        height={256}
        className="w-full h-full object-contain drop-shadow-2xl relative z-10"
        priority
        style={{ width: 'auto', height: 'auto' }}
      />

      {/* Enhanced Glow Effect */}
      <div className="glow absolute inset-0 bg-gradient-to-r from-blue-400/30 via-purple-400/30 to-cyan-400/30 rounded-full blur-2xl" />

      {/* Pulse ring effect */}
      <div className="pulse-ring absolute inset-0  rounded-full" />

      {/* Floating particles around astronaut */}
      {/* {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="particle absolute w-1.5 h-1.5 md:w-2.5 md:h-2.5 lg:w-3 lg:h-3 bg-blue-400 rounded-full opacity-70"
          style={{ left: `${15 + i * 12}%`, top: `${25 + i * 10}%` }}
        />
      ))} */}

      {/* Sparkle effects */}
      {[...Array(6)].map((_, i) => (
        <div
          key={`sparkle-${i}`}
          className="sparkle absolute w-1.5 h-1.5 md:w-2 md:h-2 lg:w-2.5 lg:h-2.5 bg-yellow-400 rounded-full"
          style={{ left: `${35 + i * 12}%`, top: `${15 + i * 15}%` }}
        />
      ))}

      {/* Cosmic dust particles */}
      {/* {[...Array(4)].map((_, i) => (
        <div
          key={`dust-${i}`}
          className="particle absolute w-1 h-1 md:w-1.5 md:h-1.5 bg-purple-300 rounded-full opacity-50"
          style={{ left: `${50 + i * 20}%`, top: `${40 + i * 18}%` }}
        />
      ))} */}

      {/* Breathing effect */}
      <div className="breathing absolute inset-0 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full" />

      {/* Hover indicator */}
      <div
        className={`absolute -top-2 -right-2 w-3 h-3 bg-blue-400 rounded-full transition-opacity duration-300 ${isHovered ? "opacity-100" : "opacity-0"
          }`}
      />
    </div>,
    document.body
  );
}

// Safe no-op to avoid runtime errors if accidentally called.
function quickTop(_targetTop: number) {
  // Intentionally left blank; top position is updated via RAF loop above.
}
