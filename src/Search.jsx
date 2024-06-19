import React, { useEffect, useState } from "react";

function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
  };
  const handleSearchQuery = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className="search-container">
      <form className="searchForm" action="" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search Card"
          onChange={handleSearchQuery}
          value={searchQuery}
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
}
export default SearchBar;
