// components/AnimatedBackground.jsx
"use client";
import React from 'react';

export const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Animated Gradient Base */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 animate-gradient"></div>
      
      {/* Multiple Animated Gradient Orbs for depth */}
      <div 
        className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-500/20 rounded-full mix-blend-screen filter blur-3xl animate-float-orb"
        style={{ animationDelay: '0s', animationDuration: '25s' }}
      ></div>
      <div 
        className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-blue-600/15 rounded-full mix-blend-screen filter blur-3xl animate-float-orb"
        style={{ animationDelay: '5s', animationDuration: '30s' }}
      ></div>
      <div 
        className="absolute top-1/2 left-1/3 w-[400px] h-[400px] bg-indigo-500/15 rounded-full mix-blend-screen filter blur-3xl animate-float-orb"
        style={{ animationDelay: '10s', animationDuration: '35s' }}
      ></div>
      <div 
        className="absolute bottom-1/4 left-1/4 w-[450px] h-[450px] bg-cyan-500/10 rounded-full mix-blend-screen filter blur-3xl animate-float-orb"
        style={{ animationDelay: '15s', animationDuration: '28s' }}
      ></div>

      {/* Floating Paw Print Emojis with Shadow */}
      {[...Array(25)].map((_, i) => (
        <div
          key={`paw-${i}`}
          className="absolute animate-paw-float"
          style={{
            left: `${Math.random() * 100}%`,
            bottom: '-100px',
            animationDuration: `${12 + Math.random() * 12}s`,
            animationDelay: `${Math.random() * 8}s`,
            fontSize: `${50 + Math.random() * 40}px`,
            filter: `drop-shadow(0 4px 12px rgba(59, 130, 246, 0.6))`,
            opacity: 0.3,
            color: i % 3 === 0 ? '#3b82f6' : i % 3 === 1 ? '#60a5fa' : '#2563eb',
          }}
        >
          🐾
        </div>
      ))}

      {/* Glowing Particles */}
      {[...Array(40)].map((_, i) => (
        <div
          key={`star-${i}`}
          className="absolute w-1 h-1 rounded-full bg-blue-400"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            boxShadow: `0 0 ${5 + Math.random() * 10}px rgba(59, 130, 246, 0.8)`,
            animation: `pulse ${2 + Math.random() * 3}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 5}s`,
            opacity: 0.6,
          }}
        ></div>
      ))}
    </div>
  );
};