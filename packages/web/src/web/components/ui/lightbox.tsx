import { useCallback, useEffect, useRef } from "react";

export interface LightboxItem {
  src: string;
  alt: string;
  caption?: string;
  credit?: string;
}

interface LightboxProps {
  items: LightboxItem[];
  index: number | null;
  onClose: () => void;
  onIndex: (i: number) => void;
}

/**
 * Accessible full-screen image viewer: Escape closes, arrows move, Tab is trapped inside.
 */
export function Lightbox({ items, index, onClose, onIndex }: LightboxProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const open = index !== null && index >= 0 && index < items.length;

  const step = useCallback(
    (dir: 1 | -1) => {
      if (index === null) return;
      onIndex((index + dir + items.length) % items.length);
    },
    [index, items.length, onIndex],
  );

  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        step(1);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        step(-1);
      } else if (e.key === "Tab") {
        const nodes = panelRef.current?.querySelectorAll<HTMLElement>("button");
        if (!nodes || nodes.length === 0) return;
        const first = nodes[0];
        const last = nodes[nodes.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
      previous?.focus?.();
    };
  }, [open, onClose, step]);

  if (!open || index === null) return null;
  const item = items[index];

  return (
    <div
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-label="Photo viewer"
      className="fixed inset-0 z-[90] flex flex-col bg-ink/96 backdrop-blur-[2px]"
    >
      <div className="flex items-center justify-between px-5 py-4 sm:px-8">
        <span className="text-[0.65rem] tracking-[0.3em] text-ivory/45 uppercase">
          {index + 1} / {items.length}
        </span>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          className="flex h-11 w-11 items-center justify-center text-ivory/70 transition-colors hover:text-ivory"
          aria-label="Close photo viewer"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor">
            <path d="M5 5l14 14M19 5L5 19" strokeWidth="1.2" />
          </svg>
        </button>
      </div>

      {/* biome-ignore lint/a11y/useKeyWithClickEvents: backdrop click is a convenience; Escape is the accessible path */}
      <div
        className="relative flex flex-1 items-center justify-center overflow-hidden px-3 sm:px-16"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        <button
          type="button"
          onClick={() => step(-1)}
          aria-label="Previous photo"
          className="absolute left-1 z-10 flex h-12 w-12 items-center justify-center text-ivory/55 transition-colors hover:text-ivory sm:left-4"
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor">
            <path d="M15 4l-8 8 8 8" strokeWidth="1" />
          </svg>
        </button>

        <figure key={item.src} className="fade-up flex max-h-full flex-col items-center">
          <img
            src={item.src}
            alt={item.alt}
            className="max-h-[68vh] w-auto max-w-full object-contain"
            decoding="async"
          />
          {item.caption || item.credit ? (
            <figcaption className="mt-6 max-w-[34rem] px-4 text-center">
              {item.caption ? (
                <span className="block font-display text-[1.15rem] leading-snug text-ivory/85 italic">
                  {item.caption}
                </span>
              ) : null}
              {item.credit ? (
                <span className="mt-3 block text-[0.65rem] tracking-[0.28em] text-ivory/40 uppercase">
                  {item.credit}
                </span>
              ) : null}
            </figcaption>
          ) : null}
        </figure>

        <button
          type="button"
          onClick={() => step(1)}
          aria-label="Next photo"
          className="absolute right-1 z-10 flex h-12 w-12 items-center justify-center text-ivory/55 transition-colors hover:text-ivory sm:right-4"
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor">
            <path d="M9 4l8 8-8 8" strokeWidth="1" />
          </svg>
        </button>
      </div>

      <div className="h-8" />
    </div>
  );
}
