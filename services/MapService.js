// services/MapService.js
import axios from 'axios';

const MAPS_API_KEY = 'YOUR_MAPS_API_KEY';
const CRIME_API_KEY = 'YOUR_CRIMEOMETER_API_KEY';

export const getOptimizedRoute = async (origin, destination) => {
  const response = await axios.get(
    `/api/consumer/route?origin=${origin}&destination=${destination}`
  );
  return processRoute(response.data.route);
};

export const getCrimeData = async (lat, lon) => {
  const response = await axios.get(
    `https://api.crimeometer.com/v1/incidents/raw-data?lat=${lat}&lon=${lon}&distance=1km&datetime_ini=2023-01-01T00:00:00.000Z&datetime_end=2023-12-31T23:59:59.999Z&page=1&page_size=10`,
    {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': CRIME_API_KEY
      }
    }
  );
  return response.data.incidents;
};

const processRoute = (route) => {
  const { distance, duration, start_address, end_address, steps } = route.legs[0];
  return {
    distance: distance.text,
    duration: duration.text,
    startAddress: start_address,
    endAddress: end_address,
    steps: steps.map(({ distance, duration, html_instructions, start_location, end_location }) => ({
      distance: distance.text,
      duration: duration.text,
      instructions: html_instructions,
      startLocation: start_location,
      endLocation: end_location
    }))
  };
};