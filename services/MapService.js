// src/services/MapService.js
import axios from 'axios';

const MAPS_API_KEY = 'YOUR_MAPS_API_KEY';
const CRIME_API_KEY = 'YOUR_CRIMEOMETER_API_KEY';

export const getOptimizedRoute = async (origin, destination) => {
  const response = await axios.get(
    `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${MAPS_API_KEY}`
  );
  return processRoute(response.data.routes[0]);
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

const processRoute = async (route) => {
  const steps = route.legs[0].steps;
  const safetyScores = await Promise.all(steps.map(async (step) => {
    const crimes = await getCrimeData(step.end_location.lat, step.end_location.lng);
    return calculateSafetyScore(crimes);
  }));

  const safeRoute = steps.map((step, index) => ({
    ...step,
    safetyScore: safetyScores[index]
  }));

  return {
    distance: route.legs[0].distance.text,
    duration: route.legs[0].duration.text,
    steps: safeRoute
  };
};

const calculateSafetyScore = (crimes) => {
  // Implement your safety score calculation logic here
  // For example, you could use the number and severity of crimes
  return 100 - (crimes.length * 5); // Simple example
};