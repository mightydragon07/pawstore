// api/orders/index.js
import { createOrder, getUserOrders } from '../../lib/firebaseHelpers';
import { requireApiSecret, jsonError } from '../_helpers';

export default async function handler(req, res) {
  if (!(await requireApiSecret(req, res))) return;

  try {
    if (req.method === 'POST') {
      const { userId, orderData } = req.body || {};
      if (!userId || !orderData) return res.status(400).json({ error: 'Missing userId or orderData' });

      // If authenticated with ID token, ensure userId matches
      if (req.user && req.user.uid && req.user.uid !== userId) {
        return res.status(403).json({ error: 'Forbidden' });
      }

      const id = await createOrder(userId, orderData);
      return res.status(201).json({ id });
    }

    if (req.method === 'GET') {
      const userId = req.query.userId;
      if (!userId) return res.status(400).json({ error: 'Missing userId query param' });

      if (req.user && req.user.uid && req.user.uid !== userId) {
        return res.status(403).json({ error: 'Forbidden' });
      }

      const orders = await getUserOrders(userId);
      return res.status(200).json({ orders });
    }

    res.setHeader('Allow', 'GET,POST');
    return res.status(405).end('Method Not Allowed');
  } catch (err) {
    return jsonError(res, err);
  }
}
