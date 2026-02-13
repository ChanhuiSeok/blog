import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border py-8" role="contentinfo">
      <div className="flex flex-col items-center justify-between gap-4 text-sm text-muted-foreground sm:flex-row">
        <p>&copy; {new Date().getFullYear()} Roddy. All rights reserved.</p>
        <nav aria-label="Footer links" className="flex items-center gap-4">
          <Link
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground transition-colors hover:text-foreground hover:no-underline"
          >
            GitHub
          </Link>
          <Link
            href="/feed.xml"
            className="text-muted-foreground transition-colors hover:text-foreground hover:no-underline"
          >
            RSS
          </Link>
        </nav>
      </div>
    </footer>
  );
}
