// Navbar.js
import React, { useState } from 'react';
import './Navbar.css';

const Navbar = () => {
  const [isDarkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!isDarkMode);
    // You can add logic here to apply dark mode styles to your entire application.
    // For simplicity, we'll just add a class to the body element.
    document.body.classList.toggle('dark-mode', !isDarkMode);
  };

  return (
    <div className={`n-wrapper ${isDarkMode ? 'dark-mode' : ''}`} id="Navbar">
      <div className="n-left">
        <div className="n-name">
          <h1>RP</h1>
        </div>
      </div>
      <div className="n-right">
        <div className="n-list">
          <ul>
            <li><a href="#intro">Home</a></li>
            <li><a href="#experience">Experience</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#portfolio">Portfolio</a></li>
          </ul>
        </div>
        <button className={`toggle ${isDarkMode ? 'dark-mode' : ''}`} onClick={toggleDarkMode}>
          {isDarkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
        <button className="button n-button"><a href="#contact">Contact Me</a></button>
      </div>
    </div>
  );
}

export default Navbar;
