import { afterEach, describe, expect, test, vi } from "vitest";
import { buildWhatsAppMessage, buildWhatsAppUrl, submitForm } from "./submit";
import { SITE } from "~/data/site.config";

describe("buildWhatsAppMessage", () => {
  test("le message de contact reprend les champs et le libellé de prestation", () => {
    const msg = buildWhatsAppMessage("contact", {
      name: "Jean",
      phone: "+243900000000",
      email: "j@ex.com",
      service: "carrelage",
      message: "Bonjour.",
      website: "",
    });
    expect(msg).toContain("Nom : Jean");
    expect(msg).toContain("Téléphone : +243900000000");
    expect(msg).toContain("Prestation : Carrelage & revêtements"); // slug → titre
    expect(msg).toContain("Message : Bonjour.");
  });

  test("le message de devis ajoute description, budget et délai", () => {
    const msg = buildWhatsAppMessage("devis", {
      name: "A",
      phone: "+243900000000",
      email: "a@b.com",
      service: "plomberie",
      description: "Salle de bain.",
      budget: "1 000 – 5 000 $",
      delay: "1 à 3 mois",
      website: "",
    });
    expect(msg).toContain("Description : Salle de bain.");
    expect(msg).toContain("Budget : 1 000 – 5 000 $");
    expect(msg).toContain("Délai : 1 à 3 mois");
  });
});

describe("buildWhatsAppUrl", () => {
  test("pointe vers le numéro de l'entreprise avec le texte encodé", () => {
    const url = buildWhatsAppUrl("contact", { name: "Jean", service: "carrelage" });
    expect(url.startsWith(`https://wa.me/${SITE.whatsapp}?text=`)).toBe(true);
    expect(decodeURIComponent(url)).toContain("Nom : Jean");
  });
});

describe("submitForm", () => {
  afterEach(() => vi.restoreAllMocks());

  test("ouvre WhatsApp et renvoie ok + url", () => {
    const open = vi.spyOn(window, "open").mockReturnValue({} as Window);
    const res = submitForm("contact", {
      name: "A",
      phone: "+243900000000",
      email: "a@b.com",
      service: "carrelage",
      message: "Bonjour.",
      website: "",
    });
    expect(res.ok).toBe(true);
    expect(res.url).toContain(`wa.me/${SITE.whatsapp}`);
    expect(open).toHaveBeenCalledOnce();
  });
});
