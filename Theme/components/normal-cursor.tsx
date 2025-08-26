"use client"

import { useEffect } from "react"

export function NormalCursor() {
  useEffect(() => {
    // Set cursor back to normal
    document.body.style.cursor = 'auto'
    
    // Clean up on unmount
    return () => {
      document.body.style.cursor = 'auto'
    }
  }, [])

  return null // This component doesn't render anything
}