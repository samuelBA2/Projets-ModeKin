import { Link } from "react-router";
import { SITE } from "~/data/site.config";

const NAV_LINKS = [
  { label: "Accueil", to: "/" },
  { label: "Services", to: "/services" },
  { label: "Réalisations", to: "/realisations" },
  { label: "Tarifs", to: "/tarifs" },
  { label: "Contact", to: "/contact" },
];

const LEGAL_LINKS = [
  { label: "Mentions légales", to: "/mentions-legales" },
  { label: "Politique de confidentialité", to: "/politique-confidentialite" },
  { label: "Conditions d'utilisation", to: "/conditions-utilisation" },
];

/** Pied de page : coordonnées, horaires, liens rapides, réseaux sociaux et mentions légales. */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-black text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-12 md:grid-cols-4">
        <div>
          <p className="font-serif text-lg font-semibold">{SITE.name}</p>
          <p className="mt-2 text-sm text-white/70">{SITE.description}</p>
        </div>

        <nav aria-label="Liens rapides">
          <h2 className="font-medium text-white">Liens rapides</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {NAV_LINKS.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="text-white/70 hover:text-gold-light">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="font-medium text-white">Coordonnées</h2>
          <ul className="mt-3 space-y-2 text-sm text-white/70">
            <li>
              <a href={`tel:${SITE.phone}`} className="hover:text-gold-light">
                {SITE.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${SITE.email}`} className="hover:text-gold-light">
                {SITE.email}
              </a>
            </li>
            <li>
              <a href={SITE.mapsUrl} className="hover:text-gold-light">
                {SITE.address.street}, {SITE.address.city}, {SITE.address.country}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="font-medium text-white">Horaires</h2>
          <ul className="mt-3 space-y-2 text-sm text-white/70">
            {SITE.hours.map((slot) => (
              <li key={slot.days}>
                {slot.days} : {slot.open}
              </li>
            ))}
          </ul>
          {SITE.socials.length > 0 && (
            <ul className="mt-4 flex gap-4 text-sm">
              {SITE.socials.map((social) => (
                <li key={social.href}>
                  <a href={social.href} className="text-white/70 hover:text-gold-light">
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-6 text-xs text-white/60 md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {SITE.legalName}. Tous droits réservés.
          </p>
          <ul className="flex flex-wrap gap-4">
            {LEGAL_LINKS.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="hover:text-gold-light">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
