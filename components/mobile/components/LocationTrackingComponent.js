import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { ZipCodeManager } from '../../ZipCodeManager';

const LocationTrackingComponent = ({ userId }) => {
  const [currentZipCode, setCurrentZipCode] = useState(null);
  const zipCodeManager = new ZipCodeManager(userId);

  useEffect(() => {
    zipCodeManager.startZipCodeTracking();
    const interval = setInterval(async () => {
      const zipCode = await zipCodeManager.getCurrentZipCode();
      setCurrentZipCode(zipCode);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <View>
      <Text>Current Zip Code: {currentZipCode || 'Tracking...'}</Text>
    </View>
  );
};

export default LocationTrackingComponent;