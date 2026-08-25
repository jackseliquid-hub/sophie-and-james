import { useEffect, useRef } from "react";

/**
 * Adds `data-reveal="in"` (or `data-reveal-image="in"`) once the element is in view.
 * CSS in styles.css does the animating, so this stays cheap on mobile.
 *
 * A single shared scroll sweeper drives every element rather than one IntersectionObserver
 * each: it is deterministic (an element that is on screen is always revealed, even after a
 * jump-scroll or an anchor link) and costs one passive listener for the whole page.
 */

type Entry = { el: HTMLElement; attr: string; margin: number };

const registry = new Set<Entry>();
let scheduled = false;
let listening = false;

function sweep() {
  scheduled = false;
  const vh = window.innerHeight || 0;
  for (const entry of [...registry]) {
    const { el, attr, margin } = entry;
    if (!el.isConnected) {
      registry.delete(entry);
      continue;
    }
    const r = el.getBoundingClientRect();
    // Visible, or already scrolled past — either way it should be shown.
    if (r.top < vh - margin && r.bottom > 0) {
      el.setAttribute(attr, "in");
      registry.delete(entry);
    } else if (r.bottom <= 0) {
      el.setAttribute(attr, "in");
      registry.delete(entry);
    }
  }
}

function schedule() {
  if (scheduled) return;
  scheduled = true;
  requestAnimationFrame(sweep);
}

function listen() {
  if (listening) return;
  listening = true;
  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", schedule, { passive: true });
  // Content can move into view without a scroll event — an accordion opening, the RSVP form
  // collapsing into its confirmation, the stage switching. Watch the document box too.
  if (typeof ResizeObserver !== "undefined") {
    const ro = new ResizeObserver(schedule);
    ro.observe(document.documentElement);
    if (document.body) ro.observe(document.body);
  }
}

export function useReveal<T extends HTMLElement = HTMLDivElement>(options?: {
  /** How far into the viewport (px) the element must come before revealing. */
  margin?: number;
}) {
  const ref = useRef<T | null>(null);
  const margin = options?.margin ?? 60;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const attr = el.hasAttribute("data-reveal-image") ? "data-reveal-image" : "data-reveal";
    const entry: Entry = { el, attr, margin };
    registry.add(entry);
    listen();
    schedule();

    return () => {
      registry.delete(entry);
    };
  }, [margin]);

  return ref;
}
