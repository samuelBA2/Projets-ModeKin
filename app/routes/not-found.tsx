import type { Route } from "./+types/not-found";
import { buildMeta } from "~/seo/meta";
import { Button } from "~/components/ui/Button";

export function meta(_: Route.MetaArgs) {
  return buildMeta({
    title: "Page introuvable | Mode Kin",
    description: "La page que vous recherchez n'existe pas ou a été déplacée.",
    path: "/404",
    noindex: true,
  });
}

export default function NotFound() {
  return (
    <section className="mx-auto flex max-w-2xl flex-col items-center px-6 py-24 text-center sm:px-8">
      <p className="font-serif text-6xl font-semibold text-gold">404</p>
      <h1 className="mt-4 font-serif text-3xl font-semibold text-navy">Page introuvable</h1>
      <p className="mt-4 text-ink/70">
        La page que vous recherchez n'existe pas ou a été déplacée. Revenez à l'accueil pour
        poursuivre votre visite.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Button as="link" to="/">
          Retour à l'accueil
        </Button>
        <Button as="link" to="/services" variant="secondary">
          Voir nos services
        </Button>
      </div>
    </section>
  );
}
