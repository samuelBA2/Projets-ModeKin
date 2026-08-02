import { useEffect } from "react";
import { useLocation } from "react-router";

/**
 * Remet le défilement en haut de page à chaque changement de route.
 * Ne rend rien : effet de bord uniquement (nécessaire car `ssr: false`
 * laisse React Router gérer la navigation côté client sans reset natif).
 */
export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
