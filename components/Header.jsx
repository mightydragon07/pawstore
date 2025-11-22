"use client";
import React, { useState, useEffect } from 'react';
import { ShoppingCart, Menu, X, Heart, User, Package } from 'lucide-react';

export const Header = ({ cartCount, wishlistCount, user, setCurrentPage, openCart, openAuth }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', page: 'home' },
    { name: 'Products', page: 'products' },
    { name: 'Orders', page: 'orders' },
  ];

  const handleNavClick = (page) => {
    setCurrentPage(page);
    setIsMenuOpen(false);
  };

  return (
    <header 
      className={`sticky top-0 z-40 transition-all duration-300 ${
        isScrolled 
          ? 'bg-slate-900/95 backdrop-blur-xl shadow-lg border-b border-blue-500/20' 
          : 'bg-slate-900/80 backdrop-blur-md border-b border-white/10'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div 
            onClick={() => handleNavClick('home')} 
            className="cursor-pointer flex items-center space-x-2 group"
          >
            <div className="text-2xl font-bold">
              <span className="text-white">Smart</span>
              <span className="text-blue-500">Paws</span>
            </div>
            <div className="w-1 h-1 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavClick(item.page)}
                className="px-4 py-2 text-gray-300 hover:text-white transition-colors relative group"
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300"></span>
              </button>
            ))}
          </nav>

          {/* Action Icons */}
          <div className="flex items-center space-x-2">
            {/* Wishlist */}
            <button 
              onClick={() => handleNavClick('wishlist')} 
              className="p-2 text-gray-300 hover:text-white transition-colors relative group hidden sm:block"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-blue-500 rounded-full">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart */}
            <button 
              onClick={openCart} 
              className="p-2 text-gray-300 hover:text-white transition-colors relative group"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-blue-500 rounded-full">
                  {cartCount}
                </span>
              )}
            </button>

            {/* User Profile */}
            <button 
              onClick={user ? () => handleNavClick('profile') : openAuth}
              className={`p-2 transition-colors relative hidden sm:block ${
                user ? 'text-blue-400' : 'text-gray-300 hover:text-white'
              }`}
            >
              <User className="w-5 h-5" />
              {user && (
                <span className="absolute -bottom-1 -right-1 w-2 h-2 bg-green-500 rounded-full border border-slate-900"></span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-300 hover:text-white transition-colors"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-slate-800/95 backdrop-blur-xl border-t border-white/10">
          <div className="container mx-auto px-4 py-4 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavClick(item.page)}
                className="flex items-center w-full px-4 py-3 text-gray-300 hover:text-white hover:bg-blue-500/10 rounded-lg transition-all"
              >
                {item.name}
              </button>
            ))}
            
            {/* Mobile Only Links */}
            <button
              onClick={() => handleNavClick('wishlist')}
              className="flex items-center justify-between w-full px-4 py-3 text-gray-300 hover:text-white hover:bg-blue-500/10 rounded-lg transition-all sm:hidden"
            >
              <span>Wishlist</span>
              {wishlistCount > 0 && (
                <span className="flex items-center justify-center px-2 py-1 text-xs font-bold text-white bg-blue-500 rounded-full">
                  {wishlistCount}
                </span>
              )}
            </button>

            <button
              onClick={user ? () => handleNavClick('profile') : openAuth}
              className="flex items-center w-full px-4 py-3 text-gray-300 hover:text-white hover:bg-blue-500/10 rounded-lg transition-all sm:hidden"
            >
              {user ? 'Profile' : 'Sign In'}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};