import React, { useState, useEffect, useImperativeHandle, forwardRef } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar = forwardRef(({ onSearch }: SearchBarProps, ref) => {
  const [query, setQuery] = useState('');

  useImperativeHandle(ref, () => ({
    reset: () => setQuery('')
  }));

  useEffect(() => {
    onSearch(query);
  }, [query, onSearch]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch(query);
    }
  };

  const handleSearchClick = () => {
    onSearch(query);
  };

  return (
    <div className="input-group mb-3">
      <input
        type="text"
        className="form-control"
        placeholder="Buscar"
        value={query}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
      />
      <button className="btn btn-outline-secondary" type="button" onClick={handleSearchClick}>
        <i className="bi bi-search"></i>
      </button>
    </div>
  );
});

export default SearchBar;
