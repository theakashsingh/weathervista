import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const WeatherDisplay = ({ latitude, longitude, unit }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [timeOfDay, setTimeOfDay] = useState('day');
  const API_KEY = "YOUR_OPENWEATHER_API_KEY";

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=${unit === 'celsius' ? 'metric' : 'imperial'}`
        );
        const data = await response.json();
        setWeatherData(data);
        const currentHour = new Date().getHours();
        setTimeOfDay(currentHour >= 6 && currentHour < 18 ? 'day' : 'night');
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    if (latitude && longitude) {
      fetchWeatherData();
    }
  }, [latitude, longitude, unit]);

  const getWeatherIcon = (condition, timeOfDay) => {
    const iconMapping = {
      Thunderstorm: '11',
      Drizzle: '09',
      Rain: '10',
      Snow: '13',
      Mist: '50',
      Smoke: '50',
      Haze: '50',
      Dust: '50',
      Fog: '50',
      Sand: '50',
      Ash: '50',
      Squall: '50',
      Tornado: '50',
      Clear: timeOfDay === 'day' ? '01d' : '01n',
      Clouds: timeOfDay === 'day' ? '02d' : '02n',
    };
    const iconCode = iconMapping[condition] || '01d'; // default to clear day if condition is unknown
    return `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
  };

  return (
    <div>
      {weatherData ? (
        <div>
          <h2>Weather Information</h2>
          <p>Temperature: {weatherData.main.temp}{unit === 'celsius' ? '°C' : '°F'}</p>
          <p>Condition: {weatherData.weather[0].description}</p>
          <p>Humidity: {weatherData.main.humidity}%</p>
          <p>Wind Speed: {weatherData.wind.speed} {unit === 'celsius' ? 'm/s' : 'mph'}</p>
          <p>Chance of Rain: {weatherData.clouds.all}%</p>
          <img src={getWeatherIcon(weatherData.weather[0].main, timeOfDay)} alt="Weather Icon" />
        </div>
      ) : (
        <p>Loading weather data...</p>
      )}
    </div>
  );
};

WeatherDisplay.propTypes = {
  latitude: PropTypes.number.isRequired,
  longitude: PropTypes.number.isRequired,
  unit: PropTypes.string.isRequired,
};

export default WeatherDisplay;
