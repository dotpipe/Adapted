// /components/mobile/screens/StoreDetailsScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import { getStoreDetails, getStoreProducts } from '../services/StoreService';
import { subscribeToStoreOccupancy } from '../services/OccupancyService';

const StoreDetailsScreen = ({ route }) => {
  const { storeId } = route.params;
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

  if (!store) return <Text>Loading...</Text>;

  return (
    <View>
      <Text>{store.name}</Text>
      <Text>Address: {store.address}</Text>
      <Text>Current Occupancy: {occupancy !== null ? `${occupancy}%` : 'Loading...'}</Text>
      <Text>Available Products:</Text>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Text>{item.name} - ${item.price}</Text>
        )}
      />
    </View>
  );
};

export default StoreDetailsScreen;