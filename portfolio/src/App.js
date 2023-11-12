import React, { useState } from 'react';
import './App.css';
import Contact from './Contact';
import Experience from './Experience';
import Footer from './Footer';
import Intro from './Intro';
import Navbar from './Navbar';
import Portfolio from './Portfolio';
import Services from './Services';

function App() {
  // Use state to track the current theme
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Function to toggle between dark and light mode
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`App ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      {/* Pass the toggleTheme function to Navbar to handle the button click */}
      <Navbar toggleTheme={toggleTheme} />
      <Intro />
      <Services />
      <Portfolio />
      <Experience />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
