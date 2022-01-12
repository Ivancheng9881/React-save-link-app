import React from "react";
import { MdSearch } from "react-icons/md";

const SearchBar = ({ handleSearchTag }) => {
  return (
    <div className="search-bar">
      <MdSearch className="search-icons" size="1.4em" />
      <input
        onChange={(event) => handleSearchTag(event.target.value)}
        type="text"
        placeholder="Type to search a tag..."
      />
    </div>
  );
};

export default SearchBar;
