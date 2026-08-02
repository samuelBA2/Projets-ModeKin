import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import Home, { meta } from "./home";

test("le hero contient un h1 unique et les deux CTA", () => {
  render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>,
  );
  expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
  // « Demander un devis » apparaît dans le hero et dans la bande CTA finale : les deux pointent vers /devis.
  const devisLinks = screen.getAllByRole("link", { name: /demander un devis/i });
  expect(devisLinks.length).toBeGreaterThanOrEqual(1);
  devisLinks.forEach((l) => expect(l).toHaveAttribute("href", "/devis"));
  // Le hero propose « Nos réalisations » (le pied de section « Voir toutes nos réalisations » pointe aussi vers /realisations).
  const realisationsLinks = screen.getAllByRole("link", { name: /nos réalisations/i });
  expect(realisationsLinks.length).toBeGreaterThanOrEqual(1);
  realisationsLinks.forEach((l) => expect(l).toHaveAttribute("href", "/realisations"));
});

test("meta déclare un titre et un JSON-LD LocalBusiness", () => {
  const m = meta({} as never);
  expect(m.some((d: Record<string, unknown>) => "title" in d)).toBe(true);
  expect(m.some((d: Record<string, unknown>) => "script:ld+json" in d)).toBe(true);
});
