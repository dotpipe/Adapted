// /components/services/ApiService.js
import axios from 'axios';

const API_BASE_URL = 'https://api.example.com';

export const apiService = {
  get: async (endpoint) => {
    try {
      const response = await axios.get(`${API_BASE_URL}${endpoint}`);
      return response.data;
    } catch (error) {
      console.error('API GET error:', error);
      throw error;
    }
  },

  post: async (endpoint, data) => {
    try {
      const response = await axios.post(`${API_BASE_URL}${endpoint}`, data);
      return response.data;
    } catch (error) {
      console.error('API POST error:', error);
      throw error;
    }
  },

  // Add other methods (PUT, DELETE, etc.) as needed
};