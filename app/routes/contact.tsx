import { Phone, Mail, MapPin, Clock } from "lucide-react";
import type { Route } from "./+types/contact";
import { buildMeta, canonical } from "~/seo/meta";
import { breadcrumbSchema } from "~/seo/schema";
import { SITE } from "~/data/site.config";
import { ContactForm } from "~/components/forms/ContactForm";
import { MapFacade } from "~/components/ui/MapFacade";
import { Breadcrumbs } from "~/components/ui/Breadcrumbs";
import { SectionHeading } from "~/components/ui/SectionHeading";

export function meta(_: Route.MetaArgs) {
  return [
    ...buildMeta({
      title: "Contact — Parlons de votre projet | Mode Kin",
      description:
        "Contactez Mode Kin à Kinshasa : téléphone, email, adresse et horaires. Envoyez-nous votre demande, nous vous recontactons rapidement.",
      path: "/contact",
    }),
    {
      "script:ld+json": breadcrumbSchema([
        { name: "Accueil", path: "/" },
        { name: "Contact", path: "/contact" },
      ]),
    },
  ];
}

export const links = () => [canonical("/contact")];

export default function Contact() {
  const { address } = SITE;

  return (
    <>
      <div className="mx-auto max-w-6xl px-6 pt-8 sm:px-8">
        <Breadcrumbs
          items={[
            { name: "Accueil", path: "/" },
            { name: "Contact", path: "/contact" },
          ]}
        />
      </div>

      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-6 sm:px-8">
          <SectionHeading
            align="left"
            title="Contactez-nous"
            subtitle="Une question, un projet ? Écrivez-nous ou appelez-nous directement."
          />

          <div className="mt-10 grid gap-12 lg:grid-cols-2">
            {/* Coordonnées */}
            <div>
              <ul className="space-y-5">
                <li className="flex items-start gap-3">
                  <Phone className="mt-0.5 h-5 w-5 flex-none text-gold" aria-hidden="true" />
                  <div>
                    <p className="text-sm font-medium text-ink">Téléphone</p>
                    <a href={`tel:${SITE.phone}`} className="text-ink/75 underline-offset-4 hover:underline hover:text-gold">
                      {SITE.phone}
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Mail className="mt-0.5 h-5 w-5 flex-none text-gold" aria-hidden="true" />
                  <div>
                    <p className="text-sm font-medium text-ink">Email</p>
                    <a href={`mailto:${SITE.email}`} className="text-ink/75 underline-offset-4 hover:underline hover:text-gold">
                      {SITE.email}
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 flex-none text-gold" aria-hidden="true" />
                  <div>
                    <p className="text-sm font-medium text-ink">Adresse</p>
                    <p className="text-ink/75">
                      {address.street}, {address.city}, {address.region}, {address.country}
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Clock className="mt-0.5 h-5 w-5 flex-none text-gold" aria-hidden="true" />
                  <div>
                    <p className="text-sm font-medium text-ink">Horaires</p>
                    <ul className="text-ink/75">
                      {SITE.hours.map((h) => (
                        <li key={h.days}>
                          <span className="font-medium">{h.days}</span> : {h.open}
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              </ul>

              {SITE.socials.length > 0 && (
                <div className="mt-6">
                  <p className="text-sm font-medium text-ink">Réseaux sociaux</p>
                  <ul className="mt-2 flex flex-wrap gap-4">
                    {SITE.socials.map((s) => (
                      <li key={s.label}>
                        <a
                          href={s.href}
                          className="text-gold underline-offset-4 hover:underline"
                          target="_blank"
                          rel="noreferrer noopener"
                        >
                          {s.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mt-8">
                <MapFacade src={SITE.mapsUrl} title={`Localisation de ${SITE.name} sur la carte`} />
              </div>
            </div>

            {/* Formulaire */}
            <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8">
              <h2 className="font-serif text-xl font-semibold text-navy">Envoyez-nous un message</h2>
              <div className="mt-6">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
