// /components/web/pages/Deals.js
import React, { useState, useEffect } from 'react';
import { getDeals } from '../../services/DealService';

function Deals() {
  const [deals, setDeals] = useState([]);

  useEffect(() => {
    const fetchDeals = async () => {
      const location = { latitude: 0, longitude: 0 }; // Replace with actual user location
      const nearbyDeals = await getDeals(location);
      setDeals(nearbyDeals);
    };

    fetchDeals();
  }, []);

  return (
    <div>
      <h2>Nearby Deals</h2>
      {deals.map(deal => (
        <div key={deal.id}>
          <h3>{deal.storeName}</h3>
          <p>{deal.description}</p>
          <p>Discount: {deal.discount}%</p>
        </div>
      ))}
    </div>
  );
}

export default Deals;