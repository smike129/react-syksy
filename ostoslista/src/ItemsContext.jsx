import { createContext, useContext, useState } from "react";

const ItemsContext = createContext();

export function ItemsProvider({ children }) {
  const [items, setItems] = useState([]);

  return (
    <ItemsContext.Provider
      value={{
        items,
        addItem: (item) =>
          item?.trim() && setItems((prev) => [...prev, item.trim()]),
        removeItem: (index) =>
          setItems((prev) => prev.filter((_, i) => i !== index)),
      }}
    >
      {children}
    </ItemsContext.Provider>
  );
}

export const useItems = () => useContext(ItemsContext);
