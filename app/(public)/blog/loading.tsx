export default function BlogLoading() {
  return (
    <section>
      <div className="h-9 w-24 animate-pulse rounded bg-muted" />
      <div className="mt-2 h-5 w-64 animate-pulse rounded bg-muted" />

      <div className="mt-8 flex gap-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-8 w-16 animate-pulse rounded-full bg-muted" />
        ))}
      </div>

      <div className="mt-6 divide-y divide-border">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="py-4">
            <div className="flex items-center gap-2">
              <div className="h-5 w-12 animate-pulse rounded bg-muted" />
              <div className="h-4 w-24 animate-pulse rounded bg-muted" />
            </div>
            <div className="mt-2 h-6 w-3/4 animate-pulse rounded bg-muted" />
            <div className="mt-1 h-4 w-full animate-pulse rounded bg-muted" />
          </div>
        ))}
      </div>
    </section>
  );
}
