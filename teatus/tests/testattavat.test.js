import { describe, it, expect } from "vitest";
import {
  kertaaKaksi,
  onParillinen,
  muodostaNimi,
} from "../src/utils/testattavat";

describe("kertaaKaksi", () => {
  it("kertoo positiivisen kokonaisluvun kahdella", () => {
    expect(kertaaKaksi(7)).toBe(14);
  });

  it("kertoo nollan kahdella", () => {
    expect(kertaaKaksi(0)).toBe(0);
  });
});

describe("onParillinen", () => {
  it("palauttaa true parilliselle luvulle", () => {
    expect(onParillinen(8)).toBe(true);
  });

  it("palauttaa false parittomalle luvulle", () => {
    expect(onParillinen(9)).toBe(false);
  });
});

describe("muodostaNimi", () => {
  it("muodostaa nimen perusmuodossa", () => {
    expect(muodostaNimi("Matti", "Meikäläinen")).toBe("Matti Meikäläinen");
  });

  it("leikkaa ylimääräiset välilyönnit nimestä", () => {
    expect(muodostaNimi("  Liisa ", "  Virtanen  ")).toBe("Liisa Virtanen");
  });
});
