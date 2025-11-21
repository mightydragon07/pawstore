// api/users/[id].js
import {
  createUserDocument,
  getUserDocument,
  updateUserDocument,
} from '../../lib/firebaseHelpers';
import { requireApiSecret, jsonError } from '../_helpers';

export default async function handler(req, res) {
  if (!(await requireApiSecret(req, res))) return;

  const { id: userId } = req.query;
  try {
    // If request is authenticated with ID token, ensure the requested userId matches the token uid
    if (req.user && req.user.uid && req.user.uid !== userId) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    if (req.method === 'GET') {
      const user = await getUserDocument(userId);
      return res.status(200).json({ user });
    }

    if (req.method === 'POST') {
      const payload = req.body || {};
      await createUserDocument(userId, payload);
      return res.status(201).json({ ok: true });
    }

    if (req.method === 'PUT') {
      const updates = req.body || {};
      await updateUserDocument(userId, updates);
      return res.status(200).json({ ok: true });
    }

    res.setHeader('Allow', 'GET,POST,PUT');
    return res.status(405).end('Method Not Allowed');
  } catch (err) {
    return jsonError(res, err);
  }
}
