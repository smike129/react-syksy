import { useEffect, useState } from "react";
import "./JaateloList.css";

const API_URL = "http://localhost:3007/rest/jäätelöt";

function Jaatelolista({ hakusana, muokkaa, paivita }) {
  const [tuotteet, setTuotteet] = useState([]);
  const [virhe, setVirhe] = useState("");

  useEffect(() => {
    const fetchTuotteet = async () => {
      try {
        const res = await fetch(API_URL);
        const data = await res.json();
        setTuotteet(data);
      } catch (e) {
        setVirhe("Virhe haettaessa tuotteita");
      }
    };
    fetchTuotteet();
  }, [paivita]);

  const poista = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      const res = await fetch(API_URL);
      const data = await res.json();
      setTuotteet(data);
    } catch (err) {
      setVirhe("Virhe poistettaessa tuotetta");
    }
  };

  if (virhe) return <div>{virhe}</div>;

  return (
    <div>
      <h2>Jäätelötuotteet</h2>
      <ul className="listContainer">
        {tuotteet
          .filter(
            (t) =>
              !hakusana || t.nimi.toLowerCase().includes(hakusana.toLowerCase())
          )
          .map((t) => (
            <li key={t.id}>
              <b>{t.nimi}</b> ({t.hinta} €)
              {t.kuva && (
                <img
                  src={`http://localhost:3007/jäätelöt/kuvat?nimi=${t.kuva}`}
                  alt={t.nimi}
                  width={50}
                />
              )}
              <button onClick={() => muokkaa(t)}>Muokkaa</button>
              <button onClick={() => poista(t.id)}>Poista</button>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default Jaatelolista;
