// src/App.js

import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import BusTrackingUI from './components/BusTrackingUI'; // Import the BusTrackingUI component
import { Dropdown } from 'react-bootstrap';
import Buses from './components/buses';

function App() {
  return (
    <>
    <Navbar/>
    <Buses/>
      <BusTrackingUI /> {/* Include the BusTrackingUI component */}
    </>
  );
}

export default App;
