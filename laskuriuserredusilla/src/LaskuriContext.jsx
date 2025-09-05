import { createContext, useContext, useReducer } from "react";

const LaskuriContext = createContext(null);

const initialState = { laskuri: 0 };

const KASVATA = "KASVATA";
const VAHENNA = "VAHENNA";
const NOLLAA = "NOLLAA";

function laskuriReducer(state, action) {
  switch (action.type) {
    case KASVATA:
      return { ...state, laskuri: state.laskuri + 1 };
    case VAHENNA:
      return { ...state, laskuri: state.laskuri - 1 };
    case NOLLAA:
      return { ...state, laskuri: 0 };
    default:
      return state;
  }
}

export function LaskuriProvider({ children }) {
  const [state, dispatch] = useReducer(laskuriReducer, initialState);
  return (
    <LaskuriContext.Provider value={{ state, dispatch }}>
      {children}
    </LaskuriContext.Provider>
  );
}

export function useLaskuri() {
  return useContext(LaskuriContext);
}

export const types = { KASVATA, VAHENNA, NOLLAA };
