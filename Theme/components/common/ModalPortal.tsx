'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

interface ModalPortalProps {
  children: React.ReactNode
}

export function ModalPortal({ children }: ModalPortalProps) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted || typeof document === 'undefined') return null

  let container = document.getElementById('modal-root')
  if (!container) {
    container = document.createElement('div')
    container.id = 'modal-root'
    document.body.appendChild(container)
  }

  return createPortal(children, container)
}


