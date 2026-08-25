import type { Metadata } from "next";
import Image from "next/image";
import liteCoverImg from "@/public/images/lite_cover_new.png";

export const metadata: Metadata = {
  title: "About",
  description: "Chanhui에 대해 알아보세요.",
};

const INTRO = `복잡한 로직은 **읽기 쉬운 구조**로 정리하고, 사용자의 **체감 성능**을 높이는 프론트엔드 엔지니어입니다.
**대규모 실시간 채팅 서비스 개발** 및 모바일 환경에서의 **성능 최적화** 경험을 바탕으로 안정적인 웹 서비스를 만들기 위해 노력합니다.
기획·디자인 등 다른 직군의 동료들과도 **유연하고 매끄럽게 소통**하며 협업합니다.`;

function renderWithBold(text: string) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith("**") && part.endsWith("**") ? (
      <strong key={i} className="font-semibold text-foreground">
        {part.slice(2, -2)}
      </strong>
    ) : (
      part
    ),
  );
}

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
            text: "UI, 비즈니스 로직, SSE 통신 계층을 분리한 Web Component 기반 SDK를 설계하여 유지보수성과 확장성을 확보",
          },
          {
            text: "계층 간 매끄러운 데이터 흐름 제어를 위한 이벤트 기반 통신 구조 설계",
          },
          {
            text: "AI 국민비서에 SDK를 적용하여 채팅 화면을 개발했으며, 기존/신규 서비스에서도 SDK 도입을 논의 중",
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
        period: "2022.12 – 현재",
        overview:
          "누구나 인원수 제한 없이 다함께 채팅할 수 있는 오픈채팅 Lite 웹버전 프론트엔드 개발을 담당하고 있으며, 대규모 트래픽 환경에서의 성능 최적화, 안정성 확보 및 운영 효율성 개선에 기여했습니다.",
        achievements: [
          {
            tag: "성능 최적화",
            text: "대량의 메시지 유입 시 발생하는 렌더링 병목 현상을 방지하기 위해 비동기 처리 및 Message Queue를 도입하여, 성능 저하 없는 쾌적한 실시간 채팅 경험 제공. Lighthouse 기반 성능 측정 도구에서 약 20점 가량 성능 향상을 이끌어냈고, 실제 체감 성능을 높이기 위한 작업을 계속해서 진행했습니다.",
            link: {
              label: "관련 기술 블로그 기고: 설계를 변경하여 성능 개선하기",
              href: "https://tech.kakao.com/posts/686",
            },
          },
          {
            tag: "운영 효율성 개선",
            text: "하드코딩으로 매번 빌드/배포가 필요했던 이벤트성 기능(특정 단어 입력 시 데코레이션)의 구조를 개선하여, 데이터를 JSON으로 정규화하고 실시간 수정이 가능한 사내 어드민 페이지를 기획·개발. 이를 통해 하계 올림픽 4개 채팅방에 약 61개, 추석 4개 채팅방에 약 40개의 데코레이션 정보를 실시간으로 등록·수정하며 운영 효율성 대폭 향상",
          },
          {
            tag: "안정성 향상",
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
            text: "개발자 콘솔의 MCP 목록 조회 및 20여 개 필드 기반 대규모 데이터 등록 폼 구현",
          },
          {
            text: "방대한 입력 데이터에 최적화된 상태 관리 구조 설계 및 30여 개 복잡한 유효성 검증 로직 구축",
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
            text: "카카오톡 말풍선의 플랫폼별 동작 차이와 렌더링 시 예외 처리를 위해 100개 이상의 테스트 코드를 선제적으로 작성하여 안정적인 릴리즈 기반 마련",
          },
          {
            text: "Redux의 무거운 보일러플레이트 문제를 해결하기 위해 Redux Toolkit 마이그레이션을 진행, 상태 모듈 15개를 slice로 전환하며 상태 정의 코드를 약 60% 축소",
          },
          {
            text: "WebSocket 기반 실시간 통신 서비스 로직 구현",
          },
          {
            text: "사용자향 웹채팅에서 카카오톡 채널 정보 및 채팅 시작 버튼이 포함된 시작 페이지 개발",
          },
        ],
        tech: ["React", "Redux", "Redux Toolkit(RTK)", "WebSocket"],
      },
    ],
  },
];

interface Skill {
  title: string;
  points: string[];
}

const SKILLS: Skill[] = [
  {
    title: "Architecture & Design",
    points: [
      "UI / 비즈니스 로직 / API 통신 계층의 역할을 분리해 유지보수성 높은 아키텍처 설계",
      "Web Component로 프레임워크에 종속되지 않는 재사용 모듈과 SDK 구축·배포",
    ],
  },
  {
    title: "Mobile Web & WebView",
    points: [
      "모바일 웹뷰 환경(Safe Area, OS별 렌더링 차이, 키보드/포커스 등) 제어 및 트러블슈팅",
      "롱프레스, Lottie 리액션 등 모바일 전용 서비스(AI 국민비서, 오픈채팅 Lite)의 터치 인터랙션 설계·구현",
    ],
  },
  {
    title: "Performance Optimization",
    points: [
      "WebSocket / SSE 환경에서 유입되는 대용량 실시간 데이터 처리와 렌더링 병목 개선",
      "Message Queue 도입과 비동기 처리로 실시간 화면 렌더링 성능 최적화",
    ],
  },
  {
    title: "Testing & Quality",
    points: [
      "Playwright를 활용한 E2E 테스트와 핵심 로직 Unit 테스트로 릴리즈 안정성 확보",
    ],
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
  { label: "LinkedIn", href: "https://www.linkedin.com/in/chanhuiseok/" },
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

function groupProjects(projects: Project[]) {
  const ongoing = projects.filter((p) => p.period.includes("현재"));
  const completed = projects.filter((p) => !p.period.includes("현재"));

  return [
    { label: "진행 중", projects: ongoing },
    { label: "완료", projects: completed },
  ].filter((group) => group.projects.length > 0);
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
          {renderWithBold(INTRO)}
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

            {/* Projects, grouped by progress status */}
            {groupProjects(exp.projects).map((group) => (
              <div key={group.label} className="mt-7">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs tracking-wider text-muted-foreground">
                    {group.label}
                  </span>
                  <span aria-hidden className="h-px flex-1 bg-border" />
                </div>

                <ol className="mt-5 space-y-8">
                  {group.projects.map((project) => (
                    <li key={project.title}>
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
        ))}
      </div>

      {/* Skills */}
      <div className="mt-16">
        <SectionHeading>Skills</SectionHeading>
        <dl className="mt-6 divide-y divide-border border-y border-border">
          {SKILLS.map((skill) => (
            <div
              key={skill.title}
              className="grid gap-x-6 gap-y-2 py-5 sm:grid-cols-[190px_1fr]"
            >
              <dt className="text-[15px] font-semibold tracking-tight text-foreground">
                {skill.title}
              </dt>
              <dd>
                <ul className="space-y-2">
                  {skill.points.map((point) => (
                    <li
                      key={point}
                      className="flex gap-2.5 text-[15px] leading-relaxed"
                    >
                      <span
                        aria-hidden
                        className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent/60"
                      />
                      <span className="text-foreground/75">{point}</span>
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          ))}
        </dl>
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
