import { useState } from "react";
import { Link, useParams } from "react-router";
import { MapPin, CalendarDays, Tag } from "lucide-react";
import type { Route } from "./+types/project-detail";
import { buildMeta } from "~/seo/meta";
import { projectSchema, breadcrumbSchema } from "~/seo/schema";
import { getProject } from "~/data/projects";
import { getService } from "~/data/services";
import { Breadcrumbs } from "~/components/ui/Breadcrumbs";
import { Lightbox } from "~/components/ui/Lightbox";
import { Button } from "~/components/ui/Button";
import { Reveal } from "~/components/sections/Reveal";
import { CtaBand } from "~/components/sections/CtaBand";

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("fr-FR", { year: "numeric", month: "long" });

export function meta({ params }: Route.MetaArgs) {
  const project = getProject(params.slug ?? "");
  if (!project) {
    return [
      ...buildMeta({
        title: "Réalisation introuvable | Mode Kin",
        description: "Ce projet n'existe pas.",
        path: `/realisations/${params.slug}`,
        noindex: true,
      }),
    ];
  }
  return [
    ...buildMeta({
      title: `${project.title}${project.location ? ` — ${project.location}` : ""} | Mode Kin`,
      description: project.description,
      path: `/realisations/${project.slug}`,
      image: project.images[0].src,
    }),
    { "script:ld+json": projectSchema(project) },
    {
      "script:ld+json": breadcrumbSchema([
        { name: "Accueil", path: "/" },
        { name: "Réalisations", path: "/realisations" },
        { name: project.title, path: `/realisations/${project.slug}` },
      ]),
    },
  ];
}

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = getProject(slug ?? "");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  if (!project) {
    return (
      <section className="mx-auto max-w-2xl px-6 py-24 text-center sm:px-8">
        <h1 className="font-serif text-3xl font-semibold text-navy">Réalisation introuvable</h1>
        <p className="mt-4 text-ink/70">Le projet que vous recherchez n'existe pas ou a été déplacé.</p>
        <div className="mt-8 flex justify-center">
          <Button as="link" to="/realisations">
            Voir toutes nos réalisations
          </Button>
        </div>
      </section>
    );
  }

  const service = getService(project.category);

  return (
    <>
      <div className="mx-auto max-w-6xl px-6 pt-8 sm:px-8">
        <Breadcrumbs
          items={[
            { name: "Accueil", path: "/" },
            { name: "Réalisations", path: "/realisations" },
            { name: project.title, path: `/realisations/${project.slug}` },
          ]}
        />
      </div>

      <article className="mx-auto max-w-6xl px-6 py-10 sm:px-8">
        <Reveal>
          <h1 className="font-serif text-3xl font-semibold text-navy sm:text-4xl">{project.title}</h1>
          <dl className="mt-4 flex flex-wrap gap-x-8 gap-y-2 text-sm text-ink/70">
            {project.location && (
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-gold" aria-hidden="true" />
                <dt className="sr-only">Lieu</dt>
                <dd>{project.location}</dd>
              </div>
            )}
            <div className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4 text-gold" aria-hidden="true" />
              <dt className="sr-only">Date</dt>
              <dd>{formatDate(project.date)}</dd>
            </div>
            {service && (
              <div className="flex items-center gap-2">
                <Tag className="h-4 w-4 text-gold" aria-hidden="true" />
                <dt className="sr-only">Catégorie</dt>
                <dd>
                  <Link to={`/services/${service.slug}`} className="font-medium text-gold underline-offset-4 hover:underline">
                    {service.title}
                  </Link>
                </dd>
              </div>
            )}
          </dl>
          <p className="mt-6 max-w-3xl text-ink/75">{project.description}</p>
        </Reveal>

        {/* Galerie */}
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {project.images.map((img, i) => (
            <button
              key={img.src}
              type="button"
              onClick={() => setLightboxIndex(i)}
              className="group overflow-hidden rounded-2xl"
              aria-label={`Agrandir : ${img.alt}`}
            >
              <img
                src={img.src}
                alt={img.alt}
                width={img.width}
                height={img.height}
                loading={i === 0 ? "eager" : "lazy"}
                className="aspect-[3/2] w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
              />
            </button>
          ))}
        </div>
      </article>

      <Lightbox
        images={project.images}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={setLightboxIndex}
      />

      <CtaBand />
    </>
  );
}
