import { useEffect, useRef, useState } from "react";
import type { EventStage } from "../../data/event";
import { cn } from "../../lib/utils";
import { useEventState } from "./event-state";

const stages: { value: EventStage; label: string; hint: string }[] = [
  { value: "before", label: "Before the event", hint: "Countdown, RSVP, details, accommodation" },
  { value: "day", label: "Wedding day", hint: "Today's schedule, directions, live updates" },
  { value: "after", label: "After the event", hint: "Memories, guest photos, thank you" },
];

/**
 * Showcase-only control. Lets a visitor preview how one event website evolves across the
 * three stages Jacks Studio's product will move through automatically.
 */
export function DemoSwitcher() {
  const { stage, setStage } = useEventState();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("mousedown", onClick);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  const active = stages.find((s) => s.value === stage) ?? stages[0];

  return (
    <div
      ref={ref}
      className="fixed bottom-3 left-3 z-[70] flex flex-col items-start gap-2 sm:bottom-5 sm:left-5"
    >
      {open ? (
        <div
          id="demo-stage-panel"
          className="fade-up w-[17.5rem] border border-ink/12 bg-paper/95 p-4 shadow-[0_18px_50px_-20px_rgba(34,34,31,0.4)] backdrop-blur-md"
        >
          <p className="text-[0.6rem] tracking-[0.28em] text-muted uppercase">
            Demo · preview event stages
          </p>
          <p className="mt-2 text-[0.78rem] leading-relaxed text-ink-soft">
            One website, three stages. In production this switches itself as the date arrives and
            passes.
          </p>
          <div className="mt-4 grid gap-px bg-line">
            {stages.map((s) => (
              <button
                key={s.value}
                type="button"
                onClick={() => setStage(s.value)}
                aria-pressed={stage === s.value}
                className={cn(
                  "group bg-paper px-3 py-3 text-left transition-colors",
                  stage === s.value ? "bg-sage text-white" : "hover:bg-cream",
                )}
              >
                <span className="flex items-center justify-between gap-3">
                  <span className="font-display text-[1.05rem] leading-none">{s.label}</span>
                  {stage === s.value ? (
                    <svg
                      viewBox="0 0 24 24"
                      className="h-3.5 w-3.5"
                      fill="none"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M4 12.5l5 5L20 6.5" strokeWidth="1.6" />
                    </svg>
                  ) : null}
                </span>
                <span
                  className={cn(
                    "mt-1.5 block text-[0.68rem] leading-snug",
                    stage === s.value ? "text-white/75" : "text-muted",
                  )}
                >
                  {s.hint}
                </span>
              </button>
            ))}
          </div>
          <p className="mt-3 text-[0.62rem] leading-relaxed text-muted">
            Guests never see this control — it exists so you can review the whole lifecycle.
          </p>
        </div>
      ) : null}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="demo-stage-panel"
        className="flex items-center gap-2 border border-ink/12 bg-paper/90 px-3 py-2 text-[0.6rem] tracking-[0.22em] text-ink-soft uppercase shadow-[0_8px_24px_-14px_rgba(34,34,31,0.5)] backdrop-blur-md transition-colors hover:border-sage hover:text-sage-deep"
      >
        <span
          aria-hidden="true"
          className={cn(
            "h-1.5 w-1.5 rounded-full",
            stage === "before" ? "bg-sage" : stage === "day" ? "bg-gold" : "bg-taupe",
          )}
        />
        Demo: {active.label}
      </button>
    </div>
  );
}
