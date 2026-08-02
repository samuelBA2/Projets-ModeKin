import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Link } from "react-router";

type ButtonVariant = "primary" | "secondary" | "ghost";

type ButtonOwnProps = {
  /** Rendu en `<button>` (par défaut) ou en `<Link>` react-router. */
  as?: "button" | "link";
  /** Cible du lien, requise quand `as="link"`. */
  to?: string;
  /** Style visuel du bouton. */
  variant?: ButtonVariant;
  children?: ReactNode;
};

export type ButtonProps = ButtonOwnProps & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children">;

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary: "bg-gold text-white hover:bg-gold-light",
  secondary: "bg-surface text-navy border border-border hover:bg-muted",
  ghost: "bg-transparent text-navy hover:bg-muted",
};

// Le focus visible (anneau doré) est géré globalement par la règle
// `:focus-visible` de app/app.css : inutile de la dupliquer ici.
const BASE_CLASSES =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-5 py-2.5 font-sans font-medium transition-colors disabled:pointer-events-none disabled:opacity-50";

/**
 * Bouton d'action réutilisable. Rend un `<Link>` react-router quand
 * `as="link"` (navigation interne) ou un `<button>` natif sinon.
 */
export function Button({ as = "button", to, variant = "primary", className, children, ...props }: ButtonProps) {
  const classes = [BASE_CLASSES, VARIANT_CLASSES[variant], className].filter(Boolean).join(" ");

  if (as === "link" && to) {
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" className={classes} {...props}>
      {children}
    </button>
  );
}
