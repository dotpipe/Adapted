// /components/web/pages/Home.js
import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <h1>Welcome to Our App</h1>
      <p>Start exploring deals and optimizing your shopping experience!</p>
      <Link to="/map">Go to Map</Link>
    </div>
  );
}

export default { Home };