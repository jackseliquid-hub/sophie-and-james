import { useCallback, useEffect, useRef, useState } from "react";
import type { GuestPhotoMoment } from "../../data/event";
import { cn } from "../../lib/utils";
import { Reveal } from "../ui/reveal";
import { Container, Section } from "../ui/section";
import { useEventState } from "./event-state";

interface Draft {
  id: string;
  url: string;
  name: string;
}

const moments: { value: GuestPhotoMoment; label: string }[] = [
  { value: "before", label: "Before the ceremony" },
  { value: "ceremony", label: "Ceremony" },
  { value: "reception", label: "Reception" },
  { value: "evening", label: "Evening" },
];

export function PhotoUpload() {
  const { addGuestPhotos } = useEventState();
  const inputRef = useRef<HTMLInputElement>(null);
  const [drafts, setDrafts] = useState<Draft[]>([]);
  const [guest, setGuest] = useState("");
  const [caption, setCaption] = useState("");
  const [moment, setMoment] = useState<GuestPhotoMoment>("reception");
  const [dragging, setDragging] = useState(false);
  const [state, setState] = useState<"idle" | "uploading" | "done">("idle");
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const accept = useCallback((files: FileList | null) => {
    if (!files) return;
    const images = Array.from(files).filter((f) => f.type.startsWith("image/"));
    if (images.length === 0) {
      setError("Those files don't look like photos — please choose JPG, PNG or HEIC images.");
      return;
    }
    setError(null);
    setState("idle");
    setDrafts((prev) => [
      ...prev,
      ...images.slice(0, 8).map((f, i) => ({
        id: `${Date.now()}-${i}-${f.name}`,
        url: URL.createObjectURL(f),
        name: f.name,
      })),
    ]);
  }, []);

  const removeDraft = (id: string) => {
    setDrafts((prev) => {
      const hit = prev.find((d) => d.id === id);
      if (hit) URL.revokeObjectURL(hit.url);
      return prev.filter((d) => d.id !== id);
    });
  };

  // Simulated upload — in production this is a signed upload to secure storage.
  useEffect(() => {
    if (state !== "uploading") return;
    const id = window.setInterval(() => {
      setProgress((p) => {
        if (p >= 100) return 100;
        return Math.min(100, p + 7 + Math.random() * 9);
      });
    }, 90);
    return () => window.clearInterval(id);
  }, [state]);

  useEffect(() => {
    if (state === "uploading" && progress >= 100) {
      const t = window.setTimeout(() => {
        addGuestPhotos(
          drafts.map((d) => ({
            src: d.url,
            caption: caption.trim() || undefined,
            guest: guest.trim() || "A guest",
            moment,
          })),
        );
        setState("done");
        setDrafts([]);
      }, 420);
      return () => window.clearTimeout(t);
    }
  }, [state, progress, drafts, caption, guest, moment, addGuestPhotos]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (drafts.length === 0) {
      setError("Choose at least one photo first.");
      return;
    }
    if (!guest.trim()) {
      setError("Please add your name so everyone knows who to thank.");
      return;
    }
    setError(null);
    setProgress(0);
    setState("uploading");
  };

  const reset = () => {
    setState("idle");
    setProgress(0);
    setCaption("");
  };

  return (
    <Section id="share-photos" tone="ivory" size="md">
      <Container width="default">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <Reveal className="eyebrow block" as="span">
              Upload
            </Reveal>
            <Reveal delay={80}>
              <h2 className="display-md mt-6">Share your moments</h2>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-6 max-w-[24rem] text-ink-soft">
                Have a photo from the day that you'd love everyone to see? Add it to the wedding
                gallery.
              </p>
            </Reveal>
            <Reveal delay={240}>
              <p className="mt-7 max-w-[24rem] border-t border-line pt-6 text-[0.8rem] leading-relaxed text-muted">
                Prototype note: photos you add stay in this browser session only. Nothing is
                uploaded anywhere — the production version connects to secure private storage.
              </p>
            </Reveal>
          </div>

          <div>
            {state === "done" ? (
              <div className="paper fade-up px-7 py-14 text-center sm:px-12">
                <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-gold/40 text-gold">
                  <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor">
                    <path d="M4 12.5l5 5L20 6.5" strokeWidth="1.1" />
                  </svg>
                </span>
                <h3 className="display-md mt-8">Thank you!</h3>
                <p className="mt-4 text-ink-soft">
                  Your photos have been added to the wedding gallery.
                </p>
                <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
                  <a href="#photos" className="btn btn-primary">
                    View guest photos
                  </a>
                  <button type="button" className="btn btn-outline" onClick={reset}>
                    Add more
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={submit} className="paper px-6 py-8 sm:px-10 sm:py-10">
                {/* drop zone */}
                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                    setDragging(true);
                  }}
                  onDragLeave={() => setDragging(false)}
                  onDrop={(e) => {
                    e.preventDefault();
                    setDragging(false);
                    accept(e.dataTransfer.files);
                  }}
                  className={cn(
                    "flex flex-col items-center justify-center border border-dashed px-6 py-12 text-center transition-colors duration-300",
                    dragging ? "border-sage bg-sage/8" : "border-[rgba(34,34,31,0.22)]",
                  )}
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-8 w-8 text-taupe"
                    fill="none"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M12 16V4m0 0L7.5 8.5M12 4l4.5 4.5" strokeWidth="1" />
                    <path d="M4 15v3.5A1.5 1.5 0 005.5 20h13a1.5 1.5 0 001.5-1.5V15" strokeWidth="1" />
                  </svg>
                  <p className="mt-5 font-display text-[1.3rem] leading-snug">
                    Drag &amp; drop your photos here
                  </p>
                  <p className="mt-2 text-[0.85rem] text-muted">JPG, PNG or HEIC — up to 8 at once</p>
                  <button
                    type="button"
                    onClick={() => inputRef.current?.click()}
                    className="btn btn-outline mt-7"
                  >
                    Choose photos
                  </button>
                  <input
                    ref={inputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    className="sr-only"
                    onChange={(e) => {
                      accept(e.target.files);
                      e.target.value = "";
                    }}
                  />
                </div>

                {drafts.length > 0 ? (
                  <div className="mt-7">
                    <span className="field-label">
                      {drafts.length} photo{drafts.length > 1 ? "s" : ""} selected
                    </span>
                    <ul className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                      {drafts.map((d) => (
                        <li key={d.id} className="group relative aspect-square overflow-hidden">
                          <img src={d.url} alt={d.name} className="h-full w-full object-cover" />
                          <button
                            type="button"
                            onClick={() => removeDraft(d.id)}
                            aria-label={`Remove ${d.name}`}
                            className="absolute top-1 right-1 flex h-7 w-7 items-center justify-center bg-ink/70 text-ivory opacity-0 transition-opacity group-hover:opacity-100 focus-visible:opacity-100"
                          >
                            <svg
                              viewBox="0 0 24 24"
                              className="h-3.5 w-3.5"
                              fill="none"
                              stroke="currentColor"
                            >
                              <path d="M5 5l14 14M19 5L5 19" strokeWidth="1.4" />
                            </svg>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                <div className="mt-8 grid gap-7 sm:grid-cols-2">
                  <div>
                    <label className="field-label" htmlFor="up-name">
                      Your name
                    </label>
                    <input
                      id="up-name"
                      className="field"
                      value={guest}
                      onChange={(e) => setGuest(e.target.value)}
                      placeholder="Priya Raman"
                      autoComplete="name"
                    />
                  </div>
                  <div>
                    <label className="field-label" htmlFor="up-moment">
                      When was it taken?
                    </label>
                    <select
                      id="up-moment"
                      className="field"
                      value={moment}
                      onChange={(e) => setMoment(e.target.value as GuestPhotoMoment)}
                    >
                      {moments.map((m) => (
                        <option key={m.value} value={m.value}>
                          {m.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="mt-7">
                  <label className="field-label" htmlFor="up-caption">
                    Caption <span className="normal-case">(optional)</span>
                  </label>
                  <input
                    id="up-caption"
                    className="field"
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                    placeholder="Uncle Rob peaked at 10:40 PM"
                    maxLength={90}
                  />
                </div>

                {error ? (
                  <p className="mt-6 text-[0.85rem] text-[#9a4a3c]" role="alert">
                    {error}
                  </p>
                ) : null}

                {state === "uploading" ? (
                  <div className="mt-8" aria-live="polite">
                    <div className="flex items-baseline justify-between">
                      <span className="eyebrow">Uploading</span>
                      <span className="font-display text-[1.1rem] text-ink-soft">
                        {Math.round(progress)}%
                      </span>
                    </div>
                    <div className="mt-3 h-px w-full bg-line">
                      <div
                        className="h-px bg-sage transition-[width] duration-150 ease-linear"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="mt-9 flex flex-wrap items-center gap-4">
                    <button type="submit" className="btn btn-sage">
                      Upload photos
                    </button>
                    <span className="text-[0.8rem] text-muted">
                      Visible to invited guests only
                    </span>
                  </div>
                )}
              </form>
            )}
          </div>
        </div>
      </Container>
    </Section>
  );
}
