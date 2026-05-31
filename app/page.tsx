"use client"

import { useCallback, useEffect } from 'react'
import { poems } from '@/lib/poems'
import { useBookmark } from '@/hooks/use-bookmark'
import { useReadingProgress } from '@/hooks/use-reading-progress'
import { usePWA } from '@/hooks/use-pwa'
import { CoverPage } from '@/components/book/cover-page'
import { TableOfContents } from '@/components/book/table-of-contents'
import { PoemPage } from '@/components/book/poem-page'
import { AboutPage } from '@/components/book/about-page'
import { Navigation } from '@/components/book/navigation'
import { ReadingProgress } from '@/components/book/reading-progress'

// Page types: 0 = Cover, 1 = TOC, 2-101 = Poems, 102 = About
const TOTAL_PAGES = poems.length + 3 // Cover + TOC + Poems + About

export default function BookApp() {
  const {
    currentPage,
    bookmarks,
    isLoaded,
    goToPage,
    nextPage,
    prevPage,
    toggleBookmark,
    isBookmarked,
  } = useBookmark()

  const readingProgress = useReadingProgress()
  const { isInstallable, isInstalled, installApp } = usePWA()

  const handleNextPage = useCallback(() => {
    nextPage(TOTAL_PAGES - 1)
  }, [nextPage])

  const handleExportPDF = useCallback(async () => {
    const { generatePDF } = await import('@/lib/pdf-export')
    await generatePDF()
  }, [])

  const handleSelectPoem = useCallback((poemIndex: number) => {
    // Poem pages start at index 2 (after cover and TOC)
    goToPage(poemIndex + 2)
  }, [goToPage])

  const handleGoToBookmark = useCallback((page: number) => {
    goToPage(page)
  }, [goToPage])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement) return
      
      switch (e.key) {
        case 'ArrowLeft':
          prevPage()
          break
        case 'ArrowRight':
          handleNextPage()
          break
        case 'Home':
          goToPage(0)
          break
        case 'End':
          goToPage(TOTAL_PAGES - 1)
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [prevPage, handleNextPage, goToPage])

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [currentPage])

  // Show loading state
  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-muted-foreground">লোড হচ্ছে...</p>
        </div>
      </div>
    )
  }

  // Render current page
  const renderPage = () => {
    if (currentPage === 0) {
      return <CoverPage />
    }
    
    if (currentPage === 1) {
      return <TableOfContents onSelectPoem={handleSelectPoem} />
    }
    
    if (currentPage === TOTAL_PAGES - 1) {
      return <AboutPage />
    }
    
    // Poem pages (index 2 to TOTAL_PAGES - 2)
    const poemIndex = currentPage - 2
    if (poemIndex >= 0 && poemIndex < poems.length) {
      const poem = poems[poemIndex]
      return (
        <PoemPage
          poem={poem}
          pageNumber={currentPage + 1}
          isBookmarked={isBookmarked(currentPage)}
          onToggleBookmark={() => toggleBookmark(currentPage)}
        />
      )
    }
    
    return <CoverPage />
  }

  return (
    <main className="min-h-screen pb-20 sm:pb-16">
      <ReadingProgress progress={readingProgress} />
      
      {renderPage()}
      
      <Navigation
        currentPage={currentPage}
        totalPages={TOTAL_PAGES}
        bookmarks={bookmarks}
        isInstallable={isInstallable}
        isInstalled={isInstalled}
        onGoToPage={goToPage}
        onNextPage={handleNextPage}
        onPrevPage={prevPage}
        onInstall={installApp}
        onExportPDF={handleExportPDF}
        onGoToBookmark={handleGoToBookmark}
      />
    </main>
  )
}
