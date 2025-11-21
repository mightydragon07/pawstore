// api/products/init.js
// Initialize products collection from `data/products.js` (server-only).
import { initializeProducts } from '../../lib/firebaseHelpers';
import PRODUCTS from '../../data/products';
import { requireApiSecret, jsonError } from '../_helpers';

export default async function handler(req, res) {
  if (!(await requireApiSecret(req, res))) return;

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method Not Allowed');
  }

  try {
    await initializeProducts(PRODUCTS.PRODUCTS || PRODUCTS);
    return res.status(200).json({ ok: true });
  } catch (err) {
    return jsonError(res, err);
  }
}
