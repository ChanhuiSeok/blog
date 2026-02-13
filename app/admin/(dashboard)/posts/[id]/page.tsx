import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import { getPost } from "@/lib/posts";
import type { Category } from "@/types";

const PostEditor = dynamic(
  () =>
    import("@/components/admin/PostEditor").then((mod) => mod.PostEditor),
  {
    loading: () => (
      <div className="flex h-[calc(100vh-4rem)] items-center justify-center">
        <p className="text-sm text-muted-foreground">에디터 로딩 중...</p>
      </div>
    ),
  },
);

type Params = Promise<{ id: string }>;

export default async function EditPostPage({ params }: { params: Params }) {
  const { id } = await params;
  const post = await getPost(id);

  if (!post) {
    notFound();
  }

  return (
    <PostEditor
      initialData={{
        id: post.id,
        title: post.title,
        slug: post.slug,
        content: post.content,
        excerpt: post.excerpt ?? "",
        category: post.category as Category,
        tags: (post.tags as string[]) ?? [],
        coverImage: post.coverImage ?? "",
        published: post.published ?? false,
      }}
    />
  );
}
