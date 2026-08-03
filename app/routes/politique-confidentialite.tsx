import type { Route } from "./+types/politique-confidentialite";
import { buildMeta, canonical } from "~/seo/meta";
import { SITE } from "~/data/site.config";
import { LegalLayout } from "~/components/ui/LegalLayout";

export function meta(_: Route.MetaArgs) {
  return buildMeta({
    title: "Politique de confidentialité | Mode Kin",
    description:
      "Politique de confidentialité de Mode Kin : données collectées via les formulaires, finalité, durée de conservation et vos droits.",
    path: "/politique-confidentialite",
  });
}

export const links = () => [canonical("/politique-confidentialite")];

export default function PolitiqueConfidentialite() {
  return (
    <LegalLayout title="Politique de confidentialité" updatedAt="1er août 2026" path="/politique-confidentialite">
      <p>
        {SITE.legalName} accorde une grande importance à la protection de vos données personnelles.
        Cette politique décrit les données que nous collectons, l'usage que nous en faisons et les
        droits dont vous disposez.
      </p>

      <h2>Données collectées</h2>
      <p>
        Nous collectons uniquement les données que vous nous transmettez volontairement via nos
        formulaires de contact et de demande de devis : nom, numéro de téléphone, adresse email,
        prestation concernée, description du projet, budget et délai indicatifs.
      </p>

      <h2>Finalité du traitement</h2>
      <p>
        Ces données sont utilisées exclusivement pour répondre à votre demande, établir un devis et
        assurer le suivi de votre projet. Elles ne sont ni vendues, ni louées, ni cédées à des tiers
        à des fins commerciales.
      </p>

      <h2>Durée de conservation</h2>
      <p>
        Vos données sont conservées le temps nécessaire au traitement de votre demande et à la
        relation commerciale qui peut en découler, puis archivées ou supprimées conformément aux
        obligations légales applicables.
      </p>

      <h2>Vos droits</h2>
      <p>Vous disposez d'un droit d'accès, de rectification, d'opposition et de suppression de vos données. Pour l'exercer :</p>
      <ul>
        <li>par email, à l'adresse {SITE.email} ;</li>
        <li>par téléphone, au {SITE.phone}.</li>
      </ul>

      <h2>Cookies</h2>
      <p>
        Ce site ne dépose pas de cookie publicitaire ni de traceur tiers à des fins de profilage.
        Seuls les éléments strictement nécessaires au bon fonctionnement du site peuvent être
        utilisés.
      </p>
    </LegalLayout>
  );
}
