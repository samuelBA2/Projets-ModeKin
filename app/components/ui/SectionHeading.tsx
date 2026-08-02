import type { ReactNode } from "react";

export type SectionHeadingProps = {
  title: ReactNode;
  subtitle?: ReactNode;
  /** Alignement du texte (par défaut centré). */
  align?: "left" | "center";
  className?: string;
};

/** En-tête de section : titre en serif + sous-titre optionnel. */
export function SectionHeading({ title, subtitle, align = "center", className }: SectionHeadingProps) {
  const alignClasses = align === "center" ? "text-center items-center" : "text-left items-start";
  const classes = ["flex flex-col gap-3", alignClasses, className].filter(Boolean).join(" ");

  return (
    <div className={classes}>
      <h2 className="font-serif text-3xl font-semibold text-navy sm:text-4xl">{title}</h2>
      {subtitle && <p className="max-w-2xl text-base text-ink/70">{subtitle}</p>}
    </div>
  );
}
