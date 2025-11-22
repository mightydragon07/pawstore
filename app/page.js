"use client";
import React, { useState, useEffect } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { PRODUCTS } from '@/data/products';
import { AboutPage } from '@/components/AboutPage';
import { SupportPage } from '@/components/SupportPage';
import { LoadingScreen } from '@/components/LoadingScreen';
import { AnimatedBackground } from '@/components/AnimatedBackground';
import { CustomCursor } from '@/components/CustomCursor';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { ProductsPage } from '@/components/ProductsPage';
import { CheckoutPage } from '@/components/CheckoutPage';
import { OrdersPage } from '@/components/OrdersPage';
import { ProfilePage } from '@/components/ProfilePage';
import { WishlistPage } from '@/components/WishlistPage';
import { CartModal } from '@/components/CartModal';
import { AuthModal } from '@/components/AuthModal';
import { Footer } from '@/components/Footer';
import { Chatbox } from '@/components/Chatbox';




export default function Home() {
  const [currentPage, setCurrentPage] = useState('home');
  const [cartItems, setCartItems] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState(PRODUCTS);
  const [user, setUser] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [authReady, setAuthReady] = useState(false);
  const [minLoadingDone, setMinLoadingDone] = useState(false);
  const MIN_LOADING_MS = 3000; 

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const userData = {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          name: firebaseUser.displayName || firebaseUser.email.split('@')[0],
          photoURL: firebaseUser.photoURL,
        };
        setUser(userData);

        try {
          const idToken = await firebaseUser.getIdToken();

          const [cartRes, wishlistRes, ordersRes] = await Promise.all([
            fetch(`/api/cart/${firebaseUser.uid}`, { headers: { Authorization: `Bearer ${idToken}` } }),
            fetch(`/api/wishlist/${firebaseUser.uid}`, { headers: { Authorization: `Bearer ${idToken}` } }),
            fetch(`/api/orders?userId=${firebaseUser.uid}`, { headers: { Authorization: `Bearer ${idToken}` } }),
          ]);

          const cartJson = await cartRes.json();
          const wishlistJson = await wishlistRes.json();
          const ordersJson = await ordersRes.json();

          setCartItems(cartJson.items || []);
          setWishlist(wishlistJson.items || []);
          setOrders(ordersJson.orders || []);
        } catch (error) {
          console.error('Error loading user data:', error);
        }
      } else {
        setUser(null);
        setCartItems([]);
        setWishlist([]);
        setOrders([]);
      }
      setAuthReady(true);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const res = await fetch('/api/products');
        const json = await res.json();
        const firebaseProducts = json.products || [];
        if (firebaseProducts.length > 0) {
          setProducts(firebaseProducts);
        } else {
          console.log('No products in Firebase, using local product list');
          setProducts(PRODUCTS);
        }
      } catch (error) {
        console.error('Error loading products:', error);
        setProducts(PRODUCTS);
      }
    };

    loadProducts();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setMinLoadingDone(true), MIN_LOADING_MS);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (authReady && minLoadingDone) {
      setIsLoading(false);
    }
  }, [authReady, minLoadingDone]);

  useEffect(() => {
    if (user && cartItems.length >= 0) {
      (async () => {
        try {
          const token = await auth.currentUser.getIdToken();
          await fetch(`/api/cart/${user.uid}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
            body: JSON.stringify({ items: cartItems }),
          });
        } catch (err) {
          console.error(err);
        }
      })();
    }
  }, [cartItems, user]);

  useEffect(() => {
    if (user && wishlist.length >= 0) {
      (async () => {
        try {
          const token = await auth.currentUser.getIdToken();
          await fetch(`/api/wishlist/${user.uid}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
            body: JSON.stringify({ items: wishlist }),
          });
        } catch (err) {
          console.error(err);
        }
      })();
    }
  }, [wishlist, user]);

  const addToCart = (product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id, quantity) => {
    setCartItems(prev =>
      prev.map(item => item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item)
    );
  };

  const toggleWishlist = (id) => {
    setWishlist(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const placeOrder = async (orderData) => {
    if (!user) {
      alert('Please sign in to place an order');
      return;
    }

    try {
      const token = await auth.currentUser.getIdToken();
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ userId: user.uid, orderData }),
      });
      const json = await res.json();
      const orderId = json.id;

      const ordersRes = await fetch(`/api/orders?userId=${user.uid}`, { headers: { Authorization: `Bearer ${token}` } });
      const ordersJson = await ordersRes.json();
      setOrders(ordersJson.orders || []);
      
      setCartItems([]);
      
      setCurrentPage('orders');
      
      alert('Order placed successfully!');
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Failed to place order. Please try again.');
    }
  };

  const proceedToCheckout = () => {
    if (!user) {
      setIsCartOpen(false);
      setIsAuthOpen(true);
    } else {
      setIsCartOpen(false);
      setCurrentPage('checkout');
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setCartItems([]);
      setWishlist([]);
      setOrders([]);
      setCurrentPage('home');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  if (isLoading) {
    return <LoadingScreen />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Hero setCurrentPage={setCurrentPage} />;
      case 'products':
        return (
          <ProductsPage
            products={products}
            addToCart={addToCart}
            toggleWishlist={toggleWishlist}
            wishlist={wishlist}
          />
        );
      case 'checkout':
        return (
          <CheckoutPage
            cartItems={cartItems}
            user={user}
            placeOrder={placeOrder}
            setCurrentPage={setCurrentPage}
          />
        );
      case 'orders':
        return <OrdersPage orders={orders} />;
      case 'profile':
        return <ProfilePage user={user} logout={handleLogout} setCurrentPage={setCurrentPage} />;
      case 'wishlist':
        return (
          <WishlistPage 
            wishlist={wishlist}
            addToCart={addToCart}
            toggleWishlist={toggleWishlist}
            products={products}
          />
        );
      case 'about':
        return <AboutPage />;
      case 'support':
        return <SupportPage />;
      default:
        return <Hero setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen text-white">
      <AnimatedBackground />
      <CustomCursor />
      <Header
        cartCount={cartCount}
        wishlistCount={wishlist.length}
        user={user}
        setCurrentPage={setCurrentPage}
        openCart={() => setIsCartOpen(true)}
        openAuth={() => setIsAuthOpen(true)}
      />

      {renderPage()}

      <CartModal
        isOpen={isCartOpen}
        closeCart={() => setIsCartOpen(false)}
        cartItems={cartItems}
        removeFromCart={removeFromCart}
        updateQuantity={updateQuantity}
        proceedToCheckout={proceedToCheckout}
      />

      <AuthModal
        isOpen={isAuthOpen}
        closeAuth={() => setIsAuthOpen(false)}
        onLogin={setUser}
      />

      <Chatbox />

      <Footer setCurrentPage={setCurrentPage} />
    </div>
  );
}