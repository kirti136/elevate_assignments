import React from 'react';

const SearchBar = ({ city, onChange, onSubmit, suggestions }) => {
  return (
    <form onSubmit={onSubmit} className="text-center">
      <input
        type="text"
        value={city}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter city"
        className="px-4 py-2 w-1/2 rounded text-black"
      />
      <button className="ml-2 bg-blue-500 px-4 py-2 rounded hover:bg-blue-600">
        Search
      </button>
      {suggestions.length > 0 && (
        <ul className="bg-white text-black text-left w-1/2 mx-auto mt-2 rounded shadow">
          {suggestions.map((sug, index) => (
            <li key={index} className="p-2 hover:bg-gray-200 cursor-pointer" onClick={() => onChange(sug)}>
              {sug}
            </li>
          ))}
        </ul>
      )}
    </form>
  );
};

export default SearchBar;