import { afterEach, describe, expect, test, vi } from "vitest";
import { submitForm } from "./submit";

describe("submitForm", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  test("sans endpoint configuré, l'envoi réussit en mode démonstration", async () => {
    vi.useFakeTimers();
    const promise = submitForm("contact", {
      name: "A",
      phone: "+243900000000",
      email: "a@b.com",
      service: "carrelage",
      message: "Bonjour.",
      website: "",
    });
    await vi.advanceTimersByTimeAsync(400);
    const res = await promise;
    expect(res.ok).toBe(true);
  });
});
