"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"

export function VideoBackground() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [isIntersecting, setIsIntersecting] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    // Intersection Observer for lazy loading
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting)
      },
      { threshold: 0.1 }
    )

    observer.observe(video)

    // Preload the video for better performance
    video.preload = "auto"
    
    // Set video properties for optimal performance
    video.muted = true
    video.loop = true
    video.playsInline = true
    video.autoplay = true

    // Optimize video quality based on connection
    if ('connection' in navigator) {
      const connection = (navigator as any).connection
      if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
        video.preload = "metadata"
      }
    }

    const handleLoadedData = () => {
      setIsLoaded(true)
      setIsPlaying(true)
    }

    const handleCanPlay = () => {
      if (video.readyState >= 3) {
        setIsLoaded(true)
        setIsPlaying(true)
      }
    }

    const handlePlay = () => {
      setIsPlaying(true)
    }

    const handlePause = () => {
      setIsPlaying(false)
    }

    const handleError = () => {
      setHasError(true)
      console.error('Video failed to load')
    }

    // Add event listeners
    video.addEventListener('loadeddata', handleLoadedData)
    video.addEventListener('canplay', handleCanPlay)
    video.addEventListener('play', handlePlay)
    video.addEventListener('pause', handlePause)
    video.addEventListener('error', handleError)

    // Start playing when component mounts and is visible
    const playVideo = async () => {
      if (!isIntersecting) return
      
      try {
        await video.play()
      } catch (error) {
        console.log('Video autoplay failed:', error)
        // Fallback: try to play on user interaction
        const handleUserInteraction = async () => {
          try {
            await video.play()
            document.removeEventListener('click', handleUserInteraction)
            document.removeEventListener('touchstart', handleUserInteraction)
          } catch (e) {
            console.log('Video play failed:', e)
          }
        }
        document.addEventListener('click', handleUserInteraction)
        document.addEventListener('touchstart', handleUserInteraction)
      }
    }

    if (isIntersecting) {
      playVideo()
    }

    return () => {
      observer.disconnect()
      video.removeEventListener('loadeddata', handleLoadedData)
      video.removeEventListener('canplay', handleCanPlay)
      video.removeEventListener('play', handlePlay)
      video.removeEventListener('pause', handlePause)
      video.removeEventListener('error', handleError)
    }
  }, [isIntersecting])

  // Fallback background if video fails to load
  if (hasError) {
    return (
      <div className="fixed inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-purple-950 to-blue-950" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(147,51,234,0.1)_0%,_rgba(59,130,246,0.05)_50%,_transparent_100%)]" />
        <div className="absolute inset-0 bg-black/40" />
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      {/* Video Background */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 1 }}
      >
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            objectPosition: 'center center',
          }}
          poster="/placeholder.jpg" // Fallback image while video loads
          playsInline
          muted
          loop
          autoPlay
        >
          <source src="/bg.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40" />
      </motion.div>

      {/* Loading indicator */}
      {!isLoaded && !hasError && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center bg-slate-950"
          initial={{ opacity: 1 }}
          animate={{ opacity: isLoaded ? 0 : 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-white text-lg flex items-center gap-3">
            <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            Loading cosmic experience...
          </div>
        </motion.div>
      )}

      {/* Enhanced overlay effects */}
      <div className="absolute inset-0">
        {/* Gradient overlays for better text contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-black/10" />
        
        {/* Subtle animated particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-30"
            style={{
              left: `${10 + i * 15}%`,
              top: `${15 + (i % 3) * 25}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.8,
            }}
          />
        ))}
      </div>
    </div>
  )
} 