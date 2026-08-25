import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryRouter, RouterProvider } from "react-router";
import { expect, test } from "vitest";
import ProjectDetail, { meta } from "./project-detail";
import { projects } from "~/data/projects";

function renderAt(slug: string) {
  const router = createMemoryRouter([{ path: "/realisations/:slug", element: <ProjectDetail /> }], {
    initialEntries: [`/realisations/${slug}`],
  });
  render(<RouterProvider router={router} />);
}

const sample = projects[0];

test("affiche le titre, le lieu et le lien vers le service parent", () => {
  renderAt(sample.slug);
  expect(screen.getByRole("heading", { level: 1, name: new RegExp(sample.title, "i") })).toBeInTheDocument();
  expect(screen.getByText(sample.location!)).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /décoration|peinture|carrelage|plomberie|menuiserie/i })).toHaveAttribute(
    "href",
    `/services/${sample.category}`,
  );
});

test("ouvre la visionneuse au clic sur une image", async () => {
  renderAt(sample.slug);
  await userEvent.click(screen.getAllByRole("button", { name: /agrandir/i })[0]);
  expect(await screen.findByRole("dialog")).toBeInTheDocument();
});

test("meta inclut le schema du projet et le fil d'Ariane", () => {
  const m = meta({ params: { slug: sample.slug } } as never);
  expect(m.filter((d: Record<string, unknown>) => "script:ld+json" in d).length).toBeGreaterThanOrEqual(2);
});

test("un slug inconnu affiche l'état introuvable", () => {
  renderAt("inconnu");
  expect(screen.getByText(/introuvable/i)).toBeInTheDocument();
});
