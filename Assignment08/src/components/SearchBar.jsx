import React from 'react'

const SearchBar = ({ city, setCity, onSearch }) => {
  return (
    <form onSubmit={onSearch} className="search-bar">
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name"
      />
      <button type="submit">Search</button>
    </form>
  )
}

export default SearchBar
