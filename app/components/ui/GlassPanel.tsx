import type { HTMLAttributes, ReactNode } from "react";

export type GlassPanelProps = HTMLAttributes<HTMLDivElement> & {
  children?: ReactNode;
};

/**
 * Panneau translucide à effet verre dépoli (`backdrop-blur`).
 * Usage ciblé : superposition sur image, bandeau flottant, etc.
 */
export function GlassPanel({ className, children, ...props }: GlassPanelProps) {
  const classes = ["rounded-2xl border border-surface/40 bg-surface/70 backdrop-blur-md", className]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
}
