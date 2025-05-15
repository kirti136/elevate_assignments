import React from 'react'

const WeatherInfo = ({ weather }) => {
  const { name, main, weather: details, wind } = weather
  const condition = details[0]

  return (
    <div className="weather-info">
      <h2>{name}</h2>
      <p>🌡️ Temperature: {main.temp}°C</p>
      <p>☁️ Condition: {condition.main} ({condition.description})</p>
      <p>💧 Humidity: {main.humidity}%</p>
      <p>🌬️ Wind Speed: {wind.speed} m/s</p>
    </div>
  )
}

export default WeatherInfo
