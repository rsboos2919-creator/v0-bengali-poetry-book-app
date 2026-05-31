"use client"

import { Poem } from '@/lib/poems'
import { bookInfo } from '@/lib/poems'
import { Bookmark, BookmarkCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface PoemPageProps {
  poem: Poem
  pageNumber: number
  isBookmarked: boolean
  onToggleBookmark: () => void
}

export function PoemPage({ poem, pageNumber, isBookmarked, onToggleBookmark }: PoemPageProps) {
  const toBengaliNumber = (num: number): string => {
    const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯']
    return num.toString().split('').map(d => bengaliDigits[parseInt(d)]).join('')
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-8">
      <div className="w-full max-w-2xl bg-card book-shadow rounded-lg overflow-hidden paper-texture relative">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-3 border-b border-border/50">
          <span className="text-xs sm:text-sm text-muted-foreground font-light tracking-wide">
            {bookInfo.title}
          </span>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggleBookmark}
              className="h-8 w-8 p-0"
              title={isBookmarked ? "বুকমার্ক সরান" : "বুকমার্ক করুন"}
            >
              {isBookmarked ? (
                <BookmarkCheck className="h-4 w-4 text-primary" />
              ) : (
                <Bookmark className="h-4 w-4" />
              )}
            </Button>
            <span className="text-xs sm:text-sm text-muted-foreground">
              {toBengaliNumber(pageNumber)}
            </span>
          </div>
        </div>
        
        {/* Poem Content */}
        <div className="px-6 sm:px-12 py-8 sm:py-12 space-y-8">
          {/* Poem Title */}
          <div className="text-center space-y-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
              {poem.title}
            </h2>
            <div className="flex justify-center">
              <div className="w-16 h-0.5 bg-primary/30 rounded-full" />
            </div>
          </div>
          
          {/* Poem Lines */}
          <div className="space-y-3 text-center">
            {poem.lines.map((line, index) => (
              <p 
                key={index} 
                className="text-lg sm:text-xl leading-relaxed text-foreground"
              >
                {line}
              </p>
            ))}
          </div>
          
          {/* Decorative element */}
          <div className="flex justify-center pt-4">
            <svg className="w-8 h-8 text-muted-foreground/30" viewBox="0 0 100 100" fill="currentColor">
              <circle cx="30" cy="50" r="4" />
              <circle cx="50" cy="50" r="4" />
              <circle cx="70" cy="50" r="4" />
            </svg>
          </div>
        </div>
        
        {/* Footer */}
        <div className="px-6 py-3 border-t border-border/50 text-right">
          <span className="text-xs sm:text-sm text-muted-foreground font-light italic">
            {bookInfo.author}
          </span>
        </div>
      </div>
    </div>
  )
}
