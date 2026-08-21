import { useState } from "react";
import { Link } from "react-router";
import type { Route } from "./+types/realisations";
import { buildMeta, canonical } from "~/seo/meta";
import { breadcrumbSchema } from "~/seo/schema";
import { projects } from "~/data/projects";
import { services, getService } from "~/data/services";
import { SectionHeading } from "~/components/ui/SectionHeading";
import { Card } from "~/components/ui/Card";
import { Breadcrumbs } from "~/components/ui/Breadcrumbs";
import { Reveal } from "~/components/sections/Reveal";
import { CtaBand } from "~/components/sections/CtaBand";

export function meta(_: Route.MetaArgs) {
  return [
    ...buildMeta({
      title: "Nos réalisations — Chantiers à Kinshasa | Mode Kin",
      description:
        "Découvrez les réalisations de Mode Kin à Kinshasa : rénovations, décoration, carrelage, habillage mur TV et menuiserie. Des chantiers qui illustrent notre savoir-faire.",
      path: "/realisations",
    }),
    {
      "script:ld+json": breadcrumbSchema([
        { name: "Accueil", path: "/" },
        { name: "Réalisations", path: "/realisations" },
      ]),
    },
  ];
}

export const links = () => [canonical("/realisations")];

// Catégories réellement présentes dans les projets.
const categories = services.filter((s) => projects.some((p) => p.category === s.slug));

export default function Realisations() {
  const [filter, setFilter] = useState<string>("all");
  const visible = filter === "all" ? projects : projects.filter((p) => p.category === filter);

  return (
    <>
      <div className="mx-auto max-w-6xl px-6 pt-8 sm:px-8">
        <Breadcrumbs
          items={[
            { name: "Accueil", path: "/" },
            { name: "Réalisations", path: "/realisations" },
          ]}
        />
      </div>

      <section className="bg-bg py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-6 sm:px-8">
          <SectionHeading
            as="h1"
            title="Nos réalisations"
            subtitle="Un aperçu de nos chantiers récents à Kinshasa, du premier croquis à la livraison."
          />

          {/* Filtre par catégorie */}
          <div className="mt-8 flex flex-wrap justify-center gap-2" role="group" aria-label="Filtrer par catégorie">
            <FilterButton active={filter === "all"} onClick={() => setFilter("all")}>
              Tous
            </FilterButton>
            {categories.map((c) => (
              <FilterButton key={c.slug} active={filter === c.slug} onClick={() => setFilter(c.slug)}>
                {c.title}
              </FilterButton>
            ))}
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((p, i) => {
              const service = getService(p.category);
              return (
                <Reveal key={p.slug} delay={i * 0.04}>
                  <Link to={`/realisations/${p.slug}`} className="group block h-full">
                    <Card className="h-full overflow-hidden p-0">
                      <img
                        src={p.images[0].src}
                        alt={p.images[0].alt}
                        width={p.images[0].width}
                        height={p.images[0].height}
                        loading="lazy"
                        className="aspect-[3/2] w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                      />
                      <div className="p-5">
                        {service && <p className="text-xs font-medium uppercase tracking-wide text-gold">{service.title}</p>}
                        <h2 className="mt-1 font-serif text-lg font-semibold text-navy">{p.title}</h2>
                        <p className="mt-1 text-sm text-ink/60">{p.location}</p>
                      </div>
                    </Card>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}

function FilterButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={[
        "min-h-11 rounded-full px-4 py-2 text-sm font-medium transition-colors",
        active ? "bg-navy text-white" : "bg-surface text-navy border border-border hover:bg-muted",
      ].join(" ")}
    >
      {children}
    </button>
  );
}
