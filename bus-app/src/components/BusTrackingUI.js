// src/components/BusTrackingUI.js

import React from 'react';
import './BusTrackingUI.css';

const BusTrackingUI = () => {
  return (
    <div className="bus-tracking-container">
      <h1 className="text-left">Bus Tracking App</h1>
      <div className="map-container">
        {/* Your map or placeholder for the map goes here */}
        <div className="map-placeholder">Map Placeholder</div>
      </div>
    </div>
  );
};

export default BusTrackingUI;
