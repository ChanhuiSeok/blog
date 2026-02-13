const WIDTHS_A = ["w-[85%]", "w-[95%]", "w-[75%]", "w-full", "w-[90%]", "w-[80%]", "w-[70%]", "w-[88%]"];
const WIDTHS_B = ["w-[92%]", "w-[78%]", "w-full", "w-[85%]", "w-[70%]", "w-[95%]"];

export default function PostLoading() {
  return (
    <article>
      <header className="mb-8 border-b border-border pb-8">
        <div className="flex items-center gap-2">
          <div className="h-5 w-12 animate-pulse rounded bg-muted" />
          <div className="h-4 w-24 animate-pulse rounded bg-muted" />
          <div className="h-4 w-20 animate-pulse rounded bg-muted" />
        </div>
        <div className="mt-4 h-10 w-4/5 animate-pulse rounded bg-muted" />
        <div className="mt-3 h-5 w-2/3 animate-pulse rounded bg-muted" />
      </header>

      <div className="space-y-4">
        {WIDTHS_A.map((w, i) => (
          <div key={i} className={`h-4 ${w} animate-pulse rounded bg-muted`} />
        ))}
        <div className="my-6 h-40 animate-pulse rounded-lg bg-muted" />
        {WIDTHS_B.map((w, i) => (
          <div key={`b-${i}`} className={`h-4 ${w} animate-pulse rounded bg-muted`} />
        ))}
      </div>
    </article>
  );
}
