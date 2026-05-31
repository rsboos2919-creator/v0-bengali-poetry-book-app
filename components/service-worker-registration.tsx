"use client"

import { useEffect } from 'react'

export function ServiceWorkerRegistration() {
  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log('[v0] Service Worker registered successfully:', registration.scope)
          
          // Check for updates
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  // New content available, notify user if needed
                  console.log('[v0] New content available, refresh to update')
                }
              })
            }
          })
        })
        .catch((error) => {
          console.error('[v0] Service Worker registration failed:', error)
        })
    }
  }, [])

  return null
}
