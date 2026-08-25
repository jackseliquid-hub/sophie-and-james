import { useState } from "react";
import { event } from "../../data/event";
import { cn } from "../../lib/utils";
import { Lightbox } from "../ui/lightbox";
import { Reveal } from "../ui/reveal";
import { Container, Ornament, Section } from "../ui/section";

/** Editorial mosaic — deliberately not a uniform card grid. */
const spans: Record<string, string> = {
  tall: "sm:col-span-1 sm:row-span-2 aspect-[3/4]",
  wide: "sm:col-span-2 aspect-[16/10]",
  square: "sm:col-span-1 aspect-square",
};

export function Gallery() {
  const [open, setOpen] = useState<number | null>(null);
  const items = event.gallery.map((g) => ({
    src: g.src,
    alt: g.alt,
    caption: g.caption,
  }));

  return (
    <Section id="gallery" tone="ivory" size="md">
      <Container width="wide">
        <div className="text-center">
          <Reveal className="eyebrow block" as="span">
            Gallery
          </Reveal>
          <Reveal delay={80}>
            <h2 className="display-lg mt-6">Our Favourite Moments</h2>
          </Reveal>
          <div className="mt-8 flex justify-center">
            <Ornament />
          </div>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-3 sm:mt-20 sm:grid-cols-3 sm:gap-4">
          {event.gallery.map((img, i) => (
            <Reveal
              key={img.src + i}
              delay={(i % 3) * 90}
              variant="image"
              className={cn("group relative overflow-hidden", spans[img.shape])}
            >
              <button
                type="button"
                onClick={() => setOpen(i)}
                className="absolute inset-0 h-full w-full cursor-zoom-in"
                aria-label={`View photo: ${img.caption ?? img.alt}`}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.05]"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                {img.caption ? (
                  <span className="absolute bottom-0 left-0 w-full translate-y-2 px-5 pb-5 text-left font-display text-[1rem] leading-snug text-ivory italic opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    {img.caption}
                  </span>
                ) : null}
              </button>
            </Reveal>
          ))}
        </div>
      </Container>

      <Lightbox items={items} index={open} onClose={() => setOpen(null)} onIndex={setOpen} />
    </Section>
  );
}
