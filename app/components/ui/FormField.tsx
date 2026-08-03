import type { ReactNode } from "react";

type FormFieldProps = {
  /** Identifiant du champ, lie le label, l'input et le message d'erreur. */
  id: string;
  /** Libellé visible (jamais un simple placeholder). */
  label: string;
  /** Message d'erreur éventuel, affiché sous le champ. */
  error?: string;
  /** Champ obligatoire : ajoute un astérisque et `aria-required`. */
  required?: boolean;
  /** Texte d'aide persistant sous le champ. */
  hint?: string;
  /** Le contrôle de saisie (input, textarea, select…). */
  children: (props: {
    id: string;
    "aria-invalid": boolean;
    "aria-describedby": string | undefined;
    "aria-required": boolean;
  }) => ReactNode;
};

/**
 * Enveloppe de champ accessible : libellé visible lié via `htmlFor`, message
 * d'erreur sous le champ avec `role="alert"`, et `aria-describedby` pointant
 * vers l'aide et/ou l'erreur. Le contrôle reçoit les attributs ARIA calculés.
 */
export function FormField({ id, label, error, required, hint, children }: FormFieldProps) {
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;
  const describedBy = [hint ? hintId : null, error ? errorId : null].filter(Boolean).join(" ") || undefined;

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="font-sans text-sm font-medium text-ink">
        {label}
        {required && (
          <span className="text-gold" aria-hidden="true">
            {" "}
            *
          </span>
        )}
      </label>
      {hint && (
        <p id={hintId} className="text-sm text-ink/60">
          {hint}
        </p>
      )}
      {children({
        id,
        "aria-invalid": Boolean(error),
        "aria-describedby": describedBy,
        "aria-required": Boolean(required),
      })}
      {error && (
        <p id={errorId} role="alert" className="text-sm font-medium text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}

/** Classes communes aux contrôles de saisie : hauteur ≥ 44 px, focus géré globalement. */
export const CONTROL_CLASSES =
  "min-h-11 w-full rounded-xl border border-border bg-surface px-4 py-2.5 font-sans text-ink " +
  "placeholder:text-ink/40 aria-[invalid=true]:border-red-600";
