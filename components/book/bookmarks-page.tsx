'use client'

import { useBookmark } from '@/hooks/use-bookmark'
import { poems } from '@/lib/poems'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export function BookmarksPage() {
  const { bookmarks } = useBookmark()

  const bookmarkedPoems = poems.filter(poem => bookmarks.includes(poem.id))

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-primary hover:text-primary/80 mb-8 transition-colors"
        >
          <ArrowLeft size={20} />
          <span>ফিরে যান</span>
        </Link>

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">প্রিয় কবিতা</h1>
          <p className="text-lg text-muted-foreground">
            {bookmarkedPoems.length} টি প্রিয় কবিতা সংরক্ষণ করা আছে
          </p>
        </div>

        {bookmarkedPoems.length === 0 ? (
          <div className="bg-secondary/50 rounded-lg p-8 text-center">
            <p className="text-muted-foreground mb-4">এখনও কোন প্রিয় কবিতা নেই</p>
            <Link
              href="/"
              className="inline-block px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              বই পড়ুন
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {bookmarkedPoems.map((poem) => (
              <Link
                key={poem.id}
                href={`/?page=${poem.id}`}
                className="block p-6 bg-card rounded-lg border border-border hover:shadow-lg transition-shadow group"
              >
                <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors mb-2">
                  {poem.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  কবিতা #{poem.id}
                </p>
                <div className="mt-3 line-clamp-2 text-foreground text-sm">
                  {poem.lines[0]}...
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
