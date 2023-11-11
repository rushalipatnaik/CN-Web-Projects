// index.js
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

const ThemeContext = React.createContext();

const Root = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  const theme = {
    isDarkMode,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={theme}>
      <App />
    </ThemeContext.Provider>
  );
};

ReactDOM.render(<Root />, document.getElementById('root'));

export { ThemeContext };