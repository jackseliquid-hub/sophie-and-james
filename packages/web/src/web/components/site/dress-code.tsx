import { event } from "../../data/event";
import { Container, Section } from "../ui/section";
import { Reveal } from "../ui/reveal";

export function DressCode() {
  return (
    <Section id="dress-code" tone="ivory" size="md">
      <Container width="wide">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
          <Reveal
            variant="image"
            className="relative overflow-hidden lg:col-span-5 lg:col-start-1"
          >
            <img
              src={event.dressCode.image}
              alt={event.dressCode.imageAlt}
              className="aspect-3/2 w-full object-cover lg:aspect-4/5"
              loading="lazy"
              decoding="async"
            />
            <div className="grain absolute inset-0" />
          </Reveal>

          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal className="eyebrow block" as="span">
              Dress code
            </Reveal>
            <Reveal delay={80}>
              <h2 className="display-lg mt-6">{event.dressCode.heading}</h2>
            </Reveal>
            <Reveal delay={150}>
              <p className="mt-7 font-display text-3xl text-sage-deep italic sm:text-4xl">
                {event.dressCode.label}
              </p>
            </Reveal>
            <Reveal delay={220}>
              <p className="lede mt-5 max-w-[32rem]">{event.dressCode.copy}</p>
            </Reveal>

            <ul className="mt-9 divide-y divide-line border-y border-line">
              {event.dressCode.notes.map((note, i) => (
                <Reveal key={note} delay={280 + i * 70} as="li" className="py-4">
                  <span className="flex gap-4">
                    <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-taupe" />
                    <span className="text-[0.98rem] text-ink-soft">{note}</span>
                  </span>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </Section>
  );
}
