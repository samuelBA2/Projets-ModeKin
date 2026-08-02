import { useCallback, useState } from "react";

/**
 * Gère l'état d'ouverture d'une visionneuse d'images : index actif (ou null
 * quand fermée) et navigation cyclique entre les images d'une galerie.
 */
export function useLightbox(total: number) {
  const [index, setIndex] = useState<number | null>(null);

  const open = useCallback((i: number) => setIndex(i), []);
  const close = useCallback(() => setIndex(null), []);
  const navigate = useCallback(
    (i: number) => {
      if (total <= 0) return;
      setIndex(((i % total) + total) % total); // cyclique dans les deux sens
    },
    [total],
  );

  return { index, open, close, navigate };
}
