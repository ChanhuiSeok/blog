import Link from "next/link";
import { getPosts } from "@/lib/posts";
import { PostCard } from "@/components/blog/PostCard";
import { siteConfig } from "@/lib/site";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: siteConfig.name,
  url: siteConfig.url,
  description: siteConfig.description,
  author: {
    "@type": "Person",
    name: siteConfig.author.name,
  },
};

export default async function HomePage() {
  const recentPosts = await getPosts({ published: true, limit: 5 });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Hi, I&apos;m Roddy
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
          소프트웨어 개발자입니다.
          <br />
          일상, 테크, 개발 이야기를 이 블로그에 기록합니다.
        </p>
        <Link
          href="/about"
          className="mt-4 inline-block text-sm font-medium text-accent no-underline hover:underline"
        >
          더 알아보기 &rarr;
        </Link>
      </section>

      {/* Recent Posts */}
      <section className="mt-16">
        <h2 className="text-xl font-bold tracking-tight">Recent Posts</h2>

        <div className="mt-4 divide-y divide-border">
          {recentPosts.length > 0 ? (
            recentPosts.map((post) => (
              <PostCard
                key={post.id}
                title={post.title}
                slug={post.slug}
                excerpt={post.excerpt}
                category={post.category}
                createdAt={post.createdAt!}
                content={post.content}
              />
            ))
          ) : (
            <p className="py-8 text-center text-muted-foreground">
              아직 작성된 글이 없습니다.
            </p>
          )}
        </div>

        <div className="mt-4">
          <Link
            href="/blog"
            className="text-sm font-medium text-accent no-underline hover:underline"
          >
            모든 글 보기 &rarr;
          </Link>
        </div>
      </section>
    </>
  );
}
