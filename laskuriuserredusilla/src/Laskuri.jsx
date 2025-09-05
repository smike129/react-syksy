import * as React from "react";
import { useLaskuri, types } from "./LaskuriContext";

function Naytto() {
  const { state } = useLaskuri();
  return <p>Nykyinen arvo: {state.laskuri}</p>;
}

function KasvataBtn() {
  const { dispatch } = useLaskuri();
  return <button onClick={() => dispatch({ type: types.KASVATA })}>+1</button>;
}

function VahennaBtn() {
  const { dispatch } = useLaskuri();
  return <button onClick={() => dispatch({ type: types.VAHENNA })}>-1</button>;
}

function NollaaBtn() {
  const { dispatch } = useLaskuri();
  return (
    <button onClick={() => dispatch({ type: types.NOLLAA })}>Nollaa</button>
  );
}

export default function Laskuri() {
  return (
    <div>
      <Naytto />
      <KasvataBtn />
      <VahennaBtn />
      <NollaaBtn />
    </div>
  );
}
