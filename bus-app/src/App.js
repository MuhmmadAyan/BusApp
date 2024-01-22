// src/App.js

import React, { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import BusTrackingUI from './components/BusTrackingUI';
import Buses from './components/buses';

function App() {
  const [theme, setTheme] = useState('light');

  return (
    <>
      <Navbar theme={theme} setTheme={setTheme} /> {/* Pass theme and setTheme as props */}
      <Buses />
      <BusTrackingUI />
      
    </>
  );
}

export default App;