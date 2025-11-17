// components/ProductsPage.jsx
import React, { useState } from 'react';
import { ProductCard } from '@/components/ProductCard';
import { Filter, Grid, List } from 'lucide-react';

export const ProductsPage = ({ products, addToCart, toggleWishlist, wishlist }) => {
  const [filters, setFilters] = useState({ category: 'all', sort: 'featured' });
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  const filteredProducts = products
    .filter(product => filters.category === 'all' || product.category === filters.category)
    .sort((a, b) => {
      if (filters.sort === 'price_asc') return a.price - b.price;
      if (filters.sort === 'price_desc') return b.price - a.price;
      if (filters.sort === 'reviews_desc') return b.reviews - a.reviews;
      return 0;
    });

  const categories = ['all', ...new Set(products.map(p => p.category))];

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold text-white mb-4">
            Smart Pet Devices
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Explore our collection of cutting-edge technology designed to enhance your pet's life and give you peace of mind.
          </p>
        </div>

        {/* Filters Bar */}
        <div className="mb-8 p-4 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
            {/* Category Filter */}
            <div className="flex items-center space-x-4 w-full lg:w-auto">
              <div className="flex items-center space-x-2 text-gray-300">
                <Filter className="w-5 h-5 text-blue-500" />
                <span className="font-semibold text-sm">Filter:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setFilters({...filters, category: cat})}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      filters.category === cat
                        ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30'
                        : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
                    }`}
                  >
                    {cat === 'all' ? 'All' : cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Sort and View Options */}
            <div className="flex items-center space-x-4">
              {/* Sort Dropdown */}
              <select
                value={filters.sort}
                onChange={(e) => setFilters({...filters, sort: e.target.value})}
                className="px-4 py-2 bg-slate-700 border border-slate-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              >
                <option value="featured">Featured</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="reviews_desc">Top Rated</option>
              </select>

              {/* View Mode Toggle */}
              <div className="flex items-center space-x-1 bg-slate-700 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'grid' ? 'bg-blue-500 text-white' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'list' ? 'bg-blue-500 text-white' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6 text-gray-400 text-sm">
          Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
              : 'space-y-4'
          }>
            {filteredProducts.map((product, index) => (
              <div
                key={product.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <ProductCard
                  product={product}
                  addToCart={addToCart}
                  toggleWishlist={toggleWishlist}
                  isWishlisted={wishlist.includes(product.id)}
                  viewMode={viewMode}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-slate-800/30 rounded-xl border border-slate-700">
            <p className="text-xl text-gray-400">No products found matching your criteria.</p>
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