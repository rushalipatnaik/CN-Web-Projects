import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { authenticate } from '../redux/authSlice';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const authStatus = useSelector(state => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    checkAuthentication();
  }, []);

  const checkAuthentication = () => {
    const folioData = JSON.parse(localStorage.getItem('folio'));
    dispatch(authenticate(!!(folioData && folioData.uid)));
  };

  const handleLogout = () => {
    localStorage.removeItem('folio');
    dispatch(authenticate(false));
    navigate('/signin');
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-left">
          {authStatus && (
            <>
              <NavLink to="/" activeClassName="active-link">Details</NavLink>
              <NavLink to="/resume" activeClassName="active-link">Resume</NavLink>
            </>
          )}
        </div>

        <button className="navbar-toggler" onClick={() => setIsOpen(!isOpen)}>
          ☰
        </button>

        <div className={`navbar-right ${isOpen ? 'active' : ''}`}>
          {!authStatus ? (
            <>
              <NavLink to="/signin" activeClassName="active-link">Sign In</NavLink>
              <NavLink to="/signup" activeClassName="active-link">Sign Up</NavLink>
            </>
          ) : (
            <span onClick={handleLogout} style={{ cursor: 'pointer' }}>Logout</span>
          )}
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export default Navbar;
