import { SITE } from "~/data/site.config";
import { getService } from "~/data/services";

export type FormKind = "contact" | "devis";

export type SubmitResult = { ok: boolean; url: string };

/** Libellé lisible d'une prestation à partir de son slug (ou la valeur brute). */
function serviceLabel(value: unknown): string {
  const slug = String(value ?? "");
  return getService(slug)?.title ?? slug;
}

/** Construit le message texte envoyé sur WhatsApp à partir des champs du formulaire. */
export function buildWhatsAppMessage(kind: FormKind, values: Record<string, unknown>): string {
  const v = (k: string) => String(values[k] ?? "").trim();
  const lines: string[] =
    kind === "contact"
      ? [
          "Bonjour Mode Kin, nouvelle demande de contact :",
          "",
          `Nom : ${v("name")}`,
          `Téléphone : ${v("phone")}`,
          `Email : ${v("email")}`,
          `Prestation : ${serviceLabel(values.service)}`,
          `Message : ${v("message")}`,
        ]
      : [
          "Bonjour Mode Kin, nouvelle demande de devis :",
          "",
          `Nom : ${v("name")}`,
          `Téléphone : ${v("phone")}`,
          `Email : ${v("email")}`,
          `Prestation : ${serviceLabel(values.service)}`,
          `Description : ${v("description")}`,
          `Budget : ${v("budget")}`,
          `Délai : ${v("delay")}`,
        ];
  return lines.join("\n");
}

/** URL WhatsApp (wa.me) vers le numéro de l'entreprise, message prérempli. */
export function buildWhatsAppUrl(kind: FormKind, values: Record<string, unknown>): string {
  const text = encodeURIComponent(buildWhatsAppMessage(kind, values));
  return `https://wa.me/${SITE.whatsapp}?text=${text}`;
}

/**
 * « Envoie » le formulaire en ouvrant WhatsApp vers le numéro de l'entreprise
 * avec le message prérempli : le client n'a plus qu'à appuyer sur Envoyer et le
 * message arrive sur le téléphone de Mode Kin. Aucun serveur requis.
 *
 * On tente `window.open` (nouvel onglet) ; si le navigateur le bloque — Safari
 * peut le faire après la validation asynchrone — on bascule sur la navigation
 * directe. Dans tous les cas, l'URL est renvoyée pour proposer un lien de
 * secours cliquable dans l'interface.
 */
export function submitForm(kind: FormKind, values: Record<string, unknown>): SubmitResult {
  const url = buildWhatsAppUrl(kind, values);
  if (typeof window !== "undefined") {
    const opened = window.open(url, "_blank", "noopener,noreferrer");
    if (!opened) window.location.href = url;
  }
  return { ok: true, url };
}
