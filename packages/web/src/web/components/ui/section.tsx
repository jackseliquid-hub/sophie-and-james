import type { ReactNode } from "react";
import { cn } from "../../lib/utils";
import { Reveal } from "./reveal";

interface SectionProps {
  id?: string;
  children: ReactNode;
  className?: string;
  /** Background treatment. */
  tone?: "ivory" | "cream" | "ink" | "none";
  /** Vertical rhythm. */
  size?: "none" | "sm" | "md" | "lg";
  ariaLabel?: string;
}

const pad = {
  sm: "py-14 sm:py-20",
  md: "py-20 sm:py-28 lg:py-36",
  lg: "py-24 sm:py-36 lg:py-44",
};

const tones = {
  ivory: "bg-ivory text-ink",
  cream: "bg-cream text-ink",
  ink: "bg-ink text-ivory",
  none: "",
};

export function Section({
  id,
  children,
  className,
  tone = "ivory",
  size = "md",
  ariaLabel,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-label={ariaLabel}
      className={cn("relative", tones[tone], pad[size], className)}
    >
      {children}
    </section>
  );
}

export function Container({
  children,
  className,
  width = "default",
}: {
  children: ReactNode;
  className?: string;
  width?: "narrow" | "default" | "wide" | "full";
}) {
  const widths = {
    narrow: "max-w-[46rem]",
    default: "max-w-[70rem]",
    wide: "max-w-[86rem]",
    full: "max-w-none",
  };
  return (
    <div className={cn("mx-auto w-full px-6 sm:px-8 lg:px-12", widths[width], className)}>
      {children}
    </div>
  );
}

interface HeadingProps {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
  invert?: boolean;
  className?: string;
  /** Renders as h2 by default. */
  level?: "h1" | "h2" | "h3";
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "center",
  invert = false,
  className,
  level = "h2",
}: HeadingProps) {
  const Tag = level;
  return (
    <div
      className={cn(
        align === "center" ? "mx-auto max-w-[42rem] text-center" : "max-w-[42rem]",
        className,
      )}
    >
      {eyebrow ? (
        <Reveal
          className={cn("eyebrow mb-5 block", invert && "text-taupe")}
          as="span"
        >
          {eyebrow}
        </Reveal>
      ) : null}
      <Reveal delay={80}>
        <Tag className={cn("display-lg", invert ? "text-ivory" : "text-ink")}>{title}</Tag>
      </Reveal>
      {intro ? (
        <Reveal delay={160}>
          <p className={cn("lede mt-6", invert && "text-ivory/70")}>{intro}</p>
        </Reveal>
      ) : null}
    </div>
  );
}

export function Ornament({ invert = false }: { invert?: boolean }) {
  return (
    <Reveal className="flex items-center justify-center gap-3" delay={60}>
      <span
        className={cn(
          "h-px w-10",
          invert ? "bg-ivory/30" : "bg-[rgba(34,34,31,0.18)]",
        )}
      />
      <span className={cn("text-[0.6rem] tracking-[0.4em]", invert ? "text-gold" : "text-gold")}>
        ✦
      </span>
      <span
        className={cn(
          "h-px w-10",
          invert ? "bg-ivory/30" : "bg-[rgba(34,34,31,0.18)]",
        )}
      />
    </Reveal>
  );
}
