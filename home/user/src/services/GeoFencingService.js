import BackgroundGeolocation from 'react-native-background-geolocation';
import { getOptimizedRoute, updateUserLocation, checkRouteAdherence } from './MapService';

let storeInterval = null;

export const enterStore = (storeId) => {
  storeInterval = setInterval(() => {
    BackgroundGeolocation.getCurrentPosition({
      samples: 1,
      persist: true
    }, (location) => {
      console.log('[store location] ', location);
      updateHeatmap(location.coords.latitude, location.coords.longitude);
    });
  }, 15 * 1000); // 15 seconds interval
};

export const leaveStore = () => {
  if (storeInterval) {
    clearInterval(storeInterval);
    storeInterval = null;
  }
};

export const startGeofenceMonitoring = (userId) => {
  BackgroundGeolocation.onGeofence(geofenceEvent => {
    console.log('[geofence] ', geofenceEvent.identifier, geofenceEvent.action);
    if (geofenceEvent.action === 'ENTER') {
      enterStore(geofenceEvent.identifier);
    } else if (geofenceEvent.action === 'EXIT') {
      leaveStore();
    }
  });

  BackgroundGeolocation.onLocation(async location => {
    console.log('[location update] ', location);
    await updateUserLocation(userId, location);
    
    // Check if the user is still on their assigned route
    const assignedRoute = // Retrieve the user's current assigned route
    await checkRouteAdherence(userId, location, assignedRoute);
  });

  BackgroundGeolocation.ready({
    desiredAccuracy: BackgroundGeolocation.DESIRED_ACCURACY_HIGH,
    distanceFilter: 5,
    stopOnTerminate: false,
    startOnBoot: true,
    debug: true,
    logLevel: BackgroundGeolocation.LOG_LEVEL_VERBOSE,
    geofenceInitialTriggerEntry: true,
  }, (state) => {
    console.log("- BackgroundGeolocation is ready: ", state);
    BackgroundGeolocation.start();
  });
};