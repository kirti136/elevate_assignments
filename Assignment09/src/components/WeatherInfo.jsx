import React from 'react';

const WeatherInfo = ({ weather }) => {
  return (
    <div className="mt-6 text-center">
      <h2 className="text-2xl font-bold">{weather.name}</h2>
      <p>{weather.weather[0].main} ({weather.weather[0].description})</p>
      <p>🌡️ {weather.main.temp}°C</p>
      <p>💧 Humidity: {weather.main.humidity}%</p>
      <p>🌬️ Wind Speed: {weather.wind.speed} m/s</p>
    </div>
  );
};

export default WeatherInfo;