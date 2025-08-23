import React, { useRef, useState } from 'react';

const CardSpotlight = ({ children, className = "", onClick }) => {
  const divRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e) => {
    if (!divRef.current || isFocused) return;

    const div = divRef.current;
    const rect = div.getBoundingClientRect();

    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleFocus = () => {
    setIsFocused(true);
    setOpacity(1);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setOpacity(0);
  };

  const handleMouseEnter = () => {
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={`relative overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-8 shadow-2xl cursor-pointer transition-all duration-300 hover:border-white/20 ${className}`}
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
        style={{
          opacity,
          background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, rgba(220, 38, 38, 0.3), rgba(185, 28, 28, 0.2) 30%, transparent 60%)`,
          filter: 'contrast(1.2) saturate(1.5)',
          imageRendering: 'pixelated',
        }}
      />
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
        style={{
          opacity: opacity * 0.7,
          background: `radial-gradient(200px circle at ${position.x}px ${position.y}px, rgba(239, 68, 68, 0.4), transparent 50%)`,
          filter: 'blur(1px) contrast(1.5)',
          imageRendering: 'pixelated',
        }}
      />
      {children}
    </div>
  );
};

export default CardSpotlight;