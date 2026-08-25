import { type ReactNode, useEffect } from "react";
import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import { event } from "../../data/event";
import { SiteFooter } from "./footer";

/**
 * Slim shell for the subpages that hang off the invitation (gift list, honeymoon fund).
 * Deliberately quieter than the main site nav — the guest is one level down and the only
 * navigation they need is the way back.
 */
export function PageShell({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = `${title} — ${event.title}`;
    return () => {
      document.title = `${event.title} — Our Wedding`;
    };
  }, [title]);

  return (
    <div className="min-h-screen bg-ivory">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:bg-ink focus:px-5 focus:py-3 focus:text-[0.7rem] focus:tracking-[0.2em] focus:text-ivory focus:uppercase"
      >
        Skip to content
      </a>

      <header className="sticky top-0 z-30 border-b border-line bg-ivory/90 backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-[86rem] items-center justify-between gap-6 px-6 py-4 sm:px-8 lg:px-12">
          <Link
            to="/"
            className="group inline-flex items-center gap-2.5 text-[0.66rem] font-medium tracking-[0.22em] text-muted uppercase transition-colors hover:text-ink"
          >
            <ArrowLeft
              className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-x-1"
              strokeWidth={1.5}
            />
            <span className="hidden sm:inline">Back to the invitation</span>
            <span className="sm:hidden">Invitation</span>
          </Link>
          <Link
            to="/"
            className="font-display text-[1.35rem] leading-none tracking-[0.14em] text-ink sm:text-[1.6rem]"
          >
            {event.monogram}
          </Link>
        </div>
      </header>

      <main id="main">{children}</main>
      <SiteFooter />
    </div>
  );
}
