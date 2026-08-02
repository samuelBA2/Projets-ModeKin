import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "~/components/ui/Button";
import type { ImageAsset } from "~/data/types";

export type HeroLink = { label: string; to: string };

export type HeroProps = {
  title: string;
  subtitle: string;
  image: ImageAsset;
  primary: HeroLink;
  secondary?: HeroLink;
};

/**
 * Bandeau d'accueil plein écran avec parallaxe légère sur l'image de fond
 * (0 à 15 % de décalage vertical au défilement) et deux appels à l'action.
 */
export function Hero({ title, subtitle, image, primary, secondary }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  return (
    <section ref={sectionRef} className="relative flex min-h-[80vh] items-center overflow-hidden bg-navy">
      <motion.img
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        fetchPriority="high"
        style={{ y }}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-navy/60" aria-hidden="true" />
      <div className="relative mx-auto max-w-3xl px-6 py-24 text-center text-white sm:px-8">
        <h1 className="font-serif text-4xl font-semibold sm:text-5xl">{title}</h1>
        <p className="mt-4 text-lg text-white/85">{subtitle}</p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Button as="link" to={primary.to}>
            {primary.label}
          </Button>
          {secondary && (
            <Button as="link" to={secondary.to} variant="secondary">
              {secondary.label}
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
