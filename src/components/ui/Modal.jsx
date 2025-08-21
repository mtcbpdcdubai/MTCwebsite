import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  maxWidth = "max-w-7xl",
  originRect,
}) {
  const dialogRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => e.key === "Escape" && onClose?.();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [isOpen, onClose]);

  const closeOnBackdrop = (e) => {
    if (e.target === e.currentTarget) onClose?.();
  };

  // Transform origin based on Gallery button rect
  let origin = "center";
  if (originRect) {
    const centerX = originRect.left + originRect.width / 2;
    const centerY = originRect.top + originRect.height / 2;
    origin = `${centerX}px ${centerY}px`;
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          onClick={closeOnBackdrop}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
          aria-modal="true"
          role="dialog"
        >
          <motion.div
            ref={dialogRef}
            initial={{ opacity: 0, scale: 0.3 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.3 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            style={{ transformOrigin: origin }}
            className={`w-full ${maxWidth} mx-4 bg-neutral-900 text-white rounded-2xl max-h-[85vh] overflow-y-auto relative border border-white/10`}
          >
<div className="sticky top-0 z-10 bg-neutral-900/95 backdrop-blur px-4 py-3 border-b border-white/10 flex items-center justify-center relative">
  {title && (
    <h2 className="text-2xl md:text-3xl font-bold text-center">{title}</h2>
  )}
  <button
    onClick={onClose}
    aria-label="Close"
    className="absolute right-4 text-xl leading-none hover:opacity-80"
  >
    ✕
  </button>
</div>


            {/* Scrollable Content */}
            <div className="p-6">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
