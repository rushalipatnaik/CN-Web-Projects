import React from "react";
import { Link, Outlet } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <div className="col-md-12 bg-primary">
        <nav className="navbar navbar-expand-lg navbar-dark">
          <Link to={"/"} className="navbar-brand ml-5">
            Contacts
          </Link>
        </nav>
      </div>
      <Outlet />
    </>
  );
};

export default Navbar;
