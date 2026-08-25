# Sophie & James — Design

A premium, mobile-first digital wedding invitation and event website (web only). It acts as the
couple's invitation, information hub, RSVP system and — after the day — a shared guest photo
gallery. Built as a Jacks Studio showcase example for a future white-label "Event Website" product,
so all content is driven from one structured config rather than hard-coded into components.

Visual direction: **editorial wedding stationery**. Warm ivory paper, muted sage, deep charcoal ink,
a whisper of antique gold. Huge light serif display type, wide-tracked small-caps labels, generous
negative space, full-bleed film-grain photography. Romantic but restrained — no hearts, no pink, no
script fonts, no card grids with rounded corners.

## Brand & Colors

CSS variables in `packages/web/src/web/styles.css` (single source of truth; no dark mode — the site
is one warm ivory world).

| Token | Value | Use |
|-------|-------|-----|
| `--ivory` | `#FAF7F1` | Page background |
| `--cream` | `#F1EADE` | Alternate section bands, inputs |
| `--paper` | `#FFFDF9` | Cards, raised surfaces |
| `--ink` | `#22221F` | Primary text, dark sections |
| `--ink-soft` | `#4A4A44` | Body copy |
| `--muted` | `#8B887E` | Secondary text, captions |
| `--sage` | `#7C8B76` | Primary accent (buttons, rules, active state) |
| `--sage-deep` | `#5A6755` | Hover / dark accent |
| `--taupe` | `#A99A85` | Tertiary accent, borders |
| `--gold` | `#B08D57` | Sparingly: hairline dividers, monogram, small marks |
| `--line` | `rgba(34,34,31,0.12)` | Hairlines |

Rules: sage is the only interactive colour. Gold never fills a shape larger than a rule or a glyph.
Dark sections use `--ink` with ivory type, and only for The Day timeline, guest photos and footer.

## Typography

- **Display:** Cormorant Garamond (300/400 + italic) — headings, dates, countdown numerals, names.
  Very large, tight leading (0.95–1.05), letter-spacing `-0.01em`.
- **Body / UI:** Jost (300/400/500) — copy, labels, forms, nav.
- **Eyebrow labels:** Jost 500, uppercase, `0.28em` tracking, 11–12px, `--muted`.
- Scale is mobile-first: hero name `clamp(3.5rem, 18vw, 11rem)`, section headings
  `clamp(2.2rem, 9vw, 4.5rem)`, body 16–18px with 1.75 line height.
- Loaded from Google Fonts in `index.html` with preconnect.

## Structure

Single page (`packages/web/src/web/pages/index.tsx`) composed of section components in
`src/web/components/site/`. All copy, times, venue, story, FAQs, accommodation, gallery and demo
guest photos come from `src/web/data/event.ts` — one typed `EventConfig` object that a future CMS or
Jacks Studio host dashboard can drop in unchanged (`eventType`, `hosts`, `date`, `venue`, `schedule`,
`rsvp`, `gallery`, `theme`).

Flow: **Invitation gate** (full-bleed hero, "Enter invitation") → intro → countdown → details →
venue → The Day timeline → Our Story → RSVP → dress code → accommodation → travel → gifts → gallery
→ guest photo sharing (share / upload / guest gallery) → things to know → FAQ → share → footer.

## Key User Flows

1. **Open invitation** — sealed cover with monogram; "Enter invitation" fades the cover away and
   releases the page (state kept in `sessionStorage` so it only greets once per visit).
2. **RSVP** — name, email, accept/decline; accepting reveals party size, guest names, dietary,
   accessibility, message. Submit → confirmation screen → persistent "RSVP received" status card.
   Stored in `localStorage` only; no network, no database.
3. **Guest photos** — drag & drop or choose files → previews, caption, name → simulated upload with
   progress → photos appear at the front of the guest gallery (object URLs, session-only).
4. **Demo event states** — discreet floating control switches Before / Wedding Day / After, which
   reorders and re-weights sections and swaps the countdown. Clearly labelled as a showcase control.

## Motion

CSS only. One `Reveal` component (IntersectionObserver → `data-visible`) gives staggered fade-and-
rise on scroll; hero uses a slow 12s image scale; countdown digits flip on change; gate crossfades.
Everything respects `prefers-reduced-motion`.

## Architecture

Static prototype: no API calls, no database, no auth, no cloud storage. RSVP and photo upload run
entirely in the browser (`localStorage` / object URLs) and are labelled as demonstrations. The
template's oRPC/Drizzle layer is left untouched so the production Jacks Studio backend can be wired
in behind the same component interfaces.
