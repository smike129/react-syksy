import { useState } from "react";

const Haku = ({ setHakusana }) => (
  <input
    placeholder="Hae nimellä"
    onChange={(e) => setHakusana(e.target.value)}
    aria-label="Hae nimellä"
    style={{
      color: "#222",
      fontSize: "1.2em",
      padding: "0.7em 1em",
      borderRadius: "8px",
      border: "1px solid #cfd8dc",
      background: "#fff",
      margin: "1em 0",
      width: "320px",
      fontWeight: 500,
    }}
    className="hakuInput"
  />
);

export default Haku;
