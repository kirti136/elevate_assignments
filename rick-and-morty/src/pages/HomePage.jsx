import { useEffect, useState } from "react";
import CharacterCard from "../components/CharacterCard";
import FooterClock from "../components/FooterClock";

const HomePage = () => {
  const [characters, setCharacters] = useState([]);
  const [page, setPage] = useState(1);
  const [info, setInfo] = useState({});

  const fetchCharacters = async () => {
    try {
      const res = await fetch(
        `https://rickandmortyapi.com/api/character/?page=${page}`
      );

      const data = await res.json();
      setCharacters(data.results.slice(0, 6));
      setInfo(data.info);
    } catch (error) {
      console.error("Failed to fetch characters:", error);
    }
  };

  useEffect(() => {
    fetchCharacters();
  }, [page]);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      <div className="p-6 text-center text-3xl font-bold">
        Rick and Morty Character Encyclopedia
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 p-6">
        {characters.map((char) => (
          <CharacterCard key={char.id} character={char} />
        ))}
      </div>
      <div className="flex justify-center gap-4 p-4">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={!info.prev}
          className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-700 disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={() => setPage((prev) => prev + 1)}
          disabled={!info.next}
          className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-700 disabled:opacity-50"
        >
          Next
        </button>
      </div>
      <FooterClock />
    </div>
  );
};

export default HomePage;
