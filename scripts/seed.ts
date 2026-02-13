import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import { posts } from "../drizzle/schema";

const client = createClient({
  url: process.env.TURSO_DATABASE_URL || "file:local.db",
  authToken: process.env.TURSO_AUTH_TOKEN || undefined,
});

const db = drizzle(client);

const seedPosts = [
  // Tech
  {
    title: "Next.js 16으로 블로그 만들기",
    slug: "building-blog-with-nextjs-16",
    content: `# Next.js 16으로 블로그 만들기

Next.js 16이 출시되면서 많은 변화가 있었습니다. App Router의 안정화, Server Components의 성능 개선, 그리고 Turbopack의 정식 지원까지.

## 왜 Next.js인가?

React 기반 풀스택 프레임워크 중에서 가장 성숙한 생태계를 가지고 있습니다.

\`\`\`typescript
// Server Component에서 데이터 페칭
export default async function Page() {
  const posts = await getPosts();
  return <PostList posts={posts} />;
}
\`\`\`

## 마무리

Next.js 16은 개발자 경험을 한 단계 끌어올렸습니다.`,
    excerpt:
      "Next.js 16의 새로운 기능들을 활용해 개인 블로그를 구축한 경험을 공유합니다.",
    category: "tech",
    tags: ["nextjs", "react", "typescript"],
    published: true,
  },
  {
    title: "TypeScript strict 모드 완벽 가이드",
    slug: "typescript-strict-mode-guide",
    content: `# TypeScript strict 모드 완벽 가이드

strict 모드를 켜면 더 안전한 코드를 작성할 수 있습니다.

## strict 옵션들

- \`strictNullChecks\`: null/undefined 체크 강제
- \`noImplicitAny\`: 암묵적 any 금지
- \`strictFunctionTypes\`: 함수 타입 공변성 체크

\`\`\`typescript
// strictNullChecks 적용 전
function getUser(id: string) {
  return users.find(u => u.id === id); // User | undefined
}

// 적용 후 - 반드시 null 체크 필요
const user = getUser("1");
if (user) {
  console.log(user.name);
}
\`\`\`

strict 모드는 초기 설정 비용이 있지만 장기적으로 버그를 크게 줄여줍니다.`,
    excerpt:
      "TypeScript strict 모드의 각 옵션을 이해하고 프로젝트에 적용하는 방법을 알아봅니다.",
    category: "tech",
    tags: ["typescript", "javascript"],
    published: true,
  },
  {
    title: "Tailwind CSS 4 마이그레이션 후기",
    slug: "tailwind-css-4-migration",
    content: `# Tailwind CSS 4 마이그레이션 후기

Tailwind CSS 4에서 달라진 점과 마이그레이션 과정을 정리합니다.

## 주요 변경점

- CSS-first 설정 (\`@theme\` 디렉티브)
- PostCSS 플러그인 방식 변경
- 새로운 색상 시스템

기존 \`tailwind.config.js\`에서 CSS 변수 기반으로 전환하는 것이 핵심입니다.`,
    excerpt:
      "Tailwind CSS 3에서 4로 마이그레이션하면서 겪은 경험과 팁을 공유합니다.",
    category: "tech",
    tags: ["tailwindcss", "css"],
    published: true,
  },
  // Daily
  {
    title: "주말 카페 코딩 일지",
    slug: "weekend-cafe-coding",
    content: `# 주말 카페 코딩 일지

오늘은 집 근처 카페에서 사이드 프로젝트를 진행했습니다.

## 오늘 한 일

- 블로그 레이아웃 작업
- 다크모드 구현
- 반응형 네비게이션

카페에서 코딩하면 집중이 잘 되는 것 같습니다. 적당한 배경 소음이 오히려 도움이 됩니다.

내일은 데이터베이스 연동을 마무리할 예정입니다.`,
    excerpt: "카페에서 사이드 프로젝트를 진행하며 느낀 점을 기록합니다.",
    category: "daily",
    tags: ["일상", "코딩"],
    published: true,
  },
  {
    title: "개발자의 새해 목표 2026",
    slug: "developer-new-year-goals-2026",
    content: `# 개발자의 새해 목표 2026

2026년 새해를 맞아 올해의 개발 목표를 세워봤습니다.

## 목표

1. **블로그 꾸준히 쓰기** — 월 2회 이상
2. **오픈소스 기여** — 사용하는 라이브러리에 PR 보내기
3. **새로운 언어 배우기** — Rust 또는 Go

작년에는 목표를 너무 크게 잡아서 실패했으니, 올해는 작지만 꾸준한 목표를 세웠습니다.`,
    excerpt: "2026년 새해 개발 목표를 정리해봤습니다.",
    category: "daily",
    tags: ["회고", "목표"],
    published: true,
  },
  // DevLog
  {
    title: "블로그 개발기 #1: 프로젝트 셋업",
    slug: "blog-devlog-1-project-setup",
    content: `# 블로그 개발기 #1: 프로젝트 셋업

개인 블로그를 직접 만들어보기로 했습니다.

## 기술 스택 선정

| 항목 | 선택 | 이유 |
|------|------|------|
| Framework | Next.js 16 | App Router + RSC |
| DB | Turso | Edge SQLite |
| ORM | Drizzle | 타입 안전, 경량 |
| Styling | Tailwind CSS 4 | 빠른 프로토타이핑 |

## 프로젝트 구조

관심사 분리를 위해 components, lib, types 디렉토리를 나눴습니다. Server Component를 기본으로 사용하고, 꼭 필요한 곳만 \`'use client'\`를 붙이는 방식으로 진행합니다.`,
    excerpt:
      "개인 블로그를 직접 만들기로 결정하고, 기술 스택과 프로젝트 구조를 설계한 과정입니다.",
    category: "devlog",
    tags: ["블로그", "nextjs", "프로젝트"],
    published: true,
  },
  {
    title: "블로그 개발기 #2: 다크모드와 레이아웃",
    slug: "blog-devlog-2-darkmode-layout",
    content: `# 블로그 개발기 #2: 다크모드와 레이아웃

이번에는 다크모드와 레이아웃 시스템을 구현했습니다.

## next-themes 사용

\`next-themes\`를 사용하면 SSR 환경에서도 플리커 없이 테마를 전환할 수 있습니다.

\`\`\`tsx
<ThemeProvider attribute="class" defaultTheme="system">
  {children}
</ThemeProvider>
\`\`\`

## 반응형 디자인

Desktop은 max-width 720px로 읽기에 최적화하고, 모바일에서는 햄버거 메뉴를 적용했습니다.`,
    excerpt: "next-themes를 활용한 다크모드 구현과 반응형 레이아웃 작업기입니다.",
    category: "devlog",
    tags: ["블로그", "다크모드", "tailwindcss"],
    published: true,
  },
];

async function seed() {
  console.log("Seeding database...");

  // 기존 데이터 삭제
  await db.delete(posts);
  console.log("Cleared existing posts.");

  // 시드 데이터 삽입
  for (const post of seedPosts) {
    await db.insert(posts).values(post);
    console.log(`  ✓ Created: ${post.title}`);
  }

  console.log(`\nSeeded ${seedPosts.length} posts successfully.`);
  process.exit(0);
}

seed().catch((error) => {
  console.error("Seed failed:", error);
  process.exit(1);
});
