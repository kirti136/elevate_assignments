import { useState } from "react";
import SearchBar from "./components/SearchBar";
import WeatherInfo from "./components/WeatherInfo";
import Loading from "./components/Loading";
import Error from "./components/Error";
import useFetchWeather from "./hooks/useFetchWeather";
import "./App.css";

const App = () => {
  const [city, setCity] = useState("");
  const [submittedCity, setSubmittedCity] = useState(null);

  const { data, isLoading, error } = useFetchWeather(submittedCity);

  const handleSearch = (e) => {
    e.preventDefault();
    if (city.trim() !== "") {
      setSubmittedCity(city);
    }
  };

  return (
    <div className="app">
      <h1>🌤️ Weather App</h1>
      <SearchBar city={city} setCity={setCity} onSearch={handleSearch} />
      {isLoading && <Loading />}
      {error && <Error message={error} />}
      {data && <WeatherInfo weather={data} />}
    </div>
  );
};

export default App;
