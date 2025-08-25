import { createContext, useContext, useState } from "react";

export const ThemeContext = createContext(null);
export const UserContext = createContext(null);

export default function Header() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { user } = useContext(UserContext);

  return (
    <div className="header">
      <div>Hei, {user || " "}</div>
      <button onClick={toggleTheme}>Vaihda teema (nyt: {theme})</button>
    </div>
  );
}

export function UsernameForm() {
  const { user, setUser } = useContext(UserContext);
  const [name, setName] = useState(user || "");

  const submit = (e) => {
    e.preventDefault();
    setUser(name.trim());
  };

  return (
    <form className="username-form" onSubmit={submit}>
      <input
        type="text"
        placeholder="Anna käyttäjänimi"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button type="submit">Tallenna nimi</button>
    </form>
  );
}
