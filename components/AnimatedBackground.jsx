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
      {[...Array(30)].map((_, i) => (
        <div
          key={`paw-${i}`}
          className="absolute animate-paw-float"
          style={{
            left: `${Math.random() * 100}%`,
            bottom: '-100px',
            animationDuration: `${10 + Math.random() * 15}s`,
            animationDelay: `${Math.random() * 10}s`,
            fontSize: `${45 + Math.random() * 50}px`,
            filter: `drop-shadow(0 4px 15px rgba(59, 130, 246, ${0.4 + Math.random() * 0.4}))`,
            opacity: 0.25 + Math.random() * 0.15,
            color: i % 3 === 0 ? '#3b82f6' : i % 3 === 1 ? '#60a5fa' : '#2563eb',
          }}
        >
          🐾
        </div>
      ))}

      {/* Enhanced Glowing Particles */}
      {[...Array(60)].map((_, i) => (
        <div
          key={`star-${i}`}
          className="absolute rounded-full animate-twinkle"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: `${2 + Math.random() * 3}px`,
            height: `${2 + Math.random() * 3}px`,
            background: i % 2 === 0 ? '#3b82f6' : '#60a5fa',
            boxShadow: `0 0 ${10 + Math.random() * 20}px ${i % 2 === 0 ? 'rgba(59, 130, 246, 0.8)' : 'rgba(96, 165, 250, 0.8)'}`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${2 + Math.random() * 4}s`,
          }}
        ></div>
      ))}

      <style jsx>{`
        @keyframes float-orb {
          0%, 100% {
            transform: translate(0, 0) scale(1);
            opacity: 0.6;
          }
          25% {
            transform: translate(50px, -50px) scale(1.1);
            opacity: 0.8;
          }
          50% {
            transform: translate(-30px, -100px) scale(0.9);
            opacity: 0.5;
          }
          75% {
            transform: translate(-80px, -30px) scale(1.05);
            opacity: 0.7;
          }
        }

        .animate-float-orb {
          animation: float-orb ease-in-out infinite;
        }

        @keyframes gradient {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 15s ease infinite;
        }

        @keyframes twinkle {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.5);
          }
        }

        .animate-twinkle {
          animation: twinkle ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};