import { render, screen } from "@testing-library/react";
import Home from "./home";

test("la page d'accueil affiche le nom de l'entreprise", () => {
  render(<Home />);
  expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Mode Kin");
});
