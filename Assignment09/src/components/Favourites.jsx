import React from "react";

const Favourites = ({ favourites, onSelect, onRemove }) => {
  return (
    <div className="mt-4 text-center">
      <h3 className="text-xl mb-2">Favourites</h3>
      <ul className="flex flex-wrap justify-center gap-4">
        {favourites.map((fav, index) => (
          <li
            key={index}
            className="bg-gray-800 p-2 rounded cursor-pointer relative"
            onClick={() => onSelect(fav)}
          >
            {fav}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onRemove(fav);
              }}
              className="ml-2 text-red-400 hover:text-red-600"
            >
              ✖
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Favourites;
