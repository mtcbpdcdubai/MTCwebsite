import React, { useEffect, useState } from 'react';

const GlitchText = ({ text, className = '' }) => {
  const [glitchText, setGlitchText] = useState(text);

  useEffect(() => {
    const chars = '!<>-_\\/[]{}—=+*^?#________';
    let interval;

    const glitch = () => {
      let iterations = 0;
      
      interval = setInterval(() => {
        setGlitchText(current => 
          current
            .split('')
            .map((letter, index) => {
              if (index < iterations) {
                return text[index];
              }
              return chars[Math.floor(Math.random() * chars.length)];
            })
            .join('')
        );

        if (iterations >= text.length) {
          clearInterval(interval);
        }

        iterations += 1 / 3;
      }, 30);
    };

    const glitchInterval = setInterval(glitch, 3000);
    glitch(); // Initial glitch

    return () => {
      clearInterval(interval);
      clearInterval(glitchInterval);
    };
  }, [text]);

  return (
    <div className={`font-mono ${className}`}>
      <span className="relative inline-block">
        <span className="text-white">{glitchText}</span>
        <span className="absolute inset-0 animate-pulse text-red-500 opacity-50">
          {glitchText}
        </span>
        <span className="absolute inset-0 animate-ping text-blue-500 opacity-30">
          {glitchText}
        </span>
      </span>
    </div>
  );
};

export default GlitchText;