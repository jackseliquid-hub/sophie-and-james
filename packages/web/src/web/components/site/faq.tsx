import { useId, useState } from "react";
import { event } from "../../data/event";
import { Reveal } from "../ui/reveal";
import { Container, Ornament, Section } from "../ui/section";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  const base = useId();

  return (
    <Section id="faq" tone="ivory" size="md">
      <Container width="narrow">
        <div className="text-center">
          <Reveal className="eyebrow block" as="span">
            Questions
          </Reveal>
          <Reveal delay={80}>
            <h2 className="display-lg mt-6">Anything else?</h2>
          </Reveal>
          <div className="mt-8 flex justify-center">
            <Ornament />
          </div>
        </div>

        <div className="mt-14 border-t border-line sm:mt-18">
          {event.faq.map((item, i) => {
            const isOpen = open === i;
            const panelId = `${base}-panel-${i}`;
            const btnId = `${base}-btn-${i}`;
            return (
              <Reveal key={item.q} delay={Math.min(i, 4) * 60} className="border-b border-line">
                <h3>
                  <button
                    type="button"
                    id={btnId}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-start justify-between gap-6 py-6 text-left transition-colors hover:text-sage-deep"
                  >
                    <span className="font-display text-[1.3rem] leading-snug sm:text-[1.5rem]">
                      {item.q}
                    </span>
                    <span
                      aria-hidden="true"
                      className="relative mt-2 h-3 w-3 shrink-0 text-gold"
                    >
                      <span className="absolute top-1/2 left-0 h-px w-3 bg-current" />
                      <span
                        className="absolute top-1/2 left-0 h-px w-3 bg-current transition-transform duration-500"
                        style={{ transform: isOpen ? "rotate(0deg)" : "rotate(90deg)" }}
                      />
                    </span>
                  </button>
                </h3>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={btnId}
                  hidden={!isOpen}
                  className="grid transition-[grid-template-rows] duration-500 ease-out"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-[38rem] pr-8 pb-7 text-[0.98rem] leading-relaxed text-ink-soft">
                      {item.a}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={120} className="mt-12 text-center">
          <p className="text-[0.95rem] text-ink-soft">
            Still not sure about something? Message either of us — we'd much rather you asked.
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}
