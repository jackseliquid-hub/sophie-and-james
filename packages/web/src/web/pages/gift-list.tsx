import { useEffect, useMemo, useState } from "react";
import { Link } from "wouter";
import { Check, Gift } from "lucide-react";
import { event } from "../data/event";
import { PageShell } from "../components/site/page-shell";
import { Container, Ornament, Section } from "../components/ui/section";
import { Reveal } from "../components/ui/reveal";
import { cn } from "../lib/utils";

const STORE_KEY = "sj-giftlist-demo";

const gbp = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
  maximumFractionDigits: 0,
});

function loadReserved(): string[] {
  try {
    const raw = window.localStorage.getItem(STORE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((v) => typeof v === "string") : [];
  } catch {
    return [];
  }
}

export default function GiftListPage() {
  const page = event.giftList;
  const [filter, setFilter] = useState<string>("All");
  const [mine, setMine] = useState<string[]>([]);
  const [announce, setAnnounce] = useState("");

  useEffect(() => {
    setMine(loadReserved());
  }, []);

  const persist = (next: string[]) => {
    setMine(next);
    try {
      window.localStorage.setItem(STORE_KEY, JSON.stringify(next));
    } catch {
      /* private browsing — the demo simply won't persist */
    }
  };

  const items = useMemo(
    () => (filter === "All" ? page.items : page.items.filter((i) => i.category === filter)),
    [filter, page.items],
  );

  const claimedCount = page.items.filter((i) => i.reserved || mine.includes(i.id)).length;

  return (
    <PageShell title={page.eyebrow}>
      {/* ── Masthead ─────────────────────────────────────────────── */}
      <Section tone="none" size="none" className="relative overflow-hidden bg-ink">
        <img
          src={page.image}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover opacity-[0.22]"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/75 via-ink/85 to-ink" />
        <Container width="default" className="relative py-24 sm:py-32 lg:py-40">
          <div className="mx-auto max-w-[42rem] text-center">
            <Reveal className="eyebrow block text-taupe" as="span">
              {page.eyebrow}
            </Reveal>
            <Reveal delay={80}>
              <h1 className="display-lg mt-6 text-ivory">{page.heading}</h1>
            </Reveal>
            <div className="mt-8 flex justify-center">
              <Ornament invert />
            </div>
            <Reveal delay={180}>
              <p className="lede mt-8 text-ivory/70">{page.intro}</p>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* ── Filters + list ───────────────────────────────────────── */}
      <Section tone="ivory" size="md">
        <Container width="wide">
          <div className="flex flex-col gap-6 border-b border-line pb-6 sm:flex-row sm:items-end sm:justify-between">
            <Reveal>
              <div className="hide-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
                {["All", ...page.categories].map((c) => (
                  <button
                    key={c}
                    type="button"
                    className="chip shrink-0"
                    data-on={filter === c}
                    aria-pressed={filter === c}
                    onClick={() => setFilter(c)}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </Reveal>
            <Reveal delay={80}>
              <p className="text-[0.72rem] tracking-[0.18em] text-muted uppercase">
                {claimedCount} of {page.items.length} reserved
              </p>
            </Reveal>
          </div>

          <ul className="mt-2 divide-y divide-line">
            {items.map((item, i) => {
              const reservedByMe = mine.includes(item.id);
              const taken = item.reserved || reservedByMe;
              return (
                <Reveal as="li" key={item.id} delay={Math.min(i, 6) * 70}>
                  <div
                    className={cn(
                      "flex flex-col gap-5 py-8 sm:flex-row sm:items-center sm:gap-10",
                      item.reserved && "opacity-55",
                    )}
                  >
                    <div className="min-w-0 flex-1">
                      <span className="eyebrow">{item.category}</span>
                      <h2 className="mt-2.5 font-display text-[1.6rem] leading-snug sm:text-[1.85rem]">
                        {item.name}
                      </h2>
                      <p className="mt-2 max-w-[38rem] text-[0.95rem] leading-relaxed text-ink-soft">
                        {item.note}
                      </p>
                      <p className="mt-3 text-[0.72rem] tracking-[0.18em] text-muted uppercase">
                        {item.from}
                      </p>
                    </div>

                    <div className="flex shrink-0 items-center justify-between gap-6 sm:w-[15rem] sm:justify-end">
                      <span className="font-display text-[1.5rem] text-ink">
                        {gbp.format(item.price)}
                      </span>

                      {item.reserved ? (
                        <span className="inline-flex items-center gap-2 text-[0.68rem] tracking-[0.2em] text-muted uppercase">
                          <Check className="h-3.5 w-3.5" strokeWidth={1.5} /> Reserved
                        </span>
                      ) : (
                        <button
                          type="button"
                          className={cn("btn", reservedByMe ? "btn-sage" : "btn-outline")}
                          aria-pressed={reservedByMe}
                          onClick={() => {
                            const next = reservedByMe
                              ? mine.filter((id) => id !== item.id)
                              : [...mine, item.id];
                            persist(next);
                            setAnnounce(
                              reservedByMe
                                ? `${item.name} released.`
                                : `${item.name} reserved for you.`,
                            );
                          }}
                        >
                          {reservedByMe ? (
                            <>
                              <Check className="mr-2 inline h-3.5 w-3.5" strokeWidth={1.5} />
                              Reserved by you
                            </>
                          ) : (
                            "Reserve this"
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </ul>

          <p aria-live="polite" className="sr-only">
            {announce}
          </p>

          {mine.length > 0 ? (
            <Reveal>
              <div className="mt-10 flex flex-col gap-4 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-[0.95rem] text-ink-soft">
                  You've reserved {mine.length} {mine.length === 1 ? "gift" : "gifts"}. In the live
                  version this is where you'd be taken to the shop to pay.
                </p>
                <button
                  type="button"
                  className="btn btn-outline shrink-0"
                  onClick={() => {
                    persist([]);
                    setAnnounce("All your reservations have been cleared.");
                  }}
                >
                  Clear my reservations
                </button>
              </div>
            </Reveal>
          ) : null}

          <Reveal delay={100}>
            <p className="mt-10 max-w-[44rem] text-[0.8rem] leading-relaxed tracking-[0.02em] text-muted">
              {page.demoNote}
            </p>
          </Reveal>
        </Container>
      </Section>

      {/* ── Cross-link ───────────────────────────────────────────── */}
      <Section tone="cream" size="sm">
        <Container width="narrow" className="text-center">
          <Reveal className="flex justify-center" as="div">
            <Gift className="h-6 w-6 text-gold" strokeWidth={1.2} />
          </Reveal>
          <Reveal delay={80}>
            <h2 className="display-md mt-6">{page.closing.heading}</h2>
          </Reveal>
          <Reveal delay={150}>
            <p className="lede mt-5">{page.closing.copy}</p>
          </Reveal>
          <Reveal delay={220}>
            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row sm:gap-4">
              <Link to="/honeymoon-fund" className="btn btn-primary">
                {event.gifts.secondaryCta}
              </Link>
              <Link to="/" className="btn btn-outline">
                Back to the invitation
              </Link>
            </div>
          </Reveal>
        </Container>
      </Section>
    </PageShell>
  );
}
