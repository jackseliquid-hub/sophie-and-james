import { MapPin, Navigation } from "lucide-react";
import { event } from "../../data/event";
import { Container, Section } from "../ui/section";
import { Reveal } from "../ui/reveal";

/** Static, stylised map treatment — no Maps API needed for the prototype. */
function StaticMap() {
  return (
    <div className="relative aspect-4/3 w-full overflow-hidden bg-cream sm:aspect-16/10">
      <svg
        aria-hidden="true"
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 400 260"
        preserveAspectRatio="xMidYMid slice"
      >
        <rect width="400" height="260" fill="#F1EADE" />
        {/* fields */}
        <path d="M0 0h150v90H0z" fill="#E8E2D2" />
        <path d="M250 30h150v110H250z" fill="#E5E4D2" />
        <path d="M40 160h130v100H40z" fill="#E8E6D8" />
        {/* woodland */}
        <path d="M255 150h145v110H255z" fill="#DDE2D5" />
        <g fill="#C6CFBC">
          {Array.from({ length: 26 }).map((_, i) => (
            <circle
              key={i}
              cx={265 + ((i * 37) % 130)}
              cy={162 + ((i * 53) % 88)}
              r={5 + ((i * 7) % 4)}
            />
          ))}
        </g>
        {/* river */}
        <path
          d="M-10 210C60 200 90 176 150 186s86 40 150 26 120-40 120-40"
          stroke="#C9D3D8"
          strokeWidth="9"
          fill="none"
        />
        {/* roads */}
        <path d="M-10 118H410" stroke="#FFFDF9" strokeWidth="11" />
        <path d="M-10 118H410" stroke="#E2D9C6" strokeWidth="1" />
        <path d="M196 -10c8 60-30 90-24 150s52 90 52 130" stroke="#FFFDF9" strokeWidth="7" />
        <path d="M300 118c0 40 8 70 30 100" stroke="#FFFDF9" strokeWidth="5" />
        {/* beech avenue to the hall */}
        <path d="M225 118c14 22 26 30 40 36" stroke="#EFE7D6" strokeWidth="4" />
        <text
          x="18"
          y="112"
          fill="#8B887E"
          fontFamily="Jost, sans-serif"
          fontSize="8"
          letterSpacing="2"
        >
          HARROWBY LANE
        </text>
        <text
          x="300"
          y="240"
          fill="#8B887E"
          fontFamily="Jost, sans-serif"
          fontSize="8"
          letterSpacing="2"
        >
          ELLERBY WOOD
        </text>
        <text
          x="52"
          y="196"
          fill="#8B887E"
          fontFamily="Jost, sans-serif"
          fontSize="8"
          letterSpacing="2"
        >
          ELLERBY GREEN
        </text>
        {/* venue pin */}
        <g transform="translate(265 154)">
          <circle r="26" fill="#7C8B76" opacity="0.16" className="drift" />
          <circle r="7" fill="#22221F" />
          <circle r="2.4" fill="#FAF7F1" />
        </g>
        <text
          x="282"
          y="150"
          fill="#22221F"
          fontFamily="Cormorant Garamond, serif"
          fontSize="15"
        >
          Woodland Hall
        </text>
      </svg>
      <div className="pointer-events-none absolute inset-0 border border-line" />
      <div className="absolute bottom-3 left-3 bg-ink/85 px-3 py-1.5 text-[0.6rem] tracking-[0.2em] text-ivory/90 uppercase">
        Illustrative map
      </div>
    </div>
  );
}

export function Venue() {
  const directions = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    event.venue.mapsQuery,
  )}`;
  const mapLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    event.venue.mapsQuery,
  )}`;

  return (
    <Section id="venue" tone="ivory" size="lg">
      {/* full-bleed venue photograph */}
      <Reveal variant="image" className="relative mb-14 sm:mb-20">
        <div className="relative h-[58vh] min-h-[22rem] w-full overflow-hidden sm:h-[72vh]">
          <img
            src={event.venue.image}
            alt={event.venue.imageAlt}
            className="h-full w-full object-cover"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />
          <div className="grain absolute inset-0" />
          <div className="absolute inset-x-0 bottom-0 px-6 pb-10 text-center sm:pb-14">
            <span className="eyebrow text-ivory/70">The Venue</span>
            <h2 className="display-lg mt-4 text-ivory">{event.venue.name}</h2>
            <p className="mt-3 font-display text-xl text-ivory/80 italic sm:text-2xl">
              {event.venue.region}
            </p>
          </div>
        </div>
      </Reveal>

      <Container width="wide">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="lede">{event.venue.blurb}</p>
            </Reveal>

            <Reveal delay={120} className="mt-10">
              <span className="eyebrow">Where to find us</span>
              <address className="mt-4 font-display text-2xl leading-snug not-italic sm:text-[1.75rem]">
                {event.venue.addressLines.map((l) => (
                  <span key={l} className="block">
                    {l}
                  </span>
                ))}
              </address>
              <p className="mt-4 text-sm tracking-wide text-muted">
                what3words {event.venue.what3words}
              </p>
            </Reveal>

            <Reveal delay={200} className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href={directions}
                target="_blank"
                rel="noreferrer"
                className="btn btn-primary flex-1"
              >
                <Navigation className="h-4 w-4" strokeWidth={1.5} /> Get directions
              </a>
              <a
                href={mapLink}
                target="_blank"
                rel="noreferrer"
                className="btn btn-outline flex-1"
              >
                <MapPin className="h-4 w-4" strokeWidth={1.5} /> View map
              </a>
            </Reveal>

            <Reveal delay={280} className="mt-12 divide-y divide-line border-y border-line">
              {event.keyMoments.map((m) => (
                <div key={m.label} className="flex items-baseline justify-between py-4">
                  <span className="text-sm tracking-[0.12em] text-ink-soft uppercase">
                    {m.label}
                  </span>
                  <span className="font-display text-2xl">{m.time}</span>
                </div>
              ))}
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal variant="image">
              <StaticMap />
            </Reveal>
            <div className="mt-6 grid grid-cols-2 gap-4 sm:gap-6">
              <Reveal variant="image" delay={120} className="overflow-hidden">
                <img
                  src={event.venue.detailImage}
                  alt={event.venue.detailImageAlt}
                  className="aspect-4/3 w-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </Reveal>
              <Reveal variant="image" delay={220} className="overflow-hidden">
                <img
                  src="/images/reception-lights.jpg"
                  alt="Long dining tables under strings of festoon lights at Woodland Hall"
                  className="aspect-4/3 w-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </Reveal>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
