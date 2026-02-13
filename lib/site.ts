export const siteConfig = {
  name: "Chanhui's Blog",
  description: "일상, 테크, 개발 이야기를 기록하는 블로그",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://chanhui.blog",
  author: {
    name: "Chanhui",
    email: "chanhuicom@gmail.com",
  },
  locale: "ko_KR",
  language: "ko",
} as const;
