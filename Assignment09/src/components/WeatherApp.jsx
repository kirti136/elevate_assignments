import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import WeatherInfo from './WeatherInfo';
import Loading from './Loading';
import Error from './Error';
import Favourites from './Favourites';
import useFetchWeather from '../hooks/useFetchWeather';
import useCurrentLocation from '../hooks/useCurrentLocation';
import getCitySuggestions from '../utils/getCitySuggestions';

const WeatherApp = () => {
  const [city, setCity] = useState('');
  const [query, setQuery] = useState('');
  const [favourites, setFavourites] = useState(
    JSON.parse(localStorage.getItem('favourites')) || []
  );
  const [suggestions, setSuggestions] = useState([]);

  const { data, isLoading, error } = useFetchWeather(query);
  const { location, getLocation } = useCurrentLocation();

  useEffect(() => {
    if (location) {
      setQuery(`${location.lat},${location.lon}`);
    }
  }, [location]);

  useEffect(() => {
    localStorage.setItem('favourites', JSON.stringify(favourites));
  }, [favourites]);

  const handleSearch = (e) => {
    e.preventDefault();
    setQuery(city);
  };

  const handleAddFavourite = () => {
    if (city && !favourites.includes(city)) {
      setFavourites([...favourites, city]);
    }
  };

  const handleRemoveFavourite = (fav) => {
    setFavourites(favourites.filter((item) => item !== fav));
  };

  const handleSelectFavourite = (fav) => {
    setCity(fav);
    setQuery(fav);
  };

  const handleInputChange = async (value) => {
    setCity(value);
    const sugg = await getCitySuggestions(value);
    setSuggestions(sugg);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-4 text-center">Weather App</h1>
      <SearchBar
        city={city}
        onChange={handleInputChange}
        onSubmit={handleSearch}
        suggestions={suggestions}
      />
      <div className="mt-4 flex gap-2 justify-center">
        <button
          className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
          onClick={handleAddFavourite}
        >
          Add to Favourites
        </button>
        <button
          className="bg-green-600 px-4 py-2 rounded hover:bg-green-700"
          onClick={getLocation}
        >
          Use Current Location
        </button>
      </div>
      <Favourites
        favourites={favourites}
        onSelect={handleSelectFavourite}
        onRemove={handleRemoveFavourite}
      />
      {isLoading && <Loading />}
      {error && <Error message={error} />}
      {data && <WeatherInfo weather={data} />}
    </div>
  );
};

export default WeatherApp;
