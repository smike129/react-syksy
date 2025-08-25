function Elokuvalista({ movies, deleteMovie }) {
  return (
    <div className="movie-list">
      {movies.map((movie, index) => (
        <div key={index} className="movie-item">
          <strong>
            {movie.title} ({movie.year}) - {movie.genre}
          </strong>
          <button onClick={() => deleteMovie(movie.title)}>Poista</button>
        </div>
      ))}
    </div>
  );
}

export default Elokuvalista;
