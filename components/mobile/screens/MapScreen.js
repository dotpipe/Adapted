// /components/mobile/screens/MapScreen.js
import React, { useEffect, useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import MapView, { Polyline } from 'react-native-maps';
import { getOptimizedRoute } from '../services/MapService';

const MapScreen = () => {
  const [route, setRoute] = useState(null);
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');

  const handleRouteCalculation = async () => {
    const optimizedRoute = await getOptimizedRoute(origin, destination, 'userId');
    setRoute(optimizedRoute);
  };

  return (
    <View style={{ flex: 1 }}>
      <TextInput
        placeholder="Origin"
        value={origin}
        onChangeText={setOrigin}
      />
      <TextInput
        placeholder="Destination"
        value={destination}
        onChangeText={setDestination}
      />
      <Button title="Calculate Route" onPress={handleRouteCalculation} />
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 37.7749,
          longitude: -122.4194,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {route && (
          <Polyline
            coordinates={route.map(point => ({ latitude: point.lat, longitude: point.lng }))}
            strokeColor="#FF0000"
            strokeWidth={2}
          />
        )}
      </MapView>
    </View>
  );
};

export default MapScreen;