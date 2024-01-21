// src/components/BusTrackingUI.js

import React from 'react';
import './BusTrackingUI.css';
import Map from './maps';


const BusTrackingUI = () => {
  return (
    <div className="bus-tracking-container">
    {/* Insert your desired description here */}
    <div className="map-container">
    <Map
          mapContainerStyle={{ width: '100%', height: '400px' }}
          center={{ lat: 40.7484, lng: -73.9857 }}
          zoom={12} />
      <div className="map-placeholder">Map Placeholder</div>
    </div>
  </div>
);

};

export default BusTrackingUI;
