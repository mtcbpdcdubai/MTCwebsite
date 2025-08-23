import React, { useState } from 'react';
import { ExternalLink, Calendar, Users, Code, Mic, Trophy } from 'lucide-react';

const upcomingEvents = [
  {
    id: '1',
    title: 'Advanced React Workshop',
    category: 'workshop',
    description: 'Deep dive into React hooks, context, and performance optimization',
    image: null,
    date: 'Coming Soon',
    fullDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Stay tuned for more details!'
  },
  {
    id: '2',
    title: 'Future of AI Talk',
    category: 'talk',
    description: 'Industry experts discuss the latest trends in artificial intelligence',
    image: null,
    date: 'Coming Soon',
    fullDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Stay tuned for more details!'
  },
  {
    id: '3',
    title: 'Innovation Hackathon',
    category: 'hackathon',
    description: '48-hour coding marathon to solve real-world problems',
    image: null,
    date: 'Coming Soon',
    fullDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Stay tuned for more details!'
  }
];

const categoryIcons = {
  workshop: Code,
  talk: Mic,
  hackathon: Trophy
};

const categoryColors = {
  workshop: 'border-blue-500 bg-blue-500/10',
  talk: 'border-green-500 bg-green-500/10',
  hackathon: 'border-purple-500 bg-purple-500/10'
};

const UpcomingEvents = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredEvents = selectedCategory === 'all' 
    ? upcomingEvents 
    : upcomingEvents.filter(event => event.category === selectedCategory);

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  return (
    <div className="mb-16">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-4xl font-bold text-white">Upcoming Events</h2>
        <a 
          href="https://www.instagram.com/mtcbpdc/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full hover:from-purple-600 hover:to-pink-600 transition-colors"
        >
          <ExternalLink size={16} />
          Follow @mtcbpdc
        </a>
      </div>

      <div className="flex gap-4 mb-8">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-6 py-2 rounded-full border transition-colors ${
            selectedCategory === 'all' 
              ? 'bg-white text-black border-white' 
              : 'bg-black text-white border-gray-700 hover:border-white/50'
          }`}
        >
          All Events
        </button>
        <button
          onClick={() => setSelectedCategory('workshop')}
          className={`px-6 py-2 rounded-full border transition-colors ${
            selectedCategory === 'workshop' 
              ? 'bg-blue-500 text-white border-blue-500' 
              : 'bg-black text-white border-gray-700 hover:border-blue-500/50'
          }`}
        >
          Workshops
        </button>
        <button
          onClick={() => setSelectedCategory('talk')}
          className={`px-6 py-2 rounded-full border transition-colors ${
            selectedCategory === 'talk' 
              ? 'bg-green-500 text-white border-green-500' 
              : 'bg-black text-white border-gray-700 hover:border-green-500/50'
          }`}
        >
          Talk Shows
        </button>
        <button
          onClick={() => setSelectedCategory('hackathon')}
          className={`px-6 py-2 rounded-full border transition-colors ${
            selectedCategory === 'hackathon' 
              ? 'bg-purple-500 text-white border-purple-500' 
              : 'bg-black text-white border-gray-700 hover:border-purple-500/50'
          }`}
        >
          Hackathons
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map((event) => {
          const IconComponent = categoryIcons[event.category];
          return (
            <div
              key={event.id}
              className="bg-black border border-gray-700 hover:border-white/50 rounded-xl p-6 cursor-pointer transform transition-all duration-300 hover:scale-105"
              onClick={() => handleEventClick(event)}
            >
              <div className="relative mb-4">
                {event.image ? (
                  <img 
                    src={event.image} 
                    alt={event.title}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                ) : (
                  <div className="w-full h-48 bg-gray-800 rounded-lg flex items-center justify-center">
                    <span className="text-gray-400">Image to be added</span>
                  </div>
                )}
                <div className="absolute top-3 left-3 bg-white/90 text-black px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                  <IconComponent size={14} />
                  {event.category}
                </div>
              </div>
              
              <h3 className="text-white text-xl font-bold mb-2">{event.title}</h3>
              <p className="text-gray-300 text-sm mb-4">{event.description}</p>
              
              <div className="flex items-center justify-between text-gray-400 text-sm">
                <div className="flex items-center gap-1">
                  <Calendar size={16} />
                  <span>{event.date}</span>
                </div>
                <span className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded">
                  Stay Tuned
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal */}
      {isModalOpen && selectedEvent && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-black border border-gray-700 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative">
              {selectedEvent.image ? (
                <img 
                  src={selectedEvent.image} 
                  alt={selectedEvent.title}
                  className="w-full h-64 object-cover rounded-t-2xl"
                />
              ) : (
                <div className="w-full h-64 bg-gray-800 rounded-t-2xl flex items-center justify-center">
                  <span className="text-gray-400">Image to be added</span>
                </div>
              )}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
              >
                ×
              </button>
            </div>
            
            <div className="p-8">
              <h2 className="text-white text-3xl font-bold mb-4">{selectedEvent.title}</h2>
              <p className="text-gray-300 mb-6">{selectedEvent.fullDescription}</p>
              
              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
                <p className="text-yellow-400 font-semibold">Stay tuned for more details!</p>
                <p className="text-gray-300 text-sm mt-1">Follow our Instagram for the latest updates.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpcomingEvents;