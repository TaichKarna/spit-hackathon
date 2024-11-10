import { useState, useEffect } from 'react';

const AQI_API_KEY = '1f960b41646a0ac749ae3aeb31ad3d8bcd3061b2'; // Replace with your AQI API key
const AQI_API_URL = 'https://api.waqi.info/feed/geo:{lat};{lon}/?token=' + AQI_API_KEY;

const getNearbyCoordinates = (lat, lon, radius = 5, spacing = 0.5) => {
  const latOffset = spacing / 111;
  const lonOffset = spacing / (111 * Math.cos(lat * (Math.PI / 180)));

  const coordinates = [];
  for (let i = -radius / spacing; i <= radius / spacing; i++) {
    for (let j = -radius / spacing; j <= radius / spacing; j++) {
      const newLat = lat + i * latOffset;
      const newLon = lon + j * lonOffset;

      const distance = Math.sqrt(i * i + j * j) * spacing;
      if (distance <= radius) {
        coordinates.push({ latitude: newLat, longitude: newLon });
      }
    }
  }
  return coordinates;
};

const useAQIData = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [aqiData, setAqiData] = useState([]);
  const [recommendedPlaces, setRecommendedPlaces] = useState([]);

  // Fetch user location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        console.error('Error fetching user location:', error);
      }
    );
  }, []);

  // Fetch AQI data
  useEffect(() => {
    if (userLocation) {
      const nearbyCoordinates = getNearbyCoordinates(userLocation.latitude, userLocation.longitude, 5, 0.5);

      const fetchAQIData = async () => {
        const aqiPromises = nearbyCoordinates.map((coordinate) =>
          fetch(AQI_API_URL.replace('{lat}', coordinate.latitude).replace('{lon}', coordinate.longitude))
            .then((response) => response.json())
            .then((data) => ({
              ...coordinate,
              aqi: data?.data?.aqi,
            }))
        );

        const results = await Promise.all(aqiPromises);
        setAqiData(results);

        // Filter and sort locations with AQI > 100 to find recommended places
        const highAQILocations = results
          .filter((location) => location.aqi > 100)
          .sort((a, b) => b.aqi - a.aqi)
          .slice(0, 5); // Take top 5 locations with highest AQI for recommendations

        setRecommendedPlaces(highAQILocations);
      };

      fetchAQIData();
    }
  }, [userLocation]);

  return { userLocation, aqiData, recommendedPlaces };
};

export default useAQIData;
