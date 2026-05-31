"use client"

import { poems } from '@/lib/poems'

interface TableOfContentsProps {
  onSelectPoem: (index: number) => void
}

export function TableOfContents({ onSelectPoem }: TableOfContentsProps) {
  // Group poems by ranges of 20
  const groups = [
    { title: "১ - ২০", range: [0, 19] },
    { title: "২১ - ৪০", range: [20, 39] },
    { title: "৪১ - ৬০", range: [40, 59] },
    { title: "৬১ - ৮০", range: [60, 79] },
    { title: "৮১ - ১০০", range: [80, 99] },
  ]

  const toBengaliNumber = (num: number): string => {
    const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯']
    return num.toString().split('').map(d => bengaliDigits[parseInt(d)]).join('')
  }

  return (
    <div className="min-h-screen p-4 sm:p-8">
      <div className="max-w-4xl mx-auto bg-card book-shadow rounded-lg overflow-hidden">
        {/* Header */}
        <div className="p-6 sm:p-8 border-b border-border">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-foreground">
            সূচিপত্র
          </h2>
          <p className="text-center text-muted-foreground mt-2">
            মোট ১০০টি কবিতা
          </p>
        </div>
        
        {/* Contents */}
        <div className="p-4 sm:p-6 space-y-6">
          {groups.map((group, groupIndex) => (
            <div key={groupIndex} className="space-y-2">
              <h3 className="text-lg font-semibold text-primary border-b border-border pb-2">
                কবিতা {group.title}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                {poems.slice(group.range[0], group.range[1] + 1).map((poem, index) => {
                  const actualIndex = group.range[0] + index
                  const pageNumber = actualIndex + 3 // Cover + TOC + 1-indexed
                  
                  return (
                    <button
                      key={poem.id}
                      onClick={() => onSelectPoem(actualIndex)}
                      className="flex items-center justify-between p-2 rounded-md hover:bg-secondary/50 transition-colors text-left group"
                    >
                      <span className="flex items-center gap-2 text-sm text-foreground group-hover:text-primary transition-colors">
                        <span className="text-muted-foreground w-8 text-right">
                          {toBengaliNumber(poem.id)}.
                        </span>
                        <span className="truncate">{poem.title}</span>
                      </span>
                      <span className="text-xs text-muted-foreground ml-2 flex-shrink-0">
                        পৃষ্ঠা {toBengaliNumber(pageNumber)}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
