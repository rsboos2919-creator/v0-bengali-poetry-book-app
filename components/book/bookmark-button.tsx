'use client'

import { useBookmark } from '@/hooks/use-bookmark'
import { Bookmark } from 'lucide-react'
import { cn } from '@/lib/utils'

interface BookmarkButtonProps {
  poemId: number
  poemTitle: string
}

export function BookmarkButton({ poemId, poemTitle }: BookmarkButtonProps) {
  const { bookmarks, toggleBookmark, isBookmarked } = useBookmark()
  const isMarked = isBookmarked(poemId)

  const handleToggle = () => {
    toggleBookmark(poemId)
  }

  return (
    <button
      onClick={handleToggle}
      className={cn(
        'inline-flex items-center gap-2 px-3 py-2 rounded-lg transition-colors',
        isMarked
          ? 'bg-accent text-accent-foreground hover:bg-accent/90'
          : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
      )}
      aria-label={isMarked ? 'প্রিয় থেকে সরান' : 'প্রিয়তে যোগ করুন'}
      title={isMarked ? 'প্রিয় থেকে সরান' : 'প্রিয়তে যোগ করুন'}
    >
      <Bookmark
        size={18}
        className={isMarked ? 'fill-current' : ''}
      />
      <span className="text-sm font-medium">
        {isMarked ? 'প্রিয়' : 'প্রিয়তে'}
      </span>
    </button>
  )
}
