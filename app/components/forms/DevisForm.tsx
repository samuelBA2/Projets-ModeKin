import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send } from "lucide-react";
import { devisSchema, type DevisValues } from "~/forms/schemas";
import { submitForm } from "~/forms/submit";
import { services } from "~/data/services";
import { Button } from "~/components/ui/Button";
import { FormField, CONTROL_CLASSES } from "~/components/ui/FormField";

type Status = "idle" | "sending" | "success" | "error";

const BUDGETS = ["Moins de 1 000 €", "1 000 – 5 000 €", "5 000 – 15 000 €", "Plus de 15 000 €"];
const DELAIS = ["Dès que possible", "Sous 1 mois", "1 à 3 mois", "Plus de 3 mois"];

type DevisFormProps = {
  /** Prestation pré-sélectionnée (ex. depuis `?service=` sur la page devis). */
  defaultService?: string;
};

export function DevisForm({ defaultService = "" }: DevisFormProps) {
  const [status, setStatus] = useState<Status>("idle");
  const validService = services.some((s) => s.slug === defaultService) ? defaultService : "";
  const {
    register,
    handleSubmit,
    setFocus,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<DevisValues>({
    resolver: zodResolver(devisSchema),
    mode: "onBlur",
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      service: validService,
      description: "",
      budget: "",
      delay: "",
      website: "",
    },
  });

  const onError = () => {
    const first = Object.keys(errors)[0] as keyof DevisValues | undefined;
    if (first) setFocus(first);
  };

  const onSubmit = async (values: DevisValues) => {
    setStatus("sending");
    try {
      const res = await submitForm("devis", values);
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
      <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="devis-website">Ne pas remplir</label>
        <input id="devis-website" type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
      </div>

      <FormField id="devis-name" label="Nom" required error={errors.name?.message}>
        {(a) => <input type="text" autoComplete="name" className={CONTROL_CLASSES} {...a} {...register("name")} />}
      </FormField>

      <div className="grid gap-5 sm:grid-cols-2">
        <FormField id="devis-phone" label="Téléphone" required error={errors.phone?.message}>
          {(a) => <input type="tel" autoComplete="tel" className={CONTROL_CLASSES} {...a} {...register("phone")} />}
        </FormField>
        <FormField id="devis-email" label="Email" required error={errors.email?.message}>
          {(a) => (
            <input type="email" autoComplete="email" className={CONTROL_CLASSES} {...a} {...register("email")} />
          )}
        </FormField>
      </div>

      <FormField id="devis-service" label="Prestation souhaitée" required error={errors.service?.message}>
        {(a) => (
          <select className={CONTROL_CLASSES} {...a} {...register("service")}>
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

      <FormField
        id="devis-description"
        label="Description du projet"
        required
        hint="Surface, pièces concernées, état actuel, objectifs…"
        error={errors.description?.message}
      >
        {(a) => <textarea rows={5} className={CONTROL_CLASSES} {...a} {...register("description")} />}
      </FormField>

      <div className="grid gap-5 sm:grid-cols-2">
        <FormField id="devis-budget" label="Budget estimé" required error={errors.budget?.message}>
          {(a) => (
            <select className={CONTROL_CLASSES} defaultValue="" {...a} {...register("budget")}>
              <option value="" disabled>
                Choisir une fourchette…
              </option>
              {BUDGETS.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          )}
        </FormField>
        <FormField id="devis-delay" label="Délai souhaité" required error={errors.delay?.message}>
          {(a) => (
            <select className={CONTROL_CLASSES} defaultValue="" {...a} {...register("delay")}>
              <option value="" disabled>
                Choisir un délai…
              </option>
              {DELAIS.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          )}
        </FormField>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <Button type="submit" disabled={isSubmitting}>
          <Send aria-hidden="true" className="h-4 w-4" />
          {isSubmitting ? "Envoi en cours…" : "Envoyer ma demande de devis"}
        </Button>
      </div>

      <p aria-live="polite" className="text-sm">
        {status === "success" && (
          <span className="font-medium text-green-700">
            Merci, votre demande de devis a bien été envoyée. Nous revenons vers vous rapidement.
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
