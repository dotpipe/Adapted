// services/StoreHeatMapService.js

class StoreHeatMapService {
  constructor() {
    this.storePerimeters = new Map();
    this.locationData = new Map();
  }

  initializeStorePerimeter(storeId, perimeterCoordinates) {
    this.storePerimeters.set(storeId, perimeterCoordinates);
  }

  recordLocation(storeId, latitude, longitude, timestamp) {
    if (this.isWithinPerimeter(storeId, latitude, longitude)) {
      if (!this.locationData.has(storeId)) {
        this.locationData.set(storeId, []);
      }
      this.locationData.get(storeId).push({ latitude, longitude, timestamp });
    }
  }

  isWithinPerimeter(storeId, latitude, longitude) {
    const perimeter = this.storePerimeters.get(storeId);
    if (!perimeter) return false;
    
    // Implement point-in-polygon algorithm
    // This is a simplified version and may need to be replaced with a more robust algorithm
    let inside = false;
    for (let i = 0, j = perimeter.length - 1; i < perimeter.length; j = i++) {
      const xi = perimeter[i].latitude, yi = perimeter[i].longitude;
      const xj = perimeter[j].latitude, yj = perimeter[j].longitude;
      
      const intersect = ((yi > longitude) !== (yj > longitude))
          && (latitude < (xj - xi) * (longitude - yi) / (yj - yi) + xi);
      if (intersect) inside = !inside;
    }
    
    return inside;
  }

  generateHeatMap(storeId, startTime, endTime) {
    const storeData = this.locationData.get(storeId);
    if (!storeData) return [];

    return storeData.filter(point => 
      point.timestamp >= startTime && point.timestamp <= endTime
    );
  }

  clearOldData(storeId, cutoffTime) {
    const storeData = this.locationData.get(storeId);
    if (storeData) {
      this.locationData.set(storeId, storeData.filter(point => point.timestamp >= cutoffTime));
    }
  }
}

export default new StoreHeatMapService();