import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { Breadcrumbs } from "./Breadcrumbs";

test("rend une navigation étiquetée avec les liens intermédiaires", () => {
  render(
    <MemoryRouter>
      <Breadcrumbs
        items={[
          { name: "Accueil", path: "/" },
          { name: "Services", path: "/services" },
          { name: "Carrelage", path: "/services/carrelage" },
        ]}
      />
    </MemoryRouter>,
  );
  expect(screen.getByRole("navigation", { name: /fil d'ariane/i })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: "Services" })).toHaveAttribute("href", "/services");
});
