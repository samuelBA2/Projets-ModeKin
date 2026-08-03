import { useSearchParams } from "react-router";
import { Clock, ShieldCheck, MessageSquare } from "lucide-react";
import type { Route } from "./+types/devis";
import { buildMeta, canonical } from "~/seo/meta";
import { breadcrumbSchema } from "~/seo/schema";
import { DevisForm } from "~/components/forms/DevisForm";
import { Breadcrumbs } from "~/components/ui/Breadcrumbs";

export function meta(_: Route.MetaArgs) {
  return [
    ...buildMeta({
      title: "Demander un devis gratuit | Mode Kin",
      description:
        "Décrivez votre projet et recevez un devis gratuit et sans engagement de Mode Kin à Kinshasa : décoration, peinture, carrelage, plomberie, menuiserie.",
      path: "/devis",
    }),
    {
      "script:ld+json": breadcrumbSchema([
        { name: "Accueil", path: "/" },
        { name: "Devis", path: "/devis" },
      ]),
    },
  ];
}

export const links = () => [canonical("/devis")];

const arguments_ = [
  { icon: ShieldCheck, text: "Devis gratuit et sans engagement" },
  { icon: Clock, text: "Réponse sous 48 h ouvrées" },
  { icon: MessageSquare, text: "Un interlocuteur unique pour votre projet" },
];

export default function Devis() {
  const [searchParams] = useSearchParams();
  const preselected = searchParams.get("service") ?? "";

  return (
    <>
      <div className="mx-auto max-w-6xl px-6 pt-8 sm:px-8">
        <Breadcrumbs
          items={[
            { name: "Accueil", path: "/" },
            { name: "Devis", path: "/devis" },
          ]}
        />
      </div>

      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-3xl px-6 sm:px-8">
          <h1 className="font-serif text-3xl font-semibold text-navy sm:text-4xl">
            Demandez votre devis
          </h1>
          <p className="mt-4 text-ink/75">
            Décrivez votre projet en quelques mots : nous étudions votre demande et revenons
            vers vous avec une estimation adaptée. Plus votre description est précise, plus notre
            réponse sera juste.
          </p>

          <ul className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-6">
            {arguments_.map((a) => {
              const Icon = a.icon;
              return (
                <li key={a.text} className="flex items-center gap-2 text-sm text-ink/80">
                  <Icon className="h-5 w-5 flex-none text-gold" aria-hidden="true" />
                  <span>{a.text}</span>
                </li>
              );
            })}
          </ul>

          <div className="mt-10 rounded-2xl border border-border bg-surface p-6 sm:p-8">
            <DevisForm defaultService={preselected} />
          </div>
        </div>
      </section>
    </>
  );
}
