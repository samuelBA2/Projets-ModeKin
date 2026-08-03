import type { Route } from "./+types/conditions-utilisation";
import { buildMeta, canonical } from "~/seo/meta";
import { SITE } from "~/data/site.config";
import { LegalLayout } from "~/components/ui/LegalLayout";

export function meta(_: Route.MetaArgs) {
  return buildMeta({
    title: "Conditions d'utilisation | Mode Kin",
    description: "Conditions d'utilisation du site de Mode Kin : objet, accès au service et responsabilités.",
    path: "/conditions-utilisation",
  });
}

export const links = () => [canonical("/conditions-utilisation")];

export default function ConditionsUtilisation() {
  return (
    <LegalLayout title="Conditions d'utilisation" updatedAt="1er août 2026" path="/conditions-utilisation">
      <h2>Objet</h2>
      <p>
        Les présentes conditions d'utilisation régissent l'accès et l'usage du site de{" "}
        {SITE.legalName}. En naviguant sur ce site, vous acceptez de vous conformer aux présentes
        conditions.
      </p>

      <h2>Accès au service</h2>
      <p>
        Le site est accessible gratuitement à tout utilisateur disposant d'un accès à internet.{" "}
        {SITE.name} met tout en œuvre pour assurer la disponibilité du site, sans toutefois y être
        tenue par une obligation de résultat. L'accès peut être suspendu pour maintenance ou en cas
        de force majeure.
      </p>

      <h2>Utilisation du site</h2>
      <p>
        L'utilisateur s'engage à ne pas porter atteinte au bon fonctionnement du site, à ne pas
        tenter d'y accéder de manière frauduleuse et à utiliser les formulaires de contact et de
        devis de bonne foi, pour des demandes réelles.
      </p>

      <h2>Devis et prestations</h2>
      <p>
        Les informations et tarifs présentés sur le site sont fournis à titre indicatif. Seul un
        devis signé, établi après visite technique, engage {SITE.legalName}. Les demandes envoyées
        via le site ne constituent pas un contrat.
      </p>

      <h2>Droit applicable</h2>
      <p>
        Les présentes conditions sont soumises au droit applicable au lieu du siège de{" "}
        {SITE.legalName}. Tout litige relatif à leur interprétation ou à leur exécution relève des
        juridictions compétentes.
      </p>
    </LegalLayout>
  );
}
