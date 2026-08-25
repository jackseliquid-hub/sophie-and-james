import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { event, navSections } from "../../data/event";
import { cn } from "../../lib/utils";

export function SiteNav({ ready }: { ready: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <a
        href="#intro"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[120] focus:bg-ink focus:px-4 focus:py-2 focus:text-xs focus:tracking-widest focus:text-ivory focus:uppercase"
      >
        Skip to content
      </a>

      <header
        className={cn(
          "fixed inset-x-0 top-0 z-[70] transition-all duration-700",
          ready ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0",
          scrolled
            ? "border-b border-line bg-ivory/92 backdrop-blur-md"
            : "border-b border-transparent",
        )}
      >
        <nav
          aria-label="Primary"
          className="mx-auto flex h-[4.25rem] w-full max-w-[86rem] items-center justify-between px-6 sm:px-8 lg:px-12"
        >
          <a
            href="#top"
            className={cn(
              "font-display text-base tracking-[0.3em] transition-colors",
              scrolled ? "text-ink" : "text-ink",
            )}
          >
            {event.monogram}
          </a>

          <ul className="hidden items-center gap-9 lg:flex">
            {navSections.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className="link-underline text-[0.7rem] font-medium tracking-[0.22em] text-ink-soft uppercase transition-colors hover:text-ink"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <a href="#rsvp" className="btn btn-primary hidden !min-h-[2.6rem] !px-6 sm:inline-flex">
              RSVP
            </a>
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="-mr-2 flex h-11 w-11 items-center justify-center text-ink lg:hidden"
              aria-label="Open menu"
              aria-expanded={open}
            >
              <Menu className="h-5 w-5" strokeWidth={1.25} />
            </button>
          </div>
        </nav>
      </header>

      {/* mobile menu */}
      <div
        className={cn(
          "fixed inset-0 z-[95] lg:hidden",
          open ? "pointer-events-auto" : "pointer-events-none",
        )}
        aria-hidden={!open}
      >
        <div
          className={cn(
            "absolute inset-0 bg-ink transition-opacity duration-700",
            open ? "opacity-100" : "opacity-0",
          )}
          onClick={() => setOpen(false)}
        />
        <div className="relative flex h-full flex-col px-7 py-6">
          <div className="flex items-center justify-between">
            <span
              className={cn(
                "font-display text-base tracking-[0.3em] text-ivory transition-opacity duration-500",
                open ? "opacity-100" : "opacity-0",
              )}
            >
              {event.monogram}
            </span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="-mr-2 flex h-11 w-11 items-center justify-center text-ivory"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" strokeWidth={1.25} />
            </button>
          </div>

          <ul className="mt-auto mb-auto flex flex-col gap-1">
            {navSections.map((s, i) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "block py-2 font-display text-[2.6rem] leading-tight text-ivory transition-all duration-700",
                    open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
                  )}
                  style={{ transitionDelay: open ? `${140 + i * 70}ms` : "0ms" }}
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>

          <div
            className={cn(
              "transition-all duration-700",
              open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
            )}
            style={{ transitionDelay: open ? "520ms" : "0ms" }}
          >
            <a
              href="#rsvp"
              onClick={() => setOpen(false)}
              className="btn btn-solid-light w-full"
            >
              RSVP
            </a>
            <p className="mt-6 text-center font-display text-lg text-ivory/60">{event.dateShort}</p>
            <p className="eyebrow mt-2 text-center text-ivory/40">
              {event.venue.name} · {event.region}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
