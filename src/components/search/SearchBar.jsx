import React from "react";

const SearchBar = ({ setSearching }) => {
  const handleChange = (e) => {
    setSearching(e.target.value);
  };

  return (
    <div>
      <input
        onChange={handleChange}
        type="text"
        placeholder="Search"
        className="py-2 px-4 w-full rounded-lg bg-hover-primary outline-none text-text-primary font-light"
      />
    </div>
  );
};

export default SearchBar;
