import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { setAuthenticatedUser } from '../authenticatedUser';
import { connect } from 'react-redux';

const Navbar = ({ users, authenticatedUser, setAuthenticatedUser }) => {
  const [active, setActive] = useState(false);

  const handleLogout = () => {
    setAuthenticatedUser();
  };

  const toggleMenu = () => {
    setActive(!active);
  };

  const isActive = active ? 'is-active' : '';

  return (
    <div>
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <Link className="navbar-item" to="/">
            <img src='/images/images.png'/>
          </Link>
        </div>
        <div className="navbar-end">
          <Link className="navbar-item" to="/">
            Home
          </Link>
          <Link className="navbar-item" to="/add">
            New Question
          </Link>
          <Link className="navbar-item" to="/leaderboard">
            Leaderboard
          </Link>
          <div className={`navbar-item dropdown ${isActive}`}>
            <div className="dropdown-trigger">
              <button onClick={toggleMenu} className="button is-primary is-outlined" aria-haspopup="true" aria-controls="dropdown-menu">
                <span className="username"> {users[authenticatedUser].name} </span>
                <span className="icon is-small">
                  <figure className="image is-24x24">
                    <img className="is-rounded" src={users[authenticatedUser].avatarURL} alt="placeholder" />
                  </figure>
                </span>
              </button>
            </div>
            <div className="dropdown-menu" id="dropdown-menu" role="menu">
              <div className="dropdown-content">
                <span className="dropdown-item" onClick={handleLogout}>
                  Logout
                </span>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

const mapStateToProps = ({ authenticatedUser, users }) => ({
  authenticatedUser,
  users,
});

export default connect(mapStateToProps, { setAuthenticatedUser })(Navbar);
