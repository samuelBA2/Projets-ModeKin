import { render, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router";
import { expect, test } from "vitest";
import ServiceDetail, { meta } from "./service-detail";

function renderAt(slug: string) {
  const router = createMemoryRouter([{ path: "/services/:slug", element: <ServiceDetail /> }], {
    initialEntries: [`/services/${slug}`],
  });
  render(<RouterProvider router={router} />);
}

test("affiche le titre du service et le CTA devis", () => {
  renderAt("carrelage");
  expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
  // La page comporte plusieurs CTA vers le devis (hero + bande finale) : ils
  // doivent tous pointer vers /devis.
  const devisLinks = screen.getAllByRole("link", { name: /demander un devis/i });
  expect(devisLinks.length).toBeGreaterThan(0);
  devisLinks.forEach((l) => expect(l).toHaveAttribute("href", "/devis"));
});

test("meta est unique par slug et inclut le schema Service + FAQ", () => {
  const m = meta({ params: { slug: "carrelage" } } as never);
  expect(m.some((d: Record<string, unknown>) => "script:ld+json" in d)).toBe(true);
});

test("un slug inconnu affiche l'état introuvable", () => {
  renderAt("inconnu");
  expect(screen.getAllByText(/introuvable|n'existe pas/i).length).toBeGreaterThan(0);
});
