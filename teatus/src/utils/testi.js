export function validoiKentat(nimi, hinta, kuvatiedosto) {
    return nimi.trim() !== '' && hinta.trim() !== '' && kuvatiedosto != null;
  }
