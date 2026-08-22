import { PostCard } from "./PostCard";
import type { Category } from "@/types";

interface PostListItem {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  category: string;
  createdAt: string | null;
  content: string;
}

export function PostList({ posts }: { posts: PostListItem[] }) {
  if (posts.length === 0) {
    return (
      <p className="py-12 text-center text-muted-foreground">
        아직 작성된 글이 없습니다.
      </p>
    );
  }

  return (
    <div className="mt-6 divide-y divide-border">
      {posts.map((post) => (
        <PostCard
          key={post.id}
          title={post.title}
          slug={post.slug}
          excerpt={post.excerpt}
          category={post.category as Category}
          createdAt={post.createdAt ?? ""}
          content={post.content}
        />
      ))}
    </div>
  );
}
