import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { expect, test } from "vitest";
import Tarifs from "./tarifs";

test("affiche les 4 offres et un lien devis", () => {
  render(
    <MemoryRouter>
      <Tarifs />
    </MemoryRouter>,
  );
  ["Diagnostic", "Standard", "Premium", "Entreprise"].forEach((n) =>
    expect(screen.getByText(n)).toBeInTheDocument(),
  );
  expect(screen.getAllByRole("link", { name: /demander un devis/i })[0]).toHaveAttribute("href", "/devis");
});

test("mentionne le caractère indicatif des prix", () => {
  render(
    <MemoryRouter>
      <Tarifs />
    </MemoryRouter>,
  );
  expect(screen.getAllByText(/indicatif/i)[0]).toBeInTheDocument();
});
