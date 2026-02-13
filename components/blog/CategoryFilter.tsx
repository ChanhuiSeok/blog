"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { CATEGORIES } from "@/types";

const FILTER_OPTIONS = [
  { key: "all", label: "All" },
  ...Object.entries(CATEGORIES).map(([key, val]) => ({
    key,
    label: val.label,
  })),
];

export function CategoryFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const current = searchParams.get("category") || "all";

  function handleFilter(key: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (key === "all") {
      params.delete("category");
    } else {
      params.set("category", key);
    }
    router.push(`/blog?${params.toString()}`);
  }

  return (
    <div className="flex gap-1">
      {FILTER_OPTIONS.map((opt) => (
        <button
          key={opt.key}
          onClick={() => handleFilter(opt.key)}
          className={cn(
            "rounded-md px-3 py-1.5 text-sm transition-all duration-200",
            current === opt.key
              ? "bg-foreground text-background font-medium"
              : "text-muted-foreground hover:bg-muted hover:text-foreground",
          )}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
