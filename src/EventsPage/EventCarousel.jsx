import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import EventCard from "./EventCard";
import EventModal from "./EventModal";

const pastEvents = [
  {
    id: "1",
    title: "Ice Breakers",
    month: "August",
    description:
      "Welcome session for freshers to get acquainted with MTC community",
    image: "/src/assets/ThinkAi'24.jpg",
    location: "To be added",
    fullDescription:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  },
  {
    id: "2",
    title: "Mediathon",
    month: "September",
    description:
      "Healthcare innovation hackathon focusing on medical technology solutions",
    image: "/src/assets/ThinkAi'24.jpg",
    location: "To be added",
    fullDescription:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    id: "3",
    title: "DS Bootcamp",
    month: "September",
    description:
      "Intensive data science workshop covering machine learning fundamentals",
    image: "/src/assets/ThinkAi'24.jpg",
    location: "To be added",
    fullDescription:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
  },
  {
    id: "4",
    title: "Excel Championship",
    month: "October",
    description:
      "Competitive Excel skills tournament with real-world challenges",
    image: "/src/assets/ThinkAi'24.jpg",
    location: "To be added",
    fullDescription:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: "5",
    title: "Cybersecurity Talk",
    month: "October",
    description:
      "Expert insights on modern cybersecurity threats and prevention",
    image: "/src/assets/ThinkAi'24.jpg",
    location: "To be added",
    fullDescription:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
  },
  {
    id: "6",
    title: "Think AI",
    month: "November",
    description:
      "Artificial Intelligence conference exploring future possibilities",
    image: "/src/assets/ThinkAi'24.jpg",
    location: "To be added",
    fullDescription:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.",
  },
];

const EventCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % Math.max(1, pastEvents.length - 2));
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prev) =>
        (prev - 1 + Math.max(1, pastEvents.length - 2)) %
        Math.max(1, pastEvents.length - 2)
    );
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-4xl font-bold text-white">Rewind the Vibes</h2>
        <div className="flex gap-2">
          <button
            onClick={prevSlide}
            className="bg-black border border-gray-700 hover:border-white/50 text-white p-3 rounded-full transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={nextSlide}
            className="bg-black border border-gray-700 hover:border-white/50 text-white p-3 rounded-full transition-colors"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div className="overflow-hidden">
        <div
          className="flex gap-6 transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 344}px)` }}
        >
          {pastEvents.map((event) => (
            <EventCard
              key={event.id}
              title={event.title}
              month={event.month}
              description={event.description}
              image={event.image}
              attendees={event.attendees}
              location={event.location}
              onClick={() => handleEventClick(event)}
            />
          ))}
        </div>
      </div>

      <EventModal
        isOpen={isModalOpen}
        onClose={closeModal}
        event={selectedEvent}
      />
    </div>
  );
};

export default EventCarousel;
