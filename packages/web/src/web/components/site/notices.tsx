import { event } from "../../data/event";
import { Reveal } from "../ui/reveal";
import { Container, Section } from "../ui/section";

export function Notices() {
  return (
    <Section id="notices" tone="cream" size="md">
      <Container width="default">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div>
            <Reveal className="eyebrow block" as="span">
              Good to know
            </Reveal>
            <Reveal delay={80}>
              <h2 className="display-md mt-6">A few things to know</h2>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-6 max-w-[26rem] text-ink-soft">
                Anything important we need to tell you will appear here, so it's worth a look again
                closer to the day.
              </p>
            </Reveal>
          </div>

          <ol className="grid gap-px bg-line">
            {event.notices.map((n, i) => (
              <Reveal
                key={n.title}
                delay={i * 90}
                as="li"
                className="bg-cream px-0 py-7 sm:px-7"
              >
                <div className="flex gap-5 sm:gap-7">
                  <span className="font-display text-[1.35rem] leading-none text-gold/80">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-display text-[1.4rem] leading-tight text-ink">{n.title}</h3>
                    <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-soft">{n.copy}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </Container>
    </Section>
  );
}
