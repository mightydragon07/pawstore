// api/cart/[id].js
import { saveCart, getCart } from '../../../lib/firebaseHelpers';
import { requireApiSecret, jsonError } from '../../_helpers';

export default async function handler(req, res) {
  if (!(await requireApiSecret(req, res))) return;

  const { id: userId } = req.query;
  try {
    // If authenticated via ID token, only allow access to the owning user
    if (req.user && req.user.uid && req.user.uid !== userId) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    if (req.method === 'GET') {
      const items = await getCart(userId);
      return res.status(200).json({ items });
    }

    if (req.method === 'POST' || req.method === 'PUT') {
      const { items } = req.body || {};
      await saveCart(userId, items || []);
      return res.status(200).json({ ok: true });
    }

    res.setHeader('Allow', 'GET,POST,PUT');
    return res.status(405).end('Method Not Allowed');
  } catch (err) {
    return jsonError(res, err);
  }
}
