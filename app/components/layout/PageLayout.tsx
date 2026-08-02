import type { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { FloatingActions } from "./FloatingActions";
import { ScrollToTop } from "./ScrollToTop";

export type PageLayoutProps = {
  children: ReactNode;
};

/**
 * Mise en page commune à toutes les pages : navigation, contenu principal
 * (ancre `#contenu` pour le lien d'évitement défini dans `root.tsx`),
 * pied de page et actions flottantes.
 */
export function PageLayout({ children }: PageLayoutProps) {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main id="contenu">{children}</main>
      <Footer />
      <FloatingActions />
    </>
  );
}
