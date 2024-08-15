// /components/mobile/components/DealFinder.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import { getDeals } from '../../services/DealService';

const DealFinder = ({ location }) => {
  const [deals, setDeals] = useState([]);

  useEffect(() => {
    const fetchDeals = async () => {
      const nearbyDeals = await getDeals(location);
      setDeals(nearbyDeals);
    };

    fetchDeals();
  }, [location]);

  return (
    <View>
      <Text>Nearby Deals</Text>
      <FlatList
        data={deals}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <Text>{item.storeName}: {item.description}</Text>
            <Text>Discount: {item.discount}%</Text>
          </View>
        )}
      />
    </View>
  );
};

export default DealFinder;