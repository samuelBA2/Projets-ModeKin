import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Lightbox } from "./Lightbox";

const imgs = [
  { src: "/a.jpg", alt: "Photo A", width: 800, height: 600 },
  { src: "/b.jpg", alt: "Photo B", width: 800, height: 600 },
];

test("affiche l'image active dans un dialogue modal", () => {
  render(<Lightbox images={imgs} index={0} onClose={() => {}} onNavigate={() => {}} />);
  const dlg = screen.getByRole("dialog");
  expect(dlg).toHaveAttribute("aria-modal", "true");
  expect(screen.getByAltText("Photo A")).toBeInTheDocument();
});
test("Échap déclenche la fermeture", async () => {
  const onClose = vi.fn();
  render(<Lightbox images={imgs} index={0} onClose={onClose} onNavigate={() => {}} />);
  await userEvent.keyboard("{Escape}");
  expect(onClose).toHaveBeenCalled();
});
test("ne rend rien si index est null", () => {
  const { container } = render(
    <Lightbox images={imgs} index={null} onClose={() => {}} onNavigate={() => {}} />,
  );
  expect(container).toBeEmptyDOMElement();
});
