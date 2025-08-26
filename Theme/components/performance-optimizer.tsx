"use client"

import { useEffect } from "react"

export function PerformanceOptimizer() {
  useEffect(() => {
    // Preload critical resources
    const preloadResources = () => {
      // Preload fonts
      const fontLink = document.createElement('link')
      fontLink.rel = 'preload'
      fontLink.href = '/fonts/NotoSans-VariableFont_wdth,wght.ttf'
      fontLink.as = 'font'
      fontLink.type = 'font/woff2'
      fontLink.crossOrigin = 'anonymous'
      document.head.appendChild(fontLink)

      // Enhanced GPU acceleration for animations
      const style = document.createElement('style')
      style.textContent = `
        .gpu-accelerated {
          transform: translateZ(0);
          will-change: transform, opacity;
          backface-visibility: hidden;
          perspective: 1000px;
        }
        
        .optimized-animation {
          transition-duration: 0.2s !important;
          animation-duration: 0.3s !important;
        }
        
        .fast-transition {
          transition: all 0.15s ease-out !important;
        }
        
        .hardware-accelerated {
          transform: translate3d(0, 0, 0);
          will-change: transform;
        }
      `
      document.head.appendChild(style)
    }

    // Optimize scroll performance with throttling
    const optimizeScroll = () => {
      let ticking = false
      let lastScrollY = 0
      
      const updateScrollElements = () => {
        // Batch DOM updates for better performance
        requestAnimationFrame(() => {
          // Update scroll-dependent elements here
          const scrollY = window.scrollY
          
          // Only update if scroll position changed significantly
          if (Math.abs(scrollY - lastScrollY) > 5) {
            lastScrollY = scrollY
            // Update parallax elements, navigation, etc.
          }
          
          ticking = false
        })
      }

      const handleScroll = () => {
        if (!ticking) {
          ticking = true
          updateScrollElements()
        }
      }

      window.addEventListener('scroll', handleScroll, { passive: true })
      return () => window.removeEventListener('scroll', handleScroll)
    }

    // Enhanced device optimization
    const optimizeForDevice = () => {
      const isLowEndDevice = navigator.hardwareConcurrency <= 4 || 
                            (navigator as any).deviceMemory <= 4 ||
                            /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)

      if (isLowEndDevice) {
        document.documentElement.style.setProperty('--animation-duration', '0.1s')
        document.documentElement.classList.add('reduced-motion', 'optimized-animation')
        
        // Reduce animation complexity for low-end devices
        const reducedMotionStyle = document.createElement('style')
        reducedMotionStyle.textContent = `
          .reduced-motion * {
            animation-duration: 0.1s !important;
            transition-duration: 0.1s !important;
          }
          
          .reduced-motion .floating-elements,
          .reduced-motion .star-field {
            display: none !important;
          }
        `
        document.head.appendChild(reducedMotionStyle)
      }
    }

    // Optimize animation performance
    const optimizeAnimations = () => {
      // Add hardware acceleration to all animated elements
      try {
        const animatedElements = document.querySelectorAll('[data-animate]')
        animatedElements.forEach(el => {
          if (el instanceof HTMLElement) {
            el.classList.add('gpu-accelerated', 'hardware-accelerated')
          }
        })
        
        // Handle Tailwind animation classes separately
        const tailwindAnimatedElements = document.querySelectorAll('[class*="animate-"]')
        tailwindAnimatedElements.forEach(el => {
          if (el instanceof HTMLElement) {
            el.classList.add('gpu-accelerated', 'hardware-accelerated')
          }
        })
      } catch (error) {
        console.warn('Animation optimization failed:', error)
      }
      
      // Optimize CSS transitions
      const transitionElements = document.querySelectorAll('[class*="transition-"]')
      transitionElements.forEach(el => {
        if (el instanceof HTMLElement) {
          el.classList.add('fast-transition')
        }
      })
    }

    // Cache frequently used elements
    const cacheElements = () => {
      // Cache DOM queries for better performance
      const commonSelectors = [
        '.navigation',
        '.hero-section',
        '.floating-elements',
        '.star-field'
      ]
      
      commonSelectors.forEach(selector => {
        const element = document.querySelector(selector)
        if (element) {
          element.classList.add('gpu-accelerated')
        }
      })
    }

    // Initialize all optimizations
    preloadResources()
    optimizeScroll()
    optimizeForDevice()
    
    // Run animation optimizations after a short delay to ensure DOM is ready
    setTimeout(() => {
      optimizeAnimations()
      cacheElements()
    }, 100)

    // Cleanup function
    return () => {
      // Remove any added styles or event listeners if needed
    }
  }, [])

  return null
}