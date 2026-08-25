import { event } from "../../data/event";
import { Reveal } from "../ui/reveal";
import { Container, Section } from "../ui/section";

/** The "Share your photos" pitch that leads into the uploader and the guest gallery. */
export function PhotoShareIntro() {
  return (
    <Section tone="none" size="none" className="relative isolate overflow-hidden bg-ink">
      <img
        src="/images/guest-sparklers.jpg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover opacity-30"
        loading="lazy"
        decoding="async"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/85 via-ink/70 to-ink/90" />

      <Container width="default" className="relative py-24 sm:py-32 lg:py-40">
        <div className="mx-auto max-w-[40rem] text-center">
          <Reveal className="eyebrow block text-taupe" as="span">
            Guest photography
          </Reveal>
          <Reveal delay={80}>
            <h2 className="display-lg mt-6 text-ivory">{event.guestPhotos.heading}</h2>
          </Reveal>
          <Reveal delay={180}>
            <p className="lede mt-7 text-ivory/70">{event.guestPhotos.copy}</p>
          </Reveal>
          <Reveal delay={280}>
            <div className="mt-11 flex flex-col gap-3 sm:flex-row sm:justify-center sm:gap-4">
              <a href="#share-photos" className="btn btn-solid-light">
                Upload your photos
              </a>
              <a href="#photos" className="btn btn-light">
                View guest photos
              </a>
            </div>
          </Reveal>
          <Reveal delay={360}>
            <p className="mt-8 text-[0.8rem] text-ivory/45">{event.guestPhotos.privacyNote}</p>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
