import { useRef, type ReactNode } from "react";
import { motion, useInView } from "framer-motion";

export type RevealProps = {
  children: ReactNode;
  /** Délai avant l'apparition, en secondes. */
  delay?: number;
};

/**
 * Fait apparaître son contenu (fondu + léger décalage vertical) lorsqu'il
 * entre dans le viewport. N'anime que `opacity`/`transform` (performant).
 * Respecte `prefers-reduced-motion` via le `MotionConfig` global de root.tsx.
 */
export function Reveal({ children, delay = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -80px 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
