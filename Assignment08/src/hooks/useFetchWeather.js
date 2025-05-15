import { useEffect, useState } from "react";
import axios from "axios";

const useFetchWeather = (city) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!city) return;

    const fetchWeather = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const apiKey = "4c8d21d4fe6aa180bad4528f62cd79c4";

        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );
        setData(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Something went wrong");
      } finally {
        setIsLoading(false);
      }
    };

    fetchWeather();
  }, [city]);

  return { data, isLoading, error };
};

export default useFetchWeather;
