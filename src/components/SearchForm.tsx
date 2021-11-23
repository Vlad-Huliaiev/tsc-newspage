import React, { useState } from "react";
import "./SearchForm.css";

const SearchForm = ({ searchText }) => {
  const [text, setText] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();

    searchText(text);
  };
  return (
    <div>
      <form className="search" onSubmit={handleSubmit}>
        <input
          className="search__input"
          type="text"
          placeholder="search"
          onChange={(e) => setText(e.target.value)}
        />
        <button className="search__button" type="submit">
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchForm;