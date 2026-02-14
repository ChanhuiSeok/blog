"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { formatDate } from "@/lib/utils";
import { CATEGORIES, type Category } from "@/types";

interface Post {
  id: string;
  title: string;
  slug: string;
  category: Category;
  published: boolean | null;
  createdAt: string | null;
}

interface PostTableProps {
  initialPosts: Post[];
}

export function PostTable({ initialPosts }: PostTableProps) {
  const router = useRouter();
  const [posts, setPosts] = useState(initialPosts);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [toggling, setToggling] = useState<string | null>(null);

  async function handleToggle(id: string, currentPublished: boolean | null) {
    setToggling(id);
    try {
      const res = await fetch(`/api/posts/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ published: !currentPublished }),
      });
      if (res.ok) {
        setPosts((prev) =>
          prev.map((p) =>
            p.id === id ? { ...p, published: !currentPublished } : p,
          ),
        );
        router.refresh();
      }
    } finally {
      setToggling(null);
    }
  }

  async function handleDelete(id: string) {
    const res = await fetch(`/api/posts/${id}`, { method: "DELETE" });
    if (res.ok) {
      setPosts((prev) => prev.filter((p) => p.id !== id));
      router.refresh();
    }
    setDeleting(null);
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <table className="w-full min-w-[600px] text-sm">
        <thead>
          <tr className="border-b border-border bg-muted text-left">
            <th className="px-4 py-2 font-medium">Title</th>
            <th className="px-4 py-2 font-medium">Category</th>
            <th className="px-4 py-2 font-medium">Status</th>
            <th className="px-4 py-2 font-medium">Date</th>
            <th className="px-4 py-2 font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts.length === 0 && (
            <tr>
              <td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">
                No posts yet.
              </td>
            </tr>
          )}
          {posts.map((post) => {
            const cat = CATEGORIES[post.category];
            return (
              <tr key={post.id} className="border-b border-border last:border-0">
                <td className="px-4 py-2">
                  <Link
                    href={`/admin/posts/${post.id}`}
                    className="text-foreground no-underline hover:text-accent hover:underline"
                  >
                    {post.title}
                  </Link>
                </td>
                <td className="px-4 py-2 text-muted-foreground">
                  {cat?.label ?? post.category}
                </td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleToggle(post.id, post.published)}
                    disabled={toggling === post.id}
                    aria-label={post.published ? "Set to draft" : "Set to published"}
                    className="group flex items-center gap-2 disabled:opacity-50"
                  >
                    <span
                      className={`relative inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-colors ${
                        post.published
                          ? "bg-green-500 dark:bg-green-600"
                          : "bg-zinc-300 dark:bg-zinc-600"
                      }`}
                    >
                      <span
                        className={`inline-block h-3.5 w-3.5 rounded-full bg-white shadow transition-transform ${
                          post.published ? "translate-x-[18px]" : "translate-x-[3px]"
                        }`}
                      />
                    </span>
                    <span className={`text-xs font-medium ${
                      post.published
                        ? "text-green-700 dark:text-green-400"
                        : "text-muted-foreground"
                    }`}>
                      {post.published ? "Published" : "Draft"}
                    </span>
                  </button>
                </td>
                <td className="px-4 py-2 text-muted-foreground">
                  {post.createdAt ? formatDate(post.createdAt) : "-"}
                </td>
                <td className="px-4 py-2">
                  {deleting === post.id ? (
                    <span className="flex items-center gap-2 text-xs">
                      <span className="text-destructive">Delete?</span>
                      <button
                        onClick={() => handleDelete(post.id)}
                        className="font-medium text-destructive hover:underline"
                      >
                        Yes
                      </button>
                      <button
                        onClick={() => setDeleting(null)}
                        className="text-muted-foreground hover:underline"
                      >
                        No
                      </button>
                    </span>
                  ) : (
                    <button
                      onClick={() => setDeleting(post.id)}
                      className="text-xs text-muted-foreground transition-colors hover:text-destructive"
                    >
                      Delete
                    </button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
