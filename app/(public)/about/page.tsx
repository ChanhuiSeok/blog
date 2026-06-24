import type { Metadata } from "next";
import Image from "next/image";
import liteCoverImg from "@/public/images/lite_cover_new.png";

export const metadata: Metadata = {
  title: "About",
  description: "Chanhui에 대해 알아보세요.",
};

const INTRO = `성능 최적화와 견고한 아키텍처 설계에 집중하며, 언제나 사용자 입장에서 고민하는 프론트엔드 엔지니어입니다. 단순히 화면을 구현하는 것을 넘어, UI 렌더링, 도메인 비즈니스 로직, 통신 계층의 관심사를 명확히 분리하여 장기적으로 유지보수 가능하고 확장성 있는 구조를 설계하는 것을 지향합니다.
대규모 트래픽이 발생하는 실시간 채팅 환경부터 재사용 가능한 SDK 개발까지, 복잡한 프론트엔드 문제를 구조적인 접근으로 해결하는 것에 깊은 흥미를 느낍니다.`;

interface Achievement {
  tag?: string;
  text: string;
  link?: { label: string; href: string };
}

type Platform = "PC" | "Mobile";

interface Project {
  title: string;
  platforms: Platform[];
  period: string;
  overview: string;
  achievements: Achievement[];
  tech: string[];
}

interface Experience {
  company: string;
  role: string;
  period: string;
  projects: Project[];
}

const EXPERIENCES: Experience[] = [
  {
    company: "카카오",
    role: "Frontend Developer",
    period: "2020.12 – Present",
    projects: [
      {
        title: "Web Component 기반 AI 채팅 SDK 및 AI 국민비서 개발",
        platforms: ["PC", "Mobile"],
        period: "2025.03 – 현재",
        overview:
          "특정 프레임워크에 종속되지 않고 어디서든 재사용할 수 있는 범용 AI 채팅 SDK를 개발하고, 이를 활용해 AI 국민비서 서비스를 구축했습니다.",
        achievements: [
          {
            text: "프레임워크 독립적인 확장성을 확보하기 위해 Web Component 기반의 AI 채팅 SDK 설계 및 개발",
          },
          {
            text: "유지보수성과 확장성을 극대화하기 위해 UI 렌더링, 도메인 비즈니스 로직, SSE(Server-Sent Events) 통신 계층을 철저히 분리",
          },
          {
            text: "계층 간 매끄러운 데이터 흐름 제어를 위한 이벤트 기반 통신 구조 설계",
          },
        ],
        tech: [
          "Web Component",
          "SSE",
          "JavaScript",
          "TypeScript",
          "React",
          "Zustand",
          "Playwright",
        ],
      },
      {
        title: "오픈채팅 Lite",
        platforms: ["Mobile"],
        period: "2022.12 – 현재 (3년 7개월)",
        overview:
          "누구나 인원수 제한 없이 다함께 채팅할 수 있는 오픈채팅 Lite 웹버전 프론트엔드 개발을 담당하고 있으며, 대규모 트래픽 환경에서의 성능 최적화, 안정성 확보 및 운영 효율성 개선에 기여했습니다.",
        achievements: [
          {
            tag: "성능 최적화",
            text: "대량의 메시지 유입 시 발생하는 렌더링 병목 현상을 방지하기 위해 비동기 처리 및 Message Queue를 도입하여, 성능 저하 없는 쾌적한 실시간 채팅 경험 제공",
            link: {
              label: "관련 기술 블로그 기고: 설계를 변경하여 성능 개선하기",
              href: "https://tech.kakao.com/posts/686",
            },
          },
          {
            tag: "운영 효율성 개선",
            text: "하드코딩으로 매번 빌드/배포가 필요했던 이벤트성 기능(특정 단어 입력 시 데코레이션)의 구조를 개선하여, 데이터를 JSON으로 정규화하고 실시간 수정이 가능한 사내 어드민 페이지를 기획·개발. 수십여 개의 단어셋 수정 업무 효율 대폭 향상",
          },
          {
            tag: "안정성 및 UX",
            text: "Playwright 기반의 E2E 테스트 환경을 도입하여 핵심 사용자 동선 검증 자동화 및 릴리즈 안정성 향상",
          },
          {
            tag: "UX 고도화",
            text: "롱프레스, Lottie 기반 리액션 등 사용자의 상호작용과 몰입도를 높이는 디테일한 인터랙티브 UI/UX 개발",
          },
        ],
        tech: ["React", "TypeScript", "WebSocket", "Playwright"],
      },
      {
        title: "ChatGPT for Kakao",
        platforms: ["Mobile"],
        period: "2025.03 – 현재",
        overview:
          "사용자의 원활한 서비스 이용을 돕는 온보딩 동선과 서비스 전반에 사용되는 공통 UI 컴포넌트를 설계하고 개발했습니다.",
        achievements: [
          {
            text: "온보딩부터 홈 화면으로 이어지는 초기 진입 동선을 구현하고, 사용자 인증 상태 및 다양한 예외 케이스를 안전하게 처리하는 리다이렉트 로직 설계",
          },
          {
            text: "기능 확장 시 유연하게 대응하고 중복 코드를 제거하기 위해 고도화된 재사용성을 갖춘 공통 바텀시트(Bottom Sheet) 컴포넌트 구조 설계",
          },
        ],
        tech: ["React", "TypeScript", "Zustand"],
      },
      {
        title: "PlayMCP web",
        platforms: ["PC"],
        period: "2025.03 – 현재",
        overview:
          "개발자가 MCP를 관리·등록할 수 있는 전용 콘솔 페이지를 개발했습니다.",
        achievements: [
          {
            text: "MCP 목록 조회 화면 및 복잡한 데이터 입력 폼(Form) 인터페이스 개발",
          },
          {
            text: "방대한 데이터가 요구되는 등록 폼의 효율적인 전역/지역 상태 관리 구조를 설계하고, 엄격한 유효성 검증(Validation) 로직 구현",
          },
        ],
        tech: ["React", "TypeScript", "Zustand"],
      },
      {
        title: "카카오톡 웹버전 FE 개발",
        platforms: ["PC"],
        period: "2021.02 – 2022.11",
        overview:
          "카카오 고객센터 페이지에 도입된 카카오톡 웹버전의 채팅 기능 및 진입 인터페이스를 개발했습니다.",
        achievements: [
          {
            text: "카카오톡의 특수한 말풍선 형태를 웹 환경에서 정확히 렌더링하기 위해 누락된 기능을 구현하고, 다양한 말풍선 타입에 대한 테스트 코드 작성",
          },
          {
            text: "Redux의 무거운 보일러플레이트 문제를 해결하기 위해 Redux Toolkit(RTK)으로의 마이그레이션을 주도하여 코드 가독성 및 유지보수성 향상",
          },
          {
            text: "WebSocket 기반 실시간 통신 서비스 로직 구현",
          },
          {
            text: "사용자향 웹채팅 진입을 위한 카카오톡 채널 정보 및 채팅 시작 버튼이 포함된 시작 페이지 개발",
          },
        ],
        tech: ["React", "Redux", "Redux Toolkit(RTK)", "WebSocket"],
      },
    ],
  },
];

const SKILLS = [
  {
    title: "Architecture & Design",
    description:
      "단순히 화면을 그리는 것을 넘어 UI 렌더링, 비즈니스 로직, 통신 계층의 관심사를 분리하는 아키텍처 설계를 지향합니다. Web Component를 활용하여 특정 프레임워크에 종속되지 않는 재사용 가능한 모듈(SDK)을 설계하고 배포할 수 있습니다.",
  },
  {
    title: "Mobile Web & WebView Integration",
    description:
      "AI 국민비서 및 오픈채팅 Lite와 같은 모바일 타겟 서비스 개발 경험을 통해 모바일 웹뷰 환경에 능숙합니다. iOS/Android 렌더링 차이, 안전 영역(Safe Area) 등 모바일 환경의 제약 사항을 제어할 수 있습니다. DOM 이벤트 라이프사이클(mousedown, blur 등)을 제어하여 키보드의 불필요한 해제를 막고 포커스를 유지하는 등, 모바일 브라우저 특유의 까다로운 제약 사항들을 트러블슈팅하여 매끄러운 UX를 위해 노력합니다.",
  },
  {
    title: "Performance Optimization",
    description:
      "실시간 채팅(WebSocket, SSE) 환경에서 대량의 데이터 유입 시 발생하는 렌더링 병목을 분석하고, Message Queue 및 비동기 처리 도입 등을 통해 웹 서비스의 성능을 근본적으로 개선할 수 있습니다.",
  },
  {
    title: "Testing & Stability",
    description:
      "Playwright를 활용한 E2E 테스트와 핵심 로직(복잡한 뷰 렌더링 등)에 대한 유닛 테스트 코드를 작성하여, 기능의 릴리즈 안정성을 높이고 사이드 이펙트를 최소화하는 개발 문화를 선호합니다.",
  },
];

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

function TechBadge({ label }: { label: string }) {
  return (
    <span className="rounded-md border border-border bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
      {label}
    </span>
  );
}

function PlatformBadge({ platform }: { platform: Platform }) {
  const styles =
    platform === "Mobile"
      ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
      : "border-blue-500/30 bg-blue-500/10 text-blue-600 dark:text-blue-400";
  return (
    <span
      className={`rounded-full border px-2 py-0.5 text-[11px] font-semibold ${styles}`}
    >
      {platform}
    </span>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-xl font-bold tracking-tight">
      {children}
      <span className="ml-2 inline-block h-1.5 w-1.5 translate-y-[-2px] rounded-full bg-accent align-middle" />
    </h2>
  );
}

export default function AboutPage() {
  return (
    <section>
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
        About Me
      </h1>

      {/* Introduction */}
      <div className="mt-8 border-l-2 border-accent pl-5">
        <p className="whitespace-pre-line text-base leading-relaxed text-foreground/85 sm:text-lg">
          {INTRO}
        </p>
      </div>

      {/* Work Experience */}
      <div className="mt-16">
        <SectionHeading>Work Experience</SectionHeading>

        {EXPERIENCES.map((exp) => (
          <div key={exp.company} className="mt-8">
            {/* Company header */}
            <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
              <div className="flex items-baseline gap-2.5">
                <span className="text-xl font-bold">{exp.company}</span>
                <span className="text-sm font-medium text-muted-foreground">
                  {exp.role}
                </span>
              </div>
              <span className="font-mono text-xs text-muted-foreground">
                {exp.period}
              </span>
            </div>

            {/* Projects timeline */}
            <ol className="mt-6 space-y-8 border-l border-border pl-6">
              {exp.projects.map((project) => (
                <li key={project.title} className="relative">
                  {/* Timeline dot */}
                  <span className="absolute -left-[1.69rem] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-accent bg-background" />

                  <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5">
                    <h3 className="flex flex-wrap items-center gap-x-2 gap-y-1 text-lg font-semibold">
                      {project.title}
                      <span className="flex shrink-0 gap-1">
                        {project.platforms.map((p) => (
                          <PlatformBadge key={p} platform={p} />
                        ))}
                      </span>
                    </h3>
                    <span className="font-mono text-xs text-muted-foreground">
                      {project.period}
                    </span>
                  </div>

                  <p className="mt-2 text-[15px] font-medium leading-relaxed text-foreground">
                    {project.overview}
                  </p>

                  <ul className="mt-4 space-y-2.5">
                    {project.achievements.map((ach, i) => (
                      <li
                        key={i}
                        className="flex gap-2.5 text-[15px] leading-relaxed"
                      >
                        <span
                          aria-hidden
                          className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent/60"
                        />
                        <span className="text-foreground/90">
                          {ach.tag && (
                            <span className="mr-1.5 rounded bg-accent/10 px-1.5 py-0.5 text-[13px] font-semibold text-accent">
                              {ach.tag}
                            </span>
                          )}
                          {ach.text}
                          {ach.link && (
                            <a
                              href={ach.link.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="mt-1 block text-sm font-medium text-accent no-underline hover:underline"
                            >
                              🔗 {ach.link.label} &rarr;
                            </a>
                          )}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-3.5 flex flex-wrap gap-1.5">
                    {project.tech.map((t) => (
                      <TechBadge key={t} label={t} />
                    ))}
                  </div>
                </li>
              ))}
            </ol>
          </div>
        ))}
      </div>

      {/* Skills */}
      <div className="mt-16">
        <SectionHeading>Skills</SectionHeading>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {SKILLS.map((skill) => (
            <div
              key={skill.title}
              className="rounded-lg border border-border bg-card p-5 transition-colors hover:border-accent/50"
            >
              <h3 className="text-base font-semibold text-foreground">
                {skill.title}
              </h3>
              <p className="mt-2.5 text-[15px] leading-relaxed text-foreground/75">
                {skill.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Activities */}
      <div className="mt-16">
        <SectionHeading>Activities</SectionHeading>
        <ul className="mt-6 flex flex-col gap-3">
          {ACTIVITIES.map((activity) => (
            <li key={activity.href}>
              <a
                href={activity.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-4 rounded-lg border border-border p-4 text-sm transition-colors hover:border-accent/50"
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
                    <span className="text-base font-semibold transition-colors group-hover:text-blue-500 dark:group-hover:text-blue-400">
                      {activity.title}
                    </span>
                    <span className="shrink-0 text-xs text-muted-foreground">
                      {activity.platform} &rarr;
                    </span>
                  </div>
                  <p className="mt-1.5 whitespace-pre-line text-[15px] leading-relaxed text-foreground/70">
                    {activity.description}
                  </p>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Social Links */}
      <div className="mt-16">
        <SectionHeading>Links</SectionHeading>
        <div className="mt-6 flex flex-wrap gap-3">
          {SOCIAL_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-md border border-border px-3.5 py-1.5 text-sm font-medium text-foreground/80 no-underline transition-colors hover:border-accent/50 hover:text-foreground hover:no-underline"
            >
              {link.label}
              <span aria-hidden>&rarr;</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
