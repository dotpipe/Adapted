// services/OccupancyService.js
import { database } from '../firebaseConfig';
import { ref, onValue } from 'firebase/database';

export const subscribeToStoreOccupancy = (storeId, callback) => {
  const occupancyRef = ref(database, `stores/${storeId}/occupancy`);
  return onValue(occupancyRef, (snapshot) => {
    const occupancy = snapshot.val();
    callback(occupancy);
  });
};