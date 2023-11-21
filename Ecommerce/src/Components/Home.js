import React, { useEffect } from 'react';
import { Navbar } from './Navbar';
import { Products } from './Products';
import { useNavigate } from 'react-router-dom';
import { auth } from '../Config/Config';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './Home.css'; // Import your CSS file for styling

export const Home = ({ user }) => {
  const history = useNavigate();

  useEffect(() => {
    // forcing user to signup
    auth.onAuthStateChanged(user => {
      if (!user) {
        history('/login');
      }
    });
  }, []);

  return (
    <div className='wrapper'>
      <Navbar user={user} />
      <div className="hero">
        <Products />
        <div className="cube-container">
          {[...Array(10)].map((_, index) => (
            <div key={index} className="cube"></div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
