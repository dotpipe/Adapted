// services/LocationService.js
import * as Location from 'expo-location';
import AdManager from './AdManager';

class LocationService {
  constructor() {
    this.adManager = new AdManager();
    this.currentLocation = null;
    this.currentZipCode = null;
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

  async watchLocationChanges(callback) {
    return await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.High,
        timeInterval: 5000,
        distanceInterval: 10,
      },
      (location) => {
        this.currentLocation = location.coords;
        this.currentZipCode = null; // Reset zip code to force refresh
        callback(location);
      }
    );
  }

  async getNearbyPlaces(type, radius = 1000) {
    const { latitude, longitude } = await this.getCurrentLocation();
    // Implement API call to get nearby places (e.g., using Google Places API)
    // Return the list of nearby places
  }

  calculateDistance(lat1, lon1, lat2, lon2) {
    // Implement distance calculation (e.g., using Haversine formula)
    // Return distance in kilometers
  }
}

export default new LocationService();