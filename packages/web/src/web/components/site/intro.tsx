import { event } from "../../data/event";
import { Container, Section } from "../ui/section";
import { Reveal } from "../ui/reveal";
import { useEventState } from "./event-state";

export function Intro() {
  const { stage } = useEventState();

  const heading =
    stage === "day"
      ? "Today's the day!"
      : stage === "after"
        ? "Thank you for celebrating with us"
        : event.intro.heading;

  const paragraphs =
    stage === "day"
      ? [
          "We're getting married today. Everything you need is below — timings, the venue, and where to find us.",
          "Please arrive by 1:30 PM. We can't wait to see you.",
        ]
      : stage === "after"
        ? [
            "We're married. Thank you for travelling, for dancing, for the speeches and for every single photograph.",
            "Add yours to the gallery below so we can all relive the day together.",
          ]
        : event.intro.paragraphs;

  return (
    <Section id="intro" tone="ivory" size="lg">
      <Container width="wide">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6 lg:col-start-1">
            <Reveal className="eyebrow block" as="span">
              {event.dateLong} · {event.venue.name}
            </Reveal>

            <Reveal delay={90}>
              <h2 className="display-lg mt-6">{heading}</h2>
            </Reveal>

            <div className="mt-8 space-y-6">
              {paragraphs.map((p, i) => (
                <Reveal key={p} delay={180 + i * 90}>
                  <p className="lede max-w-[34rem]">{p}</p>
                </Reveal>
              ))}
            </div>

            <Reveal delay={420}>
              <p className="mt-9 font-display text-3xl text-taupe italic">
                {event.intro.signature}
              </p>
            </Reveal>

            <Reveal delay={500}>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:gap-4">
                {stage === "after" ? (
                  <>
                    <a href="#photos" className="btn btn-primary">
                      View the photos
                    </a>
                    <a href="#share-photos" className="btn btn-outline">
                      Add your photos
                    </a>
                  </>
                ) : (
                  <>
                    <a href="#rsvp" className="btn btn-primary">
                      RSVP
                    </a>
                    <a href="#the-day" className="btn btn-outline">
                      See the day
                    </a>
                  </>
                )}
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-5 lg:col-start-8">
            <Reveal variant="image" className="relative overflow-hidden">
              <img
                src={event.intro.image}
                alt={event.intro.imageAlt}
                className="aspect-4/5 w-full object-cover"
                loading="lazy"
                decoding="async"
              />
              <div className="grain absolute inset-0" />
            </Reveal>
            <Reveal delay={200}>
              <p className="mt-4 text-xs tracking-[0.18em] text-muted uppercase">
                Photographed in the walled garden, April 2026
              </p>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}
