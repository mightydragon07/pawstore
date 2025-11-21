// lib/firebaseAdmin.js
import admin from 'firebase-admin';

let initialized = false;
if (!admin.apps.length) {
  try {
    if (process.env.FIREBASE_ADMIN_CREDENTIALS) {
      const cred = JSON.parse(process.env.FIREBASE_ADMIN_CREDENTIALS);
      admin.initializeApp({ credential: admin.credential.cert(cred) });
      initialized = true;
    } else if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
      // Let the SDK pick up credentials from the environment variable file path
      admin.initializeApp();
      initialized = true;
    } else {
      // Not initialized; admin features will be unavailable.
      // This is intentional for development if you don't want to provide admin creds.
      console.warn('[lib/firebaseAdmin] No admin credentials found in environment.');
    }
  } catch (err) {
    console.error('[lib/firebaseAdmin] Failed to initialize admin SDK:', err);
  }
}

export async function verifyIdToken(idToken) {
  if (!initialized) throw new Error('Firebase Admin not initialized');
  return admin.auth().verifyIdToken(idToken);
}

export default admin;
