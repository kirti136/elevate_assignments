import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FooterClock from "../components/FooterClock";

const CharacterDetail = () => {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchCharacter = async () => {
    try {
      const res = await fetch(
        `https://rickandmortyapi.com/api/character/${id}`
      );
      const data = await res.json();
      setCharacter(data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching character:", err);
    }
  };

  useEffect(() => {
    fetchCharacter();
  }, [id]);

  if (loading || !character) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center">
      <div className="max-w-4xl w-full p-6">
        <h1 className="text-3xl font-bold mb-4 text-center">
          {character.name}
        </h1>
        <div className="flex flex-col md:flex-row gap-6">
          <img
            src={character.image}
            alt={character.name}
            className="w-full md:w-64 h-auto rounded-lg shadow-lg"
          />
          <div className="flex-1 space-y-2">
            <p>
              <strong>Status:</strong> {character.status}
            </p>
            <p>
              <strong>Species:</strong> {character.species}
            </p>
            {character.type && (
              <p>
                <strong>Type:</strong> {character.type}
              </p>
            )}
            <p>
              <strong>Gender:</strong> {character.gender}
            </p>
            <p>
              <strong>Origin:</strong> {character.origin?.name}
            </p>
            <p>
              <strong>Current Location:</strong> {character.location?.name}
            </p>
            <p>
              <strong>Episode Appearances:</strong> {character.episode.length}
            </p>
          </div>
        </div>
      </div>
      <FooterClock />
    </div>
  );
};

export default CharacterDetail;
