import { event } from "../../data/event";
import { Container, Section } from "../ui/section";
import { Reveal } from "../ui/reveal";
import { cn } from "../../lib/utils";

export function Story() {
  return (
    <Section id="story" tone="ivory" size="lg">
      <Container width="wide">
        <div className="max-w-[40rem]">
          <Reveal className="eyebrow block" as="span">
            Our Story
          </Reveal>
          <Reveal delay={80}>
            <h2 className="display-lg mt-6">Seven years, more or less</h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="lede mt-6">
              The short version, for anyone who's arrived late — which, to be fair, is usually James.
            </p>
          </Reveal>
        </div>

        <div className="mt-20 space-y-24 sm:space-y-32">
          {event.story.map((chapter, i) => {
            const flip = i % 2 === 1;
            return (
              <article
                key={chapter.year}
                className="grid items-center gap-8 lg:grid-cols-12 lg:gap-16"
              >
                <Reveal
                  variant="image"
                  className={cn(
                    "relative overflow-hidden lg:col-span-6",
                    flip ? "lg:order-2 lg:col-start-7" : "lg:col-start-1",
                  )}
                >
                  <img
                    src={chapter.image}
                    alt={chapter.alt}
                    className="aspect-4/5 w-full object-cover sm:aspect-3/2 lg:aspect-4/5"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="grain absolute inset-0" />
                </Reveal>

                <div
                  className={cn(
                    "lg:col-span-5",
                    flip ? "lg:order-1 lg:col-start-2" : "lg:col-start-8",
                  )}
                >
                  <Reveal delay={100}>
                    <span className="block font-display text-[clamp(3.5rem,14vw,6rem)] leading-none text-taupe/45">
                      {chapter.year}
                    </span>
                  </Reveal>
                  <Reveal delay={180}>
                    <h3 className="display-md mt-3">{chapter.title}</h3>
                  </Reveal>
                  <Reveal delay={260}>
                    <p className="lede mt-5 max-w-[32rem]">{chapter.copy}</p>
                  </Reveal>
                </div>
              </article>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
