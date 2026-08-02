import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { ArrowUp, MessageCircle, Phone } from "lucide-react";
import { SITE } from "~/data/site.config";

/**
 * Actions flottantes persistantes : WhatsApp, appel direct et retour en
 * haut de page. Positionnées dans la zone sûre (`env(safe-area-inset-*)`)
 * pour rester accessibles sur mobile (encoche, barre de gestes).
 */
export function FloatingActions() {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setShowBackToTop(latest > 400);
  });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      className="fixed right-4 z-30 flex flex-col items-end gap-3"
      style={{ bottom: "max(1rem, env(safe-area-inset-bottom))" }}
    >
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            type="button"
            onClick={scrollToTop}
            aria-label="Retour en haut"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="flex size-11 items-center justify-center rounded-full border border-border bg-surface text-navy shadow-lg"
          >
            <ArrowUp aria-hidden="true" className="size-5" />
          </motion.button>
        )}
      </AnimatePresence>

      <a
        href={`https://wa.me/${SITE.whatsapp}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contacter sur WhatsApp"
        className="flex size-11 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg"
      >
        <MessageCircle aria-hidden="true" className="size-5" />
      </a>

      <a
        href={`tel:${SITE.phone}`}
        aria-label={`Appeler ${SITE.name}`}
        className="flex size-11 items-center justify-center rounded-full bg-gold text-white shadow-lg"
      >
        <Phone aria-hidden="true" className="size-5" />
      </a>
    </div>
  );
}
