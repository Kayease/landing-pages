"use client"

import { useEffect, useRef } from "react"

export function VideoPreloader() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    // Preload the video in the background
    video.preload = "auto"
    video.muted = true
    video.playsInline = true
    
    // Start loading the video immediately
    video.load()

    // Optional: Preload video data
    const preloadVideo = async () => {
      try {
        // Check if video is ready to play
        if (video.readyState >= 2) {
          // This will start downloading the video
          await video.play()
          video.pause()
        } else {
          // Wait for video to be ready
          video.addEventListener('canplay', async () => {
            try {
              await video.play()
              video.pause()
            } catch (error) {
              // Ignore autoplay errors, video will still be cached
              console.warn("Video autoplay failed, but video is cached:", error);
            }
          }, { once: true });
        }
      } catch (error) {
        // Ignore autoplay errors, video will still be cached
        console.warn("Video preloading failed:", error);
      }
    }

    preloadVideo()

    return () => {
      if (video) {
        video.pause()
        video.src = ""
        video.load()
      }
    }
  }, [])

  return (
    <video
      ref={videoRef}
      style={{ display: 'none' }}
      muted
      playsInline
    >
      <source src="/bg.mp4" type="video/mp4" />
    </video>
  )
} 