// MapComponent.js
import React from 'react';

function MapComponent({ livestockLocation }) {
  return (
    <div className="mapouter">
      <div className="gmap_canvas">
        <iframe
          width="820"
          height="560"
          id="gmap_canvas"
          src={`https://maps.google.com/maps?q=${livestockLocation.latitude},${livestockLocation.longitude}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
          frameBorder="0"
          scrolling="no"
          marginHeight="0"
          marginWidth="0"
          title="Google Map"
        >
        </iframe>
      </div>
    </div>
  );
}

export default MapComponent;

