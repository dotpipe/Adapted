// components/consumer/MapScreen.js

import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import LocationService from '../../services/LocationService';
import AdManager from '../../services/AdManager';

const MapScreen = () => {
  const [region, setRegion] = useState(null);
  const [stores, setStores] = useState([]);

  useEffect(() => {
    initializeMap();
  }, []);

  const initializeMap = async () => {
    const location = await LocationService.getCurrentLocation();
    setRegion({
      latitude: location.latitude,
      longitude: location.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
    fetchNearbyStores(location);
  };

  const fetchNearbyStores = async (location) => {
    const nearbyStores = await AdManager.getNearbyStores(location);
    setStores(nearbyStores);
  };

  return (
    <View style={styles.container}>
      {region && (
        <MapView
          style={styles.map}
          region={region}
          showsUserLocation={true}
          showsMyLocationButton={true}
        >
          {stores.map((store) => (
            <Marker
              key={store.id}
              coordinate={{
                latitude: store.latitude,
                longitude: store.longitude,
              }}
              title={store.name}
              description={store.address}
            />
          ))}
        </MapView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});

export default MapScreen;