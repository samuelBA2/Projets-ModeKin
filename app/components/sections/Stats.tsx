import { SITE } from "~/data/site.config";
import { Reveal } from "./Reveal";

/** Grille des chiffres clés de l'entreprise (`SITE.stats`). */
export function Stats() {
  return (
    <section className="bg-surface py-16">
      <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 px-6 text-center sm:grid-cols-3 sm:px-8">
        {SITE.stats.map((stat, index) => (
          <Reveal key={stat.label} delay={index * 0.1}>
            <p className="font-serif text-4xl font-semibold text-navy sm:text-5xl">{stat.value}</p>
            <p className="mt-2 text-sm text-ink/70">{stat.label}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
