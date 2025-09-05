import "./App.css";
import Kielivalinta from "./Kielivalinta";
import { LanguageProvider } from "./LanguageContext";

function App() {
  return (
    <LanguageProvider>
      <Kielivalinta />
    </LanguageProvider>
  );
}

export default App;
