// Import the necessary Firebase functions
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"; // For authentication
import { getFirestore } from "firebase/firestore"; // For Firestore

// Your Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA_0TDg7PGB-h_fkKSVyVEq_2dh10P8w4Q",
  authDomain: "aniquest-9262b.firebaseapp.com",
  projectId: "aniquest-9262b",
  storageBucket: "aniquest-9262b.firebasestorage.app",
  messagingSenderId: "532604754018",
  appId: "1:532604754018:web:2cff5e669238ef2120593b",
  measurementId: "G-V5J1HJ0H91"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

// Export Firebase instances for use in other parts of the app
export { app, analytics, auth, db };
