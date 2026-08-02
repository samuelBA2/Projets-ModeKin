import { Link } from "react-router";
import { ShieldCheck, Clock, Award, HandHeart } from "lucide-react";
import type { Route } from "./+types/home";
import { buildMeta, canonical } from "~/seo/meta";
import { localBusinessSchema, websiteSchema } from "~/seo/schema";
import { Hero } from "~/components/sections/Hero";
import { Stats } from "~/components/sections/Stats";
import { ServicesPreview } from "~/components/sections/ServicesPreview";
import { Testimonials } from "~/components/sections/Testimonials";
import { CtaBand } from "~/components/sections/CtaBand";
import { Reveal } from "~/components/sections/Reveal";
import { SectionHeading } from "~/components/ui/SectionHeading";
import { Card } from "~/components/ui/Card";
import { projects } from "~/data/projects";

const advantages = [
  {
    icon: ShieldCheck,
    title: "Travail garanti",
    text: "Des finitions soignées et une garantie sur l'ensemble des travaux réalisés.",
  },
  {
    icon: Clock,
    title: "Délais respectés",
    text: "Un planning clair et tenu, pour un chantier sans mauvaise surprise.",
  },
  {
    icon: Award,
    title: "Artisans qualifiés",
    text: "Une équipe expérimentée pour chaque métier, du gros œuvre aux finitions.",
  },
  {
    icon: HandHeart,
    title: "À votre écoute",
    text: "Un accompagnement personnalisé, du premier conseil au suivi après chantier.",
  },
];

export function meta(_: Route.MetaArgs) {
  return [
    ...buildMeta({
      title: "Mode Kin — Travaux du bâtiment à Kinshasa",
      description:
        "Mode Kin, entreprise de bâtiment à Kinshasa : décoration intérieure, peinture, carrelage, plomberie et menuiserie. Un savoir-faire complet pour vos projets. Devis gratuit.",
      path: "/",
    }),
    { "script:ld+json": localBusinessSchema() },
    { "script:ld+json": websiteSchema() },
  ];
}

export const links = () => [canonical("/")];

export default function Home() {
  const featured = projects.slice(0, 3);

  return (
    <>
      <Hero
        title="Donnons vie à vos espaces"
        subtitle="Décoration, peinture, carrelage, plomberie et menuiserie : Mode Kin réunit tous les métiers du bâtiment pour réussir vos projets à Kinshasa."
        image={{
          src: "/images/home-hero.jpg",
          alt: "Intérieur rénové par Mode Kin",
          width: 1920,
          height: 1080,
        }}
        primary={{ label: "Demander un devis", to: "/devis" }}
        secondary={{ label: "Nos réalisations", to: "/realisations" }}
      />

      {/* Présentation de l'entreprise */}
      <section className="bg-surface py-16">
        <div className="mx-auto max-w-3xl px-6 text-center sm:px-8">
          <Reveal>
            <SectionHeading
              title="L'artisanat du bâtiment, de bout en bout"
              subtitle="Depuis plus de dix ans, Mode Kin accompagne particuliers et professionnels de Kinshasa dans leurs travaux de construction, de rénovation et d'aménagement."
            />
            <p className="mt-6 text-ink/75">
              Réunir tous les corps de métier sous une même enseigne, c'est vous garantir un
              interlocuteur unique, une coordination fluide entre les étapes et une exigence de
              qualité constante, du premier croquis à la pose finale.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Pourquoi choisir Mode Kin */}
      <section className="bg-bg py-16">
        <div className="mx-auto max-w-6xl px-6 sm:px-8">
          <SectionHeading
            title="Pourquoi choisir Mode Kin"
            subtitle="Un partenaire de confiance pour des travaux durables et bien exécutés."
          />
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {advantages.map((a, i) => {
              const Icon = a.icon;
              return (
                <Reveal key={a.title} delay={i * 0.05}>
                  <Card className="h-full">
                    <Icon className="h-8 w-8 text-gold" aria-hidden="true" />
                    <h3 className="mt-4 font-serif text-xl font-semibold text-navy">{a.title}</h3>
                    <p className="mt-2 text-sm text-ink/70">{a.text}</p>
                  </Card>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <Stats />

      <ServicesPreview />

      {/* Aperçu des réalisations */}
      <section className="bg-surface py-16">
        <div className="mx-auto max-w-6xl px-6 sm:px-8">
          <SectionHeading
            title="Nos réalisations"
            subtitle="Quelques chantiers récents qui illustrent notre savoir-faire."
          />
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.05}>
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
                      <h3 className="font-serif text-lg font-semibold text-navy">{p.title}</h3>
                      <p className="mt-1 text-sm text-ink/60">{p.location}</p>
                    </div>
                  </Card>
                </Link>
              </Reveal>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              to="/realisations"
              className="font-medium text-gold underline-offset-4 hover:underline"
            >
              Voir toutes nos réalisations
            </Link>
          </div>
        </div>
      </section>

      <Testimonials />

      <CtaBand />
    </>
  );
}
