import React from "react";
import { X, Calendar, MapPin, Users, Clock } from "lucide-react";

const EventModal = ({ isOpen, onClose, event }) => {
  if (!isOpen || !event) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-black border border-gray-700 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="relative">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-64 object-cover rounded-t-2xl"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
          <div className="absolute bottom-4 left-4 bg-white/90 text-black px-4 py-2 rounded-full font-semibold">
            {event.month}
          </div>
        </div>

        <div className="p-8">
          <h2 className="text-white text-3xl font-bold mb-4">{event.title}</h2>

          <div className="flex items-center gap-6 text-gray-400 mb-6">
            {event.location && (
              <div className="flex items-center gap-2">
                <MapPin size={18} />
                <span>To be added</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <Clock size={18} />
              <span>Full Day Event</span>
            </div>
          </div>

          <div className="text-gray-300 leading-relaxed space-y-4">
            <p>{event.description}</p>
            <div className="mt-6">
              <h3 className="text-white text-xl font-semibold mb-3">
                Event Details
              </h3>
              <p>{event.fullDescription}</p>
            </div>

            <div className="mt-6">
              <h3 className="text-white text-xl font-semibold mb-3">
                Event Gallery
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <img
                  src={event.image}
                  alt={`${event.title} photo 1`}
                  className="w-full h-32 object-cover rounded-lg"
                />
                <img
                  src={event.image}
                  alt={`${event.title} photo 2`}
                  className="w-full h-32 object-cover rounded-lg"
                />
                <img
                  src={event.image}
                  alt={`${event.title} photo 3`}
                  className="w-full h-32 object-cover rounded-lg"
                />
                <img
                  src={event.image}
                  alt={`${event.title} photo 4`}
                  className="w-full h-32 object-cover rounded-lg"
                />
                <img
                  src={event.image}
                  alt={`${event.title} photo 5`}
                  className="w-full h-32 object-cover rounded-lg"
                />
                <img
                  src={event.image}
                  alt={`${event.title} photo 6`}
                  className="w-full h-32 object-cover rounded-lg"
                />
              </div>
            </div>

            <div className="mt-6 p-4 bg-gray-900 rounded-lg">
              <h4 className="text-white font-semibold mb-2">
                Event Highlights
              </h4>
              <ul className="text-gray-300 space-y-1">
                <li>• Interactive sessions with industry experts</li>
                <li>• Networking opportunities with peers</li>
                <li>• Hands-on workshops and practical learning</li>
                <li>• Certificate of participation</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventModal;
