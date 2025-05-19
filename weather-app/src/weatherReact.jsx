import React, {useState} from 'react';

const WeatherApp = () => {
  // Sample data
  const sampleData = {
    city: "College Park",
    temperature: 75,
    description: "Clear Sky",
    icon: "🌞",
  };

  // State for storing weather data
  const [weather, setWeather] = useState(sampleData);
  const handleChangeCity = (newCity) => {
    setWeather({
      city: newCity,
      temperature: Math.floor(Math.random() * 100),
      description: "Cloudy (with a chance of meatballs)", 
    });
  };

  return (
    <div className="weather-app">
      <h1>Weather App</h1>
      <div>
        <h2>{weather.city}</h2>
        <p>{weather.temperature}°F</p>
        <p>{weather.description} {weather.icon}</p>
      </div>
      
      <button onClick={() => handleChangeCity("UMD College Park")}>
        Change Weather Temperature!
      </button>
    </div>
  );
};

export default WeatherApp;


