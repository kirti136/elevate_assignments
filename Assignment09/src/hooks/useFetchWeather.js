import { useEffect, useState } from 'react';

const API_KEY = '4c8d21d4fe6aa180bad4528f62cd79c4';

const useFetchWeather = (city) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!city) return;
    setIsLoading(true);
    setError(null);

    const url = city.includes(',')
      ? `https://api.openweathermap.org/data/2.5/weather?lat=${city.split(',')[0]}&lon=${city.split(',')[1]}&appid=${API_KEY}&units=metric`
      : `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error('City not found or network error');
        return res.json();
      })
      .then((resData) => setData(resData))
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, [city]);

  return { data, isLoading, error };
};

export default useFetchWeather;
