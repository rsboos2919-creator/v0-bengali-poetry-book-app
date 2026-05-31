"use client"

import { bookInfo } from '@/lib/poems'

export function AboutPage() {
  return (
    <div className="min-h-screen p-4 sm:p-8">
      <div className="max-w-2xl mx-auto bg-card book-shadow rounded-lg overflow-hidden">
        {/* Header */}
        <div className="p-6 sm:p-8 border-b border-border text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            বই সম্পর্কে
          </h2>
        </div>
        
        {/* Content */}
        <div className="p-6 sm:p-8 space-y-8">
          {/* Book Description */}
          <section className="space-y-4">
            <h3 className="text-xl font-semibold text-primary flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              বইয়ের বর্ণনা
            </h3>
            <p className="text-foreground leading-relaxed text-justify">
              {bookInfo.description}
            </p>
          </section>
          
          {/* Dedication */}
          <section className="space-y-4">
            <h3 className="text-xl font-semibold text-primary flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              উৎসর্গ
            </h3>
            <p className="text-foreground leading-relaxed italic border-l-4 border-gold pl-4">
              {bookInfo.dedication}
            </p>
          </section>
          
          {/* About Author */}
          <section className="space-y-4">
            <h3 className="text-xl font-semibold text-primary flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              লেখক পরিচিতি
            </h3>
            <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
              {/* Author Avatar Placeholder */}
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground text-3xl font-bold flex-shrink-0">
                ত
              </div>
              <div className="space-y-2 text-center sm:text-left">
                <p className="text-xl font-semibold text-foreground">
                  {bookInfo.author}
                </p>
                <p className="text-foreground leading-relaxed">
                  {bookInfo.aboutAuthor}
                </p>
              </div>
            </div>
          </section>
          
          {/* Book Info */}
          <section className="space-y-4 pt-4 border-t border-border">
            <h3 className="text-xl font-semibold text-primary flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              প্রকাশনা তথ্য
            </h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">প্রকাশকাল:</span>
                <p className="font-medium text-foreground">{bookInfo.year}</p>
              </div>
              <div>
                <span className="text-muted-foreground">মোট কবিতা:</span>
                <p className="font-medium text-foreground">১০০টি</p>
              </div>
              <div>
                <span className="text-muted-foreground">ভাষা:</span>
                <p className="font-medium text-foreground">বাংলা</p>
              </div>
              <div>
                <span className="text-muted-foreground">ধরন:</span>
                <p className="font-medium text-foreground">কবিতা সংকলন</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
