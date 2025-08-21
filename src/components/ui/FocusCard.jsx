import React from "react";

export default function FocusCard({ src, title, desc, className = "" }) {
  return (
    <div
      className={[
        "relative flex flex-col items-center",
        "rounded-2xl overflow-hidden group/card", // local group for hover animations
        "transition-all duration-500 ease-in-out",
        "bg-neutral-900/60 backdrop-blur",
        "border-2 border-transparent hover:dark:border-white/[0.2] border-black/[0.1]",        "p-2",
        // 👇 dim/blur all cards when grid is hovered
        "group-hover:blur-[2px] group-hover:brightness-85",
        // 👇 but clear the one that’s hovered
        "hover:blur-none hover:brightness-100",
        className,
      ].join(" ")}
    >
      {/* Title (slides UP only when this card is hovered) */}
      {title && (
        <div
          className="text-center text-white font-semibold text-lg mb-1
          translate-y-6 opacity-0 group-hover/card:translate-y-0 group-hover/card:opacity-100
          transition-all duration-500 ease-out"
        >
          {title}
        </div>
      )}

      {/* Image */}
      <img
        src={src}
        alt={title || "image"}
        className="block w-full h-80 object-cover select-none transition-transform duration-500 group-hover/card:scale-[1.035] rounded-lg"
        draggable="false"
      />

      {/* Description (slides DOWN only when this card is hovered) */}
      {desc && (
        <div
          className="text-center text-gray-300 text-sm mt-1
          -translate-y-6 opacity-0 group-hover/card:translate-y-0 group-hover/card:opacity-100
          transition-all duration-500 ease-out"
        >
          {desc}
        </div>
      )}
    </div>
  );
}
