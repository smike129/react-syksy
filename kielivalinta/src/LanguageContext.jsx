import { createContext, useContext, useReducer } from "react";

export const translations = {
  fi: {
    title: "Tervetuloa",
    label: "Valitse kieli:",
    current: "Nykyinen kieli:",
  },
  en: {
    title: "Welcome",
    label: "Select language:",
    current: "Current language:",
  },
  sv: {
    title: "Välkommen",
    label: "Välj språk:",
    current: "Aktuellt språk:",
  },
};

const LanguageContext = createContext(null);

const initialState = { lang: "fi" };

const VAIHDA_KIELI = "VAIHDA_KIELI";

function languageReducer(state, action) {
  switch (action.type) {
    case VAIHDA_KIELI:
      return { ...state, lang: action.payload };
    default:
      return state;
  }
}

export function LanguageProvider({ children }) {
  const [state, dispatch] = useReducer(languageReducer, initialState);
  return (
    <LanguageContext.Provider value={{ state, dispatch }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);

}

export const langTypes = { VAIHDA_KIELI };
