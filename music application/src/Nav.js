import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faChevronLeft } from '@fortawesome/free-solid-svg-icons';

import './Nav.css';

const Nav = ({ isLibOpen, setIsLibOpen }) => {
  //handlers
  const handleLibClick = () => {
    setIsLibOpen((isLibOpen) => !isLibOpen);
  };

  return (
    <div>
      <nav className='nav-container'>
        <h1>Waves</h1>
        <button className='btn-library' onClick={handleLibClick}>
          <FontAwesomeIcon
            icon={isLibOpen ? faChevronLeft : faBars}
            size="2x"
          />
        </button>
      </nav>
    </div>
  );
};

export default Nav;
