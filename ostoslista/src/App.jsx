import ShoppingList from "./shoppinglist";
import Header from "./Header";
import "./App.css";
import { ItemsProvider } from "./ItemsContext";

export default function App() {
  return (
    <ItemsProvider>
      <Header />
      <ShoppingList />
    </ItemsProvider>
  );
}
