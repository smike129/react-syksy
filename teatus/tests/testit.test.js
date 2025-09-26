import { describe, it, expect } from "vitest";
import { validoiKentat } from "../src/utils/testit";

describe("validoiKentat", () => {
  it("palauttaa true kun kentät ovat kunnossa", () => {
    expect(validoiKentat("Suklaa", "3.5", {})).toBe(true);
  });

  it("palauttaa false jos nimi puuttuu", () => {
    expect(validoiKentat("", "3.5", {})).toBe(false);
  });

  it("palauttaa false jos kuva puuttuu", () => {
    expect(validoiKentat("Mansikka", "3.5", null)).toBe(false);
  });
});
