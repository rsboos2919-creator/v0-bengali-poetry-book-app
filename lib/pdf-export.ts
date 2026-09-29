'use client'

import { poems, bookInfo } from '@/lib/poems'

export async function exportToPDF(): Promise<void> {
  if (typeof window === 'undefined') return

  try {
    // Fetch the HTML from the API
    const response = await fetch('/api/pdf')
    const htmlContent = await response.text()

    // Create a blob from the HTML
    const blob = new Blob([htmlContent], { type: 'text/html; charset=utf-8' })
    
    // Create a temporary download link
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.href = url
    link.download = 'আপন-দুনিয়া.html'
    
    // Trigger download
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  } catch (error) {
    console.error('[v0] PDF export error:', error)
    alert('পিডিএফ ডাউনলোড করতে ব্যর্থ হয়েছে')
  }
}
