import "@testing-library/jest-dom/vitest";

// jsdom n'implémente pas IntersectionObserver (utilisé par `useInView` de
// framer-motion dans `Reveal`). Un stub minimal suffit pour les tests : on ne
// vérifie pas ici le déclenchement de l'animation au scroll, seulement le
// rendu du contenu.
class IntersectionObserverStub implements IntersectionObserver {
  readonly root: Element | Document | null = null;
  readonly rootMargin: string = "";
  readonly thresholds: ReadonlyArray<number> = [];
  disconnect() {}
  observe() {}
  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
  unobserve() {}
}

vi.stubGlobal("IntersectionObserver", IntersectionObserverStub);
