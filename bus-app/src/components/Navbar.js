import React from 'react';
import './Navbar.css';
import logo_light from '../assets/logo-black.png';
import logo_dark from '../assets/logo-white.png';
import search_icon_light from '../assets/search-w.png';
import search_icon_dark from '../assets/search-b.png';  // Corrected import
import toogle_light from '../assets/night.png';
import toogle_dark from '../assets/day.png';

const Navbar = ({ theme, setTheme }) => {
  function toggleMode() {
    theme === 'light' ? setTheme('dark') : setTheme('light');
  }

  return (
    <div className={`Navbar ${theme === 'light' ? 'light-theme' : 'dark-theme'}`}>
      <img src={theme === 'light' ? logo_light : logo_dark} alt="" className="logo" />
      <ul>
        <li>About Us</li>
        <li>More</li>
      </ul>
      <div className="search-box">
        <input type="text" placeholder="Search" />
        <img src={theme === 'light' ? search_icon_light : search_icon_light} alt="" />
      </div>
      <img onClick={() => toggleMode()} src={theme === 'light' ? toogle_light : toogle_dark} alt="" className="toggle-icon" />
    </div>
  );
};

export default Navbar;