import React, { useState } from 'react';
import { ChevronDown, Calendar, Trophy, Code, Mic, Users } from 'lucide-react';
import EventCard from './EventCard';
import GlitchText from './GlitchText';

import image1 from "../assets/events/2024-11-21_typing_contest.jpg";
import image2 from "../assets/unused/DataScience.jpg";
import image3 from "../assets/events/2025-02-12_cybersecurity_workshop.jpg";
import image4 from "../assets/events/2024-09-12_introduction_to_power_bi.jpg";
import image5 from "../assets/events/2024-10-02_excel_championship.jpg";
import image6 from "../assets/events/2024-09-17_time_series_analysis.jpg";
import image7 from "../assets/events/2024-09-02_mtc_x_reflexions_mediathon.jpg";
import image8 from "../assets/events/2024-09-02_mtc_orientation.jpg";
import image9 from "../assets/events/2024-08-29_icebreakers_day.jpg";
import image10 from "../assets/events/2023-12-19_speaker_session_with_prof_nick_pears.jpg";
import image11 from "../assets/events/2024-08-05_game_week_series.jpg";
import image12 from "../assets/ThinkAi'24.jpg";
import image13 from "../assets/events/2025-02-17_hackabot.jpg";
import image14 from "../assets/events/2025-02-05_membership_stall.jpg";
import image15 from "../assets/events/2024-12-12_research_talk.jpg";
import image16 from "../assets/events/2024-10-13_midsem_prep.jpg";
import image17 from "../assets/events/2024-10-11_cybersecurity_talk.jpg";
import image18 from "../assets/events/2023-11-28_think_ai23.jpg";
import image19 from "../assets/events/2023-11-20_vs_code_workshop.jpg";
import image20 from "../assets/events/2023-10-05_sign_quest.jpg";
import image21 from "../assets/events/2023-09-20_typing_contest.jpg";
import image22 from "../assets/events/2023-09-06_how_to_start_programming.jpg";
import image23 from "../assets/events/2023-09-13_matlab_workshop.jpg";
import image24 from "../assets/events/PS2_round_table.jpeg";
import image25 from "../assets/events/agentic_ai_workshop.jpeg";
import image26 from "../assets/events/Tri_wizard_Hackathon.jpeg";
import image27 from "../assets/events/MTC_Cipher.jpeg";






// new event images to be added here
import Event01_2025 from "../assets/2025events/2025-08-03_microsoft_powerpynt.png";
import Event02_2025 from "../assets/2025events/2025-08-17_AI GENESIS.png";
import { image } from '@heroui/theme';

const allEvents = [
  // Past Events (August 2024 - May 2025)
  {
    id: 'past-1',
    title: 'Ice Breakers',
    month: 'August 2024',
    description: 'Welcome session for freshers to get acquainted with MTC community',
    image: image9,
    fullDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
    category: 'past'
  },
  {
    id: 'past-2',
    title: 'Mediathon',
    month: 'September 2024',
    description: 'Healthcare innovation hackathon focusing on medical technology solutions',
    image: image7,
    fullDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
    category: 'past'
  },
  {
    id: 'past-3',
    title: 'DS Bootcamp',
    month: 'September 2024',
    description: 'Intensive data science workshop covering machine learning fundamentals',
    image: image2,
    fullDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
    category: 'past'
  },
  {
    id: 'past-4',
    title: 'Excel Championship',
    month: 'October 2024',
    description: 'Competitive Excel skills tournament with real-world challenges',
    image: image5,
    fullDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
    category: 'past'
  },
  {
    id: 'past-5',
    title: 'Cybersecurity Talk',
    month: 'October 2024',
    description: 'Expert insights on modern cybersecurity threats and prevention',
    image: image17,
    fullDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
    category: 'past'
  },
  {
    id: 'past-6',
    title: 'Think AI',
    month: 'November 2024',
    description: 'Artificial Intelligence conference exploring future possibilities',
    image: image12,
    fullDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
    category: 'past'
  },
  {
    id: 'past-7',
    title: 'Typing Contest',
    month: 'November 2024',
    description: 'Fast-paced typing competition testing speed and accuracy',
    image: image1,
    fullDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
    category: 'past'
  },
  {
    id: 'past-8',
    title: 'Kings School Workshop',
    month: 'January 2025',
    description: 'Educational workshop collaboration with Kings School students',
    image: null,
    fullDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
    category: 'past'
  },
  {
    id: 'past-9',
    title: 'Hack-A-Bot',
    month: 'February 2025',
    description: 'Robotics hackathon focusing on automation and AI integration',
    image: image13,
    fullDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
    category: 'past'
  },
  {
    id: 'past-10',
    title: 'Cybersecurity Talk',
    month: 'February 2025',
    description: 'Advanced cybersecurity insights and threat prevention strategies',
    image: image3,
    fullDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
    category: 'past'
  },
  {
    id: 'past-11',
    title: 'Membership Stall',
    month: 'February 2025',
    description: 'MTC membership drive and community engagement event',
    image: image14,
    fullDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
    category: 'past'
  },
  {
    id: 'past-12',
    title: 'PS-2 Round Table',
    month: 'March 2025',
    description: 'Practice School 2 discussion and guidance session',
    image: image24,
    fullDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
    category: 'past'
  },
  {
    id: 'past-13',
    title: 'MTCipher',
    month: 'April 2025',
    description: 'Cryptography and cybersecurity challenge competition',
    image: image27,
    fullDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
    category: 'past'
  },
  {
    id: 'past-14',
    title: 'No Code Hackathon Tri Wizard',
    month: 'April 2025',
    description: 'Three-phase no-code development competition with magical themes',
    image: image26,
    fullDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
    category: 'past'
  },
  {
    id: 'past-15',
    title: 'Agentic AI Workshop',
    month: 'May 2025',
    description: 'Advanced workshop on autonomous AI agents and their applications',
    image: image25,
    fullDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
    category: 'past'
  },
  {
    id: 'past-16',
    title: 'URC',
    month: 'May 2025',
    description: 'University Rover Challenge preparation and competition event',
    image: null,
    fullDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
    category: 'past'
  },
  // Competitions
  {
    id: 'comp-1',
    title: 'Microsoft Powerpynt',
    month: 'August 2025',
    description: 'Pick a tech company and build a PowerPoint presentation explaining why they failed, using Python',
    image: Event01_2025,
    fullDescription: 'Pick a tech company and build a Powerpoint presentation explaining why they failed...',
    category: 'competition',
    descriptionImages: []
  },
  // Hackathons
  {
    id: 'hack-1',
    title: 'AI Genesis',
    month: 'November 2025',
    description: 'A worldwide hybrid hackathon bringing 4000+ talented developers for a week long online challenge',
    image: Event02_2025,
    fullDescription: 'In collaboration with MTC as Official Student and media partners...',
    category: 'hackathon',
    descriptionImages: []
  }
];

const FeaturingMTCEvents = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const categories = [
    { value: 'all', label: 'All Events', icon: Calendar },
    { value: 'competitions', label: 'Competitions', icon: Trophy },
    { value: 'hackathons', label: 'Hackathons', icon: Code },
    { value: 'talks', label: 'Talk Shows', icon: Mic },
    { value: 'workshops', label: 'Workshops', icon: Users }
  ];

  const getEventsByCategory = (category) => {
    switch (category) {
      case 'past': return allEvents.filter(e => e.category === 'past');
      case 'competition': return allEvents.filter(e => e.category === 'competition');
      case 'hackathon': return allEvents.filter(e => e.category === 'hackathon');
      default: return [];
    }
  };

  const handleEventClick = (event) => setSelectedEvent(event);
  const closeModal = () => setSelectedEvent(null);

  const renderEventSectionGrid = (title, category) => {
    const events = getEventsByCategory(category);
    if (events.length === 0) return null;

    return (
      <div className="mb-8 sm:mb-16">
        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-6 sm:mb-8">
          {title}
        </h3>

        {/* Responsive Grid (1 / 2 / 4) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
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
            {renderEventSectionGrid('Rewind the Vibes', 'past')}
            {renderEventSectionGrid('Competitions', 'competition')}
            {renderEventSectionGrid('Hackathons', 'hackathon')}
            {renderComingSoon('Talk Shows')}
            {renderComingSoon('Workshops')}
          </>
        );
      case 'competitions':
        return renderEventSectionGrid('Competitions', 'competition');
      case 'hackathons':
        return renderEventSectionGrid('Hackathons', 'hackathon');
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

      {/* Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-black border border-gray-700 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative">
              {selectedEvent.image && (
                <img 
                  src={selectedEvent.image} 
                  alt={selectedEvent.title}
                  className="w-full h-64 object-cover rounded-t-2xl"
                />
              )}
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
