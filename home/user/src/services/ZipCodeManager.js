// /components/services/ZipCodeManager.js
import BackgroundGeolocation from 'react-native-background-geolocation';
import axios from 'axios';

export class ZipCodeManager {
  constructor(userId) {
    this.userId = userId;
    this.currentZipCode = null;
  }

  startZipCodeTracking() {
    BackgroundGeolocation.onLocation(this.handleLocationUpdate);
    BackgroundGeolocation.ready({
      desiredAccuracy: BackgroundGeolocation.DESIRED_ACCURACY_HIGH,
      distanceFilter: 10,
      stopOnTerminate: false,
      startOnBoot: true,
    }, (state) => {
      if (!state.enabled) {
        BackgroundGeolocation.start();
      }
    });
  }

  handleLocationUpdate = async (location) => {
    const { latitude, longitude } = location.coords;
    const newZipCode = await this.getZipCodeFromCoordinates(latitude, longitude);
    if (newZipCode !== this.currentZipCode) {
      this.currentZipCode = newZipCode;
      this.updateUserZipCode(newZipCode);
    }
  }

  async getZipCodeFromCoordinates(latitude, longitude) {
    try {
      const response = await axios.get(`https://api.example.com/geocode?lat=${latitude}&lon=${longitude}`);
      return response.data.zipCode;
    } catch (error) {
      console.error('Error fetching zip code:', error);
      return null;
    }
  }

  async updateUserZipCode(zipCode) {
    try {
      await axios.post(`https://api.example.com/users/${this.userId}/zipcode`, { zipCode });
    } catch (error) {
      console.error('Error updating user zip code:', error);
    }
  }

  async getCurrentZipCode() {
    return this.currentZipCode;
  }
}