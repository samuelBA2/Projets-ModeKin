import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { ServicesPreview } from "./ServicesPreview";

test("lie chaque service à sa page dédiée", () => {
  render(
    <MemoryRouter>
      <ServicesPreview />
    </MemoryRouter>,
  );
  expect(screen.getByRole("link", { name: /carrelage/i })).toHaveAttribute("href", "/services/carrelage");
});
