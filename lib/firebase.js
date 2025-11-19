// lib/firebase.js - CREATE THIS FILE
import { initializeApp, getApps } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your Firebase configuration
// REPLACE THESE WITH YOUR ACTUAL FIREBASE CONFIG VALUES FROM STEP 4
const firebaseConfig = {
  apiKey: "AIzaSyCur84QxcELUJPVfHN2sETRh65L65YnCGA",
  authDomain: "smartpaws-5b097.firebaseapp.com",
  projectId: "smartpaws-5b097",
  storageBucket: "smartpaws-5b097.firebasestorage.app",
  messagingSenderId: "1073956834198",
  appId: "1:1073956834198:web:c9ce1acd2c1b1becdfabb7",
};

// Initialize Firebase (only once)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Initialize services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const googleProvider = new GoogleAuthProvider();

export default app;