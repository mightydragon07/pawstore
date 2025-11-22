// components/Hero.jsx
"use client";
import React from 'react';
import { ChevronRight, Zap, Shield, Award } from 'lucide-react';

export const Hero = ({ setCurrentPage }) => {
  const features = [
    { icon: Zap, title: 'Fast Delivery', description: '3-7 days' },
    { icon: Shield, title: 'Secure & Safe', description: 'Trusted by thousands' },
    { icon: Award, title: 'Premium Quality', description: 'Best-in-class products' },
  ];

  return (
    <main className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10">
        {/* Base Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950"></div>
        
        {/* Animated Orbs */}
        <div 
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDuration: '4s' }}
        ></div>
        <div 
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDuration: '6s', animationDelay: '2s' }}
        ></div>

        {/* Floating Paw Prints with Shadow */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float-paw"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${40 + Math.random() * 30}px`,
              animationDuration: `${15 + Math.random() * 10}s`,
              animationDelay: `${Math.random() * 5}s`,
              filter: `drop-shadow(0 4px 10px rgba(59, 130, 246, 0.5))`,
              opacity: 0.15,
              color: i % 2 === 0 ? '#3b82f6' : '#60a5fa',
            }}
          >
            🐾
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 mb-8 bg-blue-500/10 border border-blue-500/30 rounded-full backdrop-blur-sm">
            <span className="text-blue-400 text-sm font-semibold">Welcome to the Future of Pet Care</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight hero-font">
            Where Intelligence
            <br />
            <span className="text-blue-500">Meets Affection</span>
          </h1>

          {/* Subheading */}
          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            Upgrade your pet care with sophisticated smart devices. We offer everything from automated feeding systems to reliable GPS trackers to keep your companion healthy and secure.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
            <button 
              onClick={() => setCurrentPage('products')}
              className="group px-8 py-4 text-lg font-semibold rounded-xl text-white bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/30 transition-all transform hover:scale-105 flex items-center justify-center"
            >
              Explore Products
              <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={() => setCurrentPage('about')}
              className="px-8 py-4 text-lg font-semibold rounded-xl text-white bg-slate-800 border border-slate-700 hover:bg-slate-700 transition-all transform hover:scale-105"
            >
              Learn More
            </button>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="p-6 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl hover:bg-slate-800/70 hover:border-blue-500/50 transition-all group"
              >
                <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-500/20 transition-colors">
                  <feature.icon className="w-6 h-6 text-blue-500" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float-paw {
          0%, 100% {
            transform: translateY(0) translateX(0) rotate(0deg);
            opacity: 0.2;
          }
          50% {
            transform: translateY(-30px) translateX(15px) rotate(180deg);
            opacity: 0.1;
          }
        }
        .animate-float-paw {
          animation: float-paw linear infinite;
        }
      `}</style>
    </main>
  );
};