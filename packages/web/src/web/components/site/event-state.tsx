import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { EventStage, GuestPhoto, GuestPhotoMoment } from "../../data/event";
import { event } from "../../data/event";

export interface RsvpRecord {
  name: string;
  email: string;
  attending: boolean;
  partySize: number;
  guestNames: string;
  dietary: string[];
  dietaryOther: string;
  accessibility: string;
  message: string;
  submittedAt: string;
}

interface EventStateValue {
  /** Demo-only stage override: before / day / after. */
  stage: EventStage;
  setStage: (s: EventStage) => void;
  /** True stage derived from the real clock (what production would use). */
  actualStage: EventStage;

  rsvp: RsvpRecord | null;
  saveRsvp: (r: Omit<RsvpRecord, "submittedAt">) => void;
  clearRsvp: () => void;

  guestPhotos: GuestPhoto[];
  addGuestPhotos: (
    photos: { src: string; caption?: string; guest: string; moment: GuestPhotoMoment }[],
  ) => void;
}

const RSVP_KEY = "sj-rsvp-demo";
const STAGE_KEY = "sj-stage-demo";

const EventStateContext = createContext<EventStateValue | null>(null);

function deriveStage(now: Date): EventStage {
  const start = new Date(event.startsAt);
  const dayStart = new Date(start);
  dayStart.setHours(0, 0, 0, 0);
  const dayEnd = new Date(start);
  dayEnd.setHours(23, 59, 59, 999);
  if (now < dayStart) return "before";
  if (now <= dayEnd) return "day";
  return "after";
}

export function EventStateProvider({ children }: { children: React.ReactNode }) {
  const actualStage = useMemo(() => deriveStage(new Date()), []);

  const [stage, setStageState] = useState<EventStage>(() => {
    if (typeof window === "undefined") return "before";
    const saved = window.sessionStorage.getItem(STAGE_KEY) as EventStage | null;
    return saved ?? "before";
  });

  const [rsvp, setRsvp] = useState<RsvpRecord | null>(() => {
    if (typeof window === "undefined") return null;
    try {
      const raw = window.localStorage.getItem(RSVP_KEY);
      return raw ? (JSON.parse(raw) as RsvpRecord) : null;
    } catch {
      return null;
    }
  });

  const [guestPhotos, setGuestPhotos] = useState<GuestPhoto[]>(event.guestPhotos.seed);

  const setStage = useCallback((s: EventStage) => {
    setStageState(s);
    try {
      window.sessionStorage.setItem(STAGE_KEY, s);
    } catch {
      /* ignore */
    }
  }, []);

  const saveRsvp = useCallback((r: Omit<RsvpRecord, "submittedAt">) => {
    const record: RsvpRecord = { ...r, submittedAt: new Date().toISOString() };
    setRsvp(record);
    try {
      window.localStorage.setItem(RSVP_KEY, JSON.stringify(record));
    } catch {
      /* prototype only — nothing leaves the browser */
    }
  }, []);

  const clearRsvp = useCallback(() => {
    setRsvp(null);
    try {
      window.localStorage.removeItem(RSVP_KEY);
    } catch {
      /* ignore */
    }
  }, []);

  const addGuestPhotos = useCallback<EventStateValue["addGuestPhotos"]>((photos) => {
    setGuestPhotos((prev) => [
      ...photos.map((p, i) => ({
        id: `local-${Date.now()}-${i}`,
        src: p.src,
        alt: p.caption ? `${p.caption} — shared by ${p.guest}` : `Photo shared by ${p.guest}`,
        guest: p.guest,
        caption: p.caption,
        moment: p.moment,
        local: true,
      })),
      ...prev,
    ]);
  }, []);

  // Revoke object URLs on unmount so the demo doesn't leak memory.
  useEffect(() => {
    return () => {
      for (const p of guestPhotos) {
        if (p.local) URL.revokeObjectURL(p.src);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value = useMemo<EventStateValue>(
    () => ({
      stage,
      setStage,
      actualStage,
      rsvp,
      saveRsvp,
      clearRsvp,
      guestPhotos,
      addGuestPhotos,
    }),
    [stage, setStage, actualStage, rsvp, saveRsvp, clearRsvp, guestPhotos, addGuestPhotos],
  );

  return <EventStateContext.Provider value={value}>{children}</EventStateContext.Provider>;
}

export function useEventState() {
  const ctx = useContext(EventStateContext);
  if (!ctx) throw new Error("useEventState must be used inside EventStateProvider");
  return ctx;
}

/** Live countdown to the event, ticking once a second. */
export function useCountdown(target: string) {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const targetMs = useMemo(() => new Date(target).getTime(), [target]);
  const diff = targetMs - now;
  const passed = diff <= 0;
  const total = Math.max(diff, 0);

  return {
    passed,
    days: Math.floor(total / 86_400_000),
    hours: Math.floor((total % 86_400_000) / 3_600_000),
    minutes: Math.floor((total % 3_600_000) / 60_000),
    seconds: Math.floor((total % 60_000) / 1000),
  };
}
