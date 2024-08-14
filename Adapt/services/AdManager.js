// services/AdManager.js

import { database } from '../firebaseConfig';
import { ref, query, where, getDocs, setDoc, doc } from 'firebase/firestore';

class AdManager {
  constructor() {
    this.adsCollection = ref(database, 'ads');
  }

  async loadAds(zipCode) {
    const q = query(this.adsCollection, where('zip_code', '==', zipCode));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  async getAdById(id) {
    const docRef = doc(this.adsCollection, id);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null;
  }

  async createAd(adData) {
    const newAdRef = doc(this.adsCollection);
    await setDoc(newAdRef, adData);
    return newAdRef.id;
  }

  async updateAd(id, adData) {
    const adRef = doc(this.adsCollection, id);
    await updateDoc(adRef, adData);
  }

  async deleteAd(id) {
    const adRef = doc(this.adsCollection, id);
    await deleteDoc(adRef);
  }

  async getAdsByCategory(category) {
    const q = query(this.adsCollection, where('category', '==', category));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  async getActiveAds() {
    const now = new Date();
    const q = query(this.adsCollection, where('endDate', '>', now));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }
}

export default new AdManager();