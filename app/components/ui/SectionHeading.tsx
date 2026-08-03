import type { ReactNode } from "react";

export type SectionHeadingProps = {
  title: ReactNode;
  subtitle?: ReactNode;
  /** Alignement du texte (par défaut centré). */
  align?: "left" | "center";
  /** Niveau du titre. `h1` pour le titre principal d'une page, `h2` sinon (défaut). */
  as?: "h1" | "h2";
  className?: string;
};

/** En-tête de section : titre en serif + sous-titre optionnel. */
export function SectionHeading({ title, subtitle, align = "center", as: Tag = "h2", className }: SectionHeadingProps) {
  const alignClasses = align === "center" ? "text-center items-center" : "text-left items-start";
  const classes = ["flex flex-col gap-3", alignClasses, className].filter(Boolean).join(" ");

  return (
    <div className={classes}>
      <Tag className="font-serif text-3xl font-semibold text-navy sm:text-4xl">{title}</Tag>
      {subtitle && <p className="max-w-2xl text-base text-ink/70">{subtitle}</p>}
    </div>
  );
}
