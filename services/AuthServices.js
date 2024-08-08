// services/AuthService.js

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const API_URL = 'https://your-api-url.com/auth/';

class AuthService {
  async register(email, password) {
    const response = await axios.post(API_URL + 'signup', {
      email,
      password
    });
    if (response.data.token) {
      await AsyncStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  }

  async login(email, password) {
    const response = await axios.post(API_URL + 'signin', {
      email,
      password
    });
    if (response.data.token) {
      await AsyncStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  }

  async logout() {
    await AsyncStorage.removeItem('user');
  }

  async getCurrentUser() {
    const userStr = await AsyncStorage.getItem('user');
    if (userStr) return JSON.parse(userStr);
    return null;
  }
}

export default new AuthService();