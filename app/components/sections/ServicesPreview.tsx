import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import { services } from "~/data/services";
import { Card } from "~/components/ui/Card";
import { SectionHeading } from "~/components/ui/SectionHeading";
import { Reveal } from "./Reveal";

/** Aperçu des services : grille de cartes-liens vers chaque page dédiée. */
export function ServicesPreview() {
  return (
    <section className="bg-bg py-16">
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <SectionHeading
          title="Nos savoir-faire"
          subtitle="Des artisans qualifiés pour chaque étape de votre projet, du gros œuvre aux finitions."
        />
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <Reveal key={service.slug} delay={index * 0.05}>
              <Link to={`/services/${service.slug}`} className="group block h-full">
                <Card className="flex h-full flex-col transition-shadow duration-200 group-hover:shadow-lg">
                  <h3 className="font-serif text-xl font-semibold text-navy">{service.title}</h3>
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
  );
}
