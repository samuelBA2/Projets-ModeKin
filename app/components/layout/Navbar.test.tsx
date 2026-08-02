import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router";
import { Navbar } from "./Navbar";

test("expose la navigation principale et le CTA devis", () => {
  render(
    <MemoryRouter>
      <Navbar />
    </MemoryRouter>,
  );
  expect(screen.getByRole("navigation", { name: /principale/i })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /demander un devis/i })).toHaveAttribute("href", "/devis");
});

test("le bouton hamburger ouvre le menu mobile", async () => {
  render(
    <MemoryRouter>
      <Navbar />
    </MemoryRouter>,
  );
  const toggle = screen.getByRole("button", { name: /ouvrir le menu/i });
  expect(toggle).toHaveAttribute("aria-expanded", "false");
  await userEvent.click(toggle);
  expect(toggle).toHaveAttribute("aria-expanded", "true");
});
