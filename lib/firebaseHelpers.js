// lib/firebaseHelpers.js
import { 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  getDocs, 
  updateDoc,
  query,
  where,
  orderBy,
  addDoc,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from './firebase';

// ===== USER FUNCTIONS =====
export const createUserDocument = async (userId, userData) => {
  try {
    await setDoc(doc(db, 'users', userId), {
      ...userData,
      createdAt: serverTimestamp(),
    });
  } catch (error) {
    console.error('Error creating user document:', error);
    throw error;
  }
};

export const getUserDocument = async (userId) => {
  try {
    const docSnap = await getDoc(doc(db, 'users', userId));
    if (docSnap.exists()) {
      return docSnap.data();
    }
    return null;
  } catch (error) {
    console.error('Error getting user document:', error);
    throw error;
  }
};

export const updateUserDocument = async (userId, updates) => {
  try {
    await updateDoc(doc(db, 'users', userId), {
      ...updates,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error('Error updating user document:', error);
    throw error;
  }
};

// ===== CART FUNCTIONS =====
export const saveCart = async (userId, cartItems) => {
  try {
    await setDoc(doc(db, 'carts', userId), {
      items: cartItems,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error('Error saving cart:', error);
  }
};

export const getCart = async (userId) => {
  try {
    const docSnap = await getDoc(doc(db, 'carts', userId));
    if (docSnap.exists()) {
      return docSnap.data().items || [];
    }
    return [];
  } catch (error) {
    console.error('Error getting cart:', error);
    return [];
  }
};

// ===== WISHLIST FUNCTIONS =====
export const saveWishlist = async (userId, wishlistItems) => {
  try {
    await setDoc(doc(db, 'wishlists', userId), {
      items: wishlistItems,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error('Error saving wishlist:', error);
  }
};

export const getWishlist = async (userId) => {
  try {
    const docSnap = await getDoc(doc(db, 'wishlists', userId));
    if (docSnap.exists()) {
      return docSnap.data().items || [];
    }
    return [];
  } catch (error) {
    console.error('Error getting wishlist:', error);
    return [];
  }
};

// ===== ORDER FUNCTIONS =====
export const createOrder = async (userId, orderData) => {
  try {
    const orderRef = await addDoc(collection(db, 'orders'), {
      userId,
      ...orderData,
      createdAt: serverTimestamp(),
      status: 'Processing',
    });
    return orderRef.id;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};

export const getUserOrders = async (userId) => {
  try {
    const q = query(
      collection(db, 'orders'),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    const orders = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      orders.push({ 
        id: doc.id, 
        ...data,
        date: data.createdAt?.toDate().toLocaleDateString() || data.date
      });
    });
    return orders;
  } catch (error) {
    console.error('Error getting orders:', error);
    return [];
  }
};

export const updateOrderStatus = async (orderId, status) => {
  try {
    await updateDoc(doc(db, 'orders', orderId), {
      status,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error('Error updating order status:', error);
    throw error;
  }
};

// ===== PRODUCT FUNCTIONS =====
export const getAllProducts = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'products'));
    const products = [];
    querySnapshot.forEach((doc) => {
      products.push({ id: doc.id, ...doc.data() });
    });
    return products;
  } catch (error) {
    console.error('Error getting products:', error);
    return [];
  }
};

export const addProduct = async (productData) => {
  try {
    const productRef = await addDoc(collection(db, 'products'), {
      ...productData,
      createdAt: serverTimestamp(),
    });
    return productRef.id;
  } catch (error) {
    console.error('Error adding product:', error);
    throw error;
  }
};

export const initializeProducts = async (products) => {
  try {
    const promises = products.map(product => 
      setDoc(doc(db, 'products', product.id.toString()), product)
    );
    await Promise.all(promises);
    console.log('Products initialized successfully!');
  } catch (error) {
    console.error('Error initializing products:', error);
  }
};