import React, { useEffect, useState } from 'react';

const WeatherComponent = () => {
  const [location, setLocation] = useState({ lat: null, lon: null });
  const [weatherData, setWeatherData] = useState(null);
  const [aqiData, setAqiData] = useState([]); // Store AQI data for each forecast period
  const [forecastData, setForecastData] = useState(null); // Store forecast data
  const [error, setError] = useState(null);

  const API_KEY = "daca0c5d4232893af08161ffa205b65e";

  useEffect(() => {
    // Get user location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        },
        (err) => {
          setError('Location permission denied');
          console.error(err);
        }
      );
    } else {
      setError('Geolocation is not supported by this browser.');
    }
  }, []);

  useEffect(() => {
    const fetchWeatherData = async () => {
      if (location.lat && location.lon) {
        try {
          // Fetch current weather data
          const weatherResponse = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&appid=${API_KEY}&units=metric`
          );
          const weatherJson = await weatherResponse.json();
          if (weatherJson.cod !== 200) {
            throw new Error('Failed to fetch weather data');
          }
          setWeatherData(weatherJson);

          // Fetch 5-day forecast data (using /forecast endpoint)
          const forecastResponse = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${location.lat}&lon=${location.lon}&appid=${API_KEY}&units=metric`
          );
          const forecastJson = await forecastResponse.json();

          if (forecastJson.cod !== "200") {
            throw new Error('Failed to fetch forecast data');
          }

          // Process the forecast data to get daily summaries
          const dailyForecast = [];
          let currentDay = null;
          const aqiForecast = []; // To store AQI data for each forecast period

          // Fetch AQI for each 3-hour interval in the forecast data
          for (let i = 0; i < forecastJson.list.length; i++) {
            const data = forecastJson.list[i];
            const date = new Date(data.dt * 1000); // Convert timestamp to Date object
            const dayOfWeek = date.getDay();

            // If the day changes, push the current day's forecast to the daily forecast array
            if (currentDay !== dayOfWeek) {
              currentDay = dayOfWeek;
              dailyForecast.push({
                date: date.toDateString(),
                tempMin: data.main.temp_min,
                tempMax: data.main.temp_max,
                weather: data.weather[0].description,
              });
            }

            // Fetch air pollution data for this forecast period (every 3 hours)
            const aqiResponse = await fetch(
              `https://api.openweathermap.org/data/2.5/air_pollution?lat=${location.lat}&lon=${location.lon}&appid=${API_KEY}`
            );
            const aqiJson = await aqiResponse.json();
            if (aqiJson.list && aqiJson.list[0]) {
              aqiForecast.push(aqiJson.list[0]); // Store AQI for this 3-hour interval
            }
          }

          setForecastData(dailyForecast); // Store daily forecast data
          setAqiData(aqiForecast); // Store AQI data for the forecast
        } catch (err) {
          setError('Failed to fetch weather or AQI data.');
          console.error(err);
        }
      }
    };

    if (location.lat && location.lon) {
      fetchWeatherData();
    }
  }, [location]);

  return (
    <div>
      <h2>Weather and AQI Information</h2>
      {error && <p>Error: {error}</p>}
      {weatherData && aqiData.length > 0 ? (
        <div>
          <h3>Location</h3>
          <p>
            Latitude: {location.lat}, Longitude: {location.lon}
          </p>
          <h3>Weather</h3>
          <p>Temperature: {weatherData.main.temp}°C</p>
          <p>Humidity: {weatherData.main.humidity}%</p>
          <p>Condition: {weatherData.weather[0].description}</p>
          <h3>5-Day Forecast</h3>
          {forecastData ? (
            <div>
              {forecastData.map((day, index) => (
                <div key={index}>
                  <h4>{day.date}</h4>
                  <p>Min Temperature: {day.tempMin}°C</p>
                  <p>Max Temperature: {day.tempMax}°C</p>
                  <p>Weather: {day.weather}</p>
                </div>
              ))}
            </div>
          ) : (
            <p>Loading forecast data...</p>
          )}
          <h3>AQI Forecast (for next 3-hour intervals)</h3>
          {aqiData.length > 0 ? (
            <div>
              {aqiData.map((period, index) => (
                <div key={index}>
                  <p>Time: {new Date(period.dt * 1000).toLocaleString()}</p>
                  <p>AQI Level: {period.main.aqi}</p>
                </div>
              ))}
            </div>
          ) : (
            <p>Loading AQI data...</p>
          )}
        </div>
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
};

export default WeatherComponent;
