import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "Chanhui에 대해 알아보세요.",
};

const TECH_STACK = [
  { category: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS"] },
  { category: "Backend", items: ["Node.js", "Python", "PostgreSQL", "SQLite"] },
  { category: "DevOps", items: ["Docker", "Vercel", "GitHub Actions"] },
  { category: "Tools", items: ["VS Code", "Git", "Figma"] },
];

const SOCIAL_LINKS = [
  { label: "GitHub", href: "https://github.com" },
  { label: "Email", href: "mailto:hello@example.com" },
];

export default function AboutPage() {
  return (
    <section>
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">About</h1>

      {/* Profile */}
      <div className="mt-8 flex flex-col gap-8 sm:flex-row sm:items-start">
        {/* Avatar placeholder */}
        <div className="relative flex h-28 w-28 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 text-4xl font-bold text-white">
          C
        </div>

        <div>
          <h2 className="text-xl font-semibold">Chanhui</h2>
          <p className="mt-2 leading-relaxed text-muted-foreground">
            안녕하세요, 소프트웨어 개발자 Chanhui입니다.
            웹 기술과 깔끔한 코드에 관심이 많으며,
            배운 것들을 글로 정리하는 걸 좋아합니다.
          </p>
          <p className="mt-2 leading-relaxed text-muted-foreground">
            이 블로그는 Next.js, Tailwind CSS, Turso 등
            최신 기술 스택으로 직접 만들었습니다.
          </p>
        </div>
      </div>

      {/* Tech Stack */}
      <div className="mt-12">
        <h2 className="text-xl font-semibold">Tech Stack</h2>
        <div className="mt-4 grid grid-cols-2 gap-6 sm:grid-cols-4">
          {TECH_STACK.map((group) => (
            <div key={group.category}>
              <h3 className="text-sm font-medium text-muted-foreground">
                {group.category}
              </h3>
              <ul className="mt-2 space-y-1 text-sm">
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Social Links */}
      <div className="mt-12">
        <h2 className="text-xl font-semibold">Links</h2>
        <div className="mt-4 flex gap-4">
          {SOCIAL_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground transition-all duration-200 hover:text-foreground hover:no-underline"
            >
              {link.label} &rarr;
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
