// src/components/ui/ShinyButton.jsx
import React from "react";

export default function ShinyButton({ children, onClick, type = "button", className = "" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`relative inline-flex items-center justify-center px-6 py-3 text-lg font-semibold rounded-full overflow-hidden group border-2 border-white dark:border-white/[0.2] cursor-pointer transform transition-transform duration-300 ease-out hover:scale-110 ${className}`}
    >
      {/* Background base */}
      <span className="absolute inset-0 bg-neutral-900 rounded-full transition duration-300 group-hover:bg-neutral-700" />

      {/* Shiny gradient overlay */}
      <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700 ease-in-out" />

      {/* Button text */}
      <span className="relative text-gray-200 group-hover:text-white transition-colors duration-300">
        {children}
      </span>
    </button>
  );
}
