import * as React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import icon4 from '../assets/pngegg (4).png'; // Example icon
import iconRed from '../assets/pngegg (3).png'; // Red icon for high AQI values

const AQI_API_KEY = '1f960b41646a0ac749ae3aeb31ad3d8bcd3061b2'; // Replace with your AQICN or other AQI API key
const AQI_API_URL = 'https://api.waqi.info/feed/geo:{lat};{lon}/?token=' + AQI_API_KEY;

// Function to generate points around the user in a 5km radius with 500m spacing
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

function Map() {
  const [userLocation, setUserLocation] = React.useState(null);
  const [aqiData, setAqiData] = React.useState([]);
  const [selectedLocation, setSelectedLocation] = React.useState(null);

  const getAQIIcon = (aqi) => {
    const iconUrl = aqi > 100 ? iconRed : icon4;
    return new L.Icon({
      iconUrl,
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32],
    });
  };

  // Define a larger icon for the user’s location
  const userIcon = new L.Icon({
    iconUrl: icon4,
    iconSize: [48, 48], // Make this larger for the user's location
    iconAnchor: [24, 48],
    popupAnchor: [0, -48],
  });

  // Get User's location
  React.useEffect(() => {
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

  // Fetch AQI data for points 500 meters apart within a 5 km radius
  React.useEffect(() => {
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
      };

      fetchAQIData();
    }
  }, [userLocation]);

  return (
    <MapContainer
      center={userLocation ? [userLocation.latitude, userLocation.longitude] : [19.114424, 72.867943]}
      zoom={12}
      style={{ width: '100%', height: '100%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />

      {/* Render user's current location marker with larger icon */}
      {userLocation && (
        <Marker
          position={[userLocation.latitude, userLocation.longitude]}
          icon={userIcon} // Use larger user icon here
        >
          <Popup>
            <h3 className="text-lg mb-2 text-gray-700">User</h3>
            <p className="text-sm mb-1">
              <strong>Latitude:</strong> {userLocation.latitude.toFixed(5)}
            </p>
            <p className="text-sm mb-4">
              <strong>Longitude:</strong> {userLocation.longitude.toFixed(5)}
            </p>
          </Popup>
        </Marker>
      )}

      {/* Render AQI markers for generated points */}
      {aqiData.map((location, index) => (
        <Marker
          key={index}
          position={[location.latitude, location.longitude]}
          icon={getAQIIcon(location.aqi)}
          eventHandlers={{
            click: () => setSelectedLocation(location),
          }}
        >
          <Popup>
            <div className="p-4 font-sans text-gray-800">
              <h3 className="text-lg mb-2 text-gray-700">
                AQI: <span className={location.aqi > 150 ? 'text-red-600' : 'text-green-600'}>{location.aqi}</span>
              </h3>
              <p className="text-sm mb-1">
                <strong>Location:</strong> ({location.latitude.toFixed(5)}, {location.longitude.toFixed(5)})
              </p>
              <p className="text-sm mb-4">
                <strong>AQI Value:</strong> {location.aqi}
              </p>
              <p
                className={`text-xs font-bold text-center py-2 px-4 rounded-md ${
                  location.aqi > 150 ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'
                }`}
              >
                Stay safe!
              </p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default Map;
