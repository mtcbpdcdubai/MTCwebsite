import React from 'react';
import Balatro from './Balatro.jsx';
import EventCarousel from './EventCarousel.jsx';
import FeaturingMTCEvents from './FeaturingMTCEvents.jsx';
import IdeaSubmissionForm from './IdeaSubmissionForm.jsx';

const Events = () => {
  return (
    <div className="min-h-scree text-white relative overflow-hidden">
      <Balatro
        isRotate={false}
        mouseInteraction={true}
        pixelFilter={700}
        color1="#000000"
        color2="#0a0a0a"
        color3="#111111"
      />
      
      <div className="relative z-10">
        <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-16">
          {/* Header */}
          <div className="text-center mb-8 sm:mb-16">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent mb-4">
              MTC Events
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto px-4">
              Discover our journey through innovation, learning, and community building
            </p>
          </div>

          {/* Featuring MTC Events */}
          <div className="mb-12 sm:mb-20">
            <FeaturingMTCEvents />
          </div>

          {/* Idea Submission Form */}
          <div className="mb-8 sm:mb-16">
            <IdeaSubmissionForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Events;