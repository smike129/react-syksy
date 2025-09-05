import React from "react";
import { LaskuriProvider } from "./LaskuriContext";
import Laskuri from "./Laskuri";

function App() {
  return (
    <LaskuriProvider>
      <div>
        <Laskuri />
      </div>
    </LaskuriProvider>
  );
}

export default App;
