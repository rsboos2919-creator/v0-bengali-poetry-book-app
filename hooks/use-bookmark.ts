"use client"

import { useState, useEffect, useCallback } from 'react'

const STORAGE_KEY = 'apon-duniya-bookmark'
const BOOKMARKS_KEY = 'apon-duniya-bookmarks'

export function useBookmark() {
  const [currentPage, setCurrentPage] = useState(0)
  const [bookmarks, setBookmarks] = useState<number[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  // Load saved state on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedPage = localStorage.getItem(STORAGE_KEY)
      const savedBookmarks = localStorage.getItem(BOOKMARKS_KEY)
      
      if (savedPage) {
        setCurrentPage(parseInt(savedPage, 10))
      }
      if (savedBookmarks) {
        setBookmarks(JSON.parse(savedBookmarks))
      }
      setIsLoaded(true)
    }
  }, [])

  // Save current page whenever it changes
  useEffect(() => {
    if (isLoaded && typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, currentPage.toString())
    }
  }, [currentPage, isLoaded])

  // Save bookmarks whenever they change
  useEffect(() => {
    if (isLoaded && typeof window !== 'undefined') {
      localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(bookmarks))
    }
  }, [bookmarks, isLoaded])

  const goToPage = useCallback((page: number) => {
    setCurrentPage(page)
  }, [])

  const nextPage = useCallback((maxPage: number) => {
    setCurrentPage(prev => Math.min(prev + 1, maxPage))
  }, [])

  const prevPage = useCallback(() => {
    setCurrentPage(prev => Math.max(prev - 1, 0))
  }, [])

  const toggleBookmark = useCallback((page: number) => {
    setBookmarks(prev => {
      if (prev.includes(page)) {
        return prev.filter(p => p !== page)
      }
      return [...prev, page].sort((a, b) => a - b)
    })
  }, [])

  const isBookmarked = useCallback((page: number) => {
    return bookmarks.includes(page)
  }, [bookmarks])

  return {
    currentPage,
    bookmarks,
    isLoaded,
    goToPage,
    nextPage,
    prevPage,
    toggleBookmark,
    isBookmarked,
  }
}
