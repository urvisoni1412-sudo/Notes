const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <>
    
    <input
      type="text"
      className="search-input"
      placeholder="🔍 Search notes..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
    <button
    className="cancel-button"
     onClick={() => setSearchTerm("")}>
      Cancel
    </button>
    </>
  );
};

export default SearchBar;