import React from 'react';

const NotFound = ({ message }) => (
  <div className="columns is-centered new-question">
    <div className="column is-6">
      {message ? message : "You are trying to access an Invalid URL"}
    </div>
  </div>
);

export default NotFound;
