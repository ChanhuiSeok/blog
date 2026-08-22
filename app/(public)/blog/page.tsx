import { getPosts } from "@/lib/posts";
import { PostList } from "@/components/blog/PostList";
import { CategoryFilter } from "@/components/blog/CategoryFilter";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description: "일상, 테크, 개발 이야기를 기록하는 블로그",
};

// 카테고리 필터는 /blog/category/[category] 정적 경로가 담당하므로
// 이 페이지는 searchParams를 읽지 않고 정적으로 생성된다.
export const revalidate = 300;

export default async function BlogPage() {
  const posts = await getPosts({ published: true });

  return (
    <section>
      <h1 className="text-3xl font-bold tracking-tight">Blog</h1>
      <p className="mt-2 text-muted-foreground">
        일상, 테크, 개발 이야기를 기록합니다.
      </p>

      <div className="mt-8">
        <CategoryFilter current="all" />
      </div>

      <PostList posts={posts} />
    </section>
  );
}
