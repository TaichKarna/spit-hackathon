import { useState, useEffect } from 'react';

const useUserWeatherData = (API_KEY = "daca0c5d4232893af08161ffa205b65e") => {
  const [location, setLocation] = useState({ lat: null, lon: null });
  const [weatherData, setWeatherData] = useState(null);
  const [aqiData, setAqiData] = useState([]); // Store AQI data for each forecast period
  const [forecastData, setForecastData] = useState([]); // Store forecast data
  const [error, setError] = useState(null);

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
  }, [location, API_KEY]);

  return {
    weatherData,
    aqiData,
    forecastData,
    error,
  };
};

export default useUserWeatherData;
