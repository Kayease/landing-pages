"use client";

import { HeroSection } from "@/components/hero-section";
import { EnhancedStatsSection } from "@/components/enhanced-stats-section";
import { TestimonialSection } from "@/components/testimonial-section";
import { BookingSection } from "@/components/booking-section";
import { GalaxySection } from "@/components/galaxy-section";
import { CurrentShowSection } from "@/components/current-show-section";
import { AstronautFloating } from "@/components/astronaut-floating";
import { PlanetAnimator } from "@/components/planet-animator";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white font-poppins relative">
      {/* Astronaut - Fixed positioned with scroll effects (renders to body via portal) */}
      <AstronautFloating />

      {/* Planet-wide animator to enhance 3D/momentum across planet sections */}
      <PlanetAnimator />

      {/* Enhanced Hero Section */}
      <div className="hero-section">
        <HeroSection />
      </div>

      {/* Booking Section */}
      <div className="booking-section" id="book">
        <BookingSection />
      </div>

      {/* Current Show Section */}
      <div className="current-show-section">
        <CurrentShowSection />
      </div>

      {/* Enhanced Stats Section */}
      <div className="stats-section">
        <EnhancedStatsSection />
      </div>

      {/* Galaxy 3D Section */}
      <div className="galaxy-section">
        <GalaxySection />
      </div>

      {/* Testimonials */}
      <div className="testimonial-section">
        <TestimonialSection />
      </div>

      {/* Spacer before footer for breathing room */}
      <div className="h-16 md:h-24" aria-hidden="true" />
      {/* Soft fade separator so footer stands out */}
      <div className="pointer-events-none h-20 -mt-20 bg-gradient-to-t from-slate-950 to-transparent" aria-hidden="true" />

      {/* Footer */}
      <footer className="relative z-10">
        {/* <Footer /> */}
      </footer>
    </div>
  );
}
