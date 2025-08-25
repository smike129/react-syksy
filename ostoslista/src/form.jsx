import { useState } from "react";
import { useItems } from "./ItemsContext";

export default function Form() {
  const [inputValue, setInputValue] = useState("");
  const { addItem } = useItems();

  const handleSubmit = (event) => {
    event.preventDefault();
    addItem(inputValue);
    setInputValue("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Kirjoita ostos"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button type="submit">Lisää</button>
    </form>
  );
}
