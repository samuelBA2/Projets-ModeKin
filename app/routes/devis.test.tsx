import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { expect, test } from "vitest";
import Devis from "./devis";

test("le formulaire de devis expose service, budget et délai", () => {
  render(
    <MemoryRouter>
      <Devis />
    </MemoryRouter>,
  );
  expect(screen.getByLabelText(/prestation/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/budget/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/délai/i)).toBeInTheDocument();
});
