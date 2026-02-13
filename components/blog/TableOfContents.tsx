import { cn } from "@/lib/utils";
import type { TocItem } from "@/lib/mdx";

interface TableOfContentsProps {
  items: TocItem[];
}

export function TableOfContents({ items }: TableOfContentsProps) {
  if (items.length === 0) return null;

  return (
    <nav className="mb-8 rounded-lg border border-border bg-card p-4">
      <h2 className="mb-3 text-sm font-semibold text-foreground">목차</h2>
      <ul className="space-y-1.5 text-sm">
        {items.map((item, index) => (
          <li key={`${item.id}-${index}`}>
            <a
              href={`#${item.id}`}
              className={cn(
                "text-muted-foreground transition-colors hover:text-foreground hover:no-underline",
                item.level === 3 && "ml-4",
              )}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
