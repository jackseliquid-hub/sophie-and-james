# Sophie & James — build scratchpad

Premium mobile-first digital wedding invitation site. Jacks Studio showcase.
Stack: managed template (Bun/Vite/React/Tailwind 4) at /home/user/sophie-james. Web only, port 4200.

## Decisions
- All content in `src/web/data/event.ts` (typed `EventConfig`, event-type agnostic) — no CMS.
- No API/DB/storage. RSVP -> localStorage. Photo upload -> object URLs in React state.
- Fonts: Cormorant Garamond (display) + Jost (body). Palette: ivory/cream/ink/sage/taupe/gold.
- Motion: CSS only + IntersectionObserver `Reveal` component. No motion lib.
- Demo state switcher (before/day/after) — floating control, sessionStorage, labelled as showcase.
- Images: AI-generated hero/couple/story/venue/details + searched venue & guest fillers, in public/images.

## Done
- app_init, design.md, index.html (SEO/OG), styles.css theme
- data/event.ts, hooks/use-reveal.ts, ui/reveal.tsx, ui/section.tsx
- site/: event-state, invitation-gate, nav, intro, countdown, details, venue, the-day, story,
  rsvp, dress-code, accommodation, travel, gifts

## Next
- site/: gallery, guest-photos (share CTA + upload + guest gallery + privacy), notices, faq,
  share, footer, demo-switcher
- pages/index.tsx compose + app.tsx wire providers
- bun run build, bun run lint, dev server on 4200, screenshot mobile + desktop, fix, deliver

## Session 3 — fixes verified (25 Aug 2026)
- `use-reveal.ts` rewritten: single shared scroll sweeper + ResizeObserver on the document box
  (content moving into view without a scroll event — RSVP form collapsing, stage switch, accordions).
  Verified: `sections.py both` → 18 sections, still-out 0, no page errors at 390x844 and 1440x900.
- `the-day.tsx`: time labels `whitespace-nowrap`, column widened to 4.5rem, rail moved to 5.75rem on mobile.
- `demo-switcher.tsx`: moved bottom-left — it was colliding with the Runable badge bottom-right.
- `rsvp.tsx`: on success the confirmation is scrolled into view (the tall form collapsing used to
  dump the reader down at the dress-code section).
- Interaction pass, all clean, no console/page errors: mobile menu + Escape, RSVP validate/submit/
  persist across reload/edit, FAQ, gallery lightbox (arrows + Escape + focus restore), real file
  upload → appears first in guest gallery with "Just added" badge and correct alt text, filters,
  all three demo stages resequence sections correctly.
- `bun run build` passes.
