import type { ReactNode } from "react";
import { Breadcrumbs } from "~/components/ui/Breadcrumbs";

type LegalLayoutProps = {
  title: string;
  /** Date de dernière mise à jour, format lisible (ex. « 1er août 2026 »). */
  updatedAt: string;
  path: string;
  children: ReactNode;
};

/**
 * Gabarit des pages légales : largeur de lecture confortable (mesure de
 * 65–75 caractères), titre, date de mise à jour et fil d'Ariane.
 */
export function LegalLayout({ title, updatedAt, path, children }: LegalLayoutProps) {
  return (
    <>
      <div className="mx-auto max-w-3xl px-6 pt-8 sm:px-8">
        <Breadcrumbs
          items={[
            { name: "Accueil", path: "/" },
            { name: title, path },
          ]}
        />
      </div>
      <section className="py-10 sm:py-14">
        <div className="mx-auto max-w-[68ch] px-6 sm:px-8">
          <h1 className="font-serif text-3xl font-semibold text-navy sm:text-4xl">{title}</h1>
          <p className="mt-2 text-sm text-ink/60">Dernière mise à jour : {updatedAt}</p>
          <div className="prose-legal mt-8 space-y-6 text-ink/80 [&_h2]:mt-8 [&_h2]:font-serif [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-navy [&_p]:leading-relaxed [&_ul]:list-disc [&_ul]:pl-6">
            {children}
          </div>
        </div>
      </section>
    </>
  );
}
