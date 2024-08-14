// MapComponent.jsx
import React from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import './DogDetailViewPage.css'; // Add your own styles


const mapContainerStyle = {
  width: '100%',
  height: '400px',
};

const MapComponent = ({ address }) => {
  return (
    <div className="map-container">
      <LoadScript googleMapsApiKey="YOUR_API_KEY">
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={{ lat: -34.397, lng: 150.644 }} // Set to actual coordinates
          zoom={10}
        >
          {/* Add markers or other map features here */}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default MapComponent;
