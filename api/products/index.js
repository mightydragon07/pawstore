// api/products/index.js
import { getAllProducts, addProduct } from '../../lib/firebaseHelpers';
import { requireApiSecret, jsonError } from '../_helpers';

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      const products = await getAllProducts();
      return res.status(200).json({ products });
    }

    if (req.method === 'POST') {
      if (!(await requireApiSecret(req, res))) return;
      const productData = req.body || {};
      const id = await addProduct(productData);
      return res.status(201).json({ id });
    }

    res.setHeader('Allow', 'GET,POST');
    return res.status(405).end('Method Not Allowed');
  } catch (err) {
    return jsonError(res, err);
  }
}
