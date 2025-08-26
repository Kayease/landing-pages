export function PageSkeleton() {
  return (
    <div className="space-y-4">
      <div className="h-8 w-64 rounded bg-muted animate-pulse" />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-40 rounded bg-muted animate-pulse" />
        ))}
      </div>
    </div>
  )
}


