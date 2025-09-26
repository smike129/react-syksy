import { useState } from "react";
import "./App.css";
import Jaatelolista from "./Jaatelolista";
import Jaatelolomake from "./Jaatelolomake";
import Haku from "./Haku";

function App() {
  const [muokattava, setMuokattava] = useState(null);
  const [paivitys, setPaivitys] = useState(0);
  const [hakusana, setHakusana] = useState("");

  function paivita() {
    setPaivitys((p) => p + 1);
  }
  function peruuta() {
    setMuokattava(null);
  }

  return (
    <div>
      <Jaatelolomake
        muokattava={muokattava}
        paivita={paivita}
        peruuta={peruuta}
      />
      <Haku setHakusana={setHakusana} />
      <Jaatelolista
        hakusana={hakusana}
        muokkaa={setMuokattava}
        paivita={paivitys}
      />
    </div>
  );
}

export default App;
