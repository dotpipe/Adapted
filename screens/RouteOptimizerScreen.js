// src/screens/RouteOptimizerScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { getOptimizedRoute, getGasPrices } from '../services/MapService';

const RouteOptimizerScreen = ({ route }) => {
  const { origin, destination } = route.params;
  const [optimizedRoute, setOptimizedRoute] = useState(null);
  const [gasStations, setGasStations] = useState([]);

  useEffect(() => {
    const fetchRouteAndData = async () => {
      const route = await getOptimizedRoute(origin, destination);
      setOptimizedRoute(route);
      const stations = await getGasPrices(route);
      setGasStations(stations);
    };
    fetchRouteAndData();
  }, [origin, destination]);

  return (
    <View style={styles.container}>
      <MapView style={styles.map}>
        {optimizedRoute && (
          <Polyline
            coordinates={optimizedRoute.steps.map(step => step.end_location)}
            strokeColor="#000"
            strokeWidth={3}
          />
        )}
        {gasStations.map((station, index) => (
          <Marker
            key={index}
            coordinate={station.location}
            title={station.name}
            description={`$${station.price.toFixed(2)}/gallon`}
          />
        ))}
      </MapView>
      <Text style={styles.infoText}>
        Estimated Time: {optimizedRoute?.duration}
      </Text>
      <Text style={styles.infoText}>
        Route Safety Score: {optimizedRoute?.steps.reduce((acc, step) => acc + step.safetyScore, 0) / optimizedRoute?.steps.length}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  infoText: {
    padding: 10,
    fontSize: 16,
    textAlign: 'center',
  },
});

export default RouteOptimizerScreen;