import Link from "next/link";
import { formatDate, calculateReadingTime } from "@/lib/utils";
import { CATEGORIES, type Category } from "@/types";

interface PostCardProps {
  title: string;
  slug: string;
  excerpt: string | null;
  category: string;
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
  const cat = CATEGORIES[category as Category];
  const readingTime = calculateReadingTime(content);

  return (
    <Link
      href={`/blog/${slug}`}
      className="group -mx-4 block rounded-lg border border-transparent px-4 py-4 no-underline transition-all duration-200 hover:no-underline sm:hover:border-border sm:hover:bg-card sm:hover:shadow-sm sm:hover:-translate-y-0.5"
    >
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        {cat && (
          <span className={`rounded-md px-2 py-0.5 text-xs font-medium ${cat.bgColor} ${cat.color}`}>
            {cat.label}
          </span>
        )}
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
