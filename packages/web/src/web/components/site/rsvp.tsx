import { useEffect, useRef, useState } from "react";
import { Check, Loader2, Lock, PartyPopper, Pencil } from "lucide-react";
import { event } from "../../data/event";
import { Container, Ornament, Section } from "../ui/section";
import { Reveal } from "../ui/reveal";
import { cn } from "../../lib/utils";
import { useEventState } from "./event-state";

type Answer = "accept" | "decline" | null;

interface FormState {
  name: string;
  email: string;
  answer: Answer;
  partySize: number;
  guestNames: string;
  dietary: string[];
  dietaryOther: string;
  accessibility: string;
  message: string;
}

const initial: FormState = {
  name: "",
  email: "",
  answer: null,
  partySize: 1,
  guestNames: "",
  dietary: [],
  dietaryOther: "",
  accessibility: "",
  message: "",
};

/** Persistent status card shown once an RSVP exists. */
function RsvpStatus({ onEdit }: { onEdit: () => void }) {
  const { rsvp } = useEventState();
  if (!rsvp) return null;

  return (
    <Reveal className="paper relative mx-auto max-w-[34rem] px-7 py-10 text-center sm:px-12 sm:py-12">
      <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />

      <span
        className={cn(
          "mx-auto flex h-12 w-12 items-center justify-center rounded-full",
          rsvp.attending ? "bg-sage/15 text-sage-deep" : "bg-[rgba(169,154,133,0.18)] text-taupe",
        )}
      >
        {rsvp.attending ? (
          <Check className="h-5 w-5" strokeWidth={1.5} />
        ) : (
          <Pencil className="h-4 w-4" strokeWidth={1.5} />
        )}
      </span>

      <p className="eyebrow mt-6">RSVP received</p>
      <p className="mt-5 font-display text-3xl leading-tight sm:text-4xl">
        {rsvp.attending ? "You're coming!" : "Thank you for letting us know"}
      </p>

      <div className="mt-8 divide-y divide-line border-y border-line text-left">
        <Row label="Guest" value={rsvp.name} />
        <Row
          label="Response"
          value={rsvp.attending ? "Happily accepts" : "Sadly declines"}
        />
        {rsvp.attending ? (
          <Row label="Party" value={`${rsvp.partySize} ${rsvp.partySize === 1 ? "guest" : "guests"}`} />
        ) : null}
        {rsvp.attending && rsvp.dietary.length ? (
          <Row label="Dietary" value={rsvp.dietary.join(", ")} />
        ) : null}
        <Row label="Event" value={`${event.title} · ${event.dateShort}`} />
      </div>

      <div className="mt-8 flex flex-col items-center gap-4">
        <button type="button" onClick={onEdit} className="btn btn-outline w-full sm:w-auto">
          Change your response
        </button>
        <p className="flex items-center gap-2 text-[0.7rem] tracking-[0.14em] text-muted uppercase">
          <Lock className="h-3 w-3" strokeWidth={1.5} /> Demonstration only — stored in this browser
        </p>
      </div>
    </Reveal>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-6 py-3.5">
      <span className="text-[0.68rem] tracking-[0.2em] text-muted uppercase">{label}</span>
      <span className="text-right text-[0.95rem] text-ink">{value}</span>
    </div>
  );
}

export function Rsvp() {
  const { rsvp, saveRsvp, stage } = useEventState();
  const [form, setForm] = useState<FormState>(initial);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState<"accept" | "decline" | null>(null);
  const [editing, setEditing] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const confirmRef = useRef<HTMLDivElement | null>(null);

  const showStatus = rsvp && !editing && !done;

  useEffect(() => {
    if (done && confirmRef.current) {
      // The form is much taller than its confirmation, so the page collapses under the reader.
      // Bring the confirmation back to them, then move focus for screen readers.
      confirmRef.current.scrollIntoView({ block: "center", behavior: "smooth" });
      confirmRef.current.focus({ preventScroll: true });
    }
  }, [done]);

  function set<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => {
      if (!e[key as string]) return e;
      const next = { ...e };
      delete next[key as string];
      return next;
    });
  }

  function toggleDietary(option: string) {
    setForm((f) => ({
      ...f,
      dietary: f.dietary.includes(option)
        ? f.dietary.filter((d) => d !== option)
        : [...f.dietary, option],
    }));
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const next: Record<string, string> = {};
    if (!form.name.trim()) next.name = "Please tell us your name.";
    if (!form.email.trim()) next.email = "We need an email to confirm your RSVP.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
      next.email = "That email doesn't look quite right.";
    if (!form.answer) next.answer = "Please let us know if you can make it.";

    setErrors(next);
    if (Object.keys(next).length) return;

    setSubmitting(true);
    // Simulated request — nothing leaves the browser in this prototype.
    window.setTimeout(() => {
      const attending = form.answer === "accept";
      saveRsvp({
        name: form.name.trim(),
        email: form.email.trim(),
        attending,
        partySize: attending ? form.partySize : 0,
        guestNames: form.guestNames.trim(),
        dietary: attending
          ? form.dietary.map((d) => (d === "Other" && form.dietaryOther ? form.dietaryOther : d))
          : [],
        dietaryOther: form.dietaryOther.trim(),
        accessibility: form.accessibility.trim(),
        message: form.message.trim(),
      });
      setSubmitting(false);
      setEditing(false);
      setDone(attending ? "accept" : "decline");
    }, 900);
  }

  return (
    <Section id="rsvp" tone="cream" size="lg">
      <Container width="default">
        <div className="text-center">
          <Reveal className="eyebrow block" as="span">
            RSVP
          </Reveal>
          <Reveal delay={80}>
            <h2 className="display-lg mt-6">
              {stage === "after" ? "Thank you for being there" : event.rsvp.heading}
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="lede mx-auto mt-6 max-w-[34rem]">
              {stage === "after"
                ? "RSVPs are closed — the day has been and gone, and it was wonderful."
                : event.rsvp.copy}
            </p>
          </Reveal>
          {stage !== "after" ? (
            <Reveal delay={220}>
              <p className="mt-4 text-[0.72rem] tracking-[0.2em] text-taupe uppercase">
                {event.rsvp.deadline}
              </p>
            </Reveal>
          ) : null}
          <div className="mt-9 flex justify-center">
            <Ornament />
          </div>
        </div>

        <div className="mt-14">
          {done ? (
            <div
              ref={confirmRef}
              tabIndex={-1}
              className="paper relative mx-auto max-w-[36rem] px-7 py-14 text-center outline-none sm:px-14"
            >
              <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
              <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-sage/12 text-sage-deep fade-up">
                {done === "accept" ? (
                  <PartyPopper className="h-6 w-6" strokeWidth={1.25} />
                ) : (
                  <Check className="h-6 w-6" strokeWidth={1.25} />
                )}
              </span>

              <p
                className="display-md mt-8 fade-up"
                style={{ animationDelay: "120ms" }}
              >
                {done === "accept" ? "Thank you!" : "Thank you for letting us know"}
              </p>
              <p
                className="lede mx-auto mt-5 max-w-[26rem] fade-up"
                style={{ animationDelay: "240ms" }}
              >
                {done === "accept"
                  ? "We can't wait to celebrate with you."
                  : "We're sorry you won't be able to join us, but thank you for letting us know."}
              </p>

              <p
                className="mt-8 font-display text-2xl text-taupe italic fade-up"
                style={{ animationDelay: "340ms" }}
              >
                {event.title}
              </p>
              <p
                className="eyebrow mt-2 fade-up"
                style={{ animationDelay: "400ms" }}
              >
                {event.dateShort} · {event.venue.name}
              </p>

              <div
                className="mt-10 flex flex-col gap-3 fade-up sm:flex-row sm:justify-center"
                style={{ animationDelay: "480ms" }}
              >
                <button
                  type="button"
                  onClick={() => setDone(null)}
                  className="btn btn-outline"
                >
                  View your RSVP
                </button>
                {done === "accept" ? (
                  <a href="#stay" className="btn btn-primary">
                    Where to stay
                  </a>
                ) : (
                  <a href="#photos" className="btn btn-primary">
                    See the photos
                  </a>
                )}
              </div>
            </div>
          ) : showStatus ? (
            <RsvpStatus
              onEdit={() => {
                setEditing(true);
                setForm({
                  ...initial,
                  name: rsvp.name,
                  email: rsvp.email,
                  answer: rsvp.attending ? "accept" : "decline",
                  partySize: Math.max(rsvp.partySize, 1),
                  guestNames: rsvp.guestNames,
                  dietary: rsvp.dietary,
                  accessibility: rsvp.accessibility,
                  message: rsvp.message,
                });
              }}
            />
          ) : (
            <Reveal className="paper relative mx-auto max-w-[42rem] px-6 py-10 sm:px-12 sm:py-14">
              <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />

              <form onSubmit={submit} noValidate className="space-y-10">
                <div className="grid gap-8 sm:grid-cols-2">
                  <div>
                    <label className="field-label" htmlFor="rsvp-name">
                      Your name
                    </label>
                    <input
                      id="rsvp-name"
                      className="field"
                      value={form.name}
                      onChange={(e) => set("name", e.target.value)}
                      placeholder="Charlotte Ainsworth"
                      autoComplete="name"
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? "rsvp-name-error" : undefined}
                    />
                    {errors.name ? (
                      <p id="rsvp-name-error" className="mt-2 text-xs text-[#a8544b]">
                        {errors.name}
                      </p>
                    ) : null}
                  </div>

                  <div>
                    <label className="field-label" htmlFor="rsvp-email">
                      Email address
                    </label>
                    <input
                      id="rsvp-email"
                      type="email"
                      className="field"
                      value={form.email}
                      onChange={(e) => set("email", e.target.value)}
                      placeholder="you@example.com"
                      autoComplete="email"
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? "rsvp-email-error" : undefined}
                    />
                    {errors.email ? (
                      <p id="rsvp-email-error" className="mt-2 text-xs text-[#a8544b]">
                        {errors.email}
                      </p>
                    ) : null}
                  </div>
                </div>

                <fieldset>
                  <legend className="field-label">Will you be joining us?</legend>
                  <div className="mt-1 grid gap-3 sm:grid-cols-2">
                    {(
                      [
                        { value: "accept", label: "Happily accept" },
                        { value: "decline", label: "Sadly decline" },
                      ] as const
                    ).map((opt) => {
                      const on = form.answer === opt.value;
                      return (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => set("answer", opt.value)}
                          aria-pressed={on}
                          className={cn(
                            "flex min-h-[3.5rem] items-center justify-center border px-5 text-[0.8rem] tracking-[0.16em] uppercase transition-all duration-300",
                            on
                              ? "border-ink bg-ink text-ivory"
                              : "border-[rgba(34,34,31,0.2)] text-ink-soft hover:border-ink",
                          )}
                        >
                          {opt.label}
                        </button>
                      );
                    })}
                  </div>
                  {errors.answer ? (
                    <p className="mt-3 text-xs text-[#a8544b]">{errors.answer}</p>
                  ) : null}
                </fieldset>

                {/* Shown by default so guests can see what we'll ask for — party size, dietary
                    requirements, access needs — and only folded away if they decline. */}
                <div
                  className={cn(
                    "grid overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
                    form.answer === "decline"
                      ? "grid-rows-[0fr] opacity-0"
                      : "grid-rows-[1fr] opacity-100",
                  )}
                  aria-hidden={form.answer === "decline"}
                >
                  <div className="min-h-0 space-y-10">
                    <div className="grid gap-8 pt-1 sm:grid-cols-2">
                      <div>
                        <label className="field-label" htmlFor="rsvp-party">
                          Number of guests
                        </label>
                        <select
                          id="rsvp-party"
                          className="field"
                          value={form.partySize}
                          onChange={(e) => set("partySize", Number(e.target.value))}
                        >
                          {Array.from({ length: event.rsvp.maxGuests }).map((_, i) => (
                            <option key={i} value={i + 1}>
                              {i + 1} {i === 0 ? "guest" : "guests"}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="field-label" htmlFor="rsvp-guests">
                          Guest names
                        </label>
                        <input
                          id="rsvp-guests"
                          className="field"
                          value={form.guestNames}
                          onChange={(e) => set("guestNames", e.target.value)}
                          placeholder="Who's coming with you?"
                        />
                      </div>
                    </div>

                    <fieldset>
                      <legend className="field-label">Dietary requirements</legend>
                      <p className="mt-2 text-[0.82rem] leading-relaxed text-ink-soft">
                        Every course has a vegetarian, vegan and gluten-free alternative. Tick
                        anything that applies and the kitchen will take care of it.
                      </p>
                      <div className="mt-4 flex flex-wrap gap-2.5">
                        {event.rsvp.dietaryOptions.map((option) => (
                          <button
                            key={option}
                            type="button"
                            className="chip"
                            data-on={form.dietary.includes(option)}
                            aria-pressed={form.dietary.includes(option)}
                            onClick={() => toggleDietary(option)}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                      <div
                        className={cn(
                          "grid overflow-hidden transition-all duration-500",
                          form.dietary.includes("Other")
                            ? "mt-6 grid-rows-[1fr] opacity-100"
                            : "grid-rows-[0fr] opacity-0",
                        )}
                      >
                        <div className="min-h-0">
                          <label className="field-label" htmlFor="rsvp-diet-other">
                            Tell us more
                          </label>
                          <input
                            id="rsvp-diet-other"
                            className="field"
                            value={form.dietaryOther}
                            onChange={(e) => set("dietaryOther", e.target.value)}
                            placeholder="Anything the kitchen should know"
                          />
                        </div>
                      </div>
                    </fieldset>

                    <div>
                      <label className="field-label" htmlFor="rsvp-access">
                        Accessibility requirements
                      </label>
                      <input
                        id="rsvp-access"
                        className="field"
                        value={form.accessibility}
                        onChange={(e) => set("accessibility", e.target.value)}
                        placeholder="Step-free access, seating, hearing loop…"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="field-label" htmlFor="rsvp-message">
                    Message for {event.title}
                  </label>
                  <textarea
                    id="rsvp-message"
                    className="field"
                    rows={3}
                    value={form.message}
                    onChange={(e) => set("message", e.target.value)}
                    placeholder="Say hello, or tell us your song request"
                  />
                </div>

                <div className="flex flex-col gap-5">
                  <button type="submit" className="btn btn-sage w-full" disabled={submitting}>
                    {submitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" strokeWidth={1.5} /> Sending
                      </>
                    ) : (
                      "Submit RSVP"
                    )}
                  </button>
                  <p className="flex items-center justify-center gap-2 text-center text-[0.68rem] tracking-[0.14em] text-muted uppercase">
                    <Lock className="h-3 w-3" strokeWidth={1.5} /> Prototype — nothing is sent or
                    stored outside this browser
                  </p>
                </div>
              </form>
            </Reveal>
          )}
        </div>
      </Container>
    </Section>
  );
}
