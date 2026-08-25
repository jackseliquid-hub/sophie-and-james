import { Link } from "wouter";
import { event } from "../../data/event";
import { Container, Ornament, Section } from "../ui/section";
import { Reveal } from "../ui/reveal";

export function Gifts() {
  return (
    <Section id="gifts" tone="ink" size="md" className="grain relative overflow-hidden">
      {/* soft photographic wash */}
      <img
        src="/images/details-table.jpg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover opacity-[0.16]"
        loading="lazy"
        decoding="async"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/85 to-ink" />

      <Container width="default" className="relative">
        <div className="mx-auto max-w-[40rem] text-center">
          <Reveal className="eyebrow block text-taupe" as="span">
            Gifts
          </Reveal>
          <Reveal delay={80}>
            <h2 className="display-lg mt-6 text-ivory">{event.gifts.heading}</h2>
          </Reveal>
          <div className="mt-8 flex justify-center">
            <Ornament invert />
          </div>
          <Reveal delay={180}>
            <p className="lede mt-8 text-ivory/70">{event.gifts.copy}</p>
          </Reveal>
          <Reveal delay={280}>
            <div className="mt-11 flex flex-col gap-3 sm:flex-row sm:justify-center sm:gap-4">
              <Link to="/gift-list" className="btn btn-solid-light">
                {event.gifts.primaryCta}
              </Link>
              <Link to="/honeymoon-fund" className="btn btn-light">
                {event.gifts.secondaryCta}
              </Link>
            </div>
          </Reveal>
          <Reveal delay={360}>
            <p className="mt-7 text-[0.68rem] tracking-[0.2em] text-ivory/35 uppercase">
              Demo links — these point to the couple's registry in the production site
            </p>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
