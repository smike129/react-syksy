import { useState } from "react";
import Elokuvalista from "./Elokuvalista";
import Lomake from "./Lomake";
import Haku from "./Haku";
import "./App.css";
import Header, { UsernameForm, ThemeContext, UserContext } from "./usercontext";

function App() {
  const [movies, setMovies] = useState([
    { title: "Inception", year: "2010", genre: "Sci-Fi" },
    { title: "Parasite", year: "2019", genre: "Drama" },
    { title: "The Matrix", year: "1999", genre: "Action" },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [theme, setTheme] = useState("light");
  const [user, setUser] = useState("");

  const addMovie = (newMovie) => {
    setMovies([...movies, newMovie]);
  };

  const deleteMovie = (title) => {
    setMovies(movies.filter((movie) => movie.title !== title));
  };

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const filteredMovies = movies.filter(
    (movie) =>
      movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      movie.year.includes(searchTerm) ||
      movie.genre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <UserContext.Provider value={{ user, setUser }}>
        <div className={`app ${theme}`}>
          <Header />
          <h1>tervetuloa</h1>

          <UsernameForm />

          <Haku searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

          <Lomake addMovie={addMovie} />

          <Elokuvalista movies={filteredMovies} deleteMovie={deleteMovie} />
        </div>
      </UserContext.Provider>
    </ThemeContext.Provider>
  );
}

export default App;
