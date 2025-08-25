function Haku({ searchTerm, setSearchTerm }) {
  return (
    <div className="search">
      <input
        type="text"
        placeholder="Hae elokuvaa"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
}

export default Haku;
