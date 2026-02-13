"use client";

export default function PublicError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <p className="text-5xl font-bold text-muted-foreground">500</p>
      <h1 className="mt-4 text-2xl font-bold tracking-tight">
        문제가 발생했습니다
      </h1>
      <p className="mt-2 text-muted-foreground">
        일시적인 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.
      </p>
      <button
        onClick={reset}
        className="mt-6 rounded-md bg-foreground px-4 py-2 text-sm font-medium text-background transition-opacity hover:opacity-90"
      >
        다시 시도
      </button>
    </div>
  );
}
