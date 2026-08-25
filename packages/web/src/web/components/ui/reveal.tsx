import type { ElementType, ReactNode } from "react";
import { useReveal } from "../../hooks/use-reveal";
import { cn } from "../../lib/utils";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** ms */
  delay?: number;
  as?: ElementType;
  /** Image-style clip reveal instead of fade-and-rise. */
  variant?: "rise" | "image";
}

export function Reveal({
  children,
  className,
  delay = 0,
  as: Tag = "div",
  variant = "rise",
}: RevealProps) {
  const ref = useReveal<HTMLElement>();
  const attr = variant === "image" ? { "data-reveal-image": "out" } : { "data-reveal": "out" };

  return (
    <Tag
      ref={ref}
      className={cn(className)}
      style={{ "--reveal-delay": `${delay}ms` } as React.CSSProperties}
      {...attr}
    >
      {children}
    </Tag>
  );
}
