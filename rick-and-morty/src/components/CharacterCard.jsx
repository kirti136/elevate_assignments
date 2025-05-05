import { Link } from "react-router-dom";

const CharacterCard = ({ character }) => {
  return (
    <div className="bg-gray-800 text-white rounded-lg shadow-md overflow-hidden hover:scale-105 transition-all flex justify-center items-center">
      <Link
        to={`/character/${character.id}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col items-center"
      >
        <img
          src={character.image}
          alt={character.name}
          className="w-full h-50 object-contain"
        />
        <div className="p-4 text-center">
          <h2 className="text-xl font-bold">{character.name}</h2>
          <p className="text-sm">{character.species}</p>
          <p
            className={`text-sm ${
              character.status === "Alive"
                ? "text-green-400"
                : character.status === "Dead"
                ? "text-red-400"
                : "text-gray-400"
            }`}
          >
            {character.status}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default CharacterCard;
