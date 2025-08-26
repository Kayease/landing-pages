"use client"

import React from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import theme from '../../theme';
import ExploreHero from '../../components/explore/ExploreHero';
import HistorySection from '../../components/explore/HistorySection';
import AchievementsGrid from '../../components/explore/AchievementsGrid';
import ShowsTimeline from '../../components/explore/ShowsTimeline';
import LegacySection from '../../components/explore/LegacySection';
import Image from 'next/image';
import { PlanetAnimator } from '../../components/planet-animator';
import { AstronautFloating } from '../../components/astronaut-floating';
import FeaturedExperiences from '../../components/explore/FeaturedExperiences';
import VisitCta from '../../components/explore/VisitCta';

// Create emotion cache
const createEmotionCache = () => {
  return createCache({
    key: "mui",
    prepend: true,
  });
};

const emotionCache = createEmotionCache();

export default function ExplorePage() {
  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div style={{ minHeight: '100vh', backgroundColor: theme.palette.background.default, overflow: 'hidden', position: 'relative' }}>
          {/* Global floating astronaut and 3D planet animator */}
          <AstronautFloating />
          <PlanetAnimator />

          {/* Parallax planets background layer */}
          <div className="stage-3d pointer-events-none absolute inset-0 -z-10">
            <Image
              src="/Planets/Earth.png"
              alt="Earth"
              width={320}
              height={320}
              priority
              data-planet
              data-depth="380"
              data-float="16"
              data-rot="6"
              data-speed="8"
              data-parallax="0.9"
              style={{ position: 'absolute', left: '4%', top: '12%', opacity: 0.85 }}
            />
            <Image
              src="/Planets/Group 3.png"
              alt="Ringed Planet"
              width={280}
              height={280}
              priority
              data-planet
              data-depth="520"
              data-float="22"
              data-rot="10"
              data-speed="10"
              data-parallax="1"
              style={{ position: 'absolute', right: '6%', bottom: '10%', opacity: 0.8 }}
            />
            <Image
              src="/Planets/Earth.png"
              alt="Distant Planet"
              width={180}
              height={180}
              priority
              data-planet
              data-depth="260"
              data-float="12"
              data-rot="4"
              data-speed="7"
              data-parallax="0.7"
              style={{ position: 'absolute', left: '50%', top: '70%', transform: 'translateX(-50%)', opacity: 0.6 }}
            />
          </div>

          <ExploreHero />
          <HistorySection />
          <AchievementsGrid />
          <FeaturedExperiences />
          <ShowsTimeline />
          <LegacySection />
          <VisitCta />
        </div>
      </ThemeProvider>
    </CacheProvider>
  );
}