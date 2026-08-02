import { useEffect, useRef } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import type { ImageAsset } from "~/data/types";
import { GlassPanel } from "./GlassPanel";

export type LightboxProps = {
  images: ImageAsset[];
  /** Index de l'image affichée, ou `null` lorsque la visionneuse est fermée. */
  index: number | null;
  onClose: () => void;
  onNavigate: (i: number) => void;
};

/**
 * Visionneuse d'images modale et accessible : `role="dialog"` + `aria-modal`,
 * fermeture au clavier (Échap), navigation précédent/suivant (flèches et boutons),
 * focus initial sur le bouton de fermeture et piège de focus simple.
 */
export function Lightbox({ images, index, onClose, onNavigate }: LightboxProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const isOpen = index !== null;

  useEffect(() => {
    if (!isOpen) return;
    closeRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft") onNavigate((index as number) - 1);
      else if (e.key === "ArrowRight") onNavigate((index as number) + 1);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen, index, onClose, onNavigate]);

  if (!isOpen) return null;

  const image = images[index as number];
  if (!image) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Visionneuse d'images"
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-ink/80 p-4"
      onClick={onClose}
    >
      <GlassPanel
        className="relative max-h-full max-w-5xl p-2"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          className="h-auto max-h-[80vh] w-full rounded-xl object-contain"
        />

        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Fermer la visionneuse"
          className="absolute -right-3 -top-3 flex min-h-11 min-w-11 items-center justify-center rounded-full bg-surface text-ink shadow-lg"
        >
          <X aria-hidden="true" />
        </button>

        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => onNavigate((index as number) - 1)}
              aria-label="Image précédente"
              className="absolute left-2 top-1/2 flex min-h-11 min-w-11 -translate-y-1/2 items-center justify-center rounded-full bg-surface/90 text-ink shadow-lg"
            >
              <ChevronLeft aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => onNavigate((index as number) + 1)}
              aria-label="Image suivante"
              className="absolute right-2 top-1/2 flex min-h-11 min-w-11 -translate-y-1/2 items-center justify-center rounded-full bg-surface/90 text-ink shadow-lg"
            >
              <ChevronRight aria-hidden="true" />
            </button>
          </>
        )}
      </GlassPanel>
    </div>
  );
}
