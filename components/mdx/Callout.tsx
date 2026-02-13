import { cn } from "@/lib/utils";

interface CalloutProps {
  type?: "info" | "warning" | "error";
  children: React.ReactNode;
}

const styles = {
  info: "border-accent/30 bg-accent/5",
  warning: "border-yellow-500/30 bg-yellow-500/5",
  error: "border-destructive/30 bg-destructive/5",
};

const icons = {
  info: "💡",
  warning: "⚠️",
  error: "🚨",
};

export function Callout({ type = "info", children }: CalloutProps) {
  return (
    <div
      className={cn(
        "my-6 rounded-lg border-l-4 px-4 py-3 text-sm",
        styles[type],
      )}
    >
      <span className="mr-2">{icons[type]}</span>
      {children}
    </div>
  );
}
