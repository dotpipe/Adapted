// services/LocationService.js

import * as Location from 'expo-location';
import AdManager from './AdManager';
import StoreHeatMapService from './StoreHeatMapService';

class LocationService {
  constructor() {
    this.adManager = new AdManager();
    this.currentLocation = null;
    this.currentZipCode = null;
    this.watchId = null;
  }

  async init() {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      throw new Error('Permission to access location was denied');
    }
  }

  async getCurrentLocation() {
    if (!this.currentLocation) {
      let location = await Location.getCurrentPositionAsync({});
      this.currentLocation = location.coords;
    }
    return this.currentLocation;
  }

  async getZipCode() {
    if (!this.currentZipCode) {
      let location = await this.getCurrentLocation();
      let [{ postalCode }] = await Location.reverseGeocodeAsync(location);
      this.currentZipCode = postalCode;
    }
    return this.currentZipCode;
  }

  async getAdsForCurrentLocation() {
    const zipCode = await this.getZipCode();
    return await this.adManager.loadAds(zipCode);
  }

  startWatchingLocation(storeId) {
    this.watchId = Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.High,
        timeInterval: 60000, // 1 minute
        distanceInterval: 1, // 1 meter
      },
      (location) => {
        this.currentLocation = location.coords;
        StoreHeatMapService.recordLocation(
          storeId,
          location.coords.latitude,
          location.coords.longitude,
          new Date().toISOString()
        );
      }
    );
  }

  stopWatchingLocation() {
    if (this.watchId) {
      this.watchId.remove();
      this.watchId = null;
    }
  }

  async isWithinStorePerimeter(storeId) {
    const location = await this.getCurrentLocation();
    return StoreHeatMapService.isWithinPerimeter(storeId, location.latitude, location.longitude);
  }

  async getNearbyStores(radius = 5000) {
    const location = await this.getCurrentLocation();
    // Implement logic to fetch nearby stores based on current location and radius
  }
}

export default new LocationService();