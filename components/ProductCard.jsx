// components/ProductCard.jsx
"use client";
import React, { useState } from 'react';
import { Heart, ShoppingCart, Star } from 'lucide-react';

export const ProductCard = ({ product, addToCart, toggleWishlist, isWishlisted, viewMode = 'grid' }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  if (viewMode === 'list') {
    return (
      <div className="flex flex-col md:flex-row bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl overflow-hidden hover:border-blue-500/50 transition-all group">
        <div className="relative w-full md:w-48 h-48 bg-slate-700/50 flex-shrink-0">
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            style={{ opacity: imageLoaded ? 1 : 0 }}
            onLoad={() => setImageLoaded(true)}
          />
          {product.badge && (
            <div className="absolute top-3 left-3 px-3 py-1 bg-blue-500 text-white text-xs font-bold rounded-full">
              {product.badge}
            </div>
          )}
        </div>
        
        <div className="flex-1 p-6 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-xl font-bold text-white">{product.name}</h3>
              <button 
                onClick={() => toggleWishlist(product.id)}
                className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-blue-500 text-blue-500' : 'text-gray-400'}`} />
              </button>
            </div>
            <p className="text-gray-400 text-sm mb-4">{product.description}</p>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {product.features?.slice(0, 3).map((feature, idx) => (
                <span key={idx} className="px-2 py-1 bg-blue-500/10 text-blue-400 text-xs rounded-lg border border-blue-500/30">
                  {feature}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold text-white mb-1">${product.price}</div>
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                ))}
                <span className="text-xs text-gray-400 ml-1">({product.reviews})</span>
              </div>
            </div>
            <button 
              onClick={() => addToCart(product)}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-all transform hover:scale-105 flex items-center space-x-2 shadow-lg shadow-blue-500/30"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>Add to Cart</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl overflow-hidden hover:border-blue-500/50 transition-all transform hover:-translate-y-2 hover:shadow-xl hover:shadow-blue-500/20 group">
      <div className="relative h-56 bg-slate-700/50 overflow-hidden">
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          style={{ opacity: imageLoaded ? 1 : 0 }}
          onLoad={() => setImageLoaded(true)}
        />
        {product.badge && (
          <div className="absolute top-3 right-3 px-3 py-1 bg-blue-500 text-white text-xs font-bold rounded-full shadow-lg">
            {product.badge}
          </div>
        )}
        <button 
          onClick={() => toggleWishlist(product.id)}
          className="absolute top-3 left-3 p-2 bg-slate-900/70 backdrop-blur-sm hover:bg-slate-900 rounded-lg transition-colors"
        >
          <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-blue-500 text-blue-500' : 'text-white'}`} />
        </button>
      </div>
      
      <div className="p-5">
        <h3 className="text-lg font-bold text-white mb-2 line-clamp-1">{product.name}</h3>
        <p className="text-gray-400 text-sm mb-4 line-clamp-2">{product.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {product.features?.slice(0, 3).map((feature, idx) => (
            <span key={idx} className="px-2 py-1 bg-blue-500/10 text-blue-400 text-xs rounded-lg border border-blue-500/30">
              {feature}
            </span>
          ))}
        </div>
        
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-2xl font-bold text-white">${product.price}</div>
            <div className="flex items-center space-x-1 mt-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
              ))}
              <span className="text-xs text-gray-400 ml-1">({product.reviews})</span>
            </div>
          </div>
        </div>

        <button 
          onClick={() => addToCart(product)}
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-all transform hover:scale-105 flex items-center justify-center space-x-2 shadow-lg shadow-blue-500/30"
        >
          <ShoppingCart className="w-4 h-4" />
          <span>Add to Cart</span>
        </button>
      </div>
    </div>
  );
};