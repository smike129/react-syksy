import { useState } from "react";

function Lomake({ addMovie }) {
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [genre, setGenre] = useState("");

  const handleYearChange = (e) => {
    const digitsOnly = e.target.value.replace(/\D/g, "");
    setYear(digitsOnly);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !year || !genre) return;

    addMovie({ title, year, genre });

    setTitle("");
    setYear("");
    setGenre("");
  };

  return (
    <form onSubmit={handleSubmit} className="movie-form">
      <div className="form-row">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Elokuvan nimi"
        />
        <input
          type="text"
          value={year}
          onChange={handleYearChange}
          placeholder="Vuosi"
          inputMode="numeric"
          pattern="[0-9]*"
        />
        <input
          type="text"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          placeholder="Genre"
        />
        <button type="submit">Lisää</button>
      </div>
    </form>
  );
}

export default Lomake;
