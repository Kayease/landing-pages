"use client"

import React, { useEffect, useRef } from 'react';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import theme from '../../theme';
import ContactHero from '../../components/contact/ContactHero';
import GalaxyBackground from '../../components/contact/GalaxyBackground';
import { AstronautFloating } from '../../components/astronaut-floating';
import { ContactForm } from '../../components/contact/contact-form';
import { ContactInfo } from '../../components/contact/contact-info';
import { ContactFAQ } from '../../components/contact/contact-faq';
import { ContactMap } from '../../components/contact/contact-map';
import { EnhancedStatsSection } from '../../components/enhanced-stats-section';
import Image from 'next/image';
import { PlanetAnimator } from '../../components/planet-animator';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Create emotion cache
const createEmotionCache = () => {
  return createCache({
    key: "mui",
    prepend: true,
  });
};

const emotionCache = createEmotionCache();

export default function ContactPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Create floating communication satellites
      const satellites: HTMLElement[] = [];
      const satelliteCount = 12;

      for (let i = 0; i < satelliteCount; i++) {
        const satellite = document.createElement('div');
        const size = i % 3 === 0 ? 8 : i % 3 === 1 ? 4 : 12;
        const colors = ['#10b981', '#22d3ee', '#34d399'];
        
        satellite.style.position = 'fixed';
        satellite.style.width = `${size}px`;
        satellite.style.height = `${size}px`;
        satellite.style.backgroundColor = colors[i % 3];
        satellite.style.borderRadius = '50%';
        satellite.style.left = `${Math.random() * 100}%`;
        satellite.style.top = `${Math.random() * 100}%`;
        satellite.style.opacity = '0.7';
        satellite.style.boxShadow = `0 0 ${size * 2}px ${colors[i % 3]}80`;
        satellite.style.zIndex = '10';
        satellite.style.pointerEvents = 'none';
        
        containerRef.current?.appendChild(satellite);
        satellites.push(satellite);
      }

      // Animate satellites with keyframes to avoid GSAP array property warning
      satellites.forEach((satellite, index) => {
        gsap.to(satellite, {
          keyframes: [
            { y: 0, x: 0, rotation: 0, scale: 1, opacity: 0.2 },
            { y: -30, x: Math.sin(index) * 15, rotation: 360, scale: 1.3, opacity: 0.7 },
            { y: 0, x: 0, rotation: 0, scale: 1, opacity: 0.2 }
          ],
          duration: 6 + Math.random() * 3,
          repeat: -1,
          ease: "power2.inOut",
          delay: Math.random() * 4
        });
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box 
          ref={containerRef}
          sx={{ 
            minHeight: '100vh', 
            backgroundColor: theme.palette.background.default,
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {/* Background Effects */}
          <GalaxyBackground />
          <PlanetAnimator />
          
          {/* Floating Astronaut */}
          <AstronautFloating />

          {/* Parallax planets background layer */}
          <div className="stage-3d pointer-events-none absolute inset-0 -z-10">
            <Image
              src="/Planets/Earth.png"
              alt="Earth"
              width={280}
              height={280}
              priority
              data-planet
              data-depth="420"
              data-float="18"
              data-rot="8"
              data-speed="9"
              data-parallax="0.85"
              style={{ position: 'absolute', left: '8%', top: '16%', opacity: 0.75 }}
            />
            <Image
              src="/Planets/Group 3.png"
              alt="Ringed Planet"
              width={240}
              height={240}
              priority
              data-planet
              data-depth="520"
              data-float="22"
              data-rot="10"
              data-speed="10"
              data-parallax="1"
              style={{ position: 'absolute', right: '12%', bottom: '12%', opacity: 0.8 }}
            />
          </div>
          
          {/* Content */}
          <Box sx={{ position: 'relative', zIndex: 20, pt: 10 }}>
            <ContactHero />

            {/* Key info cards */}
            <Box component="section" sx={{ position: 'relative', zIndex: 20 }}>
              <ContactInfo />
            </Box>

            {/* Form */}
            <Box component="section" sx={{ position: 'relative', zIndex: 20 }}>
              <ContactForm />
            </Box>

            {/* Map & Directions */}
            <Box component="section" sx={{ position: 'relative', zIndex: 20 }}>
              <ContactMap />
            </Box>

            {/* Achievements / Luxury stats strip */}
            <Box component="section" sx={{ position: 'relative', zIndex: 20 }}>
              <EnhancedStatsSection />
            </Box>

            {/* FAQ */}
            <Box component="section" sx={{ position: 'relative', zIndex: 20 }}>
              <ContactFAQ />
            </Box>
          </Box>
        </Box>
      </ThemeProvider>
    </CacheProvider>
  );
}