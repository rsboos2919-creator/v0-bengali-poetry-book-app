"use client"

interface ReadingProgressProps {
  progress: number
}

export function ReadingProgress({ progress }: ReadingProgressProps) {
  return (
    <div 
      className="reading-progress"
      style={{ width: `${progress}%` }}
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="পড়ার অগ্রগতি"
    />
  )
}
