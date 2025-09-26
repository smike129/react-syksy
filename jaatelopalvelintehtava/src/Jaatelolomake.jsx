import { useState, useEffect } from "react";
import JaateloForm from "./JaateloForm";


function Jaatelolomake({ muokattava, paivita, peruuta }) {

  return (
    <div>
      <JaateloForm
        muokattava={muokattava}
        paivita={paivita}
        peruuta={peruuta}
        haeJaatelot={() => {}}
      />
    </div>
  );
}

export default Jaatelolomake;
