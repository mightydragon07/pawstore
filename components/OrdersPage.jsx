import React, { useState } from 'react';
import { Package, Truck, CheckCircle, Clock, ChevronDown, MapPin } from 'lucide-react';

export const OrdersPage = ({ orders }) => {
  const [expandedOrder, setExpandedOrder] = useState(null);

  const toggleOrder = (id) => {
    setExpandedOrder(expandedOrder === id ? null : id);
  };

  const getStatusConfig = (status) => {
    const configs = {
      'Delivered': {
        icon: CheckCircle,
        color: 'text-green-500',
        bg: 'bg-green-500/10',
        border: 'border-green-500/30',
      },
      'Shipped': {
        icon: Truck,
        color: 'text-blue-500',
        bg: 'bg-blue-500/10',
        border: 'border-blue-500/30',
      },
      'Processing': {
        icon: Clock,
        color: 'text-yellow-500',
        bg: 'bg-yellow-500/10',
        border: 'border-yellow-500/30',
      },
    };
    return configs[status] || configs['Processing'];
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-blue-500/10 rounded-xl">
              <Package className="w-8 h-8 text-blue-500" />
            </div>
          </div>
          <h2 className="text-5xl font-bold text-white mb-4">
            My Orders
          </h2>
          <p className="text-gray-400">
            Track your purchases and delivery status
          </p>
        </div>

        {/* Orders List */}
        {orders.length > 0 ? (
          <div className="space-y-4 max-w-4xl mx-auto">
            {orders.map((order) => {
              const statusConfig = getStatusConfig(order.status);
              const StatusIcon = statusConfig.icon;
              
              return (
                <div 
                  key={order.id} 
                  className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl overflow-hidden hover:border-blue-500/50 transition-all"
                >
                  {/* Order Header */}
                  <div 
                    onClick={() => toggleOrder(order.id)}
                    className="p-6 cursor-pointer hover:bg-slate-800/70 transition-colors"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <span className="text-sm text-gray-400">Order</span>
                          <span className="text-blue-400 font-mono font-semibold">#{order.id}</span>
                        </div>
                        <div className="text-2xl font-bold text-white mb-1">
                          ${order.total}
                        </div>
                        <div className="text-sm text-gray-400">
                          Placed on {order.date}
                        </div>
                      </div>

                      <div className="flex items-center space-x-4">
                        <div className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${statusConfig.bg} border ${statusConfig.border}`}>
                          <StatusIcon className={`w-5 h-5 ${statusConfig.color}`} />
                          <span className={`font-semibold ${statusConfig.color}`}>
                            {order.status}
                          </span>
                        </div>
                        
                        <ChevronDown 
                          className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${
                            expandedOrder === order.id ? 'rotate-180' : 'rotate-0'
                          }`} 
                        />
                      </div>
                    </div>
                  </div>

                  {/* Order Details (Expandable) */}
                  <div 
                    className={`transition-all duration-300 ease-in-out ${
                      expandedOrder === order.id 
                        ? 'max-h-[1000px] opacity-100' 
                        : 'max-h-0 opacity-0'
                    } overflow-hidden`}
                  >
                    <div className="p-6 border-t border-slate-700 bg-slate-800/30">
                      {/* Items List */}
                      <div className="mb-6">
                        <h4 className="text-lg font-semibold text-white mb-4">Order Items</h4>
                        <div className="space-y-3">
                          {order.items?.map((item, index) => (
                            <div 
                              key={index} 
                              className="flex justify-between items-center p-3 bg-slate-700/30 rounded-lg"
                            >
                              <div className="flex-1">
                                <div className="text-white font-medium">{item.name}</div>
                                <div className="text-sm text-gray-400">Quantity: {item.quantity}</div>
                              </div>
                              <div className="text-white font-semibold">
                                ${(item.price * item.quantity).toFixed(2)}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Shipping Info */}
                      {order.shippingAddress && (
                        <div className="mb-6 p-4 bg-slate-700/30 rounded-lg">
                          <h4 className="text-white font-semibold mb-3 flex items-center">
                            <MapPin className="w-4 h-4 mr-2 text-blue-500" />
                            Shipping Address
                          </h4>
                          <div className="text-gray-300 text-sm space-y-1">
                            <p>{order.shippingAddress.name}</p>
                            <p>{order.shippingAddress.address}</p>
                            <p>{order.shippingAddress.city}, {order.shippingAddress.zip}</p>
                            <p>{order.shippingAddress.phone}</p>
                          </div>
                        </div>
                      )}

                      {/* Tracking Info */}
                      <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-400">Estimated Delivery:</span>
                          <span className="text-white font-medium">3-5 Business Days</span>
                        </div>
                        {order.status === 'Shipped' && (
                          <div className="flex items-center justify-between text-sm mt-2">
                            <span className="text-gray-400">Tracking Number:</span>
                            <span className="text-blue-400 font-mono">TRACK{order.id}98765</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20 bg-slate-800/30 rounded-xl border border-slate-700 max-w-2xl mx-auto">
            <div className="w-16 h-16 bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <Package className="w-8 h-8 text-gray-500" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">No Orders Yet</h3>
            <p className="text-gray-400 mb-6">Start shopping to see your purchase history!</p>
          </div>
        )}
      </div>
    </div>
  );
};