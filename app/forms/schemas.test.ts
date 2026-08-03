import { describe, expect, test } from "vitest";
import { contactSchema, devisSchema } from "./schemas";

describe("contactSchema", () => {
  test("le contact exige nom, téléphone, email valide, service et message", () => {
    const bad = contactSchema.safeParse({ name: "", phone: "", email: "x", service: "", message: "" });
    expect(bad.success).toBe(false);
    const ok = contactSchema.safeParse({
      name: "Jean",
      phone: "+243900000000",
      email: "j@ex.com",
      service: "carrelage",
      message: "Bonjour, un devis svp.",
      website: "",
    });
    expect(ok.success).toBe(true);
  });

  test("le honeypot website doit rester vide", () => {
    const r = contactSchema.safeParse({
      name: "Jean",
      phone: "+243900000000",
      email: "j@ex.com",
      service: "carrelage",
      message: "Bonjour, un devis svp.",
      website: "http://spam.example",
    });
    expect(r.success).toBe(false);
  });
});

describe("devisSchema", () => {
  test("le devis exige budget et délai en plus", () => {
    const r = devisSchema.safeParse({
      name: "A",
      phone: "+243900000000",
      email: "a@b.com",
      service: "plomberie",
      description: "Salle de bain complète à rénover.",
      budget: "1000-5000",
      delay: "1-3 mois",
      website: "",
    });
    expect(r.success).toBe(true);
  });

  test("le devis échoue sans budget ni délai", () => {
    const r = devisSchema.safeParse({
      name: "A",
      phone: "+243900000000",
      email: "a@b.com",
      service: "plomberie",
      description: "Salle de bain complète à rénover.",
      budget: "",
      delay: "",
      website: "",
    });
    expect(r.success).toBe(false);
  });
});
