import { event } from "../../data/event";
import { Reveal } from "../ui/reveal";
import { Container } from "../ui/section";

const links = [
  { href: "/#rsvp", label: "RSVP" },
  { href: "/#share", label: "Share invitation" },
  { href: "/#photos", label: "Photo gallery" },
  { href: "/#faq", label: "FAQ" },
  { href: "/gift-list", label: "Gift list" },
];

export function SiteFooter() {
  return (
    <footer className="bg-ink text-ivory">
      <Container width="default" className="py-20 sm:py-24">
        <div className="text-center">
          <Reveal>
            <span className="font-display text-[2.6rem] leading-none tracking-[0.06em] text-ivory sm:text-[3.4rem]">
              {event.title}
            </span>
          </Reveal>
          <Reveal delay={90}>
            <p className="mt-5 text-[0.7rem] tracking-[0.32em] text-ivory/50 uppercase">
              {event.dateShort} · {event.region}
            </p>
          </Reveal>
          {event.hashtag ? (
            <Reveal delay={150}>
              <p className="mt-6 font-display text-[1.2rem] text-taupe italic">{event.hashtag}</p>
            </Reveal>
          ) : null}
        </div>

        <Reveal delay={120}>
          <nav
            aria-label="Footer"
            className="mt-14 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 border-t border-ivory/12 pt-10"
          >
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="link-underline text-[0.68rem] tracking-[0.26em] text-ivory/70 uppercase transition-colors hover:text-ivory"
              >
                {l.label}
              </a>
            ))}
          </nav>
        </Reveal>

        <div className="mt-14 flex flex-col items-center gap-4 border-t border-ivory/12 pt-8 sm:flex-row sm:justify-between">
          <p className="text-[0.72rem] tracking-[0.14em] text-ivory/40">
            © 2026 {event.title}
          </p>
          <p className="text-[0.72rem] tracking-[0.14em] text-ivory/40">
            Website designed &amp; built by{" "}
            <a
              href="https://jacksstudio.co.uk"
              target="_blank"
              rel="noreferrer noopener"
              className="link-underline text-ivory/70 transition-colors hover:text-ivory"
            >
              Jacks Studio
            </a>
          </p>
        </div>
      </Container>
    </footer>
  );
}
