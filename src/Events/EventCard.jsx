import React from "react";
import { Calendar, MapPin, Users } from "lucide-react";

const EventCard = ({
  title,
  month,
  description,
  image,
  attendees,
  location,
  onClick,
}) => {
  return (
    <div
      className="bg-black border border-gray-700 rounded-xl p-6 cursor-pointer transform transition-all duration-300 hover:scale-105 hover:border-white/50 min-w-[320px] max-w-[320px]"
      onClick={onClick}
    >
      <div className="relative mb-4">
        <img
          src={image}
          alt={title}
          className="w-full h-48 object-cover rounded-lg"
        />
        <div className="absolute top-3 left-3 bg-white/90 text-black px-3 py-1 rounded-full text-sm font-semibold">
          {month}
        </div>
      </div>

      <h3 className="text-white text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-300 text-sm mb-4 line-clamp-2">{description}</p>

      <div className="flex items-center justify-between text-gray-400 text-sm">
        <div className="flex items-center gap-4">
          {location && (
            <div className="flex items-center gap-1">
              <MapPin size={16} />
              <span>To be added</span>
            </div>
          )}
        </div>
        <Calendar size={16} />
      </div>
    </div>
  );
};

export default EventCard;
