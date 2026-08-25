import { useEffect, useState } from "react";
import { event } from "../../data/event";
import { cn } from "../../lib/utils";

const SEEN_KEY = "sj-invitation-opened";

/**
 * The opening experience: a full-bleed sealed cover that the guest opens.
 * Only greets once per browser session so navigating back doesn't feel like a wall.
 */
export function InvitationGate({ onOpen }: { onOpen: () => void }) {
  const [mounted, setMounted] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const [hidden, setHidden] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.sessionStorage.getItem(SEEN_KEY) === "1";
  });

  useEffect(() => {
    if (hidden) {
      onOpen();
      return;
    }
    document.body.style.overflow = "hidden";
    const id = window.setTimeout(() => setMounted(true), 60);
    return () => {
      window.clearTimeout(id);
      document.body.style.overflow = "";
    };
  }, [hidden, onOpen]);

  function open() {
    setLeaving(true);
    try {
      window.sessionStorage.setItem(SEEN_KEY, "1");
    } catch {
      /* ignore */
    }
    document.body.style.overflow = "";
    onOpen();
    window.setTimeout(() => setHidden(true), 1500);
  }

  if (hidden) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-[90] overflow-hidden bg-ink transition-[opacity,transform] duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
        leaving ? "pointer-events-none scale-[1.06] opacity-0" : "opacity-100",
      )}
      aria-hidden={leaving}
    >
      {/* photograph */}
      <img
        src={event.invitation.heroImage}
        alt={event.invitation.heroAlt}
        className={cn(
          "absolute inset-0 h-full w-full object-cover object-[50%_38%] transition-opacity duration-[1600ms]",
          mounted ? "opacity-100" : "opacity-0",
          mounted && "kenburns",
        )}
        fetchPriority="high"
        decoding="async"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/55 via-ink/25 to-ink/75" />
      <div className="grain absolute inset-0" />

      {/* frame */}
      <div className="pointer-events-none absolute inset-4 border border-ivory/25 sm:inset-7" />

      <div className="relative flex h-full flex-col items-center justify-between px-6 py-14 text-center sm:py-16">
        <div
          className={cn(
            "transition-all duration-1000",
            mounted ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
          )}
        >
          <span className="font-display text-lg tracking-[0.42em] text-ivory/85">
            {event.monogram}
          </span>
        </div>

        <div className="flex flex-col items-center">
          <p
            className={cn(
              "eyebrow text-ivory/75 transition-all delay-200 duration-1000",
              mounted ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
            )}
          >
            {event.invitation.kicker}
          </p>

          <h1
            className={cn(
              "display-xl mt-6 text-ivory transition-all delay-[420ms] duration-[1400ms]",
              mounted ? "translate-y-0 opacity-100 blur-0" : "translate-y-6 opacity-0 blur-[6px]",
            )}
          >
            <span className="block">{event.hosts[0].firstName}</span>
            <span className="my-1 block font-display text-[0.42em] italic text-ivory/70 sm:my-2">
              and
            </span>
            <span className="block">{event.hosts[1].firstName}</span>
          </h1>

          <div
            className={cn(
              "mt-8 flex flex-col items-center gap-4 transition-all delay-[900ms] duration-1000",
              mounted ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
            )}
          >
            <span className="h-px w-14 bg-ivory/35" />
            <p className="font-display text-lg text-ivory/90 sm:text-2xl">{event.dateLong}</p>
            <p className="eyebrow text-ivory/60">{event.region}</p>
          </div>
        </div>

        <div
          className={cn(
            "flex flex-col items-center gap-6 transition-all delay-[1250ms] duration-1000",
            mounted ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0",
          )}
        >
          <button type="button" onClick={open} className="btn btn-solid-light w-[17rem] sm:w-auto">
            {event.invitation.cta}
          </button>
          <span className="text-[0.65rem] tracking-[0.3em] text-ivory/45 uppercase">
            {event.monogram}
          </span>
        </div>
      </div>
    </div>
  );
}
