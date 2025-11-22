"use client";
import React, { useState, useEffect } from 'react';

export const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950">
      {/* Subtle Grid Background */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      ></div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Logo */}
        <div className="mb-12">
          <h1 className="text-6xl font-bold text-white tracking-tight">
            Smart<span className="text-blue-500">Paws</span>
          </h1>
          <p className="text-center text-gray-400 text-sm mt-2 tracking-widest">
            ADVANCED PET TECHNOLOGY
          </p>
        </div>

        {/* Animated Paw Prints */}
        <div className="relative w-64 h-32 mb-8">
          {/* Walking Paw Animation with Shadow */}
          <div className="absolute inset-0 flex items-center justify-center space-x-8">
            {[0, 1, 2, 3].map((index) => (
              <div
                key={index}
                className="text-6xl animate-bounce"
                style={{
                  animationDelay: `${index * 0.2}s`,
                  animationDuration: '1s',
                  filter: 'drop-shadow(0 4px 12px rgba(59, 130, 246, 0.7))',
                  color: '#3b82f6',
                }}
              >
                🐾
              </div>
            ))}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-80 mb-6">
          <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            >
              <div className="h-full w-full bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
            </div>
          </div>
          <div className="flex justify-between items-center mt-3">
            <span className="text-sm text-gray-400">Loading...</span>
            <span className="text-sm font-semibold text-blue-400">{progress}%</span>
          </div>
        </div>

        {/* Rotating Loader */}
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-4 border-slate-800"></div>
          <div 
            className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-500 animate-spin"
            style={{ animationDuration: '1s' }}
          ></div>
        </div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 1.5s infinite;
        }
      `}</style>
    </div>
  );
};