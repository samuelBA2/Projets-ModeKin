import { Button } from "~/components/ui/Button";
import { Reveal } from "./Reveal";

export type CtaBandProps = {
  title?: string;
  subtitle?: string;
};

/** Bande d'appel à l'action finale, vers la page de devis. */
export function CtaBand({
  title = "Un projet en tête ?",
  subtitle = "Demandez votre devis gratuit et sans engagement, sous 48 h.",
}: CtaBandProps) {
  return (
    <section className="bg-black py-16 text-white">
      <div className="mx-auto max-w-2xl px-6 text-center sm:px-8">
        <Reveal>
          <h2 className="font-serif text-3xl font-semibold sm:text-4xl">{title}</h2>
          <p className="mt-3 text-white/80">{subtitle}</p>
          <div className="mt-8 flex justify-center">
            <Button as="link" to="/devis">
              Demander un devis
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
