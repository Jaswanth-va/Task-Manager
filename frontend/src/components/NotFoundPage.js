import React from 'react';
import './notfoundpage.css'; // Import external CSS

const NotFoundPage = () => {
  return (
    <div className="not-found-container">
      <h1>404</h1>
      <p>Oops! The page you're looking for doesn't exist.</p>
      <a href="/login">Go back to Home</a>
    </div>
  );
};

export default NotFoundPage;
