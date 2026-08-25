import { useMemo, useState } from "react";
import type { GuestPhotoMoment } from "../../data/event";
import { event } from "../../data/event";
import { Lightbox } from "../ui/lightbox";
import { Reveal } from "../ui/reveal";
import { Container, Section } from "../ui/section";
import { useEventState } from "./event-state";

type Filter = "all" | GuestPhotoMoment;

const filters: { value: Filter; label: string }[] = [
  { value: "all", label: "Everything" },
  { value: "before", label: "Before the ceremony" },
  { value: "ceremony", label: "Ceremony" },
  { value: "reception", label: "Reception" },
  { value: "evening", label: "Evening" },
];

export function GuestGallery() {
  const { guestPhotos } = useEventState();
  const [filter, setFilter] = useState<Filter>("all");
  const [open, setOpen] = useState<number | null>(null);

  const shown = useMemo(
    () => (filter === "all" ? guestPhotos : guestPhotos.filter((p) => p.moment === filter)),
    [guestPhotos, filter],
  );

  const items = shown.map((p) => ({
    src: p.src,
    alt: p.alt,
    caption: p.caption,
    credit: p.guest,
  }));

  return (
    <Section id="photos" tone="cream" size="md">
      <Container width="wide">
        <div className="flex flex-col gap-8 border-b border-line pb-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Reveal className="eyebrow block" as="span">
              Shared by you
            </Reveal>
            <Reveal delay={80}>
              <h2 className="display-lg mt-5">Guest Photos</h2>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-5 max-w-[32rem] text-ink-soft">
                {event.guestPhotos.privacyNote} Every photo here was added by someone who was in the
                room with us.
              </p>
            </Reveal>
          </div>
          <Reveal delay={200} className="shrink-0">
            <a href="#share-photos" className="btn btn-outline">
              Add your photos
            </a>
          </Reveal>
        </div>

        <div
          className="hide-scrollbar mt-8 flex gap-2 overflow-x-auto pb-1"
          role="group"
          aria-label="Filter guest photos"
        >
          {filters.map((f) => {
            const count =
              f.value === "all"
                ? guestPhotos.length
                : guestPhotos.filter((p) => p.moment === f.value).length;
            return (
              <button
                key={f.value}
                type="button"
                className="chip shrink-0"
                data-on={filter === f.value}
                aria-pressed={filter === f.value}
                onClick={() => {
                  setFilter(f.value);
                  setOpen(null);
                }}
              >
                {f.label}
                <span className="text-[0.7rem] opacity-60">{count}</span>
              </button>
            );
          })}
        </div>

        {shown.length === 0 ? (
          <p className="py-24 text-center font-display text-[1.6rem] text-muted italic">
            Nothing here yet — be the first to share a photo from this part of the day.
          </p>
        ) : (
          <ul className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
            {shown.map((p, i) => (
              <Reveal
                key={p.id}
                as="li"
                delay={(i % 4) * 70}
                className="group relative bg-paper p-2 pb-0 shadow-[0_1px_0_rgba(34,34,31,0.06)]"
              >
                <button
                  type="button"
                  onClick={() => setOpen(i)}
                  className="block w-full cursor-zoom-in text-left"
                  aria-label={`View photo by ${p.guest}`}
                >
                  <span className="relative block aspect-square overflow-hidden">
                    <img
                      src={p.src}
                      alt={p.alt}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition-transform duration-[1100ms] ease-out group-hover:scale-[1.05]"
                    />
                    {p.local ? (
                      <span className="absolute top-2 left-2 bg-sage px-2 py-1 text-[0.6rem] tracking-[0.2em] text-white uppercase">
                        Just added
                      </span>
                    ) : null}
                  </span>
                  <span className="block px-1 py-4">
                    {p.caption ? (
                      <span className="block font-display text-[1.05rem] leading-snug text-ink italic">
                        {p.caption}
                      </span>
                    ) : null}
                    <span className="mt-2 block text-[0.62rem] tracking-[0.28em] text-muted uppercase">
                      {p.guest}
                    </span>
                  </span>
                </button>
              </Reveal>
            ))}
          </ul>
        )}

        <Reveal delay={100}>
          <p className="mt-12 border-t border-line pt-8 text-center text-[0.8rem] leading-relaxed text-muted">
            Prototype: this gallery is a demonstration. Photos added here live only in your browser
            for this session — the production version stores them privately for invited guests, with
            the couple able to remove anything they'd rather not keep.
          </p>
        </Reveal>
      </Container>

      <Lightbox items={items} index={open} onClose={() => setOpen(null)} onIndex={setOpen} />
    </Section>
  );
}
