import { Suspense } from "react";
import { getPosts, getPostsByCategory } from "@/lib/posts";
import { PostCard } from "@/components/blog/PostCard";
import { CategoryFilter } from "@/components/blog/CategoryFilter";
import { CATEGORY_VALUES, type Category } from "@/types";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description: "일상, 테크, 개발 이야기를 기록하는 블로그",
};

type SearchParams = Promise<{ category?: string }>;

function isValidCategory(value: string): value is Category {
  return (CATEGORY_VALUES as readonly string[]).includes(value);
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { category } = await searchParams;

  const posts =
    category && category !== "all" && isValidCategory(category)
      ? await getPostsByCategory(category)
      : await getPosts({ published: true });

  return (
    <section>
      <h1 className="text-3xl font-bold tracking-tight">Blog</h1>
      <p className="mt-2 text-muted-foreground">
        일상, 테크, 개발 이야기를 기록합니다.
      </p>

      <div className="mt-8">
        <Suspense
          fallback={
            <div className="flex gap-1">
              {["All", "Tech", "Daily", "DevLog"].map((label) => (
                <div
                  key={label}
                  className="rounded-md bg-muted px-3 py-1.5 text-sm text-transparent"
                >
                  {label}
                </div>
              ))}
            </div>
          }
        >
          <CategoryFilter />
        </Suspense>
      </div>

      <div className="mt-6 divide-y divide-border">
        {posts.length > 0 ? (
          posts.map((post) => (
            <PostCard
              key={post.id}
              title={post.title}
              slug={post.slug}
              excerpt={post.excerpt}
              category={post.category as Category}
              createdAt={post.createdAt ?? ""}
              content={post.content}
            />
          ))
        ) : (
          <p className="py-12 text-center text-muted-foreground">
            아직 작성된 글이 없습니다.
          </p>
        )}
      </div>
    </section>
  );
}
