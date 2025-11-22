import React from 'react';
import { Heart, ShoppingCart, Trash2, Star } from 'lucide-react';

export const WishlistPage = ({ wishlist, products, addToCart, toggleWishlist }) => {
  const wishlistedProducts = products.filter(p => wishlist.includes(p.id));

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-blue-500/10 rounded-xl">
              <Heart className="w-8 h-8 text-blue-500 fill-blue-500" />
            </div>
          </div>
          <h2 className="text-5xl font-bold text-white mb-4">
            Your Wishlist
          </h2>
          <p className="text-gray-400">
            {wishlistedProducts.length} {wishlistedProducts.length === 1 ? 'item' : 'items'} saved for later
          </p>
        </div>

        {wishlistedProducts.length === 0 ? (
          <div className="max-w-2xl mx-auto text-center py-20 bg-slate-800/30 rounded-2xl border border-slate-700">
            <div className="w-20 h-20 bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="w-10 h-10 text-gray-600" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Your wishlist is empty</h3>
            <p className="text-gray-400 mb-6">
              Start adding products you love to keep track of them!
            </p>
          </div>
        ) : (
          <div className="space-y-4 max-w-5xl mx-auto">
            {wishlistedProducts.map((item, index) => (
              <div 
                key={item.id} 
                className="flex flex-col md:flex-row items-center bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl overflow-hidden hover:border-blue-500/50 transition-all group animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Product Image */}
                <div className="relative w-full md:w-48 h-48 bg-slate-700/50 flex-shrink-0">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {item.badge && (
                    <div className="absolute top-3 left-3 px-3 py-1 bg-blue-500 text-white text-xs font-bold rounded-full">
                      {item.badge}
                    </div>
                  )}
                </div>
                
                {/* Product Info */}
                <div className="flex-1 p-6">
                  <div className="flex flex-col md:flex-row md:items-start justify-between mb-4">
                    <div className="flex-1 mb-4 md:mb-0">
                      <h3 className="text-2xl font-bold text-white mb-2">{item.name}</h3>
                      <p className="text-gray-400 text-sm mb-3">{item.description}</p>
                      
                      <div className="flex flex-wrap gap-2 mb-3">
                        {item.features?.slice(0, 3).map((feature, idx) => (
                          <span key={idx} className="px-2 py-1 bg-blue-500/10 text-blue-400 text-xs rounded-lg border border-blue-500/30">
                            {feature}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center space-x-1 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        ))}
                        <span className="text-sm text-gray-400 ml-2">({item.reviews} reviews)</span>
                      </div>
                    </div>

                    <div className="text-right md:ml-6">
                      <div className="text-3xl font-bold text-white mb-2">
                        ${item.price}
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={() => addToCart(item)}
                      className="flex-1 flex items-center justify-center px-6 py-3 text-sm font-semibold rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/30 group"
                    >
                      <ShoppingCart className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                      Add to Cart
                    </button>
                    <button
                      onClick={() => toggleWishlist(item.id)}
                      className="px-6 py-3 text-sm font-semibold rounded-lg text-red-400 bg-red-500/10 border border-red-500/30 hover:bg-red-500/20 transition-all flex items-center justify-center"
                    >
                      <Trash2 className="w-5 h-5 mr-2" />
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Summary Card */}
        {wishlistedProducts.length > 0 && (
          <div className="max-w-5xl mx-auto mt-8 p-6 bg-blue-500/10 border border-blue-500/30 rounded-xl">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div>
                <h3 className="text-xl font-bold text-white mb-1">
                  Total Value: ${wishlistedProducts.reduce((sum, item) => sum + item.price, 0).toFixed(2)}
                </h3>
                <p className="text-sm text-gray-400">
                  {wishlistedProducts.length} {wishlistedProducts.length === 1 ? 'item' : 'items'} in your wishlist
                </p>
              </div>
              <button
                onClick={() => {
                  wishlistedProducts.forEach(item => addToCart(item));
                }}
                className="mt-4 md:mt-0 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-all shadow-lg shadow-blue-500/30 flex items-center"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add All to Cart
              </button>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
};