
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAIW3VFaFJGF-GWYNfz094y_bfSPdPEZTM",
  authDomain: "spacecrewhealth.firebaseapp.com",
  projectId: "spacecrewhealth",
  storageBucket: "spacecrewhealth.firebasestorage.app",
  messagingSenderId: "284025643773",
  appId: "1:284025643773:web:51070657f2d43b9ad1d494",
  measurementId: "G-8DXN9WHDWF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { app, analytics, auth };
