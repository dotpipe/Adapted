// services/NetworkService.js
import NetInfo from "@react-native-community/netinfo";

class NetworkService {
  constructor() {
    this.isConnected = true;
    this.listeners = [];
    this.offlineQueue = [];
  }

  init() {
    NetInfo.addEventListener(state => {
      this.isConnected = state.isConnected;
      this.notifyListeners();
      if (this.isConnected) {
        this.processOfflineQueue();
      }
    });
  }

  addListener(listener) {
    this.listeners.push(listener);
  }

  removeListener(listener) {
    this.listeners = this.listeners.filter(l => l !== listener);
  }

  notifyListeners() {
    this.listeners.forEach(listener => listener(this.isConnected));
  }

  addToOfflineQueue(action) {
    this.offlineQueue.push(action);
  }

  async processOfflineQueue() {
    while (this.offlineQueue.length > 0) {
      const action = this.offlineQueue.shift();
      try {
        await action();
      } catch (error) {
        console.error('Error processing offline action:', error);
        this.offlineQueue.unshift(action);
        break;
      }
    }
  }

  async performAction(action) {
    if (this.isConnected) {
      return await action();
    } else {
      this.addToOfflineQueue(action);
      return null;
    }
  }
}

export default new NetworkService();