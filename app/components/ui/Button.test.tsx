import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { Button } from "./Button";

test("le bouton lien rend un <a> vers la cible", () => {
  render(
    <MemoryRouter>
      <Button as="link" to="/devis">
        Devis
      </Button>
    </MemoryRouter>,
  );
  expect(screen.getByRole("link", { name: "Devis" })).toHaveAttribute("href", "/devis");
});

test("respecte la taille tactile minimale", () => {
  render(<Button>OK</Button>);
  expect(screen.getByRole("button")).toHaveClass("min-h-11");
});
