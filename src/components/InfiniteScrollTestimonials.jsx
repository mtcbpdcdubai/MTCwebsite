import React, { useEffect, useRef, useState } from "react";
import { Card, CardBody } from "@heroui/react";

const InfiniteScrollTestimonials = ({ testimonials }) => {
  const containerRef = useRef(null);
  const scrollerRef = useRef(null);
  const [start, setStart] = useState(false);

  useEffect(() => {
    addAnimation();
  }, []);

  const addAnimation = () => {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);
      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        scrollerRef.current.appendChild(duplicatedItem);
      });
      setStart(true);
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative z-20 max-w-7xl overflow-hidden"
    >
      <ul
        ref={scrollerRef}
        className={`flex w-max min-w-full shrink-0 flex-nowrap gap-8 py-4 ${
          start ? "animate-scroll" : ""
        }`}
      >
        {testimonials.map((testimonial, index) => (
          <li
            key={index}
            className="relative w-[300px] max-w-full shrink-0 rounded-xl bg-black px-6 py-4 md:w-[350px]"
          >
            <div className="p-4 md:p-6">
              {/* Star Rating */}
              <div className="flex mb-4 md:mb-6">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-4 h-4 md:w-5 md:h-5 text-yellow-400 fill-current"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Quote */}
              <p className="text-white mb-6 md:mb-8 italic leading-relaxed text-sm md:text-base">
                "{testimonial.quote}"
              </p>

              {/* Author Info */}
              <div className="flex items-center">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mr-3 md:mr-4">
                  <span className="text-white font-bold text-sm md:text-base">
                    {testimonial.initials}
                  </span>
                </div>
                <div>
                  <h4 className="text-white font-semibold text-sm md:text-base">
                    {testimonial.name}
                  </h4>
                  <p className="text-blue-400 text-xs md:text-sm font-medium">
                    {testimonial.position}
                  </p>
                  <p className="text-gray-400 text-xs md:text-sm">
                    {testimonial.company}
                  </p>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InfiniteScrollTestimonials;