import React, { useState } from "react";
import BlurText from "../components/ui/BlurText.jsx";
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





import Balatro from "../components/ui/Balatro.jsx";
import { CardBody, CardContainer, CardItem } from "../components/ui/3d-card.jsx";
import IdeaSubmissionForm from "./MediaForm.jsx";
import Modal from "../components/ui/Modal.jsx";
import FocusCard from "../components/ui/FocusCard.jsx";
import article1 from "../assets/articles/article_2025-08-09.webp";
import article2 from "../assets/articles/article_2025-04-17.jpg"; /*Maybe Our Phones Should Be Dumber*/
import article3 from "../assets/articles/article_2025-03-03.png";
import article4 from "../assets/articles/article_2025-02-07.png"; /*ChatGPT’s White Whale is China’s Golden Goose*/
import article5 from "../assets/articles/article_2023-08-10.jpg"; /*Do Employers Dream of AI Sheep?*/
import article6 from "../assets/unused/Timeseries1_new.jpg";
import article7 from "../assets/articles/article_2025-08-20.webp";



import ShinyButton from "../components/ui/ShinyButton.jsx";
export default function Media() {
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [buttonRect, setButtonRect] = useState(null);
  const [activeImageIdx, setActiveImageIdx] = useState(null);

  const handleImageClick = (idx) => {
    // Only toggle on mobile devices
    if (window.innerWidth < 640) {
      setActiveImageIdx(activeImageIdx === idx ? null : idx);
    }
  };

  const handleOpenGallery = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setButtonRect(rect);
    setIsGalleryOpen(true);
  };
  const staticImages = [
    {
      src: image1,
      title: "Typing Contest",
      desc: "Showcasing our annual speed typing event and its winners.",
    },
    {
      src: image2,
      title: "Data Science Workshop",
      desc: "Hands-on learning session on data science and analytics.",
    },
    {
      src: image3,
      title: "Guest Webinar",
      desc: "Industry experts sharing insights on emerging technologies.",
    },
  ];
  const galleryImages = [
    {
      src: image13,
      title: "ACM-W x MTC: Hack-A-Bot",
      desc: "Build a creative chatbot + landing page — free for members, AED 5 for others!",
    },
    {
      src: image3,
      title: "Cybersecurity Workshop",
      desc: "Cybersecurity Workshop - Foundations of Penetration Testing",
    },
    {
      src: image14,
      title: "Membership Stall",
      desc: "MTC’s Squid Game stall: flip, answer, win — fun, strategy, and prizes!",
    },
        {
      src: image15,
      title: "Research Talk",
      desc: "MTC hosted Dr. R. Balasubramanian for an inspiring Research Talk on cutting-edge AI innovations.",
    },
        {
      src: image1,
      title: "Typing Contest 2024",
      desc: "MTC’s Typing Contest 2024 saw 55 participants battle DVORAK, Memory Typing, and T9 challenges.",
    },
        {
      src: image12,
      title: "ThinkAI’24",
      desc: "MTC’s ThinkAI’24 saw 22 teams pitch innovative AI ideas for Imagine Cup 2025.",
    },
        {
      src: image16,
      title: "Midsem Prep Workshops",
      desc: "MTC hosted packed exam-prep workshops across core subjects, guiding 150+ students before midsems.",
    },
        {
      src: image17,
      title: "Cybersecurity Talk",
      desc: "MTC kicked off the semester with Mathew Medayil’s insightful talk on cybersecurity.",
    },
        {
      src: image5,
      title: "Excel Championship",
      desc: "MTC’s Excel Championship tested skills across themed sessions, crowning three winners.",
    },
        {
      src: image6,
      title: "Time Series Analysis",
      desc: "MTC’s Bootcamp finale covered Time Series EDA with hands-on analysis, forecasting, and prizes.",
    },
        {
      src: image4,
      title: "Introduction to Power BI",
      desc: "MTC’s Data Science Bootcamp introduced Power BI dashboards, reports, and data visualization basics.",
    },
        {
      src: image2,
      title: "Intro to Data Science",
      desc: "MTC’s Data Science Bootcamp introduced Python-based analytics with Pandas, NumPy, Matplotlib, and Seaborn.",
    },
            {
      src: image7,
      title: "MTC x Reflexions Mediathon",
      desc: "MTC x Reflexions Mediathon challenged teams to design themed BPDC portfolio websites.",
    },        {
      src: image8,
      title: "MTC Orientation",
      desc: "MTC’s orientation welcomed new members with insights, council introductions, and a fun Social Media Hunt",
    },        {
      src: image9,
      title: "Icebreakers Day",
      desc: "MTC launched membership registrations on 29 August with perks, renewals, and discounts.",
    },        {
      src: image11,
      title: "GameWeek Series",
      desc: "MTC’s GameWeek Series kept members hooked with thrilling online competitions all August.",
    },        {
      src: image10,
      title: "Speaker Session with Prof Nick Pears",
      desc: "MTC hosted Prof. Nick Pears for insights on AI, Cybersecurity, and Computer Vision.",
    },
    {
      src: image18,
      title: "ThinkAI’23",
      desc: "ThinkAI’23 showcased 14 teams’ AI solutions, with Tech Titans and IntelliTrack emerging winners.",
    },
    {
      src: image19,
      title: "VS Code Workshop",
      desc: "MTC’s VS Code Workshop explored features, customization, AI tools, and hands-on programming tips.",
    },
    {
      src: image20,
      title: "SignQuest",
      desc: "MTC’s SignQuest promoted ESL awareness and Generative AI through a fun, quiz-based challenge.",
    },
    {
      src: image21,
      title: "Typing Contest 2023",
      desc: "MTC’s Typing Contest challenged speed and accuracy, crowning 9 winners across 3 rounds.",
    },
    {
      src: image23,
      title: "MATLAB Workshop",
      desc: "MTC’s MATLAB Workshop covered UI, syntax, data handling, and problem-solving with graphs.",
    },
    {
      src: image22,
      title: "How To Start Programming",
      desc: "MTC’s ‘How To Start Programming’ workshop introduced coding basics, resources, and opportunities at BITS.",
    },

    
  ];
  return (
    <div className="bg-transparent text-white min-h-screen py-20 px-4">
      <Balatro
        isRotate={false}
        mouseInteraction={true}
        pixelFilter={700}
        color1="#000000"
        color2="#0a0a0a"
        color3="#111111"
      ></Balatro>
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <h1 className="text-6xl font-bold md:text-6xl text-center mb-8 flex justify-center">
          <BlurText text="Media" delay={200}></BlurText>
        </h1>

        <p className="text-lg md:text-2xl text-gray-300 text-center mb-12">
          Pixels speak louder than words
        </p>

        <div className="max-w-7xl mx-auto px-4 md:px-6 mb-12">
          <div className="flex gap-8 w-full justify-center">
            {staticImages.map((img, i) => (
              <div
                key={i}
                className={
                  i === 0
                    ? "relative group overflow-hidden rounded-lg flex-1 block sm:block"
                    : "relative group overflow-hidden rounded-lg flex-1 hidden sm:block"
                }
                onClick={() => handleImageClick(i)}
              >
<img
  src={img.src}
  alt={img.title}
  className={`w-full h-80 object-cover transition duration-500
    ${
      (activeImageIdx === i && window.innerWidth < 640)
        ? "blur-sm brightness-75"
        : "group-hover:blur-sm group-hover:brightness-75"
    }
  `}
/>
                {/* Info for desktop (hover) and mobile (touch) */}
                <div
                  className={`absolute inset-0 flex flex-col items-center justify-center text-center transition-all duration-500 ease-out
                    ${
                      // Show on hover for desktop, or if active on mobile
                      (activeImageIdx === i && window.innerWidth < 640)
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0"
                    }
                  `}
                  style={{ pointerEvents: "none" }}
                >
                  <h3 className="text-2xl font-bold text-white mb-2">{img.title}</h3>
                  <p className="text-white max-w-xs">{img.desc}</p>
                </div>
              </div>
            ))}
          </div>
                    {/* Gallery button */}
<div className="text-center mt-12 mb-8">
  <ShinyButton onClick={handleOpenGallery}>
    Gallery
  </ShinyButton>
</div>
        </div>

        <Modal
          isOpen={isGalleryOpen}
          onClose={() => setIsGalleryOpen(false)}
          title="Gallery"
          maxWidth="max-w-7xl"
          originRect={buttonRect}
        >
          <div className="group grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-6 gap-x-3">
            {galleryImages.map((img, idx) => (
              <FocusCard
                key={idx}
                src={img.src}
                title={img.title}
                desc={img.desc}
              />
            ))}
          </div>
        </Modal>

        {/* Info line */}
<div className="mb-8">
  <h2 className="text-4xl font-bold text-white text-center w-full">
    <BlurText text="Articles"/>
  </h2>
</div>
        <p className="text-lg md:text-2xl text-gray-300 text-center mb-12">
          <BlurText text ="Explore recent trends in technology with our monthly blog posts on Medium"/>
        </p>
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center items-stretch">
            {[
              {
                title: (<>I Agree…<br />Now What?</>),
                img: article7,
                desc: "clicks, “Yes, I Agree”, a small and rather insignificant experience you and I have when we open a website",
                date: "August 20, 2025",
                author: "Vaibhav Krishnan",
                url: "https://medium.com/@microsofttechclub/i-agree-now-what-c9a9affeb04d",
              },
              {
                title: "Sure, Autocorrect. That’s EXACTLY What I Meant",
                img: article1,
                desc: "I didn’t signup for this chaos. Its silent and sneaky.",
                date: "August 9, 2025",
                author: "Saanvi Dutta",
                url: "https://medium.com/@microsofttechclub/sure-autocorrect-thats-exactly-what-i-meant-139dc7a08ab0",
              },
              {
                title: "Maybe Our Phones Should Be Dumber",
                img: article2,
                desc: "Maybe your mom was right; it is all because of that phone.",
                date: "April 17, 2025",
                author: "MTC Team",
                url: "https://medium.com/@microsofttechclub/maybe-our-phones-should-be-dumber-511ad2da46dc",
              },
              {
                title: "And I Am Become Death, Destroyer Of Phones…",
                img: article3,
                desc: "Planned Obsolescence. Your smartphone will die in 2 years.",
                date: "March 3, 2025",
                author: "Diya Freddy",
                url: "https://medium.com/@microsofttechclub/and-i-am-become-death-destroyer-of-phones-ca7eb40ed4c9",
              },
              {
                title: "ChatGPT’s White Whale is China’s Golden Goose",
                img: article4,
                desc: "The deepseek story.                          ",
                date: "February 7, 2025",
                author: "Prasannah",
                url: "https://medium.com/@microsofttechclub/chatgpts-white-whale-is-china-s-golden-goose-a79619c545f2",
              },
              {
                title: "Do Employers Dream of AI Sheep?",
                img: article5,
                desc: "Are programmers going to be obsolete?",
                date: "November 25, 2024",
                author: "Prasannah",
                url: "https://medium.com/@microsofttechclub/do-employers-dream-of-ai-sheep-0744c066bf69",
              },

            ].map((article, idx) => (
    <CardContainer className="inter-var bg-transparent h-full" key={idx}>
      <CardBody
        className="
          bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1]
          dark:bg-black border-2 border-white dark:border-white/[0.2] border-black/[0.1]
          w-full h-full rounded-2xl p-6
          flex flex-col
          min-h-[34rem] md:min-h-[36rem] lg:min-h-[38rem]
        "
      >
        {/* Title — clamp to 2 lines for uniform height */}
        <CardItem
          translateZ="50"
          className="text-2xl font-bold text-neutral-600 dark:text-white mb-4 text-center"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            minHeight: "3.5rem"
          }}
        >
          {article.title}
        </CardItem>

        {/* Image — fixed height */}
        <CardItem translateZ="100" className="w-full mb-4">
          <img
            src={article.img}
            alt={
              typeof article.title === "string"
                ? article.title
                : "Article cover"
            }
            className="h-48 w-full object-cover rounded-lg group-hover/card:shadow-xl"
            loading="lazy"
            draggable={false}
          />
        </CardItem>

        {/* Description — clamp to 4 lines */}
        <CardItem
          as="p"
          translateZ="60"
          className="text-neutral-500 text-base dark:text-neutral-300 text-center mb-4"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 4,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            minHeight: "5.5rem"
          }}
        >
          {article.desc}
        </CardItem>

        {/* Meta */}
        <CardItem translateZ="50" className="text-white text-sm mb-1 text-center">
          {article.date}
        </CardItem>
        <CardItem translateZ="50" className="text-gray-400 text-sm mb-4 text-center">
          By: {article.author}
        </CardItem>

        {/* Button — pinned to bottom, full width, mobile-safe */}
        <CardItem
          translateZ={20}
          as="a"
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="
            mt-auto block w-full
            bg-blue-600 text-white rounded-lg px-6 py-3 text-base font-semibold text-center
            transition-all duration-200 ease-in-out
            hover:bg-white hover:text-blue-600 hover:scale-[1.02]
            focus:outline-none focus:ring-2 focus:ring-blue-400/40
          "
        >
          Read More →
        </CardItem>
      </CardBody>
    </CardContainer>
  ))}
</div>
<div className="text-center mt-12 mb-8">
  <ShinyButton
    onClick={() =>
      window.open("https://medium.com/@microsofttechclub", "_blank")
    }
  >
    Explore More Articles
  </ShinyButton>
</div>

          <div className="mb-16 mt-16">
            <IdeaSubmissionForm />
          </div>
        </div>
      </div>
    </div>
  );
}
