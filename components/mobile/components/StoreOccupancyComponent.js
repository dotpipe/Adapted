// /components/mobile/components/StoreOccupancyDisplay.js
import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { subscribeToStoreOccupancy } from '../services/OccupancyService';

const StoreOccupancyDisplay = ({ storeId }) => {
  const [occupancy, setOccupancy] = useState(null);

  useEffect(() => {
    const unsubscribe = subscribeToStoreOccupancy(storeId, (newOccupancy) => {
      setOccupancy(newOccupancy);
    });

    return () => unsubscribe();
  }, [storeId]);

  return (
    <View>
      <Text>Store Occupancy: {occupancy !== null ? `${occupancy}%` : 'Loading...'}</Text>
    </View>
  );
};

export default StoreOccupancyDisplay;