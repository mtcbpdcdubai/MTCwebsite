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
import image28 from "../assets/events/Kings_School_MTC.jpeg";
import image29 from "../assets/events/URC.jpeg";



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
    fullDescription: 'The Microsoft Tech Club opened their membership registrations on 29 August, in the Sports Complex. Registrations were available for freshmen, all seniors, and renewals were available for existing members who were interested in retaining their subscription to the club. Council members actively participated in marketing the merits of MTC and the perks that the club had to offer to members, but the MTC stall had its own attractive features which incentivised future members to join with a discounted price.',
    category: 'past'
  },
  {
    id: 'past-2',
    title: 'MediathoMTC x Reflexions Mediathon',
    month: 'September 2024',
    description: 'Hackathon in collaboration with Reflexions, focusing on media solutions',
    image: image7,
    fullDescription: 'The MTC x Reflexions Mediathon was a week-long event where participants formed teams of 1-4 to create a portfolio website for BPDC. They could use only HTML, CSS, and optionally, JavaScript, and had to use pictures captured around campus during the eligibility period. The website was required to reflect any of the given four themes—Academia, Student Life, Sports, and Nature.',
    category: 'past'
  },
  {
    id: 'past-3',
    title: 'DS Bootcamp',
    month: 'September 2024',
    description: 'Intensive data science workshop covering machine learning fundamentals',
    image: image2,
    fullDescription: 'The Microsoft Tech Club hosted the first session of its Data Science bootcamp; it was an introduction to the world of Data Science by MTC Tech Manager Laya Shree Elango. After a brief talk on the significance of data science on daily life, participants were taken on a step by step tutorial of making an algorithm analyzing the chances of employees quitting a company, taking various factors in consideration, on the programming language Python incorporating python libraries such as Pandas, NumPy, Matplotlib and Seaborn.',
    category: 'past'
  },
  {
    id: 'past-4',
    title: 'Excel Championship',
    month: 'October 2024',
    description: 'Competitive Excel skills tournament with real-world challenges',
    image: image5,
    fullDescription: 'MTC’s Excel Championship was a 3-hour Microsoft Excel-based time trial covering themes such as data analysis, financial modeling, and data cleaning, with questions split into easy, medium, and hard levels, each with different weightage for a total of 100 points. The competition was divided into three themed sessions: Harry Potter, Marvel, and Uncharted, where participants solved questions related to each theme, with team support available to clear doubts. The winners for each session were Aaryan Sinha (Session 1), Aakar Mathur (Session 2), and Sreenikethan Iyer (Session 3).',
    category: 'past'
  },
  {
    id: 'past-5',
    title: 'Cybersecurity Talk',
    month: 'October 2024',
    description: 'Expert insights on modern cybersecurity threats and prevention',
    image: image17,
    fullDescription: 'The Microsoft Tech Club hosted Mathew Medayil, seasoned Security Consultant at First Abu Dhabi Bank, for their very first talk for the semester. The talk was moderated by Reuben Thomas and Joel Joseph. Topics covered include an introduction to cybersecurity and what constitutes it, types of hackers, what goes on in a day in the life of an ethical hacker and how the work is delegated in the company specifically in the banking sector. He also provided several resources to learn about cybersecurity and information on certification available. Joel Joseph gathered topics of interest for Mr. Medayil to provide additional details on cybersecurity. The session ended with a helpful doubts clearing segment.',
    category: 'past'
  },
  {
    id: 'past-6',
    title: 'Think AI',
    month: 'November 2024',
    description: 'Artificial Intelligence conference exploring future possibilities',
    image: image12,
    fullDescription: 'Microsoft’s Imagine Cup 2025 is a global student startup competition for founders using AI technologies on the Microsoft cloud. To empower and encourage students to participate in the same, Microsoft Tech Club conducted ThinkAI’24. The event was a success, with 30 teams (76 teams) registering, and 22 teams (58 participants) presenting their pitches to a set of 12 judges, including the Director. The pitches covered a wide array of fields, from the healthcare sector to art and technology. Students came up with promising ideas, and the judges provided valuable feedback to guide them. The winners were promised a prize pool of 450 AED, as well as mentoring from the professors to hone their idea for the Imagine Cup 2025. The winners were Team Noor (Pradyun Kumar Sinha, Vrushank Vijay Tipnis, Abhishekh Verma, Shaikh Mohammed Rehan Mairajuddin), Team Vada Visionaries (Mohammed Ruknuddin, Nishal Ahmed Poovatham Kandiyil, Kalyani Baiju Sindhu, Muhammad Fawaz Imran), and Team RoboIntellects (Radhika Khatri).',
    category: 'past'
  },
  {
    id: 'past-7',
    title: 'Typing Contest',
    month: 'November 2024',
    description: 'Fast-paced typing competition testing speed and accuracy',
    image: image1,
    fullDescription: "Microsoft Tech Club’s flagship event, the Typing Contest, kicked it up a notch this year. Held for three hours, it hosted three different challenges; the DVORAK keyboard layout, memory typing, and the T9 layout. This increased the difficulty levels greatly, and proved to be an interesting challenge for participants. To accommodate the nuances of each of the three challenges, the technical team developed a platform to specifically cater to the DVORAK and T9 keyboard layouts, as well as to time the strings to disappear to make memory typing feasible. Each of the sessions themselves had three levels, easy, medium, and hard, and participants could try each difficulty level any number of times. The Typing Contest had 15 participants for the first session, 27 for the second session, and 49 for the third session; overall, there were 92 submissions, 55 unique participants, 8 players who completed all three challenges, and 5 winners. The winners were awarded cash prizes, and all participants received certificates of participation. The event was a great success, and we look forward to hosting it again next year!",
    category: 'past'
  },
  {
    id: 'past-8',
    title: 'Kings School Workshop',
    month: 'January 2025',
    description: 'Educational workshop collaboration with Kings School students',
    image: image28,
    fullDescription: 'MTC reached greater heights with a successful Scratch programming workshop at Kings’ School, Dubai, conducted by Reuben Thomas Thovelil, Sri Hari Sai Subramanian, and Tanisha Handa. Our members shared their experience from the workshop, with Reuben noting that “the enthusiasm and eagerness of the students to learn and participate made the experience truly enjoyable,” while Tanisha highlighted that “the competition towards the end showcased their creativity and problem-solving abilities.” We extend our gratitude to Kings’ School for the opportunity and to our team for making this workshop both engaging and impactful.',
    category: 'past'
  },
  {
    id: 'past-9',
    title: 'Hack-A-Bot',
    month: 'February 2025',
    description: 'Robotics hackathon focusing on automation and AI integration',
    image: image13,
    fullDescription: 'Participants are challenged to build a chatbot coupled with an interactive landing webpage around the themes of Education & Career, Health & Wellness, Entertainment, E-Commerce and Personal Assistance.The Judging Criteria will based on Bot Logic, Pitching & Presentation, Creative Visuals and Theme Relevance.Registration is free for all ACMW and MTC Members, and is only AED 5 for non-members!',
    category: 'past'
  },
  {
    id: 'past-10',
    title: 'Cybersecurity Talk',
    month: 'February 2025',
    description: 'Advanced cybersecurity insights and threat prevention strategies',
    image: image3,
    fullDescription: 'Cybersecurity Workshop - Foundations of Penetration Testing Speaker: Ashwin Ragav, Founder of Speclar, Co-founder of Nodeshield, Cybersecurity Researcher',
    category: 'past'
  },
  {
    id: 'past-11',
    title: 'Membership Stall',
    month: 'February 2025',
    description: 'MTC membership drive and community engagement event',
    image: image14,
    fullDescription: 'MTC hosted a creative and engaging Squid Games-themed Membership Stall next to the vending machine providing an interactive experience where participants tested their skills and knowledge through a thrilling challenge inspired by the popular series.Participants were required to flip a Ddakji and successfully turn it over to qualify for answering questions. Questions ranged from easy, medium, or hard—to earn points and prizes. The competitive element, combined with the fun and strategy, kept participants hooked throughout the event.',
    category: 'past'
  },
  {
    id: 'past-12',
    title: 'PS-2 Round Table',
    month: 'March 2025',
    description: 'Practice School 2 discussion and guidance session',
    image: image24,
    fullDescription: 'MTC recently hosted an insightful PS-II Internship Round Table Talk, where seniors shared their experiences working at corporates and startups across various domains. The session provided valuable guidance on understanding company work cultures, optimizing CVs, and approaching work effectively during internships. Key discussions included how to perform well in interviews, the scope of tech roles and the stacks being used in companies, as well as the demand for front-end and back-end technologies. The speakers also emphasized the importance of personality, aptitude, and CGPA in securing better opportunities. A special thanks goes out to our seniors for dedicating their time to mentor juniors and share their experiences.',
    category: 'past'
  },
  {
    id: 'past-13',
    title: 'MTCipher',
    month: 'April 2025',
    description: 'Cryptography and cybersecurity challenge competition',
    image: image27,
    fullDescription: 'Steal, escape, and survive the night, if you dare. When the shadows awaken, only the bold will endure as MTCipher returns on May 3rd–4th, 2025. This 24-hour online challenge, beginning at 12 noon, is free for all participants and promises thrilling competition with epic rewards. Winners will take home AED 250, 150, and 100 for members (AED 175, 100, and 50 for non-members), along with certificates for every participant.',
    category: 'past'
  },
  {
    id: 'past-14',
    title: 'No Code Hackathon Tri Wizard',
    month: 'April 2025',
    description: 'Three-phase no-code development competition with magical themes',
    image: image26,
    fullDescription: 'MTC made its mark at the BITS Tech Fest with the No Code Tri-Wizard Hackathon. The event featured a WordPress workshop led by Sri Hari Sai Subramanian and Reuben Thomas Thovelil, introducing participants to the possibilities of building websites without writing code. Mystery prizes added an extra layer of excitement, keeping the participants engaged throughout. We extend our gratitude to everyone who joined and brought their creativity to the hackathon, and to the BITS Tech Fest team for this opportunity. We look forward to seeing more of this digital innovation at future events.',
    category: 'past'
  },
  {
    id: 'past-15',
    title: 'Agentic AI Workshop',
    month: 'May 2025',
    description: 'Advanced workshop on autonomous AI agents and their applications',
    image: image25,
    fullDescription: 'MTC presents the Agentic AI Workshop for all. In this hands-on session, you’ll explore Agentic AI, an artificial intelligence that acts autonomously to solve complex problems and adapt on its own. The workshop is designed to enhance your PS prospects as you delve into the depths of Agentic AI with our expert speakers. In collaboration with BTF, we will also introduce a low-code platform to help you quickly build and improve your prototypes. The workshop is completely beginner-friendly and requires no prerequisites.',
    category: 'past'
  },
  {
    id: 'past-16',
    title: 'URC',
    month: 'May 2025',
    description: 'University Rover Challenge preparation and competition event',
    image: image29,
    fullDescription: 'A prize pool of 6,000 AED is up for grabs at the Undergraduate Research Competition at InterSys 2025. Open to all undergraduate students across the UAE, this competition invites participants to showcase their innovative ideas with no registration fee or prerequisites, just a passion for research. The deadline to register is April 15, 2025, at 11:59 PM GST, and participants will present their research on May 5.',
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
