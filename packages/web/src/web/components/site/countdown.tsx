import { useEffect, useRef } from "react";
import { event } from "../../data/event";
import { Container, Section } from "../ui/section";
import { Reveal } from "../ui/reveal";
import { useCountdown, useEventState } from "./event-state";

function Unit({ value, label }: { value: number; label: string }) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const prev = useRef(value);

  useEffect(() => {
    if (prev.current === value) return;
    prev.current = value;
    const el = ref.current;
    if (!el) return;
    el.classList.remove("tick");
    // force reflow so the animation restarts
    void el.offsetWidth;
    el.classList.add("tick");
  }, [value]);

  return (
    <div className="flex flex-1 flex-col items-center">
      <span
        ref={ref}
        className="block font-display text-[clamp(2.6rem,13vw,5.5rem)] leading-none tabular-nums"
      >
        {String(value).padStart(2, "0")}
      </span>
      <span className="eyebrow mt-3 text-[0.6rem] text-ivory/50 sm:text-[0.65rem]">{label}</span>
    </div>
  );
}

export function Countdown() {
  const { stage } = useEventState();
  const { days, hours, minutes, seconds } = useCountdown(event.startsAt);

  const isDay = stage === "day";
  const isAfter = stage === "after";

  return (
    <Section tone="ink" size="md" ariaLabel="Countdown" className="grain overflow-hidden">
      <Container width="default">
        {isDay || isAfter ? (
          <div className="mx-auto max-w-[38rem] text-center">
            <Reveal className="eyebrow block text-taupe" as="span">
              {isDay ? event.dateLong : "The day itself"}
            </Reveal>
            <Reveal delay={100}>
              <p className="display-md mt-6 text-ivory">
                {isDay ? event.countdown.arrivedTitle : event.countdown.afterTitle}
              </p>
            </Reveal>
            <Reveal delay={200}>
              <p className="lede mt-6 text-ivory/70">
                {isDay ? event.countdown.arrivedCopy : event.countdown.afterCopy}
              </p>
            </Reveal>
            <Reveal delay={300}>
              <div className="mt-10 flex justify-center">
                <a
                  href={isDay ? "#the-day" : "#share-photos"}
                  className="btn btn-light"
                >
                  {isDay ? "Today's schedule" : "Share your photos"}
                </a>
              </div>
            </Reveal>
          </div>
        ) : (
          <div className="text-center">
            <Reveal className="eyebrow block text-taupe" as="span">
              {event.countdown.label}
            </Reveal>

            <Reveal delay={120}>
              <div className="mx-auto mt-10 flex max-w-[46rem] items-start text-ivory">
                <Unit value={days} label="Days" />
                <span className="pt-1 font-display text-3xl text-ivory/20 sm:text-5xl">·</span>
                <Unit value={hours} label="Hours" />
                <span className="pt-1 font-display text-3xl text-ivory/20 sm:text-5xl">·</span>
                <Unit value={minutes} label="Minutes" />
                <span className="pt-1 font-display text-3xl text-ivory/20 sm:text-5xl">·</span>
                <Unit value={seconds} label="Seconds" />
              </div>
            </Reveal>

            <Reveal delay={260}>
              <p className="mt-12 font-display text-xl text-ivory/70 sm:text-2xl">
                {event.dateLong} · {event.venue.name}
              </p>
            </Reveal>
          </div>
        )}
      </Container>
    </Section>
  );
}
