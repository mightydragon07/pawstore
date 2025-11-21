// api/_helpers.js
// Shared helper for verifying Firebase ID tokens or API secret header
import { verifyIdToken } from '../lib/firebaseAdmin';

export async function requireApiSecret(req, res) {
  // 1) Try to verify Firebase ID token from Authorization header
  const authHeader = req.headers['authorization'] || '';
  const idToken = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : authHeader || null;
  if (idToken) {
    try {
      const decoded = await verifyIdToken(idToken);
      req.user = decoded; // attach decoded token (contains uid)
      return true;
    } catch (err) {
      // invalid token -> fall through to api-key check
      console.warn('[api/_helpers] Invalid ID token:', err?.message || err);
    }
  }

  // 2) Fallback: verify x-api-key for server-to-server calls
  const SECRET = process.env.FIREBASE_API_SECRET || process.env.NEXT_PUBLIC_FIREBASE_API_ROUTE_KEY;
  if (!SECRET) return true; // no secret configured => allow

  const clientKey = req.headers['x-api-key'] || null;
  if (!clientKey || clientKey !== SECRET) {
    res.status(403).json({ error: 'Forbidden' });
    return false;
  }
  return true;
}

export function jsonError(res, err) {
  console.error(err);
  res.status(500).json({ error: err.message || 'Server error' });
}
