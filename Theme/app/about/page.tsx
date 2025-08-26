"use client"

import React, { useEffect, useState } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import theme from '../../theme';
import HeroSection from '../../components/about/HeroSection';
import MissionSection from '../../components/about/MissionSection';
import VisitInfoSection from '../../components/about/VisitInfoSection';
import BulkBookingSection from '../../components/about/BulkBookingSection';
import { EnhancedStatsSection } from '../../components/enhanced-stats-section';

// Create emotion cache
const createEmotionCache = () => {
  return createCache({
    key: "mui",
    prepend: true,
  });
};

const emotionCache = createEmotionCache();

export default function AboutPage() {
  // Animated counters
  const [visitorCount, setVisitorCount] = useState(0);
  const [showsCount, setShowsCount] = useState(0);
  const [equipmentCount, setEquipmentCount] = useState(0);

  useEffect(() => {
    // Simple counter animation
    const duration = 2000; // 2 seconds
    const steps = 60;
    const stepDuration = duration / steps;
    
    let currentStep = 0;
    
    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      
      setVisitorCount(Math.floor(100000 + progress * 50000)); // 100k → 150k
      setShowsCount(Math.floor(25 + progress * 10)); // 25 → 35
      setEquipmentCount(Math.floor(10 + progress * 5)); // 10 → 15
      
      if (currentStep >= steps) {
        clearInterval(timer);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, []);

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div style={{ minHeight: '100vh', backgroundColor: theme.palette.background.default }}>
          <HeroSection 
            visitorCount={visitorCount}
            showsCount={showsCount}
            equipmentCount={equipmentCount}
          />
          <EnhancedStatsSection />
          <MissionSection />
          <VisitInfoSection />
          <BulkBookingSection />
        </div>
      </ThemeProvider>
    </CacheProvider>
  );
}