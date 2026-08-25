import { useState } from "react";
import { event } from "../../data/event";
import { Reveal } from "../ui/reveal";
import { Container, Section } from "../ui/section";

const shareText = `${event.title} are getting married — ${event.dateLong}. Here's their invitation:`;

export function ShareInvitation() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(event.url);
    } catch {
      /* clipboard blocked — the link is visible on screen anyway */
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2400);
  };

  return (
    <Section id="share" tone="ivory" size="sm">
      <Container width="narrow">
        <div className="paper px-7 py-12 text-center sm:px-14">
          <Reveal className="eyebrow block" as="span">
            Pass it on
          </Reveal>
          <Reveal delay={80}>
            <h2 className="display-md mt-5">Share this invitation</h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="mx-auto mt-5 max-w-[26rem] text-ink-soft">
              Know someone in our invited party who hasn't seen this yet? Send it their way.
            </p>
          </Reveal>

          <Reveal delay={240}>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <button type="button" onClick={copy} className="btn btn-primary w-full sm:w-auto">
                {copied ? "Link copied" : "Copy link"}
              </button>
              <a
                href={`https://wa.me/?text=${encodeURIComponent(`${shareText} ${event.url}`)}`}
                target="_blank"
                rel="noreferrer noopener"
                className="btn btn-outline w-full sm:w-auto"
              >
                WhatsApp
              </a>
              <a
                href={`mailto:?subject=${encodeURIComponent(
                  `${event.title} — ${event.dateShort}`,
                )}&body=${encodeURIComponent(`${shareText}\n\n${event.url}`)}`}
                className="btn btn-outline w-full sm:w-auto"
              >
                Email
              </a>
            </div>
          </Reveal>

          <Reveal delay={320}>
            <p className="mt-8 font-mono text-[0.72rem] tracking-[0.08em] break-all text-muted">
              {event.url}
            </p>
          </Reveal>
          <span aria-live="polite" className="sr-only">
            {copied ? "Invitation link copied to clipboard" : ""}
          </span>
        </div>
      </Container>
    </Section>
  );
}
