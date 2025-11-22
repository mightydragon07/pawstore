"use client";
import React, { useState } from 'react';
import { Package, CreditCard, CheckCircle, ArrowRight, User, MapPin, DollarSign, Truck, Lock, HardDriveDownload } from 'lucide-react';

export const CheckoutPage = ({ cartItems, user, placeOrder, setCurrentPage }) => {
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [shippingInfo, setShippingInfo] = useState({
    name: user?.name || '',
    address: '123 Smart Pet Lane',
    city: 'Techville',
    zip: '90210',
    phone: '+1 (555) 123-4567',
  });
  const [paymentInfo, setPaymentInfo] = useState({
    cardholder: '',
    cardNumber: '',
    expiry: '',
    cvc: '',
  }); 

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const taxRate = 0.08;
  const shipping = subtotal > 150 ? 0 : 15.00;
  const tax = subtotal * taxRate;
  const codFee = paymentMethod === 'cod' ? 5.00 : 0;
  const total = subtotal + tax + shipping + codFee;

  const handleNextStep = () => {
    if (step < 3) setStep(step + 1);
  };
  
  const handlePlaceOrder = () => {
    const newOrder = {
      id: Date.now(),
      date: new Date().toLocaleDateString(),
      items: cartItems,
      total: total.toFixed(2),
      status: 'Processing',
      shippingAddress: shippingInfo,
      paymentMethod: paymentMethod === 'card' ? 'Credit Card' : 'Cash on Delivery',
    };
    placeOrder(newOrder);
  };

  const steps = [
    { id: 1, name: 'Shipping', icon: Package },
    { id: 2, name: 'Payment', icon: CreditCard },
    { id: 3, name: 'Review', icon: CheckCircle },
  ];

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center">
                <User className="w-6 h-6 text-blue-500" />
              </div>
              <h3 className="text-2xl font-bold text-white">Shipping Information</h3>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Full Name *</label>
                <input 
                  type="text" 
                  value={shippingInfo.name}
                  onChange={(e) => setShippingInfo({...shippingInfo, name: e.target.value})}
                  className="w-full py-3 px-4 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Phone Number *</label>
                <input 
                  type="tel" 
                  value={shippingInfo.phone}
                  onChange={(e) => setShippingInfo({...shippingInfo, phone: e.target.value})}
                  className="w-full py-3 px-4 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="+1 (555) 123-4567"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Street Address *</label>
                <input 
                  type="text" 
                  value={shippingInfo.address}
                  onChange={(e) => setShippingInfo({...shippingInfo, address: e.target.value})}
                  className="w-full py-3 px-4 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="123 Main Street"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">City *</label>
                  <input 
                    type="text" 
                    value={shippingInfo.city}
                    onChange={(e) => setShippingInfo({...shippingInfo, city: e.target.value})}
                    className="w-full py-3 px-4 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="San Francisco"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">ZIP Code *</label>
                  <input 
                    type="text" 
                    value={shippingInfo.zip}
                    onChange={(e) => setShippingInfo({...shippingInfo, zip: e.target.value})}
                    className="w-full py-3 px-4 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="94102"
                  />
                </div>
              </div>
            </div>

            {subtotal > 150 && (
              <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg flex items-center">
                <Truck className="w-5 h-5 text-green-500 mr-3" />
                <p className="text-sm text-green-400">
                  Congratulations! You qualify for free shipping 🎉
                </p>
              </div>
            )}
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-blue-500" />
              </div>
              <h3 className="text-2xl font-bold text-white">Payment Method</h3>
            </div>

            {/* Payment Method Selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={() => setPaymentMethod('card')}
                className={`p-6 rounded-xl border-2 transition-all ${
                  paymentMethod === 'card'
                    ? 'border-blue-500 bg-blue-500/10'
                    : 'border-slate-600 bg-slate-800/50 hover:border-slate-500'
                }`}
              >
                <CreditCard className={`w-8 h-8 mb-3 ${paymentMethod === 'card' ? 'text-blue-500' : 'text-gray-400'}`} />
                <h4 className="text-white font-semibold mb-1">Credit/Debit Card</h4>
                <p className="text-sm text-gray-400">Secure payment</p>
              </button>

              <button
                onClick={() => setPaymentMethod('cod')}
                className={`p-6 rounded-xl border-2 transition-all ${
                  paymentMethod === 'cod'
                    ? 'border-green-500 bg-green-500/10'
                    : 'border-slate-600 bg-slate-800/50 hover:border-slate-500'
                }`}
              >
                <DollarSign className={`w-8 h-8 mb-3 ${paymentMethod === 'cod' ? 'text-green-500' : 'text-gray-400'}`} />
                <h4 className="text-white font-semibold mb-1">Cash on Delivery</h4>
                <p className="text-sm text-gray-400">+$5.00 fee</p>
              </button>
            </div>

            {/* Card Details Form */}
            {paymentMethod === 'card' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Cardholder Name</label>
                  <input 
                    type="text" 
                    value={paymentInfo.cardholder}
                    onChange={(e) => setPaymentInfo({...paymentInfo, cardholder: e.target.value})}
                    className="w-full py-3 px-4 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Card Number</label>
                  <input 
                    type="text" 
                    value={paymentInfo.cardNumber}
                    onChange={(e) => setPaymentInfo({...paymentInfo, cardNumber: e.target.value})}
                    className="w-full py-3 px-4 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="1234 5678 9012 3456"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Expiry Date</label>
                    <input 
                      type="text" 
                      value={paymentInfo.expiry}
                      onChange={(e) => setPaymentInfo({...paymentInfo, expiry: e.target.value})}
                      className="w-full py-3 px-4 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="MM/YY"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">CVV</label>
                    <input 
                      type="text" 
                      value={paymentInfo.cvc}
                      onChange={(e) => setPaymentInfo({...paymentInfo, cvc: e.target.value})}
                      className="w-full py-3 px-4 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="123"
                    />
                  </div>
                </div>
                <div className="flex items-center space-x-2 p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                  <Lock className="w-5 h-5 text-green-500" />
                  <p className="text-sm text-green-400">Secure 256-bit SSL Encrypted</p>
                </div>
              </div>
            )}

            {/* COD Info */}
            {paymentMethod === 'cod' && (
              <div className="p-6 bg-green-500/10 border border-green-500/30 rounded-xl">
                <h4 className="text-white font-semibold mb-3 flex items-center">
                  <Truck className="w-5 h-5 mr-2 text-green-500" />
                  Cash on Delivery
                </h4>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>• Have exact cash ready upon delivery</li>
                  <li>• $5.00 COD processing fee applies</li>
                  <li>• Payment to delivery partner</li>
                  <li>• Inspect package before payment</li>
                </ul>
              </div>
            )}
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-500" />
              </div>
              <h3 className="text-2xl font-bold text-white">Order Review</h3>
            </div>
            
            <div className="space-y-4">
              {/* Shipping Address */}
              <div className="p-6 bg-slate-800/50 border border-slate-700 rounded-xl">
                <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-blue-500" />
                  Shipping Address
                </h4>
                <div className="text-gray-300 space-y-1">
                  <p className="font-semibold">{shippingInfo.name}</p>
                  <p>{shippingInfo.phone}</p>
                  <p>{shippingInfo.address}</p>
                  <p>{shippingInfo.city}, {shippingInfo.zip}</p>
                </div>
              </div>
              
              {/* Payment Method */}
              <div className="p-6 bg-slate-800/50 border border-slate-700 rounded-xl">
                <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
                  {paymentMethod === 'card' ? (
                    <CreditCard className="w-5 h-5 mr-2 text-blue-500" />
                  ) : (
                    <DollarSign className="w-5 h-5 mr-2 text-green-500" />
                  )}
                  Payment Method
                </h4>
                <p className="text-gray-300">
                  {paymentMethod === 'card' 
                    ? `Credit Card ${paymentInfo.cardNumber ? `ending in ${paymentInfo.cardNumber.slice(-4)}` : ''}` 
                    : 'Cash on Delivery'}
                </p>
              </div>

              {/* Order Items */}
              <div className="p-6 bg-slate-800/50 border border-slate-700 rounded-xl">
                <h4 className="text-lg font-semibold text-white mb-4">Order Items</h4>
                <div className="space-y-3">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex justify-between text-gray-300 pb-3 border-b border-slate-700 last:border-0">
                      <span>{item.name} × {item.quantity}</span>
                      <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold text-white mb-4">
            Secure Checkout
          </h2>
          <p className="text-gray-400">Complete your order in a few simple steps</p>
        </div>
        
        {/* Progress Steps */}
        <div className="flex justify-center mb-12">
          <div className="flex items-center space-x-4">
            {steps.map((s, index) => (
              <React.Fragment key={s.id}>
                <div className="flex flex-col items-center">
                  <div 
                    className={`w-14 h-14 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${
                      step >= s.id 
                        ? 'bg-blue-500 shadow-lg shadow-blue-500/50' 
                        : 'bg-slate-800 border-2 border-slate-700'
                    }`}
                  >
                    <s.icon className={`w-6 h-6 ${step >= s.id ? 'text-white' : 'text-gray-500'}`} />
                  </div>
                  <span className={`mt-2 text-sm font-medium ${step >= s.id ? 'text-white' : 'text-gray-500'}`}>
                    {s.name}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className={`h-1 w-20 rounded-full transition-all duration-300 ${
                    step > s.id ? 'bg-blue-500' : 'bg-slate-800'
                  }`}></div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto">
          {/* Main Content */}
          <div className="lg:w-2/3">
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 p-8 rounded-2xl">
              {renderStepContent()}
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 p-6 rounded-2xl sticky top-28">
              <h3 className="text-2xl font-bold text-white mb-6">Order Summary</h3>
              
              <div className="space-y-3 mb-6 max-h-60 overflow-y-auto">
                {cartItems.map(item => (
                  <div key={item.id} className="flex justify-between items-center text-gray-300 pb-3 border-b border-slate-700">
                    <div className="flex-1">
                      <p className="text-sm font-medium">{item.name}</p>
                      <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-3 py-4 border-y border-slate-700">
                <div className="flex justify-between text-gray-300">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Tax (8%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                {paymentMethod === 'cod' && (
                  <div className="flex justify-between text-green-400">
                    <span>COD Fee</span>
                    <span>+${codFee.toFixed(2)}</span>
                  </div>
                )}
              </div>
              
              <div className="flex justify-between text-2xl font-bold text-white my-6">
                <span>Total</span>
                <span className="text-blue-400">${total.toFixed(2)}</span>
              </div>

              {step < 3 && (
                <button
                  onClick={handleNextStep}
                  className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-all shadow-lg shadow-blue-500/30 flex items-center justify-center space-x-2 group"
                >
                  <span>Continue to {steps[step]?.name}</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              )}
              {step === 3 && (
                <button
                  onClick={handlePlaceOrder}
                  className="w-full py-4 bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold transition-all shadow-lg shadow-green-500/30 flex items-center justify-center space-x-2"
                >
                  <CheckCircle className="w-5 h-5" />
                  <span>Place Order</span>
                </button>
              )}

              <div className="mt-4 flex items-center justify-center space-x-2 text-xs text-gray-500">
                <Lock className="w-3 h-3" />
                <span>Secure SSL Encrypted</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};