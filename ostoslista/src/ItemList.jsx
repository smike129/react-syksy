import { useItems } from "./ItemsContext";

export default function ItemList() {
  const { items, removeItem } = useItems();

  return (
    <ul>
      {items.map((item, index) => (
        <li key={index} onClick={() => removeItem(index)}>
          {item}
        </li>
      ))}
    </ul>
  );
}
