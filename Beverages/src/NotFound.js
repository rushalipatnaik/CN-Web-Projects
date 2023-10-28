import React from "react";
import './NotFound.css'
import { Link } from "react-router-dom";

function NotFound() {
  return (
      <div className="error-page">
        <h1>Error 404! Page Not Found! Sorry No Beverage to Display!</h1>
        <Link to="/" className="btn btn-primary">
          Home Page
        </Link>
      </div>
  );
}

export default NotFound