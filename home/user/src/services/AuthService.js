// AuthService.js

import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut as firebaseSignOut,
  onAuthStateChanged
} from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  // Add your Firebase config here
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

class AuthService {
  login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  register(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  logout() {
    return firebaseSignOut(auth);
  }

  getCurrentUser() {
    return new Promise((resolve, reject) => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        unsubscribe();
        resolve(user);
      }, reject);
    });
  }

  onAuthStateChanged(callback) {
    return onAuthStateChanged(auth, callback);
  }
}
export const signIn = authService.login;
export const authService = new AuthService();
export const getCurrentUser = authService.getCurrentUser;
export const signOut = authService.logout;

export default authService;