// services/MapService.js

import axios from 'axios';
import { ZipCodeManager } from './ZipCodeManager';

const MAPS_API_KEY = 'YOUR_MAPS_API_KEY';
const CRIME_API_KEY = 'YOUR_CRIMEOMETER_API_KEY';

export const getOptimizedRoute = async (origin, destination, userId) => {
  const zipCodeManager = new ZipCodeManager(userId);
  const currentZipCode = await zipCodeManager.getCurrentZipCode();

  const response = await axios.post(
    `/api/consumer/collaborative-route`,
    {
      origin,
      destination,
      userId,
      currentZipCode,
      includeGasPrices: true
    },
    {
      headers: {
        'Authorization': `Bearer ${MAPS_API_KEY}`,
        'Content-Type': 'application/json'
      }
    }
  );

  return processCollaborativeRoute(response.data.route);
};

const processCollaborativeRoute = (routeData) => {
  return {
    path: routeData.path,
    estimatedTime: routeData.estimatedTime,
    suggestedSpeeds: routeData.suggestedSpeeds,
    alternativePaths: routeData.alternativePaths,
    waitPoints: routeData.waitPoints,
    gasStations: routeData.gasStations.map(station => ({
      location: station.location,
      price: station.price,
      brand: station.brand
    }))
  };
};

export const updateUserLocation = async (userId, location) => {
  await axios.post('/api/user/update-location', { userId, location });
};

export const checkRouteAdherence = async (userId, currentLocation, assignedRoute) => {
  const tolerance = 50; // meters
  const closestPoint = findClosestPointOnRoute(currentLocation, assignedRoute.path);
  const distance = calculateDistance(currentLocation, closestPoint);

  if (distance > tolerance) {
    const newRoute = await getOptimizedRoute(currentLocation, assignedRoute.destination, userId);
    return { adherence: false, newRoute };
  }

  return { adherence: true };
};

const findClosestPointOnRoute = (currentLocation, routePath) => {
  let closestPoint = routePath[0];
  let minDistance = calculateDistance(currentLocation, closestPoint);

  for (let point of routePath) {
    const distance = calculateDistance(currentLocation, point);
    if (distance < minDistance) {
      minDistance = distance;
      closestPoint = point;
    }
  }

  return closestPoint;
};

const calculateDistance = (point1, point2) => {
  const R = 6371e3; // Earth's radius in meters
  const φ1 = point1.lat * Math.PI / 180;
  const φ2 = point2.lat * Math.PI / 180;
  const Δφ = (point2.lat - point1.lat) * Math.PI / 180;
  const Δλ = (point2.lon - point1.lon) * Math.PI / 180;

  const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ/2) * Math.sin(Δλ/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

  return R * c;
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