import { ref, onValue } from 'firebase/database';
import { database } from '../config/firebase';

export const subscribeToStoreOccupancy = (storeId, callback) => {
  const occupancyRef = ref(database, `stores/${storeId}/occupancy`);
  return onValue(occupancyRef, (snapshot) => {
    const occupancy = snapshot.val();
    callback(occupancy);
  });
};