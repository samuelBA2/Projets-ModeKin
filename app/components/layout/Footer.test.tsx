import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { Footer } from "./Footer";

test("affiche les liens légaux et les coordonnées", () => {
  render(
    <MemoryRouter>
      <Footer />
    </MemoryRouter>,
  );
  expect(screen.getByRole("link", { name: /mentions légales/i })).toHaveAttribute("href", "/mentions-legales");
  expect(screen.getByRole("link", { name: /politique de confidentialité/i })).toHaveAttribute(
    "href",
    "/politique-confidentialite",
  );
  expect(screen.getByRole("link", { name: /conditions d'utilisation/i })).toHaveAttribute(
    "href",
    "/conditions-utilisation",
  );
});
