import { z } from "zod";

/**
 * Champ honeypot anti-spam : invisible pour un humain, souvent rempli par
 * les robots. Doit rester vide pour que le formulaire soit valide.
 */
const honeypot = z.string().max(0, { message: "Champ invalide." }).optional().or(z.literal(""));

const baseFields = {
  name: z.string().trim().min(1, { message: "Merci d'indiquer votre nom." }),
  phone: z.string().trim().min(6, { message: "Merci d'indiquer un numéro de téléphone valide." }),
  email: z.string().trim().email({ message: "Merci d'indiquer une adresse email valide." }),
  service: z.string().trim().min(1, { message: "Merci de choisir une prestation." }),
  website: honeypot,
};

export const contactSchema = z.object({
  ...baseFields,
  message: z.string().trim().min(10, { message: "Votre message doit contenir au moins 10 caractères." }),
});

export const devisSchema = z.object({
  ...baseFields,
  description: z.string().trim().min(10, { message: "Merci de décrire votre projet (10 caractères minimum)." }),
  budget: z.string().trim().min(1, { message: "Merci d'indiquer un budget indicatif." }),
  delay: z.string().trim().min(1, { message: "Merci d'indiquer un délai souhaité." }),
});

export type ContactValues = z.infer<typeof contactSchema>;
export type DevisValues = z.infer<typeof devisSchema>;
