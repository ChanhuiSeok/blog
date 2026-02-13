export default function AdminLoading() {
  return (
    <section>
      <div className="h-8 w-40 animate-pulse rounded bg-muted" />

      <div className="mt-6 grid grid-cols-3 gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="rounded-lg border border-border p-4">
            <div className="h-4 w-20 animate-pulse rounded bg-muted" />
            <div className="mt-2 h-9 w-12 animate-pulse rounded bg-muted" />
          </div>
        ))}
      </div>

      <div className="mt-8">
        <div className="h-6 w-24 animate-pulse rounded bg-muted" />
        <div className="mt-4 rounded-lg border border-border">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="flex items-center gap-4 border-b border-border px-4 py-3 last:border-0"
            >
              <div className="h-4 w-1/3 animate-pulse rounded bg-muted" />
              <div className="h-4 w-16 animate-pulse rounded bg-muted" />
              <div className="h-5 w-16 animate-pulse rounded-full bg-muted" />
              <div className="h-4 w-24 animate-pulse rounded bg-muted" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
