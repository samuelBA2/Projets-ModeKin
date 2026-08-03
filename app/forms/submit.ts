import { SITE } from "~/data/site.config";

/**
 * Envoie les données d'un formulaire (contact ou devis).
 *
 * Mode démonstration : tant que `SITE.forms.endpoint` n'est pas configuré
 * (chaîne vide), aucune requête réseau n'est effectuée — on simule un envoi
 * réussi après un court délai. Une fois un endpoint (Formspree, EmailJS...)
 * renseigné, les données sont envoyées en JSON par POST.
 */
export async function submitForm(
  kind: "contact" | "devis",
  values: Record<string, unknown>,
): Promise<{ ok: boolean }> {
  if (!SITE.forms.endpoint) {
    await new Promise((r) => setTimeout(r, 400)); // démonstration : aucun endpoint configuré
    return { ok: true };
  }
  const res = await fetch(SITE.forms.endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ kind, ...values }),
  });
  return { ok: res.ok };
}
