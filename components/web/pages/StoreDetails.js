// /components/web/pages/StoreDetails.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getStoreDetails, getStoreProducts } from '../../services/StoreService';
import { subscribeToStoreOccupancy } from '../../services/OccupancyService';

function StoreDetails() {
  const { storeId } = useParams();
  const [store, setStore] = useState(null);
  const [products, setProducts] = useState([]);
  const [occupancy, setOccupancy] = useState(null);

  useEffect(() => {
    const fetchStoreData = async () => {
      const storeDetails = await getStoreDetails(storeId);
      const storeProducts = await getStoreProducts(storeId);
      setStore(storeDetails);
      setProducts(storeProducts);
    };

    fetchStoreData();

    const unsubscribe = subscribeToStoreOccupancy(storeId, (newOccupancy) => {
      setOccupancy(newOccupancy);
    });

    return () => unsubscribe();
  }, [storeId]);

  if (!store) return <div>Loading...</div>;

  return (
    <div>
      <h2>{store.name}</h2>
      <p>Address: {store.address}</p>
      <p>Current Occupancy: {occupancy !== null ? `${occupancy}%` : 'Loading...'}</p>
      <h3>Available Products:</h3>
      <ul>
        {products.map(product => (
          <li key={product.id}>{product.name} - ${product.price}</li>
        ))}
      </ul>
    </div>
  );
}

export default StoreDetails;