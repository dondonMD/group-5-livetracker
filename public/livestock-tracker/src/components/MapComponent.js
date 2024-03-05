import React from 'react';
import { GoogleMap, Marker, LoadScript } from '@react-google-maps/api';
import PropTypes from 'prop-types';

const MapComponent = ({ livestockList }) => {
  if (!livestockList) {
    return <div>Loading...</div>;
  }

  const mapStyles = {
    height: '500px',
    width: '100%', // Adjust the width to fit the container
  };

  const defaultCenter = {
    lat: -20.163780,
    lng: 28.630130,
  };

  const mapContainerStyle = {
    height: mapStyles.height,
    width: mapStyles.width,
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyDeNHYDInILDxdgqZ-9ZXxtfO3BXFEKTrE">
      <GoogleMap mapContainerStyle={mapContainerStyle} zoom={10} center={defaultCenter}>
        {/* Render markers from livestockList */}
        {livestockList.map((livestock) => (
          <Marker
            key={livestock.id}
            position={{ lat: livestock.latitude, lng: livestock.longitude }}
            title={livestock.name} // Add a title property for better accessibility
          />
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

MapComponent.propTypes = {
  livestockList: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
};

export default MapComponent;
