import { useState } from "react";
import { MapPin } from "lucide-react";

type MapFacadeProps = {
  /** URL d'intégration (iframe) Google Maps. */
  src: string;
  /** Titre accessible de la carte (utilisé sur l'iframe). */
  title: string;
};

/**
 * Façade cliquable pour Google Maps : tant que l'utilisateur n'a pas cliqué,
 * aucune `<iframe>` n'est chargée. Cela évite le coût réseau et de performance
 * de Google Maps au chargement initial de la page (protège le LCP/TBT).
 */
export function MapFacade({ src, title }: MapFacadeProps) {
  const [loaded, setLoaded] = useState(false);

  if (loaded) {
    return (
      <iframe
        src={src}
        title={title}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="h-full min-h-64 w-full rounded-2xl border border-border"
        allowFullScreen
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setLoaded(true)}
      aria-label="Afficher la carte"
      className="group relative flex min-h-64 w-full items-center justify-center overflow-hidden rounded-2xl border border-border bg-muted"
    >
      <span className="flex flex-col items-center gap-2 text-navy">
        <MapPin className="h-8 w-8 text-gold" aria-hidden="true" />
        <span className="font-medium">Afficher la carte</span>
        <span className="text-sm text-ink/60">Chargement de Google Maps au clic</span>
      </span>
    </button>
  );
}
