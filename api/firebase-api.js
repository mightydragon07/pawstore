// Server helper: return firebase config from server envs (no NEXT_PUBLIC prefixes)
export function getServerFirebaseConfig() {
  const config = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
  };

  // Remove undefined entries
  Object.keys(config).forEach((k) => config[k] === undefined && delete config[k]);

  return config;
}

export default function handler(req, res) {
  // Optional secret: if set, calls must include header `x-api-key` matching this value.
  const SECRET = process.env.FIREBASE_API_SECRET || process.env.NEXT_PUBLIC_FIREBASE_API_ROUTE_KEY;

  if (SECRET) {
    const clientKey = req.headers['x-api-key'] || req.headers['authorization']?.split(' ')[1];
    if (!clientKey || clientKey !== SECRET) {
      return res.status(403).json({ error: 'Forbidden' });
    }
  }

  const config = getServerFirebaseConfig();

  return res.status(200).json({ config });
}
