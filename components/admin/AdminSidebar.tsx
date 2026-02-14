"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/admin", label: "Dashboard", exact: true },
  { href: "/admin/posts/new", label: "New Post", exact: true },
];

function SidebarContent({
  pathname,
  onLogout,
  onNavigate,
}: {
  pathname: string;
  onLogout: () => void;
  onNavigate?: () => void;
}) {
  return (
    <>
      {/* Logo */}
      <div className="flex h-14 items-center border-b border-border px-4">
        <Link
          href="/admin"
          className="text-lg font-bold tracking-tight text-foreground no-underline hover:no-underline"
        >
          Admin
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-1 px-2 py-4">
        {NAV_ITEMS.map((item) => {
          const active = item.exact
            ? pathname === item.href
            : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={cn(
                "block rounded-md px-3 py-2 text-sm no-underline transition-colors hover:no-underline",
                active
                  ? "bg-muted font-medium text-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-border p-2">
        <Link
          href="/"
          target="_blank"
          className="block rounded-md px-3 py-2 text-sm text-muted-foreground no-underline transition-colors hover:bg-muted hover:text-foreground hover:no-underline"
        >
          View Blog
        </Link>
        <button
          onClick={onLogout}
          className="w-full rounded-md px-3 py-2 text-left text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          Logout
        </button>
      </div>
    </>
  );
}

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <>
      {/* 모바일 상단 헤더바 */}
      <div className="fixed left-0 right-0 top-0 z-40 flex h-14 items-center border-b border-border bg-card px-4 md:hidden">
        <button
          onClick={() => setMobileOpen(true)}
          className="mr-3 rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          aria-label="Open menu"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <path d="M3 5h14M3 10h14M3 15h14" />
          </svg>
        </button>
        <Link
          href="/admin"
          className="text-lg font-bold tracking-tight text-foreground no-underline hover:no-underline"
        >
          Admin
        </Link>
      </div>

      {/* 모바일 사이드바 오버레이 */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="absolute left-0 top-0 flex h-full w-56 flex-col border-r border-border bg-card">
            <SidebarContent
              pathname={pathname}
              onLogout={handleLogout}
              onNavigate={() => setMobileOpen(false)}
            />
          </aside>
        </div>
      )}

      {/* 데스크톱 사이드바 */}
      <aside className="hidden h-screen w-56 shrink-0 flex-col border-r border-border bg-card md:flex">
        <SidebarContent pathname={pathname} onLogout={handleLogout} />
      </aside>
    </>
  );
}
