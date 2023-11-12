import React from 'react';
import { Navigate } from 'react-router-dom';

export const ProtectedRoute = ({ element, authenticatedUser }) => {
  return authenticatedUser ? element : <Navigate to="/" replace />;
};