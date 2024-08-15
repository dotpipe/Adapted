// /components/services/DealService.js
import axios from 'axios';

export const getDeals = async (location) => {
  try {
    const response = await axios.get(`/api/deals?lat=${location.latitude}&lon=${location.longitude}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching deals:', error);
    return [];
  }
};