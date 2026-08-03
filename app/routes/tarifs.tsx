import { Check } from "lucide-react";
import type { Route } from "./+types/tarifs";
import { buildMeta, canonical } from "~/seo/meta";
import { breadcrumbSchema } from "~/seo/schema";
import { pricingTiers } from "~/data/pricing";
import { Button } from "~/components/ui/Button";
import { Breadcrumbs } from "~/components/ui/Breadcrumbs";
import { SectionHeading } from "~/components/ui/SectionHeading";
import { Reveal } from "~/components/sections/Reveal";
import { CtaBand } from "~/components/sections/CtaBand";

export function meta(_: Route.MetaArgs) {
  return [
    ...buildMeta({
      title: "Tarifs — Nos offres | Mode Kin",
      description:
        "Découvrez les offres de Mode Kin à Kinshasa : Diagnostic, Standard, Premium et Entreprise. Des prix indicatifs, ajustés selon votre projet réel. Demandez un devis.",
      path: "/tarifs",
    }),
    {
      "script:ld+json": breadcrumbSchema([
        { name: "Accueil", path: "/" },
        { name: "Tarifs", path: "/tarifs" },
      ]),
    },
  ];
}

export const links = () => [canonical("/tarifs")];

export default function Tarifs() {
  return (
    <>
      <div className="mx-auto max-w-6xl px-6 pt-8 sm:px-8">
        <Breadcrumbs
          items={[
            { name: "Accueil", path: "/" },
            { name: "Tarifs", path: "/tarifs" },
          ]}
        />
      </div>

      <section className="bg-bg py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-6 sm:px-8">
          <SectionHeading
            as="h1"
            title="Nos offres"
            subtitle="Une formule pour chaque type de projet. Les prix sont indicatifs et ajustés selon le projet réel après visite."
          />

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {pricingTiers.map((tier, i) => (
              <Reveal key={tier.name} delay={i * 0.05}>
                <div
                  className={[
                    "flex h-full flex-col rounded-2xl border bg-surface p-6",
                    tier.highlighted ? "border-gold shadow-lg ring-1 ring-gold" : "border-border",
                  ].join(" ")}
                >
                  {tier.highlighted && (
                    <span className="mb-3 inline-block self-start rounded-full bg-gold px-3 py-1 text-xs font-semibold text-white">
                      Le plus demandé
                    </span>
                  )}
                  <h2 className="font-serif text-xl font-semibold text-navy">{tier.name}</h2>
                  <p className="mt-1 text-2xl font-semibold text-ink">{tier.price}</p>
                  <p className="mt-2 text-sm text-ink/70">{tier.tagline}</p>
                  <ul className="mt-5 flex-1 space-y-3">
                    {tier.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-ink/80">
                        <Check className="mt-0.5 h-4 w-4 flex-none text-gold" aria-hidden="true" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6">
                    <Button as="link" to="/devis" variant={tier.highlighted ? "primary" : "secondary"} className="w-full">
                      Demander un devis
                    </Button>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <p className="mt-8 text-center text-sm text-ink/60">
            Les tarifs affichés sont donnés à titre indicatif et sont ajustés selon les
            spécificités de chaque projet réel, après visite technique et devis détaillé.
          </p>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
