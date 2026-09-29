'use client'

import { FileDown, Loader2 } from 'lucide-react'
import { useState } from 'react'
import { exportToPDF } from '@/lib/pdf-export'
import { poems, bookInfo } from '@/lib/poems'

export function PDFExportButton() {
  const [isExporting, setIsExporting] = useState(false)

  const handleExport = async () => {
    setIsExporting(true)
    try {
      await exportToPDF(poems, bookInfo)
    } catch (error) {
      console.error('PDF export error:', error)
      alert('পিডিএফ ডাউনলোড করতে ব্যর্থ হয়েছে')
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <button
      onClick={handleExport}
      disabled={isExporting}
      className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      aria-label="পিডিএফ হিসেবে ডাউনলোড করুন"
      title="সম্পূর্ণ বই পিডিএফ হিসেবে ডাউনলোড করুন"
    >
      {isExporting ? (
        <>
          <Loader2 size={18} className="animate-spin" />
          <span>তৈরি করছি...</span>
        </>
      ) : (
        <>
          <FileDown size={18} />
          <span>পিডিএফ ডাউনলোড</span>
        </>
      )}
    </button>
  )
}
