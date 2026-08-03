import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send } from "lucide-react";
import { contactSchema, type ContactValues } from "~/forms/schemas";
import { submitForm } from "~/forms/submit";
import { services } from "~/data/services";
import { Button } from "~/components/ui/Button";
import { FormField, CONTROL_CLASSES } from "~/components/ui/FormField";

type Status = "idle" | "sending" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const {
    register,
    handleSubmit,
    setFocus,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    mode: "onBlur",
    defaultValues: { name: "", phone: "", email: "", service: "", message: "", website: "" },
  });

  const onError = () => {
    const first = Object.keys(errors)[0] as keyof ContactValues | undefined;
    if (first) setFocus(first);
  };

  const onSubmit = async (values: ContactValues) => {
    setStatus("sending");
    try {
      const res = await submitForm("contact", values);
      if (res.ok) {
        setStatus("success");
        reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)} noValidate className="flex flex-col gap-5">
      {/* Honeypot anti-spam : masqué aux humains, ignoré des lecteurs d'écran. */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="contact-website">Ne pas remplir</label>
        <input id="contact-website" type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
      </div>

      <FormField id="contact-name" label="Nom" required error={errors.name?.message}>
        {(a) => <input type="text" autoComplete="name" className={CONTROL_CLASSES} {...a} {...register("name")} />}
      </FormField>

      <div className="grid gap-5 sm:grid-cols-2">
        <FormField id="contact-phone" label="Téléphone" required error={errors.phone?.message}>
          {(a) => <input type="tel" autoComplete="tel" className={CONTROL_CLASSES} {...a} {...register("phone")} />}
        </FormField>
        <FormField id="contact-email" label="Email" required error={errors.email?.message}>
          {(a) => (
            <input type="email" autoComplete="email" className={CONTROL_CLASSES} {...a} {...register("email")} />
          )}
        </FormField>
      </div>

      <FormField id="contact-service" label="Prestation" required error={errors.service?.message}>
        {(a) => (
          <select className={CONTROL_CLASSES} defaultValue="" {...a} {...register("service")}>
            <option value="" disabled>
              Choisir une prestation…
            </option>
            {services.map((s) => (
              <option key={s.slug} value={s.slug}>
                {s.title}
              </option>
            ))}
          </select>
        )}
      </FormField>

      <FormField id="contact-message" label="Message" required error={errors.message?.message}>
        {(a) => <textarea rows={5} className={CONTROL_CLASSES} {...a} {...register("message")} />}
      </FormField>

      <div className="flex flex-wrap items-center gap-4">
        <Button type="submit" disabled={isSubmitting}>
          <Send aria-hidden="true" className="h-4 w-4" />
          {isSubmitting ? "Envoi en cours…" : "Envoyer le message"}
        </Button>
      </div>

      {/* État d'envoi annoncé aux lecteurs d'écran. */}
      <p aria-live="polite" className="text-sm">
        {status === "success" && (
          <span className="font-medium text-green-700">
            Merci, votre message a bien été envoyé. Nous vous recontactons rapidement.
          </span>
        )}
        {status === "error" && (
          <span className="font-medium text-red-700">
            Une erreur est survenue. Merci de réessayer ou de nous appeler directement.
          </span>
        )}
      </p>
    </form>
  );
}
