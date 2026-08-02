import { render, screen } from "@testing-library/react";
import { Stats } from "./Stats";
import { SITE } from "~/data/site.config";

test("affiche les trois statistiques de la config", () => {
  render(<Stats />);
  SITE.stats.forEach((s) => expect(screen.getByText(s.value)).toBeInTheDocument());
});
