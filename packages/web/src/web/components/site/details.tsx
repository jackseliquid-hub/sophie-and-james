import { CalendarPlus, Check } from "lucide-react";
import { useState } from "react";
import { event } from "../../data/event";
import { Container, Ornament, Section } from "../ui/section";
import { Reveal } from "../ui/reveal";

export function Details() {
  const [added, setAdded] = useState(false);

  return (
    <Section id="details" tone="cream" size="md">
      <Container width="default">
        <div className="text-center">
          <Reveal className="eyebrow block" as="span">
            The Details
          </Reveal>
          <Reveal delay={80}>
            <p className="display-lg mt-6">{event.dateLong}</p>
          </Reveal>
          <div className="mt-8 flex justify-center">
            <Ornament />
          </div>
        </div>

        <div className="mt-14 grid gap-px border border-line bg-line sm:grid-cols-3">
          {event.keyMoments.map((m, i) => (
            <Reveal
              key={m.label}
              delay={i * 120}
              className="flex flex-col items-center bg-cream px-6 py-11 text-center"
            >
              <span className="eyebrow">{m.label}</span>
              <span className="mt-4 font-display text-[2.6rem] leading-none sm:text-5xl">
                {m.time}
              </span>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200} className="mt-12 flex flex-col items-center gap-4">
          <button
            type="button"
            onClick={() => setAdded(true)}
            className="btn btn-outline"
            aria-live="polite"
          >
            {added ? (
              <>
                <Check className="h-4 w-4" strokeWidth={1.5} /> Added to your calendar
              </>
            ) : (
              <>
                <CalendarPlus className="h-4 w-4" strokeWidth={1.5} /> Add to calendar
              </>
            )}
          </button>
          <p className="max-w-[26rem] text-center text-xs tracking-wide text-muted">
            {added
              ? "Demonstration only — the production site adds a real .ics event for Apple, Google and Outlook."
              : `${event.venue.name}, ${event.venue.region} · ${event.venue.addressLines.at(-1)}`}
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}
