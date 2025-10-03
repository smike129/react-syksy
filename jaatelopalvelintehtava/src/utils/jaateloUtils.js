
export function validoiKentat(nimi, hinta, kuva) {
  const nameValid = typeof nimi === "string" && nimi.trim().length > 0;
  const priceNumber = typeof hinta === "string" ? Number(hinta) : hinta;
  const priceValid =
    typeof priceNumber === "number" &&
    Number.isFinite(priceNumber) &&
    priceNumber >= 0;
  const imageValid =
    typeof kuva === "string" &&
    kuva.trim().length > 0 &&
    onKelvollinenKuva(kuva.trim());
  return nameValid && priceValid && imageValid;
}

export function muodostaUusiTuote({
  nimi,
  hinta,
  kuva,
  kuvaus = "",
  id = generateLocalId(),
}) {
  const priceNumber = typeof hinta === "string" ? Number(hinta) : hinta;
  return {
    id,
    nimi: String(nimi).trim(),
    hinta: Math.round((Number(priceNumber) + Number.EPSILON) * 100) / 100,
    kuva: String(kuva).trim(),
    kuvaus: String(kuvaus ?? ""),
    luotuPaivamaara: new Date().toISOString(),
  };
}

export function onKelvollinenKuva(tiedostoPolkuTaiNimi) {
  if (typeof tiedostoPolkuTaiNimi !== "string") return false;
  const filename = tiedostoPolkuTaiNimi.trim().toLowerCase();
  if (filename.length === 0) return false;
  const allowed = [".jpg", ".jpeg", ".png", ".gif", ".webp"];
  return allowed.some((ext) => filename.endsWith(ext));
}

export function formatHinta(hinta) {
  const priceNumber = typeof hinta === "string" ? Number(hinta) : hinta;
  if (!Number.isFinite(priceNumber)) return "€0.00";
  const rounded = Math.round((priceNumber + Number.EPSILON) * 100) / 100;
  return `€${rounded.toFixed(2)}`;
}

export function generateLocalId() {
  const time = Date.now().toString(36);
  const rand = Math.random().toString(36).slice(2, 8);
  return `${time}-${rand}`;
}
