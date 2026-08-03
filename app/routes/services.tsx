import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import type { Route } from "./+types/services";
import { buildMeta, canonical } from "~/seo/meta";
import { breadcrumbSchema } from "~/seo/schema";
import { services } from "~/data/services";
import { Breadcrumbs } from "~/components/ui/Breadcrumbs";
import { SectionHeading } from "~/components/ui/SectionHeading";
import { Card } from "~/components/ui/Card";
import { Reveal } from "~/components/sections/Reveal";
import { CtaBand } from "~/components/sections/CtaBand";

export function meta(_: Route.MetaArgs) {
  return [
    ...buildMeta({
      title: "Nos services — Travaux du bâtiment | Mode Kin",
      description:
        "Découvrez les services de Mode Kin à Kinshasa : décoration intérieure, peinture, carrelage, plomberie et menuiserie. Un savoir-faire complet pour vos projets.",
      path: "/services",
    }),
    {
      "script:ld+json": breadcrumbSchema([
        { name: "Accueil", path: "/" },
        { name: "Services", path: "/services" },
      ]),
    },
  ];
}

export const links = () => [canonical("/services")];

export default function Services() {
  return (
    <>
      <div className="mx-auto max-w-6xl px-6 pt-8 sm:px-8">
        <Breadcrumbs
          items={[
            { name: "Accueil", path: "/" },
            { name: "Services", path: "/services" },
          ]}
        />
      </div>

      <section className="bg-bg py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-6 sm:px-8">
          <SectionHeading
            as="h1"
            title="Nos services"
            subtitle="Cinq métiers réunis sous une même enseigne, pour un accompagnement complet du projet à la finition."
          />
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <Reveal key={service.slug} delay={index * 0.05}>
                <Link to={`/services/${service.slug}`} className="group block h-full">
                  <Card className="flex h-full flex-col transition-shadow duration-200 group-hover:shadow-lg">
                    <h2 className="font-serif text-xl font-semibold text-navy">{service.title}</h2>
                    <p className="mt-2 flex-1 text-sm text-ink/70">{service.shortDescription}</p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-gold">
                      Découvrir
                      <ArrowRight className="size-4" aria-hidden="true" />
                    </span>
                  </Card>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
