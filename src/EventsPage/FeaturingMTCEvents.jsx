import React, { useState } from 'react';
import { ChevronDown, Calendar, Trophy, Code, Mic, Users, ChevronLeft, ChevronRight } from 'lucide-react';
import EventCard from './EventCard';
import EventModal from './EventModal';
import GlitchText from './GlitchText';

const allEvents = [
  // Past Events (August 2024 - May 2025)
  {
    id: 'past-1',
    title: 'Ice Breakers',
    month: 'August 2024',
    description: 'Welcome session for freshers to get acquainted with MTC community',
    image: null,
    fullDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    category: 'past'
  },
  {
    id: 'past-2',
    title: 'Mediathon',
    month: 'September 2024',
    description: 'Healthcare innovation hackathon focusing on medical technology solutions',
    image: null,
    fullDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    category: 'past'
  },
  {
    id: 'past-3',
    title: 'DS Bootcamp',
    month: 'September 2024',
    description: 'Intensive data science workshop covering machine learning fundamentals',
    image: null,
    fullDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    category: 'past'
  },
  {
    id: 'past-4',
    title: 'Excel Championship',
    month: 'October 2024',
    description: 'Competitive Excel skills tournament with real-world challenges',
    image: null,
    fullDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    category: 'past'
  },
  {
    id: 'past-5',
    title: 'Cybersecurity Talk',
    month: 'October 2024',
    description: 'Expert insights on modern cybersecurity threats and prevention',
    image: null,
    fullDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    category: 'past'
  },
  {
    id: 'past-6',
    title: 'Think AI',
    month: 'November 2024',
    description: 'Artificial Intelligence conference exploring future possibilities',
    image: null,
    fullDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    category: 'past'
  },
  {
    id: 'past-7',
    title: 'Typing Contest',
    month: 'November 2024',
    description: 'Fast-paced typing competition testing speed and accuracy',
    image: null,
    fullDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    category: 'past'
  },
  {
    id: 'past-8',
    title: 'Kings School Workshop',
    month: 'January 2025',
    description: 'Educational workshop collaboration with Kings School students',
    image: null,
    fullDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    category: 'past'
  },
  {
    id: 'past-9',
    title: 'Hack-A-Bot',
    month: 'February 2025',
    description: 'Robotics hackathon focusing on automation and AI integration',
    image: null,
    fullDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    category: 'past'
  },
  {
    id: 'past-10',
    title: 'Cybersecurity Talk',
    month: 'February 2025',
    description: 'Advanced cybersecurity insights and threat prevention strategies',
    image: null,
    fullDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    category: 'past'
  },
  {
    id: 'past-11',
    title: 'Membership Stall',
    month: 'February 2025',
    description: 'MTC membership drive and community engagement event',
    image: null,
    fullDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    category: 'past'
  },
  {
    id: 'past-12',
    title: 'PS-2 Round Table',
    month: 'March 2025',
    description: 'Practice School 2 discussion and guidance session',
    image: null,
    fullDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    category: 'past'
  },
  {
    id: 'past-13',
    title: 'MTCipher',
    month: 'April 2025',
    description: 'Cryptography and cybersecurity challenge competition',
    image: null,
    fullDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    category: 'past'
  },
  {
    id: 'past-14',
    title: 'No Code Hackathon Tri Wizard',
    month: 'April 2025',
    description: 'Three-phase no-code development competition with magical themes',
    image: null,
    fullDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    category: 'past'
  },
  {
    id: 'past-15',
    title: 'Agentic AI Workshop',
    month: 'May 2025',
    description: 'Advanced workshop on autonomous AI agents and their applications',
    image: null,
    fullDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    category: 'past'
  },
  {
    id: 'past-16',
    title: 'URC',
    month: 'May 2025',
    description: 'University Rover Challenge preparation and competition event',
    image: null,
    fullDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    category: 'past'
  },
  // Competitions
  {
    id: 'comp-1',
    title: 'Microsoft Powerpynt',
    month: 'August 2025',
    description: 'Pick a tech company and build a PowerPoint presentation explaining why they failed, using Python',
    image: null,
    fullDescription: 'Pick a tech company and build a Powerpoint presentation explaining why they failed, using python (primarily the pptx library, but feel free to use any and as many libraries as you wish)',
    category: 'competition',
    descriptionImages: []
  },
  // Hackathons
  {
    id: 'hack-1',
    title: 'AI Genesis',
    month: 'November 2025',
    description: 'A worldwide hybrid hackathon bringing 4000+ talented developers for a week long online challenge',
    image: null,
    fullDescription: 'In collaboration with MTC as Official Student and media partners. A worldwide hybrid hackathon bringing 4000+ talented developers for a week long online challenge.',
    category: 'hackathon',
    descriptionImages: []
  }
];

const FeaturingMTCEvents = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [carouselIndices, setCarouselIndices] = useState({
    past: 0,
    competition: 0,
    hackathon: 0
  });

  const categories = [
    { value: 'all', label: 'All Events', icon: Calendar },
    { value: 'competitions', label: 'Competitions', icon: Trophy },
    { value: 'hackathons', label: 'Hackathons', icon: Code },
    { value: 'talks', label: 'Talk Shows', icon: Mic },
    { value: 'workshops', label: 'Workshops', icon: Users }
  ];

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  const nextSlide = (category) => {
    const events = getEventsByCategory(category);
    const maxIndex = Math.max(0, events.length - 3);
    setCarouselIndices(prev => ({
      ...prev,
      [category]: Math.min(prev[category] + 1, maxIndex)
    }));
  };

  const prevSlide = (category) => {
    setCarouselIndices(prev => ({
      ...prev,
      [category]: Math.max(prev[category] - 1, 0)
    }));
  };

  const getEventsByCategory = (category) => {
    switch (category) {
      case 'past':
        return allEvents.filter(event => event.category === 'past');
      case 'competition':
        return allEvents.filter(event => event.category === 'competition');
      case 'hackathon':
        return allEvents.filter(event => event.category === 'hackathon');
      default:
        return [];
    }
  };

  const renderEventSection = (title, category) => {
    const events = getEventsByCategory(category);
    const currentIndex = carouselIndices[category];

    if (events.length === 0) return null;

    return (
      <div className="mb-8 sm:mb-16">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 sm:mb-8 gap-4">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">{title}</h3>
          <div className="flex gap-2 justify-center sm:justify-end">
            <button
              onClick={() => prevSlide(category)}
              className="bg-black border border-gray-700 hover:border-white/50 text-white p-2 sm:p-3 rounded-full transition-colors"
              disabled={currentIndex === 0}
            >
              <ChevronLeft size={16} className="sm:w-5 sm:h-5" />
            </button>
            <button
              onClick={() => nextSlide(category)}
              className="bg-black border border-gray-700 hover:border-white/50 text-white p-2 sm:p-3 rounded-full transition-colors"
              disabled={currentIndex >= Math.max(0, events.length - 3)}
            >
              <ChevronRight size={16} className="sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>

        <div className="overflow-hidden -mx-4 sm:mx-0">
          <div 
            className="flex gap-4 sm:gap-6 transition-transform duration-500 ease-in-out px-4 sm:px-0"
            style={{ transform: `translateX(-${currentIndex * (window.innerWidth < 640 ? 304 : 344)}px)` }}
          >
            {events.map((event) => (
              <EventCard
                key={event.id}
                title={event.title}
                month={event.month}
                description={event.description}
                image={event.image}
                onClick={() => handleEventClick(event)}
              />
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderComingSoon = (title) => (
    <div className="mb-8 sm:mb-16">
      <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-6 sm:mb-8">{title}</h3>
      <div className="flex items-center justify-center h-48 sm:h-64 bg-black border border-gray-700 rounded-xl mx-4 sm:mx-0">
        <GlitchText 
          text="COMING SOON" 
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-white"
        />
      </div>
    </div>
  );

  const renderContent = () => {
    switch (selectedCategory) {
      case 'all':
        return (
          <>
            {renderEventSection('Rewind the Vibes', 'past')}
            {renderEventSection('Competitions', 'competition')}
            {renderEventSection('Hackathons', 'hackathon')}
            {renderComingSoon('Talk Shows')}
            {renderComingSoon('Workshops')}
          </>
        );
      case 'competitions':
        return renderEventSection('Competitions', 'competition');
      case 'hackathons':
        return renderEventSection('Hackathons', 'hackathon');
      case 'talks':
        return renderComingSoon('Talk Shows');
      case 'workshops':
        return renderComingSoon('Workshops');
      default:
        return null;
    }
  };

  return (
    <div className="mb-8 sm:mb-16">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 sm:mb-8 gap-4">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">Featuring MTC Events</h2>
        
        {/* Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-2 bg-black border border-gray-700 hover:border-white/50 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg transition-colors text-sm sm:text-base w-full sm:w-auto justify-center sm:justify-start"
          >
            {categories.find(cat => cat.value === selectedCategory)?.label}
            <ChevronDown size={16} className={`transform transition-transform ${isDropdownOpen ? 'rotate-180' : ''} flex-shrink-0`} />
          </button>
          
          {isDropdownOpen && (
            <div className="absolute top-full left-0 sm:right-0 sm:left-auto mt-2 bg-black border border-gray-700 rounded-lg shadow-xl z-10 min-w-[200px] w-full sm:w-auto">
              {categories.map((category) => {
                const IconComponent = category.icon;
                return (
                  <button
                    key={category.value}
                    onClick={() => {
                      setSelectedCategory(category.value);
                      setIsDropdownOpen(false);
                    }}
                    className="flex items-center gap-3 w-full px-4 py-3 text-white hover:bg-gray-800 transition-colors first:rounded-t-lg last:rounded-b-lg text-sm sm:text-base"
                  >
                    <IconComponent size={16} />
                    {category.label}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {renderContent()}

      {/* Enhanced Modal */}
      {isModalOpen && selectedEvent && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-black border border-gray-700 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative">
              <img 
                src={selectedEvent.image} 
                alt={selectedEvent.title}
                className="w-full h-64 object-cover rounded-t-2xl"
              />
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors text-xl"
              >
                ×
              </button>
              <div className="absolute bottom-4 left-4 bg-white/90 text-black px-4 py-2 rounded-full font-semibold">
                {selectedEvent.month}
              </div>
            </div>
            
            <div className="p-8">
              <h2 className="text-white text-3xl font-bold mb-6">{selectedEvent.title}</h2>
              
              <div className="text-gray-300 leading-relaxed space-y-4">
                <p>{selectedEvent.fullDescription}</p>
                
                {selectedEvent.descriptionImages && selectedEvent.descriptionImages.length > 0 && (
                  <div className="mt-6">
                    <h3 className="text-white text-xl font-semibold mb-3">Event Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {selectedEvent.descriptionImages.map((image, index) => (
                        <img 
                          key={index}
                          src={image} 
                          alt={`${selectedEvent.title} detail ${index + 1}`}
                          className="w-full h-64 object-cover rounded-lg"
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeaturingMTCEvents;