import { useEffect, useState, type ReactNode } from "react";
import { Link, useLocation } from "react-router";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "~/components/ui/Button";
import { GlassPanel } from "~/components/ui/GlassPanel";

const NAV_LINKS = [
  { label: "Accueil", to: "/" },
  { label: "Services", to: "/services" },
  { label: "Réalisations", to: "/realisations" },
  { label: "Tarifs", to: "/tarifs" },
  { label: "Contact", to: "/contact" },
];

/**
 * Barre de navigation principale. Transparente en haut de page, elle
 * adopte un fond « verre dépoli » dès que la page défile (`useScroll` +
 * `useMotionValueEvent`, sans re-render inutile pendant le défilement).
 * Le menu mobile s'anime en opacité/translation uniquement (jamais
 * largeur/hauteur), conformément aux contraintes de performance.
 */
export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();
  const { pathname } = useLocation();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 8);
  });

  // Referme le menu mobile après toute navigation (y compris le CTA « devis »).
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const navContent: ReactNode = (
    <nav aria-label="Navigation principale" className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
      <Link to="/" className="font-serif text-xl font-semibold text-navy">
        Mode Kin
      </Link>

      <ul className="hidden items-center gap-6 md:flex">
        {NAV_LINKS.map((link) => (
          <li key={link.to}>
            <Link to={link.to} className="font-medium text-ink hover:text-gold">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>

      <div className="hidden md:block">
        <Button as="link" to="/devis" variant="primary">
          Demander un devis
        </Button>
      </div>

      <button
        type="button"
        aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
        aria-expanded={isOpen}
        aria-controls="menu-mobile"
        onClick={() => setIsOpen((prev) => !prev)}
        className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-xl text-navy md:hidden"
      >
        {isOpen ? <X aria-hidden="true" className="size-6" /> : <Menu aria-hidden="true" className="size-6" />}
      </button>
    </nav>
  );

  return (
    <header className="sticky top-0 z-40 transition-colors duration-300">
      {isScrolled ? (
        <GlassPanel className="rounded-none border-x-0 border-t-0">{navContent}</GlassPanel>
      ) : (
        <div className="bg-transparent">{navContent}</div>
      )}

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id="menu-mobile"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="border-b border-border bg-surface/95 backdrop-blur-md md:hidden"
          >
            <ul className="flex flex-col gap-1 px-6 py-4">
              {NAV_LINKS.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="flex min-h-11 items-center font-medium text-ink hover:text-gold">
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <Button as="link" to="/devis" variant="primary" className="w-full">
                  Demander un devis
                </Button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
