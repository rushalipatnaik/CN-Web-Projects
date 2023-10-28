import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import HomePage from './HomePage';
import About from './About';
import Beverages from './Beverages';
import NotFound from './NotFound';

import Navbar from './Navbar';
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='about' element={<About />} />
        <Route path='cocktail/:id' element={<Beverages />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
