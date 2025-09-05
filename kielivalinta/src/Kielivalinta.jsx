import React from "react";
import { useLanguage, langTypes, translations } from "./LanguageContext";

export default function Kielivalinta() {
  const { state, dispatch } = useLanguage();
  const t = translations[state.lang];

  return (
    <div className="container">
      <h1>{t.title}</h1>
      <label>
        {t.label}
        <select
          value={state.lang}
          onChange={(e) =>
            dispatch({ type: langTypes.VAIHDA_KIELI, payload: e.target.value })
          }
          className="language"
        >
          <option value="fi">suomi (fi)</option>
          <option value="sv">ruotsi (sv)</option>
          <option value="en">englanti (en)</option>
        </select>
      </label>
      <p>
        {t.current} <strong>{state.lang}</strong>
      </p>
    </div>
  );
}
