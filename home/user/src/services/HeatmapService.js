// /components/services/HeatmapService.js
import { apiService } from './ApiService';

export const generateHeatmapCSV = async (userId, storeId) => {
  try {
    const response = await apiService.get(`/heatmap/${userId}/${storeId}`);
    return response.data;
  } catch (error) {
    console.error('Error generating heatmap CSV:', error);
    throw error;
  }
};

export const uploadHeatmapData = async (userId, storeId, heatmapData) => {
  try {
    await apiService.post('/heatmap', { userId, storeId, heatmapData });
  } catch (error) {
    console.error('Error uploading heatmap data:', error);
    throw error;
  }
};