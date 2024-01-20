// src/App.js

import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import BusTrackingUI from './components/BusTrackingUI'; // Import the BusTrackingUI component

function App() {
  return (
    <>
    <Navbar/>
      <BusTrackingUI /> {/* Include the BusTrackingUI component */}
    </>
  );
}

export default App;
