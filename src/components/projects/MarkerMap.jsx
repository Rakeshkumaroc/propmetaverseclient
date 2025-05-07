import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Function to parse coordinates from googleMap URL
const parseGoogleMapUrl = (url) => {
  if (!url) return null;
  try {
    // Extract lat/lng from URL (e.g., !2d55.243245!3d25.021876)
    const regex = /!2d([-\d.]+)!3d([-\d.]+)/;
    const match = url.match(regex);
    if (match) {
      const lng = parseFloat(match[1]);
      const lat = parseFloat(match[2]);
      if (
        lat >= -90 &&
        lat <= 90 &&
        lng >= -180 &&
        lng <= 180
      ) {
        return [lat, lng];
      }
    }
    return null;
  } catch (err) {
    console.error('Error parsing googleMap URL:', err);
    return null;
  }
};

const MarkerMap = ({ properties }) => {
  // Default center (e.g., India’s approximate center for fallback)
  const defaultCenter = [20.5937, 78.9629];
  const defaultZoom = 5;

  // Process properties to include coordinates
  const validProperties = (properties || [])
    .map((property) => {
      const coords = parseGoogleMapUrl(property.googleMap);
      if (coords) {
        return {
          ...property,
          latitude: coords[0],
          longitude: coords[1],
        };
      }
      return null;
    })
    .filter((property) => property !== null);

  return (
    <MapContainer
      center={defaultCenter}
      zoom={defaultZoom}
      className='md:mt-24 mt-12 w-full z-0 h-96'
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {validProperties.length > 0 ? (
        validProperties.map((property) => (
          <Marker
            key={property._id}
            position={[property.latitude, property.longitude]}
          >
            <Popup>
              <strong>{property.title}</strong>
              <br />
              {property.address}
            </Popup>
          </Marker>
        ))
      ) : (
        <Marker position={defaultCenter}>
          <Popup>No properties with valid coordinates available</Popup>
        </Marker>
      )}
    </MapContainer>
  );
};

export default MarkerMap;