import { useState, useRef, useEffect } from "react";
import "./JaateloForm.css";
import { createJaatelo } from "./api/createJaatelo";
import { updateJaatelo } from "./api/updateJaatelo";

function JaateloForm({ muokattava, paivita, peruuta, haeJaatelot }) {
  const [nimi, setNimi] = useState("");
  const [hinta, setHinta] = useState("");
  const [kuvatiedosto, setKuvatiedosto] = useState(null);
  const [muokattavaId, setMuokattavaId] = useState(null);
  const [virhe, setVirhe] = useState("");
  const fileInput = useRef();
  const API_URL = "http://localhost:3007/rest/jäätelöt";

  useEffect(() => {
    if (muokattava) {
      setNimi(muokattava.nimi || "");
      setHinta(muokattava.hinta || "");
      setMuokattavaId(muokattava.id);
      setKuvatiedosto(null);
      if (fileInput.current) fileInput.current.value = "";
    } else {
      tyhjennaLomake();
    }
  }, [muokattava]);

  const tyhjennaLomake = () => {
    setNimi("");
    setHinta("");
    setKuvatiedosto(null);
    setMuokattavaId(null);
    setVirhe("");
    if (fileInput.current) fileInput.current.value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nimi.trim() || !hinta || (!muokattavaId && !kuvatiedosto)) {
      setVirhe(
        "Kaikki kentät ovat pakollisia. Uutta tuotetta lisättäessä kuva on myös pakollinen."
      );
      return;
    }
    if (isNaN(Number(hinta)) || Number(hinta) <= 0) {
      setVirhe("Hinnan pitää olla positiivinen numero.");
      return;
    }
    setVirhe("");

    let kuvanNimi = muokattava?.kuva || "";
    try {
      if (kuvatiedosto) {
        const uploadRes = await fetch(
          "http://localhost:3007/rest/jäätelöt/kuvat",
          {
            method: "POST",
            headers: {
              "Datapalvelin-Tiedosto-Nimi": kuvatiedosto.name,
              "Content-Type": kuvatiedosto.type,
            },
            body: kuvatiedosto,
          }
        );
        kuvanNimi = await uploadRes.json();
      }

      const uusiTuote = {
        id: muokattavaId ?? Date.now() + Math.floor(Math.random() * 10000),
        nimi,
        hinta: Number(hinta),
        kuva: kuvanNimi,
      };

      if (muokattavaId) {
        await updateJaatelo(API_URL, muokattavaId, uusiTuote);
      } else {
        await createJaatelo(API_URL, uusiTuote);
      }
      await haeJaatelot();
      paivita();
      tyhjennaLomake();
      peruuta();
    } catch (err) {
      setVirhe("Virhe tallennettaessa tietoja");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="formContainer">
      <h2>{muokattavaId ? "Muokkaa" : "Lisää"} jäätelötuote</h2>
      {virhe && <div className="virhe">{virhe}</div>}
      <div>
        <label>
          Nimi:
          <input
            type="text"
            value={nimi}
            onChange={(e) => setNimi(e.target.value)}
            required
            placeholder="Hae nimellä"
          />
        </label>
      </div>
      <div>
        <label>
          Hinta:
          <input
            type="number"
            value={hinta}
            onChange={(e) => setHinta(e.target.value)}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Kuva:
          <input
            type="file"
            accept="image/*"
            ref={fileInput}
            onChange={(e) => setKuvatiedosto(e.target.files[0])}
          />
        </label>
        {muokattava && muokattava.kuva && (
          <img
            src={`http://localhost:3007/jäätelöt/kuvat?nimi=${muokattava.kuva}`}
            alt="esikatselu"
            width={50}
          />
        )}
      </div>
      <button type="submit">
        {" "}
        {muokattavaId ? "Päivitä tuote" : "Lisää tuote"}{" "}
      </button>
      {muokattavaId && (
        <button
          type="button"
          onClick={() => {
            tyhjennaLomake();
            peruuta();
          }}
        >
          Peruuta
        </button>
      )}
    </form>
  );
}

export default JaateloForm;
