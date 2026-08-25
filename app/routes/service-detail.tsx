import { useState } from "react";
import { Link, useParams } from "react-router";
import { ArrowRight, Check } from "lucide-react";
import type { Route } from "./+types/service-detail";
import { buildMeta, canonical } from "~/seo/meta";
import { serviceSchema, breadcrumbSchema, faqSchema } from "~/seo/schema";
import { getService, services } from "~/data/services";
import { getProjectsByCategory } from "~/data/projects";
import { Breadcrumbs } from "~/components/ui/Breadcrumbs";
import { Card } from "~/components/ui/Card";
import { Accordion } from "~/components/ui/Accordion";
import { Lightbox } from "~/components/ui/Lightbox";
import { Icon } from "~/components/ui/Icon";
import { Button } from "~/components/ui/Button";
import { Reveal } from "~/components/sections/Reveal";
import { CtaBand } from "~/components/sections/CtaBand";

export function meta({ params }: Route.MetaArgs) {
  const service = getService(params.slug);
  if (!service) {
    return [...buildMeta({ title: "Service introuvable | Mode Kin", description: "Ce service n'existe pas.", path: `/services/${params.slug}`, noindex: true })];
  }
  return [
    ...buildMeta({
      title: service.metaTitle,
      description: service.metaDescription,
      path: `/services/${service.slug}`,
      image: service.heroImage.src,
    }),
    { "script:ld+json": serviceSchema(service) },
    {
      "script:ld+json": breadcrumbSchema([
        { name: "Accueil", path: "/" },
        { name: "Services", path: "/services" },
        { name: service.title, path: `/services/${service.slug}` },
      ]),
    },
    { "script:ld+json": faqSchema(service.faq) },
  ];
}

export function links() {
  return [] as { rel: string; href: string }[];
}

export default function ServiceDetail() {
  const { slug } = useParams();
  const service = getService(slug ?? "");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  if (!service) {
    return (
      <section className="mx-auto max-w-2xl px-6 py-24 text-center sm:px-8">
        <h1 className="font-serif text-3xl font-semibold text-navy">Service introuvable</h1>
        <p className="mt-4 text-ink/70">
          La prestation que vous recherchez n'existe pas ou a été déplacée.
        </p>
        <div className="mt-8 flex justify-center">
          <Button as="link" to="/services">
            Voir tous nos services
          </Button>
        </div>
      </section>
    );
  }

  const related = service.relatedSlugs
    .map((s) => getService(s))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));
  const projects = getProjectsByCategory(service.slug);

  return (
    <>
      <div className="mx-auto max-w-6xl px-6 pt-8 sm:px-8">
        <Breadcrumbs
          items={[
            { name: "Accueil", path: "/" },
            { name: "Services", path: "/services" },
            { name: service.title, path: `/services/${service.slug}` },
          ]}
        />
      </div>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 py-10 sm:px-8">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <h1 className="font-serif text-3xl font-semibold text-navy sm:text-4xl">{service.title}</h1>
            <p className="mt-4 text-lg text-ink/75">{service.shortDescription}</p>
            <p className="mt-4 text-ink/70">{service.intro}</p>
            <div className="mt-8">
              <Button as="link" to="/devis">
                Demander un devis
              </Button>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <img
              src={service.heroImage.src}
              alt={service.heroImage.alt}
              width={service.heroImage.width}
              height={service.heroImage.height}
              className="aspect-[16/10] w-full rounded-2xl object-cover shadow-lg"
              fetchPriority="high"
            />
          </Reveal>
        </div>
      </section>

      {/* Avantages */}
      <section className="bg-surface py-14">
        <div className="mx-auto max-w-6xl px-6 sm:px-8">
          <h2 className="font-serif text-2xl font-semibold text-navy">Nos atouts</h2>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {service.benefits.map((b, i) => (
              <Reveal key={b.title} delay={i * 0.05}>
                <Card className="h-full">
                  <Icon name={b.iconName} className="h-8 w-8 text-gold" />
                  <h3 className="mt-4 font-serif text-lg font-semibold text-navy">{b.title}</h3>
                  <p className="mt-2 text-sm text-ink/70">{b.text}</p>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Prestations */}
      <section className="py-14">
        <div className="mx-auto max-w-6xl px-6 sm:px-8">
          <h2 className="font-serif text-2xl font-semibold text-navy">Nos prestations</h2>
          <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {service.prestations.map((p) => (
              <li key={p} className="flex items-start gap-3 text-ink/80">
                <Check className="mt-0.5 h-5 w-5 flex-none text-gold" aria-hidden="true" />
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Galerie */}
      <section className="bg-surface py-14">
        <div className="mx-auto max-w-6xl px-6 sm:px-8">
          <h2 className="font-serif text-2xl font-semibold text-navy">En images</h2>
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
            {service.gallery.map((img, i) => (
              <button
                key={img.src}
                type="button"
                onClick={() => setLightboxIndex(i)}
                className="group overflow-hidden rounded-xl"
                aria-label={`Agrandir : ${img.alt}`}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  width={img.width}
                  height={img.height}
                  loading="lazy"
                  className="aspect-[4/3] w-full object-cover transition-transform duration-300 group-hover:scale-[1.04]"
                />
              </button>
            ))}
          </div>
        </div>
      </section>
      <Lightbox
        images={service.gallery}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={setLightboxIndex}
      />

      {/* Projets de la catégorie */}
      {projects.length > 0 && (
        <section className="py-14">
          <div className="mx-auto max-w-6xl px-6 sm:px-8">
            <h2 className="font-serif text-2xl font-semibold text-navy">Réalisations en {service.title.toLowerCase()}</h2>
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((p) => (
                <Link key={p.slug} to={`/realisations/${p.slug}`} className="group block">
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
                      <h3 className="font-serif text-lg font-semibold text-navy">{p.title}</h3>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="bg-surface py-14">
        <div className="mx-auto max-w-3xl px-6 sm:px-8">
          <h2 className="font-serif text-2xl font-semibold text-navy">Questions fréquentes</h2>
          <div className="mt-8">
            <Accordion items={service.faq} />
          </div>
        </div>
      </section>

      {/* Services liés */}
      {related.length > 0 && (
        <section className="py-14">
          <div className="mx-auto max-w-6xl px-6 sm:px-8">
            <h2 className="font-serif text-2xl font-semibold text-navy">Nos autres services</h2>
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  to={`/services/${r.slug}`}
                  className="group flex items-center justify-between rounded-xl border border-border bg-surface px-5 py-4 transition-colors hover:bg-muted"
                >
                  <span className="font-serif font-semibold text-navy">{r.title}</span>
                  <ArrowRight className="size-4 text-gold" aria-hidden="true" />
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaBand />
    </>
  );
}

// Référence conservée pour l'exhaustivité du typage des slugs.
void services;
