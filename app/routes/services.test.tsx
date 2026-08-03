import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { expect, test } from "vitest";
import Services from "./services";
import { services } from "~/data/services";

test("liste les 5 services avec un lien vers chaque page dédiée", () => {
  render(
    <MemoryRouter>
      <Services />
    </MemoryRouter>,
  );
  for (const s of services) {
    const link = screen.getByRole("link", { name: new RegExp(s.title, "i") });
    expect(link).toHaveAttribute("href", `/services/${s.slug}`);
  }
});
