// StorePerimeterScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import * as Location from 'expo-location';
import StoreHeatMapService from '../services/StoreHeatMapService';

const StorePerimeterScreen = ({ storeId }) => {
  const [perimeter, setPerimeter] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permission to access location was denied');
        return;
      }
    })();
  }, []);

  const startRecording = async () => {
    setIsRecording(true);
    setPerimeter([]);
  };

  const stopRecording = () => {
    setIsRecording(false);
    StoreHeatMapService.initializeStorePerimeter(storeId, perimeter);
  };

  const recordCoordinate = async () => {
    let location = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = location.coords;
    setCurrentLocation({ latitude, longitude });
    setPerimeter([...perimeter, { latitude, longitude }]);
  };

  useEffect(() => {
    if (isRecording) {
      const interval = setInterval(recordCoordinate, 5000); // Record every 5 seconds
      return () => clearInterval(interval);
    }
  }, [isRecording]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Store Perimeter Walkaround</Text>
      {currentLocation && (
        <Text>
          Current Location: {currentLocation.latitude.toFixed(6)}, {currentLocation.longitude.toFixed(6)}
        </Text>
      )}
      <Text>Recorded Points: {perimeter.length}</Text>
      <Button
        title={isRecording ? "Stop Recording" : "Start Recording"}
        onPress={isRecording ? stopRecording : startRecording}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default StorePerimeterScreen;