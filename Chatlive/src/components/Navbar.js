// Navbar.js
import React, { useContext } from 'react';
import { signOut } from "firebase/auth";
import { auth } from '../firebase';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { currentUser } = useContext(AuthContext);

  const handleLogout = () => {
    signOut(auth);
  };

  return (
    <div className='navbar'>
      <span className="logo">Time Pass</span>
      <div className="user" onClick={handleLogout}>
        <img src={currentUser.photoURL} alt="" className="user-image" />
        <span className="user-name">{currentUser.displayName}</span>
        <button className="logout-button">Logout</button>
      </div>
    </div>
  );
};

export default Navbar;
