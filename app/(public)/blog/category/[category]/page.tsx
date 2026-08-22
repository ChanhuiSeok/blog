import { notFound } from "next/navigation";
import { getPostsByCategory } from "@/lib/posts";
import { PostList } from "@/components/blog/PostList";
import { CategoryFilter } from "@/components/blog/CategoryFilter";
import { CATEGORIES, CATEGORY_VALUES, type Category } from "@/types";
import type { Metadata } from "next";

type Params = Promise<{ category: string }>;

export const revalidate = 300;

export function generateStaticParams() {
  return CATEGORY_VALUES.map((category) => ({ category }));
}

function isValidCategory(value: string): value is Category {
  return (CATEGORY_VALUES as readonly string[]).includes(value);
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { category } = await params;
  if (!isValidCategory(category)) return { title: "Blog" };

  const { label } = CATEGORIES[category];

  return {
    title: label,
    description: `${label} 카테고리의 글 목록입니다.`,
    alternates: { canonical: `/blog/category/${category}` },
  };
}

export default async function CategoryPage({ params }: { params: Params }) {
  const { category } = await params;
  if (!isValidCategory(category)) notFound();

  const posts = await getPostsByCategory(category);
  const { label } = CATEGORIES[category];

  return (
    <section>
      <h1 className="text-3xl font-bold tracking-tight">Blog</h1>
      <p className="mt-2 text-muted-foreground">
        {label} 카테고리의 글 목록입니다.
      </p>

      <div className="mt-8">
        <CategoryFilter current={category} />
      </div>

      <PostList posts={posts} />
    </section>
  );
}
