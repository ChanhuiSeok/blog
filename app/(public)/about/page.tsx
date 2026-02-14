import type { Metadata } from "next";
import Image from "next/image";
import liteCoverImg from "@/public/images/lite_cover_new.png";

export const metadata: Metadata = {
  title: "About",
  description: "Chanhui에 대해 알아보세요.",
};

const ACTIVITIES = [
  {
    title: "오픈채팅 Lite FE 성능 개선의 모든 것",
    description:
      "오픈채팅 Lite FE 개발 과정에서 수행한 성능 개선 사례를 팀원들과 공동 집필하여 카카오 테크 블로그에 기고했습니다.\n'설계를 변경하여 성능 개선하기' 섹션을 작성했습니다. ",
    platform: "카카오 테크 블로그",
    href: "https://tech.kakao.com/posts/686",
    thumbnail: liteCoverImg,
  },
];

const SOCIAL_LINKS = [
  { label: "GitHub", href: "https://github.com/ChanhuiSeok" },
  { label: "Email", href: "mailto:chanhuicom@gmail.com" },
];

export default function AboutPage() {
  return (
    <section>
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
        About Me
      </h1>

      {/* Introduction */}
      <div className="mt-8 space-y-4 leading-relaxed text-muted-foreground">
        <p className="whitespace-pre-line">
          {`구조를 정리하고 확장 가능한 설계를 지향하는 프론트엔드 개발자입니다.
React 기반의 실시간 메시지 UI를 개발하며 성능 저하 및 처리 흐름이 복잡해지는 지점을 분석하고 구조를 재정비해왔습니다.
단기적인 최적화보다, 기능이 늘어나도 흔들리지 않는 구조를 만드는 것을 중요하게 생각합니다.`}
        </p>
      </div>

      {/* Activities */}
      <div className="mt-12">
        <h2 className="text-xl font-semibold">Activities</h2>
        <ul className="mt-4 flex flex-col gap-3">
          {ACTIVITIES.map((activity) => (
            <li key={activity.href}>
              <a
                href={activity.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-4 text-sm"
              >
                {activity.thumbnail && (
                  <Image
                    src={activity.thumbnail}
                    alt={activity.title}
                    width={96}
                    height={64}
                    className="h-16 w-24 shrink-0 rounded-md border border-muted object-cover"
                  />
                )}
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-medium transition-colors group-hover:text-blue-500 dark:group-hover:text-blue-400">
                      {activity.title}
                    </span>
                    <span className="shrink-0 text-xs text-muted-foreground">
                      {activity.platform} &rarr;
                    </span>
                  </div>
                  <p className="mt-1 whitespace-pre-line text-muted-foreground">
                    {activity.description}
                  </p>
                </div>
              </a>
            </li>
          ))}
        </ul>
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
