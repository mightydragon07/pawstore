"use client";
import React from 'react';
import { X, Plus, Minus, Trash2, ShoppingCart, ArrowRight } from 'lucide-react';

export const CartModal = ({ isOpen, closeCart, cartItems, removeFromCart, updateQuantity, proceedToCheckout }) => {
  if (!isOpen) return null;

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/70 backdrop-blur-sm"
        onClick={closeCart}
      ></div>

      {/* Cart Modal - Centered */}
      <div className="relative w-full max-w-2xl max-h-[90vh] bg-slate-900 rounded-2xl shadow-2xl border border-slate-700 flex flex-col overflow-hidden animate-scale-in">
        {/* Header */}
        <div className="p-6 border-b border-slate-700 bg-slate-800/50">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
                <ShoppingCart className="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Shopping Cart</h2>
                <p className="text-sm text-gray-400">{itemCount} {itemCount === 1 ? 'item' : 'items'}</p>
              </div>
            </div>
            <button 
              onClick={closeCart} 
              className="p-2 text-gray-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {cartItems.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingCart className="w-10 h-10 text-gray-600" />
              </div>
              <p className="text-xl text-gray-400 mb-2">Your cart is empty</p>
              <p className="text-sm text-gray-500">Add some smart devices for your pet!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map(item => (
                <div 
                  key={item.id} 
                  className="flex items-center p-4 bg-slate-800/50 rounded-xl border border-slate-700 hover:border-blue-500/50 transition-all group"
                >
                  {/* Product Image */}
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-20 h-20 object-cover rounded-lg mr-4"
                  />
                  
                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-semibold mb-1 truncate">{item.name}</h3>
                    <p className="text-blue-400 font-bold">${item.price}</p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-2 bg-slate-700 rounded-lg p-1">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity === 1}
                        className="p-1.5 text-gray-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="text-white font-semibold w-8 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1.5 text-gray-400 hover:text-white transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    
                    {/* Remove Button */}
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="p-2 text-red-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer/Checkout */}
        {cartItems.length > 0 && (
          <div className="p-6 border-t border-slate-700 bg-slate-800/50">
            {/* Subtotal */}
            <div className="flex justify-between items-center text-lg mb-4">
              <span className="text-gray-300">Subtotal</span>
              <span className="text-white font-bold">${total.toFixed(2)}</span>
            </div>
            
            {/* Shipping Info */}
            <div className="p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg mb-4">
              <p className="text-sm text-blue-400">
                Free shipping on orders over $150
              </p>
            </div>

            {/* Checkout Button */}
            <button
              onClick={proceedToCheckout}
              className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-all transform hover:scale-[1.02] shadow-lg shadow-blue-500/30 flex items-center justify-center space-x-2 group"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            
            {/* Continue Shopping */}
            <button
              onClick={closeCart}
              className="w-full mt-3 py-3 text-gray-400 hover:text-white transition-colors text-sm"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-scale-in {
          animation: scale-in 0.2s ease-out;
        }
      `}</style>
    </div>
  );
};