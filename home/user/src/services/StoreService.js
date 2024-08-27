// /components/services/StoreService.js
import axios from 'axios';

export const getStoreDetails = async (storeId) => {
  try {
    const response = await axios.get(`/api/stores/${storeId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching store details:', error);
    throw error;
  }
};

export const getStoreProducts = async (storeId) => {
  try {
    const response = await axios.get(`/api/stores/${storeId}/products`);
    return response.data;
  } catch (error) {
    console.error('Error fetching store products:', error);
    throw error;
  }
};