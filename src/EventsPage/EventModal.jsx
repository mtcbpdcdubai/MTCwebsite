import React from 'react';
import { X, Calendar, MapPin, Users, Clock } from 'lucide-react';

const EventModal = ({ isOpen, onClose, event }) => {
  if (!isOpen || !event) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4">
      <div className="bg-black border border-gray-700 rounded-xl sm:rounded-2xl max-w-4xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto">
        <div className="relative">
          {event.image ? (
            <img 
              src={event.image} 
              alt={event.title}
              className="w-full h-48 sm:h-64 object-cover rounded-t-xl sm:rounded-t-2xl"
            />
          ) : (
            <div className="w-full h-48 sm:h-64 bg-gray-800 rounded-t-xl sm:rounded-t-2xl flex items-center justify-center">
              <span className="text-gray-400">Image to be added</span>
            </div>
          )}
          <button
            onClick={onClose}
            className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
          >
            <X size={16} className="sm:w-5 sm:h-5" />
          </button>
          <div className="absolute bottom-2 left-2 sm:bottom-4 sm:left-4 bg-white/90 text-black px-3 py-1 sm:px-4 sm:py-2 rounded-full font-semibold text-sm sm:text-base">
            {event.month}
          </div>
        </div>
        
        <div className="p-4 sm:p-6 md:p-8">
          <h2 className="text-white text-xl sm:text-2xl md:text-3xl font-bold mb-4">{event.title}</h2>
          
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 text-gray-400 mb-6">
            {event.location && (
              <div className="flex items-center gap-2">
                <MapPin size={16} className="sm:w-[18px] sm:h-[18px]" />
                <span>To be added</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <Clock size={16} className="sm:w-[18px] sm:h-[18px]" />
              <span>Full Day Event</span>
            </div>
          </div>
          
          <div className="text-gray-300 leading-relaxed space-y-4 text-sm sm:text-base">
            <p>{event.description}</p>
            <div className="mt-6">
              <h3 className="text-white text-lg sm:text-xl font-semibold mb-3">Event Details</h3>
              <p>{event.fullDescription}</p>
            </div>
            
            <div className="mt-6">
              <h3 className="text-white text-lg sm:text-xl font-semibold mb-3">Event Gallery</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4">
                {[1, 2, 3, 4, 5, 6].map((index) => (
                  <div key={index} className="w-full h-24 sm:h-32 bg-gray-800 rounded-lg flex items-center justify-center">
                    <span className="text-gray-400 text-xs">Image to be added</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mt-6 p-3 sm:p-4 bg-gray-900 rounded-lg">
              <h4 className="text-white font-semibold mb-2 text-sm sm:text-base">Event Highlights</h4>
              <ul className="text-gray-300 space-y-1 text-sm">
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