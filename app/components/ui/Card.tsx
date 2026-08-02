import type { HTMLAttributes, ReactNode } from "react";

export type CardProps = HTMLAttributes<HTMLDivElement> & {
  children?: ReactNode;
};

/** Conteneur de contenu au fond `surface`, bordé et aux coins arrondis. */
export function Card({ className, children, ...props }: CardProps) {
  const classes = ["rounded-2xl border border-border bg-surface p-6", className].filter(Boolean).join(" ");

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
}
