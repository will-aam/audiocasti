"use client"

import { Suspense } from 'react'
import { SearchContent } from '@/components/search-content'

function SearchPageSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="h-8 bg-muted rounded w-48 mb-4 animate-pulse" />
        <div className="bg-muted rounded-lg p-6 mb-6">
          <div className="h-10 bg-muted-foreground/20 rounded mb-4 animate-pulse" />
          <div className="flex space-x-4">
            <div className="h-10 bg-muted-foreground/20 rounded w-48 animate-pulse" />
            <div className="h-10 bg-muted-foreground/20 rounded w-48 animate-pulse" />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="bg-muted rounded-lg h-64 animate-pulse" />
        ))}
      </div>
    </div>
  )
}

export default function SearchPage() {
  return (
    <Suspense fallback={<SearchPageSkeleton />}>
      <SearchContent />
    </Suspense>
  )
}
