import Link from "next/link";
import { cn } from "@/lib/utils";
import { CATEGORIES, CATEGORY_VALUES, type Category } from "@/types";

const FILTER_OPTIONS = [
  { key: "all", label: "All", href: "/blog" },
  ...CATEGORY_VALUES.map((key) => ({
    key,
    label: CATEGORIES[key].label,
    href: `/blog/category/${key}`,
  })),
];

export function CategoryFilter({ current }: { current: Category | "all" }) {
  return (
    <div className="flex gap-1">
      {FILTER_OPTIONS.map((opt) => {
        const isActive = current === opt.key;

        return (
          <Link
            key={opt.key}
            href={opt.href}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "rounded-md px-3 py-1.5 text-sm no-underline transition-all duration-200 hover:no-underline",
              isActive
                ? "bg-foreground font-medium text-background"
                : "text-muted-foreground hover:bg-muted hover:text-foreground",
            )}
          >
            {opt.label}
          </Link>
        );
      })}
    </div>
  );
}
