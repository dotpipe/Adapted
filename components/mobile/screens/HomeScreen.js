// /components/mobile/screens/HomeScreen.js
import React, { useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { startGeofenceMonitoring } from '../../services/GeoFencingService';
import { subscribeToStoreOccupancy } from '../../services/OccupancyService';

const HomeScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const userId = 'exampleUserId'; // Replace with actual user ID
    startGeofenceMonitoring(userId);

    const unsubscribe = subscribeToStoreOccupancy('exampleStoreId', (occupancy) => {
      console.log('Store occupancy:', occupancy);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <View>
      <Text>Home Screen</Text>
      <Button title="Go to Map" onPress={() => navigation.navigate('Map')} />
      <Button title="Go to Cart" onPress={() => navigation.navigate('Cart')} />
    </View>
  );
};

export default HomeScreen;