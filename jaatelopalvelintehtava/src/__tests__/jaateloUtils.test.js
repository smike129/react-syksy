import { describe, it, expect } from "vitest";
import {
  validoiKentat,
  muodostaUusiTuote,
  onKelvollinenKuva,
  formatHinta,
  generateLocalId,
} from "../utils/jaateloUtils";

describe("validoiKentat", () => {
  it("returns true for valid inputs and false for invalid ones", () => {
    expect(validoiKentat("Vanilja", 2.5, "kuva.jpg")).toBe(true);
    expect(validoiKentat("   ", 2.5, "kuva.jpg")).toBe(false);
  });
});

describe("muodostaUusiTuote", () => {
  it("returns correctly shaped product object", () => {
    const tuote = muodostaUusiTuote({
      nimi: "Vanilja",
      hinta: 2.345,
      kuva: "a.jpg",
    });
    expect(tuote.nimi).toBe("Vanilja");
    expect(tuote.hinta).toBe(2.35);
    expect(tuote.kuva).toBe("a.jpg");
    expect(typeof tuote.id).toBe("string");
  });
});

describe("onKelvollinenKuva", () => {
  it("accepts image files and rejects others", () => {
    expect(onKelvollinenKuva("pic.jpg")).toBe(true);
    expect(onKelvollinenKuva("doc.pdf")).toBe(false);
  });
});

describe("formatHinta", () => {
  it("adds euro sign and rounds to two decimals", () => {
    expect(formatHinta(2.345)).toBe("€2.35");
  });
});

describe("generateLocalId", () => {
  it("returns unique-like id strings", () => {
    const a = generateLocalId();
    const b = generateLocalId();
    expect(a).not.toBe(b);
  });
});
