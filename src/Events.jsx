import React from "react";
import Balatro from "./components/Balatro.jsx";
import EventCarousel from "./Events/EventCarousel.jsx";
import UpcomingEvents from "./Events/UpcomingEvents.jsx";
import IdeaSubmissionForm from "./Events/IdeaSubmissionForm.jsx";

const Events = () => {
  return (
    <div className="min-h-screen bg-transparent text-white relative overflow-hidden">
      <Balatro
        isRotate={false}
        mouseInteraction={true}
        pixelFilter={700}
        color1="#000000"
        color2="#0a0a0a"
        color3="#111111"
      />

      <div className="relative z-10">
        <div className="container mx-auto px-6 py-16">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-6xl font-bold bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent mb-4">
              MTC Events
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Discover our journey through innovation, learning, and community
              building
            </p>
          </div>

          {/* Past Events Carousel */}
          <div className="mb-20">
            <EventCarousel />
          </div>

          {/* Upcoming Events */}
          <div className="mb-20">
            <UpcomingEvents />
          </div>

          {/* Idea Submission Form */}
          <div className="mb-16">
            <IdeaSubmissionForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Events;
