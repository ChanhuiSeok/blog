import { notFound } from "next/navigation";
import { getPostBySlug } from "@/lib/posts";
import { renderMDX, extractToc } from "@/lib/mdx";
import { formatDate, calculateReadingTime } from "@/lib/utils";
import { CATEGORIES, type Category } from "@/types";
import { TableOfContents } from "@/components/blog/TableOfContents";
import { siteConfig } from "@/lib/site";
import type { Metadata } from "next";

type Params = Promise<{ slug: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) return { title: "Post Not Found" };

  const description = post.excerpt || `${post.content.slice(0, 160)}...`;
  const url = `${siteConfig.url}/blog/${post.slug}`;
  const ogImage = post.coverImage || undefined;

  return {
    title: post.title,
    description,
    openGraph: {
      type: "article",
      title: post.title,
      description,
      url,
      publishedTime: post.createdAt ?? undefined,
      modifiedTime: post.updatedAt ?? undefined,
      authors: [siteConfig.author.name],
      ...(ogImage && { images: [{ url: ogImage }] }),
    },
    twitter: {
      card: ogImage ? "summary_large_image" : "summary",
      title: post.title,
      description,
      ...(ogImage && { images: [ogImage] }),
    },
  };
}

export default async function PostPage({ params }: { params: Params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post || !post.published) {
    notFound();
  }

  const [content, toc] = await Promise.all([
    renderMDX(post.content),
    Promise.resolve(extractToc(post.content)),
  ]);

  const readingTime = calculateReadingTime(post.content);
  const cat = CATEGORIES[post.category as Category];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt || undefined,
    datePublished: post.createdAt,
    dateModified: post.updatedAt,
    author: {
      "@type": "Person",
      name: siteConfig.author.name,
    },
    url: `${siteConfig.url}/blog/${post.slug}`,
    ...(post.coverImage && { image: post.coverImage }),
  };

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Header */}
      <header className="mb-8 border-b border-border pb-8">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          {cat && (
            <span className="rounded-md bg-muted px-2 py-0.5 text-xs font-medium text-foreground">
              {cat.label}
            </span>
          )}
          <time dateTime={post.createdAt!}>{formatDate(post.createdAt!)}</time>
          <span aria-hidden>·</span>
          <span>{readingTime} min read</span>
        </div>
        <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
          {post.title}
        </h1>
        {post.excerpt && (
          <p className="mt-3 text-lg text-muted-foreground">{post.excerpt}</p>
        )}
      </header>

      {/* TOC */}
      <TableOfContents items={toc} />

      {/* Content */}
      <div className="prose">{content}</div>
    </article>
  );
}
