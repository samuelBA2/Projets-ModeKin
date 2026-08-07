import type { ReactNode } from "react";
import { motion } from "framer-motion";

export type RevealProps = {
  children: ReactNode;
  /** Délai avant l'apparition, en secondes. */
  delay?: number;
};

/**
 * Fait apparaître son contenu (fondu + léger décalage vertical) lorsqu'il
 * entre dans le viewport. N'anime que `opacity`/`transform` (performant).
 * Respecte `prefers-reduced-motion` via le `MotionConfig` global de root.tsx.
 *
 * On utilise `whileInView` (+ `viewport.once`) plutôt qu'un `useInView` manuel :
 * ce patron réévalue la visibilité à chaque montage et ne laisse jamais le
 * contenu bloqué à `opacity: 0` lorsque React remonte les composants en mode
 * développement (StrictMode) — cause d'un contenu invisible en `npm run dev`.
 */
export function Reveal({ children, delay = 0 }: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
