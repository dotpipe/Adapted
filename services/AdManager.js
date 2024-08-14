// services/AdManager.js
import { MongoClient } from 'mongodb';

class AdManager {
  constructor() {
    this.client = new MongoClient(process.env.MONGODB_URI);
    this.db = this.client.db('adapt_mobile');
    this.adsCollection = this.db.collection('ads');
  }

  async getAdsForLocation(zipCode) {
    const response = await fetch(`/api/consumer/ads?zipCode=${zipCode}`);
    return await response.json();
  }

  async loadAds(zipCode) {
    return await this.adsCollection.find({ zip_code: zipCode }).toArray();
  }

  async getAdById(id) {
    return await this.adsCollection.findOne({ _id: id });
  }

  async createAd(adData) {
    const result = await this.adsCollection.insertOne(adData);
    return result.insertedId;
  }
}

export default new AdManager();