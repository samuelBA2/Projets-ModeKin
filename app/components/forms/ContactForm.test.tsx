import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, test } from "vitest";
import { ContactForm } from "./ContactForm";

test("affiche des erreurs sous les champs quand on soumet vide", async () => {
  render(<ContactForm />);
  await userEvent.click(screen.getByRole("button", { name: /envoyer/i }));
  expect(await screen.findAllByRole("alert")).not.toHaveLength(0);
});

test("chaque champ a un libellé visible", () => {
  render(<ContactForm />);
  expect(screen.getByLabelText(/nom/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
});
