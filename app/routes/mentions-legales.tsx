import type { Route } from "./+types/mentions-legales";
import { buildMeta, canonical } from "~/seo/meta";
import { SITE } from "~/data/site.config";
import { LegalLayout } from "~/components/ui/LegalLayout";

export function meta(_: Route.MetaArgs) {
  return buildMeta({
    title: "Mentions légales | Mode Kin",
    description: "Mentions légales du site de Mode Kin : éditeur, hébergeur et propriété intellectuelle.",
    path: "/mentions-legales",
  });
}

export const links = () => [canonical("/mentions-legales")];

export default function MentionsLegales() {
  const { address } = SITE;
  return (
    <LegalLayout title="Mentions légales" updatedAt="1er août 2026" path="/mentions-legales">
      <h2>Éditeur du site</h2>
      <p>
        Le présent site est édité par {SITE.legalName} (« {SITE.name} »), entreprise de travaux du
        bâtiment. Adresse : {address.street}, {address.city}, {address.region}, {address.country}.
        Téléphone : {SITE.phone}. Email : {SITE.email}.
      </p>

      <h2>Directeur de la publication</h2>
      <p>
        Le directeur de la publication est le représentant légal de {SITE.legalName}. Pour toute
        question relative au site, vous pouvez nous écrire à l'adresse {SITE.email}.
      </p>

      <h2>Hébergement</h2>
      <p>
        Le site est hébergé par un prestataire d'hébergement web assurant la mise à disposition et
        la disponibilité du site. Les coordonnées complètes de l'hébergeur sont disponibles sur
        simple demande à {SITE.email}.
      </p>

      <h2>Propriété intellectuelle</h2>
      <p>
        L'ensemble des contenus présents sur ce site (textes, images, logos, éléments graphiques et
        mise en forme) est protégé par le droit de la propriété intellectuelle. Toute reproduction,
        représentation ou diffusion, totale ou partielle, sans autorisation écrite préalable de{" "}
        {SITE.legalName} est interdite.
      </p>

      <h2>Responsabilité</h2>
      <p>
        {SITE.name} s'efforce d'assurer l'exactitude des informations diffusées sur ce site, mais ne
        saurait être tenue responsable des erreurs, omissions ou d'une indisponibilité temporaire du
        service. Les informations tarifaires sont fournies à titre indicatif et ne constituent pas un
        engagement contractuel.
      </p>
    </LegalLayout>
  );
}
