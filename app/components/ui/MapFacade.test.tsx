import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, test } from "vitest";
import { MapFacade } from "./MapFacade";

test("l'iframe n'est chargée qu'après le clic", async () => {
  render(<MapFacade src="https://maps.example/embed" title="Carte Mode Kin" />);
  expect(screen.queryByTitle("Carte Mode Kin")).not.toBeInTheDocument();
  await userEvent.click(screen.getByRole("button", { name: /afficher la carte/i }));
  expect(await screen.findByTitle("Carte Mode Kin")).toBeInTheDocument();
});
