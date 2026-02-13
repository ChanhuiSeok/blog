import { eq, desc, sql, count, and } from "drizzle-orm";
import { db } from "./db";
import { posts } from "@/drizzle/schema";
import type { Category, PostCreateInput, PostUpdateInput } from "@/types";

export async function createPost(input: PostCreateInput) {
  const [post] = await db
    .insert(posts)
    .values({
      title: input.title,
      slug: input.slug,
      content: input.content,
      excerpt: input.excerpt ?? null,
      category: input.category,
      tags: input.tags ?? [],
      coverImage: input.coverImage ?? null,
      published: input.published ?? false,
    })
    .returning();

  return post;
}

export async function getPost(id: string) {
  const post = await db.query.posts.findFirst({
    where: eq(posts.id, id),
  });

  return post ?? null;
}

export async function getPostBySlug(slug: string) {
  const post = await db.query.posts.findFirst({
    where: eq(posts.slug, slug),
  });

  return post ?? null;
}

export async function getPosts({
  published,
  limit,
  offset,
}: {
  published?: boolean;
  limit?: number;
  offset?: number;
} = {}) {
  const query = db
    .select()
    .from(posts)
    .orderBy(desc(posts.createdAt))
    .$dynamic();

  if (published !== undefined) {
    query.where(eq(posts.published, published));
  }

  if (limit !== undefined) {
    query.limit(limit);
  }

  if (offset !== undefined) {
    query.offset(offset);
  }

  return query;
}

export async function getPostsByCategory(category: Category) {
  return db
    .select()
    .from(posts)
    .where(and(eq(posts.category, category), eq(posts.published, true)))
    .orderBy(desc(posts.createdAt));
}

export async function updatePost(id: string, input: PostUpdateInput) {
  const values: Record<string, unknown> = {
    ...input,
    updatedAt: sql`(datetime('now'))`,
  };

  // tags가 undefined면 업데이트에서 제외
  if (input.tags === undefined) {
    delete values.tags;
  }

  const [updated] = await db
    .update(posts)
    .set(values)
    .where(eq(posts.id, id))
    .returning();

  return updated ?? null;
}

export async function getPostStats() {
  const [total] = await db.select({ count: count() }).from(posts);
  const [published] = await db
    .select({ count: count() })
    .from(posts)
    .where(eq(posts.published, true));

  return {
    total: total.count,
    published: published.count,
    draft: total.count - published.count,
  };
}

export async function deletePost(id: string) {
  const [deleted] = await db
    .delete(posts)
    .where(eq(posts.id, id))
    .returning();

  return deleted ?? null;
}
