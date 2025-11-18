// app/page.js - FINAL COMPLETE VERSION
"use client";
import React, { useState, useEffect } from 'react';
import { PRODUCTS } from '@/data/products';
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

// TEMPORARY About Page (replace with AboutPage component later)
const AboutPage = () => (
  <div className="min-h-screen py-12 flex items-center justify-center">
    <div className="text-center max-w-2xl mx-auto px-4">
      <h1 className="text-6xl font-bold text-white mb-6">About <span className="text-blue-500">SmartPaws</span></h1>
      <p className="text-xl text-gray-400 mb-8">
        We're revolutionizing pet care through innovative technology. SmartPaws combines AI, IoT sensors, 
        and beautiful design to create products that keep your pets healthy, safe, and happy.
      </p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="p-6 bg-slate-800/50 rounded-xl border border-slate-700">
          <div className="text-4xl font-bold text-blue-500 mb-2">50K+</div>
          <div className="text-gray-400 text-sm">Happy Pets</div>
        </div>
        <div className="p-6 bg-slate-800/50 rounded-xl border border-slate-700">
          <div className="text-4xl font-bold text-blue-500 mb-2">4.9/5</div>
          <div className="text-gray-400 text-sm">Rating</div>
        </div>
        <div className="p-6 bg-slate-800/50 rounded-xl border border-slate-700">
          <div className="text-4xl font-bold text-blue-500 mb-2">30+</div>
          <div className="text-gray-400 text-sm">Products</div>
        </div>
        <div className="p-6 bg-slate-800/50 rounded-xl border border-slate-700">
          <div className="text-4xl font-bold text-blue-500 mb-2">24/7</div>
          <div className="text-gray-400 text-sm">Support</div>
        </div>
      </div>
    </div>
  </div>
);

// TEMPORARY Support Page (replace with SupportPage component later)
const SupportPage = () => (
  <div className="min-h-screen py-12 flex items-center justify-center">
    <div className="text-center max-w-2xl mx-auto px-4">
      <h1 className="text-6xl font-bold text-white mb-6">How Can We Help?</h1>
      <p className="text-xl text-gray-400 mb-8">
        Get support for your SmartPaws products or find answers to common questions
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-slate-800/50 rounded-xl border border-slate-700">
          <div className="text-4xl mb-4">💬</div>
          <h3 className="text-xl font-bold text-white mb-2">Live Chat</h3>
          <p className="text-sm text-gray-400 mb-4">Available 24/7</p>
          <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold">
            Start Chat
          </button>
        </div>
        <div className="p-6 bg-slate-800/50 rounded-xl border border-slate-700">
          <div className="text-4xl mb-4">📧</div>
          <h3 className="text-xl font-bold text-white mb-2">Email</h3>
          <p className="text-sm text-gray-400 mb-4">support@smartpaws.com</p>
          <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold">
            Send Email
          </button>
        </div>
        <div className="p-6 bg-slate-800/50 rounded-xl border border-slate-700">
          <div className="text-4xl mb-4">📞</div>
          <h3 className="text-xl font-bold text-white mb-2">Phone</h3>
          <p className="text-sm text-gray-400 mb-4">1-800-SMART-PAW</p>
          <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold">
            Call Now
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default function Home() {
  const [currentPage, setCurrentPage] = useState('home');
  const [cartItems, setCartItems] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [orders, setOrders] = useState([
    {
      id: 1,
      date: '11/10/2025',
      items: [
        { id: 1, name: 'Smart Feeder Pro', price: 149, quantity: 1 },
        { id: 2, name: 'GPS Pet Tracker', price: 99, quantity: 2 }
      ],
      total: 347,
      status: 'Delivered'
    },
    {
      id: 2,
      date: '11/05/2025',
      items: [
        { id: 3, name: 'PetPace Smart Collar', price: 199, quantity: 1 }
      ],
      total: 199,
      status: 'Shipped'
    }
  ]);
  const [user, setUser] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

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

  const placeOrder = (order) => {
    setOrders(prev => [order, ...prev]);
    setCartItems([]);
    setCurrentPage('orders');
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
            products={PRODUCTS}
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
        return <ProfilePage user={user} logout={() => setUser(null)} setCurrentPage={setCurrentPage} />;
      case 'wishlist':
        return (
          <WishlistPage 
            wishlist={wishlist}
            addToCart={addToCart}
            toggleWishlist={toggleWishlist}
            products={PRODUCTS}
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