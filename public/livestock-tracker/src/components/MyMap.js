import React,{useState} from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';

const libraries = ['places']; // Add any additional libraries you need

function MyMap({livestockList}) {
    
   
  const mapContainerStyle = {
    width: '50vw',
    height: '80vh',
  };

  const center = {
    lat: -17.751900454036466,
    lng: 31.006056383237663,
  };

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyDeNHYDInILDxdgqZ-9ZXxtfO3BXFEKTrE',
    libraries,
  });

  const renderMap = () => {
    if (loadError) {
      return <div>Error loading maps</div>;
    }

    if (!isLoaded) {
      return <div>Loading maps</div>;
    }

    // lat={-17.751900454036466}
    //         lng={31.006056383237663}

    return (
        <>      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={4}
        center={center}
      >
       
        {livestockList && livestockList.map((livestock) => (
            <div key={livestock.id}>
            <Marker  position={{lat:livestock.location.latitude, lng:livestock.location.longitude}}>
                <img src='/marker.jpg' alt="" />
            </Marker></div>
         ))}
      </GoogleMap>
      
           
      </>

    );
  };

  return (
    <div>
      <h1>Livestock Map</h1>
      {renderMap()}
    </div>
  );
}

export default MyMap;