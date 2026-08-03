import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { expect, test } from "vitest";
import MentionsLegales from "./mentions-legales";
import NotFound from "./not-found";

test("les mentions légales citent la raison sociale", () => {
  render(
    <MemoryRouter>
      <MentionsLegales />
    </MemoryRouter>,
  );
  expect(screen.getByRole("heading", { level: 1, name: /mentions légales/i })).toBeInTheDocument();
});

test("la 404 propose un retour à l'accueil", () => {
  render(
    <MemoryRouter>
      <NotFound />
    </MemoryRouter>,
  );
  expect(screen.getByRole("link", { name: /accueil/i })).toHaveAttribute("href", "/");
});
