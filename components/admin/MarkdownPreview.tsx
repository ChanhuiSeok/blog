"use client";

import { useEffect, useRef, useState } from "react";

interface MarkdownPreviewProps {
  content: string;
}

export function MarkdownPreview({ content }: MarkdownPreviewProps) {
  const [html, setHtml] = useState("");
  const [loading, setLoading] = useState(false);
  const abortRef = useRef<AbortController | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (abortRef.current) abortRef.current.abort();

    if (!content.trim()) {
      setHtml("");
      setLoading(false);
      return;
    }

    setLoading(true);

    timerRef.current = setTimeout(async () => {
      const controller = new AbortController();
      abortRef.current = controller;

      try {
        const res = await fetch("/api/preview", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content }),
          signal: controller.signal,
        });
        const json = await res.json();
        if (json.success && json.data?.html) {
          setHtml(json.data.html);
        }
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") return;
      } finally {
        setLoading(false);
      }
    }, 500);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (abortRef.current) abortRef.current.abort();
    };
  }, [content]);

  return (
    <div className="relative h-full overflow-auto p-6">
      {loading && (
        <div className="absolute right-4 top-4 text-xs text-muted-foreground">
          Loading...
        </div>
      )}
      {html ? (
        <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      ) : (
        <p className="text-sm text-muted-foreground">
          미리보기가 여기에 표시됩니다.
        </p>
      )}
    </div>
  );
}
