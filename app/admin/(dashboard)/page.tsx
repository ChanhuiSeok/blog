import Link from "next/link";
import { getPostStats, getPosts } from "@/lib/posts";
import { PostTable } from "@/components/admin/PostTable";
import type { Category } from "@/types";

export default async function AdminDashboard() {
  const [stats, allPosts] = await Promise.all([
    getPostStats(),
    getPosts(),
  ]);

  return (
    <section>
      <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>

      {/* Stats */}
      <div className="mt-6 grid grid-cols-3 gap-4">
        <div className="rounded-lg border border-border bg-card p-4">
          <p className="text-sm text-muted-foreground">Total Posts</p>
          <p className="mt-1 text-3xl font-bold">{stats.total}</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-4">
          <p className="text-sm text-muted-foreground">Published</p>
          <p className="mt-1 text-3xl font-bold">{stats.published}</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-4">
          <p className="text-sm text-muted-foreground">Drafts</p>
          <p className="mt-1 text-3xl font-bold">{stats.draft}</p>
        </div>
      </div>

      {/* Post Management */}
      <div className="mt-8">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">All Posts</h2>
          <Link
            href="/admin/posts/new"
            className="rounded-md bg-foreground px-3 py-1.5 text-sm font-medium text-background no-underline transition-opacity hover:opacity-90 hover:no-underline"
          >
            New Post
          </Link>
        </div>

        <div className="mt-4">
          <PostTable
            initialPosts={allPosts.map((p) => ({
              id: p.id,
              title: p.title,
              slug: p.slug,
              category: p.category as Category,
              published: p.published,
              createdAt: p.createdAt,
            }))}
          />
        </div>
      </div>
    </section>
  );
}
