import { CATEGORIES, type Category } from "@/types";

interface CategoryBadgeProps {
  category: Category;
}

export function CategoryBadge({ category }: CategoryBadgeProps) {
  const cat = CATEGORIES[category];
  return (
    <span
      className={`rounded-md bg-muted px-2 py-0.5 text-xs font-medium ${cat.color}`}
    >
      {cat.label}
    </span>
  );
}
