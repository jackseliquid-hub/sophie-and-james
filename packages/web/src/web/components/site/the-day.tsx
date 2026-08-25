import { event } from "../../data/event";
import { Container, Section } from "../ui/section";
import { Reveal } from "../ui/reveal";
import { useEventState } from "./event-state";

export function TheDay() {
  const { stage } = useEventState();
  const isDay = stage === "day";

  return (
    <Section id="the-day" tone="ink" size="lg" className="grain overflow-hidden">
      <Container width="default">
        <div className="text-center">
          <Reveal className="eyebrow block text-taupe" as="span">
            {isDay ? "Today" : "The Day"}
          </Reveal>
          <Reveal delay={80}>
            <h2 className="display-lg mt-6 text-ivory">
              {isDay ? "Today's schedule" : "How the day unfolds"}
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="lede mt-6 text-ivory/60">
              {isDay
                ? "Everything is running to plan. Here's where we'll be and when."
                : "A rough shape for the day, so you know when to arrive and when to find the dance floor."}
            </p>
          </Reveal>
        </div>

        <ol className="relative mx-auto mt-16 max-w-[42rem]">
          {/* the line */}
          <span
            aria-hidden="true"
            className="absolute top-2 bottom-2 left-[5.75rem] w-px bg-ivory/15 sm:left-[7.5rem]"
          />

          {event.schedule.map((item, i) => (
            <li key={item.title}>
              <Reveal delay={i * 90} className="relative flex gap-6 pb-11 sm:gap-9">
                <span className="w-[4.5rem] shrink-0 pt-1 text-right font-display text-lg leading-none whitespace-nowrap text-ivory sm:w-[6rem] sm:text-2xl">
                  {item.time}
                </span>

                <span className="relative mt-1.5 flex w-3 shrink-0 justify-center">
                  <span className="relative z-10 h-2 w-2 rounded-full bg-taupe ring-4 ring-ink" />
                </span>

                <span className="block flex-1 pt-0.5">
                  <span className="block font-display text-2xl text-ivory sm:text-[1.75rem]">
                    {item.title}
                  </span>
                  {item.note ? (
                    <span className="mt-2 block max-w-[26rem] text-[0.95rem] leading-relaxed text-ivory/55">
                      {item.note}
                    </span>
                  ) : null}
                </span>
              </Reveal>
            </li>
          ))}
        </ol>

        <Reveal delay={120} className="mt-4 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <a href="#venue" className="btn btn-light w-full sm:w-auto">
            Venue &amp; directions
          </a>
          {!isDay ? (
            <a href="#rsvp" className="btn btn-solid-light w-full sm:w-auto">
              RSVP
            </a>
          ) : null}
        </Reveal>
      </Container>
    </Section>
  );
}
