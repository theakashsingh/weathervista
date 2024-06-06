import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';

const MapDisplay = ({ latitude, longitude, onLocationChange }) => {
  const mapRef = useRef(null);

  const LocationMarker = () => {
    useMapEvents({
      click(e) {
        if (e.originalEvent.shiftKey) {
          onLocationChange(e.latlng.lat, e.latlng.lng);
        }
      },
    });

    return latitude && longitude ? <Marker position={[latitude, longitude]} /> : null;
  };

  useEffect(() => {
    if (mapRef.current) {
      const mapInstance = mapRef.current;
      mapInstance.setView([latitude, longitude], 13);
    }
  }, [latitude, longitude]);

  return (
    <MapContainer
      center={[latitude, longitude]}
      zoom={13}
      style={{ height: '400px', width: '100%' }}
      scrollWheelZoom={false}
      whenCreated={(mapInstance) => (mapRef.current = mapInstance)}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
    
      <LocationMarker />
    </MapContainer>
   
  );
};

MapDisplay.propTypes = {
  latitude: PropTypes.number.isRequired,
  longitude: PropTypes.number.isRequired,
  onLocationChange: PropTypes.func.isRequired,
};

export default MapDisplay;
