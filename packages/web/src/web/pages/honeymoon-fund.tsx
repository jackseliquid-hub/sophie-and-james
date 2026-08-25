import { useEffect, useState } from "react";
import { Link } from "wouter";
import { Check, Compass } from "lucide-react";
import { event } from "../data/event";
import { PageShell } from "../components/site/page-shell";
import { Container, Ornament, Section } from "../components/ui/section";
import { Reveal } from "../components/ui/reveal";
import { cn } from "../lib/utils";

const STORE_KEY = "sj-honeymoon-demo";

const gbp = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
  maximumFractionDigits: 0,
});

interface Pledge {
  amount: number;
  tier: string | null;
  name: string;
  message: string;
}

function loadPledge(): Pledge | null {
  try {
    const raw = window.localStorage.getItem(STORE_KEY);
    if (!raw) return null;
    const p = JSON.parse(raw);
    return typeof p?.amount === "number" ? (p as Pledge) : null;
  } catch {
    return null;
  }
}

export default function HoneymoonFundPage() {
  const page = event.honeymoonFund;

  const [pledge, setPledge] = useState<Pledge | null>(null);
  const [tier, setTier] = useState<string | null>(null);
  const [custom, setCustom] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setPledge(loadPledge());
  }, []);

  const selectedTier = page.tiers.find((t) => t.id === tier) ?? null;
  const amount = selectedTier ? selectedTier.amount : Number.parseFloat(custom || "0");

  const raised = page.raised + (pledge?.amount ?? 0);
  const pct = Math.min(100, Math.round((raised / page.target) * 100));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!Number.isFinite(amount) || amount < 1) {
      setError("Choose one of the moments above, or enter an amount of £1 or more.");
      return;
    }
    if (!name.trim()) {
      setError("Please add your name so Sophie and James know who to thank.");
      return;
    }
    setError(null);
    const next: Pledge = {
      amount: Math.round(amount),
      tier: selectedTier?.title ?? null,
      name: name.trim(),
      message: message.trim(),
    };
    setPledge(next);
    try {
      window.localStorage.setItem(STORE_KEY, JSON.stringify(next));
    } catch {
      /* private browsing — the demo simply won't persist */
    }
  };

  return (
    <PageShell title={page.eyebrow}>
      {/* ── Masthead ─────────────────────────────────────────────── */}
      <Section tone="none" size="none" className="relative overflow-hidden bg-ink">
        <img
          src={page.image}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover opacity-[0.24]"
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
            <Reveal delay={260}>
              <p className="mt-8 text-[0.7rem] tracking-[0.28em] text-ivory/45 uppercase">
                {page.destination}
              </p>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* ── Progress ─────────────────────────────────────────────── */}
      <Section tone="cream" size="sm">
        <Container width="default">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <p className="font-display text-[2rem] leading-none sm:text-[2.6rem]">
                {gbp.format(raised)}
                <span className="ml-3 font-body text-[0.72rem] tracking-[0.2em] text-muted uppercase">
                  of {gbp.format(page.target)}
                </span>
              </p>
              <p className="text-[0.72rem] tracking-[0.2em] text-muted uppercase">{pct}% pledged</p>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <div
              className="mt-6 h-px w-full bg-line"
              role="progressbar"
              aria-valuenow={pct}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Honeymoon fund progress"
            >
              <div
                className="h-px bg-sage transition-[width] duration-[1200ms] ease-out"
                style={{ width: `${pct}%` }}
              />
            </div>
          </Reveal>
          <Reveal delay={140}>
            <p className="mt-5 text-[0.8rem] text-muted">
              Fictional figures, created for this showcase.
            </p>
          </Reveal>
        </Container>
      </Section>

      {/* ── Itinerary ────────────────────────────────────────────── */}
      <Section tone="ivory" size="md">
        <Container width="wide">
          <Reveal className="eyebrow block" as="span">
            Where it goes
          </Reveal>
          <Reveal delay={80}>
            <h2 className="display-md mt-5 max-w-[30rem]">Two weeks, three stops</h2>
          </Reveal>
          <div className="mt-12 grid gap-px bg-line sm:grid-cols-3">
            {page.itinerary.map((leg, i) => (
              <Reveal key={leg.day} delay={i * 110} className="bg-ivory p-8 sm:p-10">
                <span className="eyebrow text-gold">{leg.day}</span>
                <h3 className="mt-4 font-display text-[1.7rem] leading-snug">{leg.title}</h3>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-soft">{leg.copy}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── Contribute ───────────────────────────────────────────── */}
      <Section tone="cream" size="md" id="contribute">
        <Container width="default">
          {pledge ? (
            <Reveal>
              <div className="paper mx-auto max-w-[38rem] p-9 text-center sm:p-12">
                <Check className="mx-auto h-7 w-7 text-sage" strokeWidth={1.2} />
                <h2 className="display-md mt-6">Thank you, {pledge.name}</h2>
                <p className="lede mt-5">
                  {gbp.format(pledge.amount)}
                  {pledge.tier ? ` towards “${pledge.tier}”` : ""} — noted, and hugely appreciated.
                </p>
                {pledge.message ? (
                  <p className="mt-6 font-display text-[1.3rem] leading-relaxed text-ink-soft italic">
                    “{pledge.message}”
                  </p>
                ) : null}
                <p className="mt-8 text-[0.8rem] leading-relaxed text-muted">
                  In the live version you'd be handed to the couple's payment provider at this
                  point. Nothing has been charged here.
                </p>
                <button
                  type="button"
                  className="btn btn-outline mt-8"
                  onClick={() => {
                    setPledge(null);
                    setTier(null);
                    setCustom("");
                    setName("");
                    setMessage("");
                    try {
                      window.localStorage.removeItem(STORE_KEY);
                    } catch {
                      /* ignore */
                    }
                  }}
                >
                  Start again
                </button>
              </div>
            </Reveal>
          ) : (
            <form onSubmit={submit} noValidate>
              <div className="max-w-[36rem]">
                <Reveal className="eyebrow block" as="span">
                  Choose a moment
                </Reveal>
                <Reveal delay={80}>
                  <h2 className="display-md mt-5">Give us a memory, not a number</h2>
                </Reveal>
                <Reveal delay={150}>
                  <p className="lede mt-5">
                    Pick whichever one makes you smile, or set your own amount. Every pledge goes
                    into the same pot.
                  </p>
                </Reveal>
              </div>

              <fieldset className="mt-12">
                <legend className="sr-only">Contribution amount</legend>
                <div className="grid gap-px bg-line sm:grid-cols-2">
                  {page.tiers.map((t, i) => {
                    const on = tier === t.id;
                    return (
                      <Reveal key={t.id} delay={i * 90} className="bg-cream">
                        <button
                          type="button"
                          aria-pressed={on}
                          onClick={() => {
                            setTier(on ? null : t.id);
                            setCustom("");
                            setError(null);
                          }}
                          className={cn(
                            "flex h-full w-full flex-col items-start p-8 text-left transition-colors duration-300 sm:p-10",
                            on ? "bg-sage-deep text-ivory" : "hover:bg-paper",
                          )}
                        >
                          <span
                            className={cn(
                              "font-display text-[1.9rem] leading-none",
                              on ? "text-ivory" : "text-ink",
                            )}
                          >
                            {gbp.format(t.amount)}
                          </span>
                          <span
                            className={cn(
                              "mt-4 font-display text-[1.4rem] leading-snug",
                              on ? "text-ivory" : "text-ink",
                            )}
                          >
                            {t.title}
                          </span>
                          <span
                            className={cn(
                              "mt-2.5 text-[0.92rem] leading-relaxed",
                              on ? "text-ivory/75" : "text-ink-soft",
                            )}
                          >
                            {t.copy}
                          </span>
                          <span
                            className={cn(
                              "mt-6 text-[0.66rem] tracking-[0.22em] uppercase",
                              on ? "text-ivory/70" : "text-muted",
                            )}
                          >
                            {on ? "Selected" : "Choose this"}
                          </span>
                        </button>
                      </Reveal>
                    );
                  })}
                </div>
              </fieldset>

              <div className="mt-12 grid gap-8 sm:grid-cols-2">
                <Reveal>
                  <label className="field-label" htmlFor="hf-amount">
                    Or your own amount (£)
                  </label>
                  <input
                    id="hf-amount"
                    className="field"
                    inputMode="decimal"
                    value={custom}
                    placeholder="e.g. 40"
                    onChange={(e) => {
                      setCustom(e.target.value);
                      setTier(null);
                      setError(null);
                    }}
                  />
                </Reveal>
                <Reveal delay={90}>
                  <label className="field-label" htmlFor="hf-name">
                    Your name
                  </label>
                  <input
                    id="hf-name"
                    className="field"
                    value={name}
                    autoComplete="name"
                    onChange={(e) => {
                      setName(e.target.value);
                      setError(null);
                    }}
                  />
                </Reveal>
                <Reveal delay={140} className="sm:col-span-2">
                  <label className="field-label" htmlFor="hf-message">
                    A message for Sophie & James (optional)
                  </label>
                  <textarea
                    id="hf-message"
                    className="field min-h-[7rem] resize-y"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </Reveal>
              </div>

              {error ? (
                <p role="alert" className="mt-6 text-[0.9rem] text-ink">
                  {error}
                </p>
              ) : null}

              <Reveal delay={100}>
                <div className="mt-10 flex flex-col gap-5 sm:flex-row sm:items-center">
                  <button type="submit" className="btn btn-primary">
                    Pledge {Number.isFinite(amount) && amount > 0 ? gbp.format(amount) : "a gift"}
                  </button>
                  <p className="max-w-[26rem] text-[0.8rem] leading-relaxed text-muted">
                    No payment is taken — this is a demonstration.
                  </p>
                </div>
              </Reveal>
            </form>
          )}

          <Reveal delay={120}>
            <p className="mt-12 max-w-[44rem] text-[0.8rem] leading-relaxed text-muted">
              {page.demoNote}
            </p>
          </Reveal>
        </Container>
      </Section>

      {/* ── Cross-link ───────────────────────────────────────────── */}
      <Section tone="ivory" size="sm">
        <Container width="narrow" className="text-center">
          <Reveal className="flex justify-center" as="div">
            <Compass className="h-6 w-6 text-gold" strokeWidth={1.2} />
          </Reveal>
          <Reveal delay={80}>
            <h2 className="display-md mt-6">{page.closing.heading}</h2>
          </Reveal>
          <Reveal delay={150}>
            <p className="lede mt-5">{page.closing.copy}</p>
          </Reveal>
          <Reveal delay={220}>
            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row sm:gap-4">
              <Link to="/gift-list" className="btn btn-primary">
                {event.gifts.primaryCta}
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
