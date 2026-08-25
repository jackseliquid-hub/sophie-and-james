import { Car, Clock, ParkingSquare, Train, CarTaxiFront } from "lucide-react";
import type { TravelBlock } from "../../data/event";
import { event } from "../../data/event";
import { Container, Section } from "../ui/section";
import { Reveal } from "../ui/reveal";

const icons: Record<TravelBlock["icon"], typeof Car> = {
  car: Car,
  parking: ParkingSquare,
  taxi: CarTaxiFront,
  train: Train,
  clock: Clock,
};

export function Travel() {
  return (
    <Section id="travel" tone="ivory" size="md">
      <Container width="wide">
        <div className="max-w-[36rem]">
          <Reveal className="eyebrow block" as="span">
            Travel &amp; parking
          </Reveal>
          <Reveal delay={80}>
            <h2 className="display-lg mt-6">Getting there</h2>
          </Reveal>
          <Reveal delay={150}>
            <p className="lede mt-6">
              Woodland Hall is properly rural, which is most of its charm and all of its
              inconvenience. Here's everything you need.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {event.travel.map((block, i) => {
            const Icon = icons[block.icon];
            return (
              <Reveal
                key={block.title}
                delay={i * 90}
                className="flex flex-col bg-ivory px-7 py-9"
              >
                <Icon className="h-5 w-5 text-sage" strokeWidth={1.25} />
                <h3 className="mt-5 font-display text-[1.6rem] leading-snug">{block.title}</h3>
                <ul className="mt-4 space-y-3">
                  {block.lines.map((line) => (
                    <li key={line} className="flex gap-3 text-[0.92rem] leading-relaxed text-ink-soft">
                      <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-taupe" />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            );
          })}

          <Reveal delay={450} className="flex flex-col justify-center bg-cream px-7 py-9">
            <p className="font-display text-[1.6rem] leading-snug">
              Still not sure about something?
            </p>
            <p className="mt-3 text-[0.92rem] leading-relaxed text-ink-soft">
              Ask us anything — we'd genuinely rather answer a question than have you worrying about
              it.
            </p>
            <a href="#faq" className="btn btn-outline mt-6 w-full !min-h-[2.9rem]">
              Read the FAQ
            </a>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
