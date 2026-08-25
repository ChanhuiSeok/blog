"use client";

import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
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
  const pathname = usePathname();
  const containerRef = useRef<HTMLDivElement>(null);
  const giscusTheme = resolvedTheme === "dark" ? "dark" : "light";

  // next/script는 동일 src의 스크립트를 한 번만 삽입하고 캐싱하기 때문에,
  // 클라이언트 라우팅으로 다른 포스트로 이동해도 client.js가 재실행되지 않는다.
  // 그래서 경로가 바뀔 때마다 script 엘리먼트를 직접 새로 만들어 주입한다.
  useEffect(() => {
    const container = containerRef.current;
    if (!mounted || !container) return;

    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.async = true;
    script.crossOrigin = "anonymous";
    script.setAttribute("data-repo", "ChanhuiSeok/blog");
    script.setAttribute("data-repo-id", "R_kgDORPMz8g");
    script.setAttribute("data-category", "Comments");
    script.setAttribute("data-category-id", "DIC_kwDORPMz8s4DEJvE");
    script.setAttribute("data-mapping", "pathname");
    script.setAttribute("data-strict", "0");
    script.setAttribute("data-reactions-enabled", "1");
    script.setAttribute("data-emit-metadata", "0");
    script.setAttribute("data-input-position", "bottom");
    script.setAttribute("data-theme", giscusTheme);
    script.setAttribute("data-lang", "ko");
    script.setAttribute("data-loading", "lazy");

    container.appendChild(script);

    return () => {
      container.innerHTML = "";
    };
    // giscusTheme는 최초 생성 시점 값만 사용하고, 이후 테마 토글은 아래 postMessage
    // effect가 이미 렌더된 iframe에 전달한다. 여기서 의존성에 넣으면 테마를 바꿀
    // 때마다 위젯 전체가 재생성되어 스크롤 위치/댓글창 상태가 초기화된다.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mounted, pathname]);

  // 스크립트는 경로가 바뀔 때만 재생성되므로, 이후 테마 토글은
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

  return <div className="giscus mt-12" ref={containerRef} />;
}
