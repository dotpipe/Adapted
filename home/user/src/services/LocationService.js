import BackgroundGeolocation from 'react-native-background-geolocation';
import { ZipCodeManager } from './ZipCodeManager';
import { startGeofenceMonitoring } from './GeoFencingService';
import axios from 'axios';

class LocationService {
  constructor() {
    this.zipCodeManager = null;
    this.currentLocation = null;
  }

  initializeForUser(userId) {
    this.zipCodeManager = new ZipCodeManager(userId);
    this.zipCodeManager.startZipCodeTracking();
    startGeofenceMonitoring(userId);
    this.startLocationTracking();
  }

  startLocationTracking() {
    BackgroundGeolocation.onLocation(this.handleLocationUpdate);
    BackgroundGeolocation.ready({
      desiredAccuracy: BackgroundGeolocation.DESIRED_ACCURACY_HIGH,
      distanceFilter: 10,
      stopOnTerminate: false,
      startOnBoot: true,
      debug: false,
      logLevel: BackgroundGeolocation.LOG_LEVEL_VERBOSE
    }, (state) => {
      console.log("- BackgroundGeolocation is ready: ", state);
      BackgroundGeolocation.start();
    });
  }

  handleLocationUpdate = async (location) => {
    this.currentLocation = location;
    await this.updateServerWithLocation(location);
    await this.zipCodeManager.handleLocationUpdate(location);
  }

  async getCurrentLocation() {
    if (this.currentLocation) {
      return this.currentLocation;
    }
    return new Promise((resolve, reject) => {
      BackgroundGeolocation.getCurrentPosition({
        samples: 1,
        persist: false
      }, resolve, reject);
    });
  }

  async updateServerWithLocation(location) {
    try {
      await axios.post('/api/user/update-location', {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        timestamp: location.timestamp
      });
    } catch (error) {
      console.error('Failed to update server with location:', error);
    }
  }

  async requestLocationPermissions() {
    return BackgroundGeolocation.requestPermission();
  }

  calculateDistance(point1, point2) {
    const R = 6371e3; // Earth's radius in meters
    const φ1 = point1.latitude * Math.PI / 180;
    const φ2 = point2.latitude * Math.PI / 180;
    const Δφ = (point2.latitude - point1.latitude) * Math.PI / 180;
    const Δλ = (point2.longitude - point1.longitude) * Math.PI / 180;

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    return R * c; // Distance in meters
  }
}

export default new LocationService();