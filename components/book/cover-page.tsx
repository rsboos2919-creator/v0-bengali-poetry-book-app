"use client"

import { bookInfo } from '@/lib/poems'

export function CoverPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-8">
      <div className="w-full max-w-lg bg-card book-shadow rounded-lg overflow-hidden">
        {/* Decorative top border */}
        <div className="h-3 bg-gradient-to-r from-primary via-accent to-primary" />
        
        <div className="p-8 sm:p-12 text-center space-y-8">
          {/* Decorative element */}
          <div className="flex justify-center">
            <div className="w-24 h-1 bg-gold rounded-full" />
          </div>
          
          {/* Book Title */}
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground leading-tight">
              {bookInfo.title}
            </h1>
            <div className="flex justify-center">
              <div className="w-16 h-0.5 bg-muted-foreground/30 rounded-full" />
            </div>
          </div>
          
          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-muted-foreground">
            কবিতা সংকলন
          </p>
          
          {/* Decorative ornament */}
          <div className="py-6">
            <svg className="w-16 h-16 mx-auto text-gold" viewBox="0 0 100 100" fill="currentColor">
              <path d="M50 5 L60 40 L95 50 L60 60 L50 95 L40 60 L5 50 L40 40 Z" opacity="0.3" />
              <circle cx="50" cy="50" r="8" />
            </svg>
          </div>
          
          {/* Author Name */}
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground uppercase tracking-widest">
              রচনা
            </p>
            <p className="text-2xl sm:text-3xl font-semibold text-foreground">
              {bookInfo.author}
            </p>
          </div>
          
          {/* Year */}
          <p className="text-muted-foreground">
            {bookInfo.year}
          </p>
          
          {/* Decorative bottom element */}
          <div className="flex justify-center pt-4">
            <div className="w-24 h-1 bg-gold rounded-full" />
          </div>
        </div>
        
        {/* Decorative bottom border */}
        <div className="h-3 bg-gradient-to-r from-primary via-accent to-primary" />
      </div>
    </div>
  )
}
