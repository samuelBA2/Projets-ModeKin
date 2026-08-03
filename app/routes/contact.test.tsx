import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { expect, test } from "vitest";
import Contact from "./contact";
import { SITE } from "~/data/site.config";

test("affiche le formulaire et les coordonnées cliquables", () => {
  render(
    <MemoryRouter>
      <Contact />
    </MemoryRouter>,
  );
  expect(screen.getByRole("button", { name: /envoyer/i })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: new RegExp(SITE.phone.replace("+", "\\+")) })).toHaveAttribute(
    "href",
    `tel:${SITE.phone}`,
  );
});
