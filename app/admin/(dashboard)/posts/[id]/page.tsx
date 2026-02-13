import { notFound } from "next/navigation";
import { getPost } from "@/lib/posts";
import { PostEditor } from "@/components/admin/PostEditor";
import type { Category } from "@/types";

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
