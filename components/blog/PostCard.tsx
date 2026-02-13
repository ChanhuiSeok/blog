import Link from "next/link";
import { formatDate, calculateReadingTime } from "@/lib/utils";
import { CategoryBadge } from "./CategoryBadge";
import type { Category } from "@/types";

interface PostCardProps {
  title: string;
  slug: string;
  excerpt: string | null;
  category: Category;
  createdAt: string;
  content: string;
}

export function PostCard({
  title,
  slug,
  excerpt,
  category,
  createdAt,
  content,
}: PostCardProps) {
  const readingTime = calculateReadingTime(content);

  return (
    <Link
      href={`/blog/${slug}`}
      className="group -mx-4 block rounded-lg border border-transparent px-4 py-4 no-underline transition-all duration-200 hover:no-underline sm:hover:border-border sm:hover:bg-card"
    >
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <CategoryBadge category={category} />
        <time dateTime={createdAt}>{formatDate(createdAt)}</time>
        <span aria-hidden>·</span>
        <span>{readingTime} min read</span>
      </div>
      <h3 className="mt-2 text-lg font-semibold tracking-tight text-foreground group-hover:text-accent">
        {title}
      </h3>
      {excerpt && (
        <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
          {excerpt}
        </p>
      )}
    </Link>
  );
}
