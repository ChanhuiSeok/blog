"use client";

import Script from "next/script";
import { useTheme } from "next-themes";
import { useEffect } from "react";
import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

function useIsMounted() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
}

export function Comments() {
  const { resolvedTheme } = useTheme();
  const mounted = useIsMounted();
  const giscusTheme = resolvedTheme === "dark" ? "dark" : "light";

  // 스크립트는 최초 한 번만 로드되므로, 이후 테마 토글은
  // postMessage로 이미 렌더된 giscus iframe에 직접 알려줘야 한다.
  useEffect(() => {
    if (!mounted) return;
    const iframe = document.querySelector<HTMLIFrameElement>(
      "iframe.giscus-frame",
    );
    iframe?.contentWindow?.postMessage(
      { giscus: { setConfig: { theme: giscusTheme } } },
      "https://giscus.app",
    );
  }, [giscusTheme, mounted]);

  if (!mounted) return null;

  return (
    <>
      <div className="giscus mt-12" />
      <Script
        src="https://giscus.app/client.js"
        strategy="lazyOnload"
        crossOrigin="anonymous"
        async
        data-repo="ChanhuiSeok/blog"
        data-repo-id="R_kgDORPMz8g"
        data-category="Comments"
        data-category-id="DIC_kwDORPMz8s4DEJvE"
        data-mapping="pathname"
        data-strict="0"
        data-reactions-enabled="1"
        data-emit-metadata="0"
        data-input-position="bottom"
        data-theme={giscusTheme}
        data-lang="ko"
        data-loading="lazy"
      />
    </>
  );
}
