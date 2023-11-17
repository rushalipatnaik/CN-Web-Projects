import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoutes = ({ children }) => {
  // Retrieve user ID from local storage
  const userInLocalStorage = JSON.parse(localStorage.getItem('folio'))?.uid;

  // Check if user is not authenticated and redirect to the signin page
  if (!userInLocalStorage) {
    return <Navigate to="/signin" />;
  }

  // Render the protected content if the user is authenticated
  return children;
};

export default ProtectedRoutes;

