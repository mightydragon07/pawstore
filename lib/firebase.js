// lib/firebase.js - CREATE THIS FILE
import { initializeApp, getApps } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

let app;
// If running in Node (server), initialize using server-only FIREBASE_* envs via the server helper
if (typeof window === 'undefined') {
  // Import server helper lazily to avoid bundling server code into client
  const { getServerFirebaseConfig } = require('../api/firebase-api');
  const cfg = getServerFirebaseConfig();
  if (!cfg || !cfg.apiKey || !cfg.projectId) {
    throw new Error('[lib/firebase] Missing FIREBASE_* environment variables on the server.');
  }
  app = getApps().length === 0 ? initializeApp(cfg) : getApps()[0];
} else {
  // Running in browser: initialize using NEXT_PUBLIC_FIREBASE_* env vars
  const clientConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  };

  if (!clientConfig.apiKey || !clientConfig.projectId) {
    throw new Error(
      '[lib/firebase] Missing NEXT_PUBLIC_FIREBASE_* environment variables for client initialization.'
    );
  }

  app = getApps().length === 0 ? initializeApp(clientConfig) : getApps()[0];
}

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const googleProvider = new GoogleAuthProvider();

export default app;