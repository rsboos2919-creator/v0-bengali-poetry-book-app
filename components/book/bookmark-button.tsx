'use client'

import { useBookmark } from '@/hooks/use-bookmark'
import { Bookmark } from 'lucide-react'
import { cn } from '@/lib/utils'

interface BookmarkButtonProps {
  poemId: number
  poemTitle: string
}

export function BookmarkButton({ poemId, poemTitle }: BookmarkButtonProps) {
  const { bookmarks, addBookmark, removeBookmark } = useBookmark()
  const isBookmarked = bookmarks.includes(poemId)

  const handleToggle = () => {
    if (isBookmarked) {
      removeBookmark(poemId)
    } else {
      addBookmark(poemId, poemTitle)
    }
  }

  return (
    <button
      onClick={handleToggle}
      className={cn(
        'inline-flex items-center gap-2 px-3 py-2 rounded-lg transition-colors',
        isBookmarked
          ? 'bg-accent text-accent-foreground hover:bg-accent/90'
          : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
      )}
      aria-label={isBookmarked ? 'প্রিয় থেকে সরান' : 'প্রিয়তে যোগ করুন'}
      title={isBookmarked ? 'প্রিয় থেকে সরান' : 'প্রিয়তে যোগ করুন'}
    >
      <Bookmark
        size={18}
        className={isBookmarked ? 'fill-current' : ''}
      />
      <span className="text-sm font-medium">
        {isBookmarked ? 'প্রিয়' : 'প্রিয়তে'}
      </span>
    </button>
  )
}
