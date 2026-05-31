"use client"

import { useState } from 'react'
import { 
  Home, 
  List, 
  ChevronLeft, 
  ChevronRight, 
  BookOpen,
  Download,
  Smartphone,
  Sun,
  Moon,
  Bookmark,
  X,
  Menu
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useTheme } from 'next-themes'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'

interface NavigationProps {
  currentPage: number
  totalPages: number
  bookmarks: number[]
  isInstallable: boolean
  isInstalled: boolean
  onGoToPage: (page: number) => void
  onNextPage: () => void
  onPrevPage: () => void
  onInstall: () => void
  onExportPDF: () => void
  onGoToBookmark: (page: number) => void
}

export function Navigation({
  currentPage,
  totalPages,
  bookmarks,
  isInstallable,
  isInstalled,
  onGoToPage,
  onNextPage,
  onPrevPage,
  onInstall,
  onExportPDF,
  onGoToBookmark,
}: NavigationProps) {
  const [pageInput, setPageInput] = useState('')
  const [showBookmarks, setShowBookmarks] = useState(false)
  const { theme, setTheme } = useTheme()

  const toBengaliNumber = (num: number): string => {
    const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯']
    return num.toString().split('').map(d => bengaliDigits[parseInt(d)]).join('')
  }

  const handlePageJump = (e: React.FormEvent) => {
    e.preventDefault()
    const page = parseInt(pageInput, 10)
    if (page >= 1 && page <= totalPages) {
      onGoToPage(page - 1)
      setPageInput('')
    }
  }

  const navItems = [
    { icon: Home, label: 'প্রচ্ছদ', action: () => onGoToPage(0) },
    { icon: List, label: 'সূচি', action: () => onGoToPage(1) },
    { icon: BookOpen, label: 'বই সম্পর্কে', action: () => onGoToPage(totalPages - 1) },
  ]

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-sm border-t border-border z-50 hidden sm:block">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            {/* Left: Quick Nav */}
            <div className="flex items-center gap-1">
              {navItems.map((item, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  size="sm"
                  onClick={item.action}
                  className="flex items-center gap-1"
                >
                  <item.icon className="h-4 w-4" />
                  <span className="hidden md:inline text-sm">{item.label}</span>
                </Button>
              ))}
            </div>

            {/* Center: Page Navigation */}
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={onPrevPage}
                disabled={currentPage === 0}
                className="h-9 w-9"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              
              <form onSubmit={handlePageJump} className="flex items-center gap-2">
                <Input
                  type="number"
                  min={1}
                  max={totalPages}
                  value={pageInput}
                  onChange={(e) => setPageInput(e.target.value)}
                  placeholder={toBengaliNumber(currentPage + 1)}
                  className="w-16 h-9 text-center text-sm"
                />
                <span className="text-sm text-muted-foreground">
                  / {toBengaliNumber(totalPages)}
                </span>
              </form>

              <Button
                variant="outline"
                size="icon"
                onClick={onNextPage}
                disabled={currentPage === totalPages - 1}
                className="h-9 w-9"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-1">
              {/* Bookmarks */}
              <Sheet open={showBookmarks} onOpenChange={setShowBookmarks}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="sm" className="relative">
                    <Bookmark className="h-4 w-4" />
                    {bookmarks.length > 0 && (
                      <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center">
                        {bookmarks.length}
                      </span>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>বুকমার্ক ({bookmarks.length})</SheetTitle>
                  </SheetHeader>
                  <div className="mt-4 space-y-2">
                    {bookmarks.length === 0 ? (
                      <p className="text-muted-foreground text-sm">
                        কোন বুকমার্ক নেই। কবিতা পড়ার সময় বুকমার্ক আইকনে ক্লিক করুন।
                      </p>
                    ) : (
                      bookmarks.map((page) => (
                        <Button
                          key={page}
                          variant="ghost"
                          className="w-full justify-start"
                          onClick={() => {
                            onGoToBookmark(page)
                            setShowBookmarks(false)
                          }}
                        >
                          পৃষ্ঠা {toBengaliNumber(page + 1)}
                        </Button>
                      ))
                    )}
                  </div>
                </SheetContent>
              </Sheet>

              {/* Theme Toggle */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              >
                {theme === 'dark' ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                )}
              </Button>

              {/* Download PDF */}
              <Button variant="ghost" size="sm" onClick={onExportPDF}>
                <Download className="h-4 w-4" />
              </Button>

              {/* Install App */}
              {isInstallable && !isInstalled && (
                <Button variant="ghost" size="sm" onClick={onInstall}>
                  <Smartphone className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-sm border-t border-border z-50 sm:hidden">
        <div className="flex items-center justify-between px-2 py-2">
          {/* Prev */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onPrevPage}
            disabled={currentPage === 0}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>

          {/* Home */}
          <Button variant="ghost" size="icon" onClick={() => onGoToPage(0)}>
            <Home className="h-5 w-5" />
          </Button>

          {/* Page indicator */}
          <div className="text-sm text-muted-foreground">
            {toBengaliNumber(currentPage + 1)}/{toBengaliNumber(totalPages)}
          </div>

          {/* Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-auto max-h-[80vh]">
              <SheetHeader>
                <SheetTitle>মেনু</SheetTitle>
              </SheetHeader>
              <div className="grid grid-cols-2 gap-3 mt-4">
                <Button variant="outline" onClick={() => onGoToPage(0)} className="flex items-center gap-2">
                  <Home className="h-4 w-4" />
                  প্রচ্ছদ
                </Button>
                <Button variant="outline" onClick={() => onGoToPage(1)} className="flex items-center gap-2">
                  <List className="h-4 w-4" />
                  সূচি
                </Button>
                <Button variant="outline" onClick={() => onGoToPage(totalPages - 1)} className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  বই সম্পর্কে
                </Button>
                <Button variant="outline" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="flex items-center gap-2">
                  {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                  {theme === 'dark' ? 'লাইট মোড' : 'ডার্ক মোড'}
                </Button>
                <Button variant="outline" onClick={onExportPDF} className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  PDF ডাউনলোড
                </Button>
                {isInstallable && !isInstalled && (
                  <Button variant="outline" onClick={onInstall} className="flex items-center gap-2">
                    <Smartphone className="h-4 w-4" />
                    অ্যাপ ইনস্টল
                  </Button>
                )}
              </div>
              
              {/* Page Jump */}
              <div className="mt-4 pt-4 border-t border-border">
                <p className="text-sm text-muted-foreground mb-2">পৃষ্ঠায় যান</p>
                <form onSubmit={handlePageJump} className="flex gap-2">
                  <Input
                    type="number"
                    min={1}
                    max={totalPages}
                    value={pageInput}
                    onChange={(e) => setPageInput(e.target.value)}
                    placeholder="পৃষ্ঠা নম্বর"
                    className="flex-1"
                  />
                  <Button type="submit">যান</Button>
                </form>
              </div>

              {/* Bookmarks */}
              {bookmarks.length > 0 && (
                <div className="mt-4 pt-4 border-t border-border">
                  <p className="text-sm text-muted-foreground mb-2">বুকমার্ক ({bookmarks.length})</p>
                  <div className="flex flex-wrap gap-2">
                    {bookmarks.map((page) => (
                      <Button
                        key={page}
                        variant="secondary"
                        size="sm"
                        onClick={() => onGoToBookmark(page)}
                      >
                        পৃষ্ঠা {toBengaliNumber(page + 1)}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </SheetContent>
          </Sheet>

          {/* Next */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onNextPage}
            disabled={currentPage === totalPages - 1}
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </nav>
    </>
  )
}
