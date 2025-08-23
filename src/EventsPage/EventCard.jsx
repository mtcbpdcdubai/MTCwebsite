import React from 'react';
import { Calendar, MapPin, Users } from 'lucide-react';

const EventCard = ({
  title,
  month,
  description,
  image,
  attendees,
  location,
  onClick
}) => {
  return (
    <div 
      className="bg-black border border-gray-700 rounded-xl p-4 sm:p-6 cursor-pointer transform transition-all duration-300 hover:scale-105 hover:border-white/50 min-w-[280px] sm:min-w-[320px] max-w-[280px] sm:max-w-[320px] flex-shrink-0"
      onClick={onClick}
    >
      <div className="relative mb-4">
        {image ? (
          <img 
            src={image} 
            alt={title}
            className="w-full h-40 sm:h-48 object-cover rounded-lg"
          />
        ) : (
          <div className="w-full h-40 sm:h-48 bg-gray-800 rounded-lg flex items-center justify-center">
            <span className="text-gray-400 text-sm">Image to be added</span>
          </div>
        )}
        <div className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-white/90 text-black px-2 py-1 sm:px-3 rounded-full text-xs sm:text-sm font-semibold">
          {month}
        </div>
      </div>
      
      <h3 className="text-white text-lg sm:text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-300 text-xs sm:text-sm mb-4 line-clamp-2">{description}</p>
      
      <div className="flex items-center justify-between text-gray-400 text-xs sm:text-sm">
        <div className="flex items-center gap-4">
          {location && (
            <div className="flex items-center gap-1">
              <MapPin size={14} className="sm:w-4 sm:h-4" />
              <span>To be added</span>
            </div>
          )}
        </div>
        <Calendar size={14} className="sm:w-4 sm:h-4" />
      </div>
    </div>
  );
};

export default EventCard;