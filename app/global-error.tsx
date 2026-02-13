"use client";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="ko">
      <body className="min-h-screen bg-[#0a0a0a] text-[#ededed] antialiased">
        <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
          <p className="text-6xl font-bold text-[#737373]">500</p>
          <h1 className="mt-4 text-2xl font-bold tracking-tight">
            문제가 발생했습니다
          </h1>
          <p className="mt-2 text-[#a3a3a3]">
            일시적인 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.
          </p>
          <button
            onClick={reset}
            className="mt-6 rounded-md bg-[#ededed] px-4 py-2 text-sm font-medium text-[#0a0a0a] transition-opacity hover:opacity-90"
          >
            다시 시도
          </button>
        </div>
      </body>
    </html>
  );
}
