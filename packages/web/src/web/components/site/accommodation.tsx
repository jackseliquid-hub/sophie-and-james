import { useState } from "react";
import { ChevronDown, MapPin } from "lucide-react";
import { event } from "../../data/event";
import { Container, Section } from "../ui/section";
import { Reveal } from "../ui/reveal";
import { cn } from "../../lib/utils";

export function Accommodation() {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <Section id="stay" tone="cream" size="md">
      <Container width="wide">
        <div className="max-w-[36rem]">
          <Reveal className="eyebrow block" as="span">
            Accommodation
          </Reveal>
          <Reveal delay={80}>
            <h2 className="display-lg mt-6">Staying overnight?</h2>
          </Reveal>
          <Reveal delay={150}>
            <p className="lede mt-6">
              A few places we love within a few minutes of Woodland Hall. Mention the wedding when
              you book — most of them know us by now.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {event.accommodation.map((place, i) => {
            const isOpen = open === place.name;
            return (
              <Reveal key={place.name} delay={i * 110} className="flex flex-col">
                <div className="relative overflow-hidden">
                  <img
                    src={place.image}
                    alt={`${place.name} — ${place.kind}`}
                    className="aspect-4/3 w-full object-cover transition-transform duration-[1200ms] ease-out hover:scale-[1.04]"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="grain absolute inset-0" />
                </div>

                <div className="flex flex-1 flex-col pt-6">
                  <span className="eyebrow">{place.kind}</span>
                  <h3 className="mt-3 font-display text-[1.75rem] leading-snug">{place.name}</h3>

                  <dl className="mt-4 space-y-1.5 text-[0.9rem] text-ink-soft">
                    <div className="flex gap-2">
                      <dt className="sr-only">Distance</dt>
                      <dd>{place.distance}</dd>
                    </div>
                    <div className="flex gap-2">
                      <dt className="sr-only">Price</dt>
                      <dd className="text-muted">{place.price}</dd>
                    </div>
                  </dl>

                  <div
                    className={cn(
                      "grid overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                      isOpen ? "mt-4 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                    )}
                  >
                    <p className="min-h-0 text-[0.92rem] leading-relaxed text-ink-soft">
                      {place.note}
                    </p>
                  </div>

                  <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-line pt-5">
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : place.name)}
                      aria-expanded={isOpen}
                      className="inline-flex items-center gap-2 text-[0.7rem] font-medium tracking-[0.2em] text-ink uppercase"
                    >
                      {isOpen ? "Close" : "View details"}
                      <ChevronDown
                        className={cn("h-3.5 w-3.5 transition-transform duration-300", isOpen && "rotate-180")}
                        strokeWidth={1.5}
                      />
                    </button>
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                        `${place.name} near ${event.venue.mapsQuery}`,
                      )}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 text-[0.7rem] font-medium tracking-[0.2em] text-muted uppercase transition-colors hover:text-ink"
                    >
                      <MapPin className="h-3.5 w-3.5" strokeWidth={1.5} /> Directions
                    </a>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={120}>
          <p className="mt-10 text-xs tracking-[0.14em] text-muted uppercase">
            Fictional examples created for this showcase
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}
