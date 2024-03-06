import React,{useState} from 'react';
import { GoogleMap, Marker, LoadScript } from '@react-google-maps/api';
import PropTypes from 'prop-types';

const MapComponent = () => {
  const [livestockList, setLivestockList] = useState([{
    id: 1,
    livestockName: "Cow",
    breed: "Angus",
    age: 3,
    location: { latitude: -20.163780, longitude: 28.630130 }
  },
  {
    id: 2,
    livestockName: "Goat",
    breed: "Boer",
    age: 2,
    location: { latitude: -20.163780, longitude: 28.630130 }
  }])
  if (!livestockList) {
    return <div>Loading...</div>;
  }

  const mapStyles = {
    height: '500px',
    width: '50vw', // Adjust the width to fit the container
  };

  const defaultCenter = {
    lat: -20.163780,
    lng: 28.630130,
  };

  const mapContainerStyle = {
    height: mapStyles.height,
    width: mapStyles.width,
  };
  console.log(livestockList)
  return (
    <LoadScript googleMapsApiKey="AIzaSyDeNHYDInILDxdgqZ-9ZXxtfO3BXFEKTrE">
      <GoogleMap mapContainerStyle={mapContainerStyle} zoom={10} center={defaultCenter}>
        {/* Render markers from livestockList */}
        {livestockList.map((livestock) => (
          <Marker
            key={livestock.id}
            position={{ lat: livestock.location.latitude, lng: livestock.location.longitude }}
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
