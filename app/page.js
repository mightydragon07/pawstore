// app/page.js
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
import { AboutPage } from '@/components/AboutPage';
import { SupportPage } from '@/components/SupportPage';
import { CartModal } from '@/components/CartModal';
import { AuthModal } from '@/components/AuthModal';
import { Footer } from '@/components/Footer';
import { Chatbox } from '@/components/Chatbox';

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
      default:
        return <Hero setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen text-white">
      <AnimatedBackground />
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

      <Footer />
    </div>
  );
}