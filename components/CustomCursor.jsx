// components/CustomCursor.jsx
"use client";
import React, { useEffect, useState } from 'react';

export const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const updatePosition = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    // Detect hover on interactive elements
    const handleMouseOver = (e) => {
      if (
        e.target.tagName === 'BUTTON' ||
        e.target.tagName === 'A' ||
        e.target.onclick ||
        e.target.closest('button') ||
        e.target.closest('a')
      ) {
        setIsHovering(true);
      }
    };

    const handleMouseOut = () => {
      setIsHovering(false);
    };

    window.addEventListener('mousemove', updatePosition);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  return (
    <>
      {/* Main cursor dot */}
      <div
        className="custom-cursor-dot"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: `translate(-50%, -50%) scale(${isClicking ? 0.5 : 1})`,
        }}
      />
      
      {/* Cursor ring */}
      <div
        className="custom-cursor-ring"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: `translate(-50%, -50%) scale(${isHovering ? 1.5 : 1})`,
        }}
      />

      <style jsx>{`
        .custom-cursor-dot {
          position: fixed;
          width: 8px;
          height: 8px;
          background: #3b82f6;
          border-radius: 50%;
          pointer-events: none;
          z-index: 10000;
          transition: transform 0.15s ease;
          box-shadow: 0 0 20px rgba(59, 130, 246, 0.8);
        }

        .custom-cursor-ring {
          position: fixed;
          width: 30px;
          height: 30px;
          border: 2px solid rgba(59, 130, 246, 0.5);
          border-radius: 50%;
          pointer-events: none;
          z-index: 9999;
          transition: transform 0.2s ease, border-color 0.2s ease;
        }

        :global(body) {
          cursor: none;
        }

        :global(button),
        :global(a),
        :global(input),
        :global(textarea) {
          cursor: none !important;
        }

        @media (max-width: 768px) {
          .custom-cursor-dot,
          .custom-cursor-ring {
            display: none;
          }
          :global(body) {
            cursor: auto;
          }
        }
      `}</style>
    </>
  );
};