import React from "react";
import Balatro from "./Balatro.jsx";
import EventCarousel from "./EventCarousel.jsx";
import FeaturingMTCEvents from "./FeaturingMTCEvents.jsx";
import IdeaSubmissionForm from "./IdeaSubmissionForm.jsx";
import SplitText from "../components/ui/SplitText.jsx";

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
        <div className="container mx-auto px-4 sm:px-6 pb-8">
          {/* Header */}
          <section className="w-full max-w-7xl mx-auto px-4 flex flex-col items-center text-center mb-2 mt-20">
            <SplitText
              text="MTC Events"
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-center mb-4 whitespace-nowrap"
              delay={100}
              duration={0.6}
              ease="power3.out"
              splitType="chars"
              from={{ opacity: 0, y: 40 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.1}
              rootMargin="-100px"
              textAlign="center"
              // onLetterAnimationComplete={handleAnimationComplete}
            />
            <SplitText
              text="Discover our journey through innovation, learning, and community
              building"
              className="text-2xl font-light text-center leading-[1] py-1"
              delay={100}
              duration={0.6}
              ease="power3.out"
              splitType="lines"
              from={{ opacity: 0, y: 40 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.1}
              rootMargin="-100px"
              textAlign="center"
              // onLetterAnimationComplete={handleAnimationComplete}
            />
            {/* <SplitText
            text="Meet the minds driving innovation and community at Microsoft Tech Club."
            className="text-2xl font-semibold text-center pt-10"
            delay={100}
            duration={0.6}
            ease="power3.out"
            splitType="lines"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-100px"
            textAlign="center"
            // onLetterAnimationComplete={handleAnimationComplete}
          /> */}
          </section>

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
